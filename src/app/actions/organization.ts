'use server'

import { prisma } from "@/src/db/prisma"
import { withErrorHandling } from "@/src/utils/error-handler"

export interface CreateOrganizationParams {
    name: string
    email: string
    password: string
}

export async function createOrganization(params: CreateOrganizationParams) {
    const { name, email, password } = params

    const result = await withErrorHandling(async () => {
        const organization = await prisma.organization.create({
            data: {
                name,
                email,
                password,
                slug: name.toLowerCase().replace(/ /g, '-')
            }
        })
    
        return organization
    })

    return result
}

export async function getOrganizationBySlug(slug: string) {
    const result = await withErrorHandling(async () => {
        const organization = await prisma.organization.findUnique({
            where: {
                slug
            }
        })

        return organization
    })

    return result
}
