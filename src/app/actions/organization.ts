'use server'

import { prisma } from "@/src/db/prisma"
import { withErrorHandling } from "@/src/utils/error-handler"

export interface CreateOrganizationParams {
    name: string
}

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

export async function createOrganization(params: CreateOrganizationParams) {
    const { name } = params

    const result = await withErrorHandling(async () => {
        const organization = await prisma.organization.create({
            data: {
                name,
                slug: generateSlug(name)
            }
        })
    
        return {
            success: true,
            data: {
                organization,
            }
        }
    })

    return result
}

export async function getOrganizationBySlug(slug: string) {
    const result = await prisma.organization.findUnique({
            where: {
                slug
            }
        })

    return result
}

export async function getUserWithOrganization(email: string) {
    const result = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                organization: {
                    select: {
                        slug: true
                    }
                }
            }
            
        })

    return result
}