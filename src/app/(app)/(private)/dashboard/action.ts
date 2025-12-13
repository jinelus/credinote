'use server'

import dayjs from 'dayjs'
import { cacheTag } from 'next/cache'
import { prisma } from '@/src/db/prisma'
import { withErrorHandling } from '@/src/utils/error-handler'
import type { PaginationParams } from '@/src/utils/types'

export async function addCache(tag: string) {
  'use cache'

  cacheTag(tag)
}

export async function getOrders(
  slug: string,
  { page = 1, perPage = 10, order, orderBy, search }: PaginationParams,
) {
  const result = await withErrorHandling(async () => {
    const orders = await prisma.order.findMany({
      where: {
        client: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
          organization: {
            slug,
          },
        },
      },
      include: {
        client: {
          select: {
            name: true,
          },
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy:
        orderBy === 'createdAt'
          ? {
              date: order,
            }
          : orderBy === 'amount'
            ? {
                total: order,
              }
            : {
                date: 'desc',
              },
    })

    const ordersCount = await prisma.order.count({
      where: {
        client: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      },
    })

    const maxPage = Math.ceil(ordersCount / (perPage ?? 10))

    await addCache(`orders-${slug}`)

    return {
      success: true,
      data: {
        orders: orders.map((order) => ({
          ...order,
          total: Number(order.total),
          clientName: order.client.name,
        })),
        maxPage,
        totalItems: ordersCount,
      },
    }
  })

  return result
}

export async function getClient(id: string) {
  const result = await prisma.client.findUnique({
    where: {
      id,
    },
  })

  if (!result) {
    return {
      success: false,
      error: 'Client not found',
    }
  }

  await addCache(`client-${id}`)

  return {
    success: true,
    data: {
      ...result,
      amount: Number(result.amount),
    },
  }
}

export async function getOrdersAndPaymentsData(
  slug: string,
  timeRange: '7d' | '30d' | '90d' = '90d',
) {
  const result = await withErrorHandling(async () => {
    const daysToSubtract = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    const startDate = dayjs().subtract(daysToSubtract, 'day').startOf('day').toDate()

    const orders = await prisma.order.findMany({
      where: {
        client: {
          organization: {
            slug,
          },
        },
        date: {
          gte: startDate,
        },
      },
      select: {
        date: true,
        total: true,
      },
    })

    const payments = await prisma.payment.findMany({
      where: {
        client: {
          organization: {
            slug,
          },
        },
        paidAt: {
          gte: startDate,
        },
      },
      select: {
        paidAt: true,
        amount: true,
      },
    })

    // Create a map to aggregate data by date
    const dataMap = new Map<string, { date: string; orders: number; payments: number }>()

    for (const order of orders) {
      const dateKey = dayjs(order.date).format('YYYY-MM-DD')
      const existing = dataMap.get(dateKey) || {
        date: dateKey,
        orders: 0,
        payments: 0,
      }
      existing.orders += Number(order.total)
      dataMap.set(dateKey, existing)
    }

    for (const payment of payments) {
      const dateKey = dayjs(payment.paidAt).format('YYYY-MM-DD')
      const existing = dataMap.get(dateKey) || {
        date: dateKey,
        orders: 0,
        payments: 0,
      }
      existing.payments += Number(payment.amount)
      dataMap.set(dateKey, existing)
    }

    // Convert map to array and sort by date
    const chartData = Array.from(dataMap.values()).sort((a, b) => a.date.localeCompare(b.date))

    return {
      success: true,
      data: chartData,
    }
  })

  await addCache(`orders-payments-${slug}`)

  return result
}

export async function getTopClientsByOrders(slug: string) {
  const result = await withErrorHandling(async () => {
    const monthStart = dayjs().startOf('month').toDate()
    const monthEnd = dayjs().endOf('month').toDate()

    // Get clients with their order counts and totals for current month
    const clientsWithOrders = await prisma.client.findMany({
      where: {
        organization: {
          slug,
        },
        Order: {
          some: {
            date: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        Order: {
          where: {
            date: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
          select: {
            total: true,
          },
        },
      },
    })

    // Calculate order counts and totals, then sort
    const clientData = clientsWithOrders
      .map((client) => ({
        clientName: client.name,
        orderCount: client.Order.length,
        totalAmount: client.Order.reduce((sum, order) => sum + Number(order.total), 0),
      }))
      .sort((a, b) => b.orderCount - a.orderCount)
      .slice(0, 5) // Top 5 clients
      .map((client, index) => ({
        ...client,
        fill: `var(--chart-${index + 1})`,
      }))

    return {
      success: true,
      data: clientData,
    }
  })

  await addCache(`top-clients-${slug}`)

  return result
}
