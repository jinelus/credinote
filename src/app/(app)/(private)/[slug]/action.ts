'use server'

import { prisma } from "@/src/db/prisma"
import { withErrorHandling } from "@/src/utils/error-handler"
import type { PaginationParams } from "@/src/utils/types"

export async function getOrders({ page = 1, perPage = 10 }: PaginationParams) {
    const result = await withErrorHandling(async () => {
        const orders = await prisma.order.findMany({
            take: perPage,
            skip: (page - 1) * perPage,
        })
        

        const data =  await Promise.all(
            orders.map(async (order) => {
                const client = await prisma.client.findUnique({
                    where: {
                        id: order.clientId
                    },
                    select: {
                        name: true
                    }
                })
    
                return {
                    ...order,
                    total: Number(order.total),
                    clientName: client?.name
                }
            })
        )

        return {
            success: true,
            data,
        }
    })

    return result
}

export async function getClient(id: string) {
    const result = await prisma.client.findUnique({
        where: {
            id
        }
    })

    if (!result) {
        return {
            success: false,
            error: 'Client not found'
        }
    }

    return {
        success: true,
        data: {
            ...result,
            amount: Number(result.amount)
        }
    }
}