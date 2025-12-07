'use server'

import dayjs from 'dayjs'
import { updateTag } from 'next/cache'
import { prisma } from '@/src/db/prisma'
import { withErrorHandling } from '@/src/utils/error-handler'

export interface AddOrderParams {
  slug: string
  clientId: string
  total: number
  description?: string
}

export async function addOrder({ slug, clientId, total, description }: AddOrderParams) {
  const result = await withErrorHandling(async () => {
    const organization = await prisma.organization.findUnique({
      where: {
        slug,
      },
    })

    if (!organization) {
      return {
        success: false,
        error: 'Organização não encontrada',
      }
    }

    const client = await prisma.client.findFirst({
      where: {
        organizationId: organization.id,
        id: clientId,
      },
    })

    if (!client) {
      return {
        success: false,
        error: 'Cliente não encontrado',
      }
    }

    const mustRecentPayment = await prisma.payment.findFirst({
      where: {
        clientId: client.id,
      },
      orderBy: {
        paidAt: 'desc',
      },
    })

    const isBeen3Months = dayjs(Date.now()).diff(mustRecentPayment?.paidAt, 'month') >= 3

    if (Number(client.amount) > 99.99 && isBeen3Months) {
      return {
        success: false,
        error:
          'Esse cliente precisa pagar o que deve desde mais de 3 meses antes de poder comprar de novo',
      }
    }

    const newOrder = await prisma.order.create({
      data: {
        clientId,
        total,
        description,
      },
    })

    const newAmount = Number(client.amount) + total

    await prisma.client.update({
      where: {
        id: client.id,
      },
      data: {
        amount: newAmount,
      },
    })

    updateTag(`clients-${organization.slug}`)
    updateTag(`client-details-${client.id}`)

    return {
      success: true,
      data: {
        ...newOrder,
        total: Number(newOrder.total),
      },
    }
  })

  return result
}
