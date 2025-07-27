'use server'

import { prisma } from "@/src/db/prisma"
import { withErrorHandling } from "@/src/utils/error-handler"
import type { PaginationParams } from "@/src/utils/types"
import { PaymentMethod } from "@prisma/client"

export type Payment = {
  id: string
  amount: number
  method: PaymentMethod
  paidAt: Date
  clientId: string
  clientName: string
}

export interface FetchPaymentsParams {
  organizationId: string
  params?: PaginationParams
}

export interface CreatePaymentParams {
  amount: number
  method: PaymentMethod
  clientId: string
  paidAt: Date
  slug: string
}

export async function fetchPayments({ organizationId, params }: FetchPaymentsParams) {
  const result = await withErrorHandling(async () => {
    const page = params?.page || 1
    const perPage = params?.perPage || 10

    const payments = await prisma.payment.findMany({
      where: {
        client: {
          organizationId,
          name: {
            contains: params?.search,
            mode: 'insensitive',
          }
        },
      },
      include: {
        client: {
          select: {
            name: true
          }
        }
      },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: params?.orderBy === 'createdAt' ? {
        paidAt: params?.order
      } : params?.orderBy === 'amount' ? {
        amount: params?.order
      } : { paidAt: 'desc' }
    })

    const paymentsCount = await prisma.payment.count({
      where: {
          client: {
              name: {
                  contains: params?.search,
                  mode: 'insensitive',
              }
          },
      },
    })
    
    const maxPage = Math.ceil(paymentsCount / (perPage ?? 10))

    return {
      success: true,
      data: {
        payments: payments.map(payment => ({
          id: payment.id,
          amount: Number(payment.amount),
          method: payment.method,
          paidAt: payment.paidAt,
          clientId: payment.clientId,
          clientName: payment.client.name
        })),
        maxPage,
        totalItems: paymentsCount,
      }
    }
  })

  return result
}

export async function getPaymentById(id: string) {
  const result = await withErrorHandling(async () => {
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            name: true
          }
        }
      }
    })

    if (!payment) {
      return {
        success: false,
        error: 'Pagamento não encontrado'
      }
    }

    return {
      success: true,
      data: {
        payment: {
          id: payment.id,
          amount: Number(payment.amount),
          method: payment.method,
          paidAt: payment.paidAt,
          clientId: payment.clientId,
          clientName: payment.client.name
        }
      }
    }
  })

  return result
}

export async function createPayment({
  amount,
  method,
  clientId,
  paidAt,
  slug,
}: CreatePaymentParams) {
  const result = await withErrorHandling(
    async () => {

      const organization = await prisma.organization.findUnique({
        where: {
            slug
        }
    })

    if (!organization) {
        return {
            success: false,
            error: 'Organização não encontrada'
        }
    }

    const client = await prisma.client.findUnique({
      where: {
          id: clientId
      }
    })

    if (!client) {
        return {
            success: false,
            error: 'Cliente não encontrado'
        }
    }

    if (Number(client.amount) === 0) {
        return {
            success: false,
            error: "O saldo do cliente já está zerado, impossível subtrair."
        }
    }
    if (amount > Number(client.amount)) {
        return {
            success: false,
            error: "O valor do pagamento não pode ser maior que o saldo do cliente."
        }
    }

    const payment = await prisma.payment.create({
      data: {
        amount,
        method,
        clientId,
        paidAt
      },
      include: {
        client: {
          select: {
            name: true
          }
        }
      }
    })

    const newAmount = Number(client.amount) - amount

        await prisma.client.update({
            where: {
                id: client.id,
            },
            data: {
                amount: newAmount
            }
        })

    return {
      success: true,
      data: {
        payment: {
          id: payment.id,
          amount: Number(payment.amount),
          method: payment.method,
          paidAt: payment.paidAt,
          clientId: payment.clientId,
          clientName: payment.client.name
        }
      }
    }
  })

  return result
} 