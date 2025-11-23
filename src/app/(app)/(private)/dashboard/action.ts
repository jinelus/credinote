'use server'

import { prisma } from '@/src/db/prisma'
import { withErrorHandling } from '@/src/utils/error-handler'
import type { PaginationParams } from '@/src/utils/types'

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

  return {
    success: true,
    data: {
      ...result,
      amount: Number(result.amount),
    },
  }
}
