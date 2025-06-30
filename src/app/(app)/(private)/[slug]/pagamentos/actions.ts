'use server'

import { prisma } from "@/src/db/prisma"
import { withErrorHandling } from "@/src/utils/error-handler"
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
  userId: string
  params: {
    page?: number
    sortBy?: string
  }
}

export interface CreatePaymentParams {
  amount: number
  method: PaymentMethod
  clientId: string
  paidAt: Date
}

export async function fetchPayments({ userId, params }: FetchPaymentsParams) {
  const result = await withErrorHandling(async () => {
    const page = params.page || 1
    const pageSize = 10
    const skip = (page - 1) * pageSize

    const payments = await prisma.payment.findMany({
      where: {
        client: {
          userId
        }
      },
      include: {
        client: {
          select: {
            name: true
          }
        }
      },
      skip,
      take: pageSize,
      orderBy: {
        paidAt: 'desc'
      }
    })

    return payments.map(payment => ({
      id: payment.id,
      amount: Number(payment.amount),
      method: payment.method,
      paidAt: payment.paidAt,
      clientId: payment.clientId,
      clientName: payment.client.name
    }))
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
      return null
    }

    return {
      id: payment.id,
      amount: Number(payment.amount),
      method: payment.method,
      paidAt: payment.paidAt,
      clientId: payment.clientId,
      clientName: payment.client.name
    }
  })

  return result
}

export async function createPayment({
  amount,
  method,
  clientId,
  paidAt
}: CreatePaymentParams) {
  const result = await withErrorHandling(async () => {
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

    return {
      id: payment.id,
      amount: Number(payment.amount),
      method: payment.method,
      paidAt: payment.paidAt,
      clientId: payment.clientId,
      clientName: payment.client.name
    }
  })

  return result
} 