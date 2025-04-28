import { db } from "@/db/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const searchTerm = searchParams.get('search')

        const where = searchTerm ? {
            OR: [
                { name: { contains: searchTerm, mode: 'insensitive' } },
                { cpf: { contains: searchTerm } },
                { phone: { contains: searchTerm } }
            ]
        } : {}

        const clients = await db.client.findMany({
            where,
            select: {
                id: true,
                name: true,
                cpf: true,
                phone: true
            },
            orderBy: {
                name: 'asc'
            }
        })

        return NextResponse.json(clients)
    } catch (error) {
        console.error('Error fetching clients:', error)
        return NextResponse.json(
            { error: 'Failed to fetch clients' },
            { status: 500 }
        )
    }
}