'use server'

import { prisma } from "@/src/db/prisma"
import { withErrorHandling } from "@/src/utils/error-handler"

export interface AddOrderParams {
    slug: string
    clientId: string
    total: number
}

export async function addOrder({ slug, clientId, total }: AddOrderParams) {

    const result = await withErrorHandling(async () => {
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

        const client = await prisma.client.findFirst({
            where: {
                organizationId: organization.id,
                id: clientId
            }
        })

        if (!client) {
            return {
                success: false,
                error: 'Cliente não encontrado'
            }
        }

        const newOrder = await prisma.order.create({
            data: {
                clientId,
                total,
            }
        })

        const newAmount = Number(client.amount) + total

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
                ...newOrder,
                total: Number(newOrder.total)
            }
        }
    })

    return result
}
