import { PaginationationParams } from "@/app/core/repositories/pagination-params";
import { ClientRepository, FetchClientProps } from "@/app/domain/application/repositories/client-repository";
import { Client } from "@/app/domain/enterprise/entities/client";
import { prisma } from "../prisma-service";
import { PrismaClientMapper } from "../mappers/prisma-client-mapper";

export class PrismaClientRepository implements ClientRepository {

    async create(client: Client): Promise<void> {
        await prisma.client.create({
            data: PrismaClientMapper.toDatabase(client)
        })
    }
    async save(client: Client): Promise<void> {
        await prisma.client.update({
            where: {
                id: client.id.toString()
            },
            data: PrismaClientMapper.toDatabase(client)
        })
    }
    async findById(id: string): Promise<Client | null> {
        const client = await prisma.client.findUnique({
            where: {
                id
            }
        })

        if(!client) return null

        return PrismaClientMapper.toDomain(client)
    }
    async findManyRecent(userId: string, { page }: PaginationationParams): Promise<Client[]> {
        const clients = await prisma.client.findMany({
            where: {
                businessId: userId
            },
            take: 20,
            skip: (page - 1) * 20,
            orderBy: {
                createdAt: "desc"
            }
        })

        return clients.map(PrismaClientMapper.toDomain)
    }
    async findManyByName({ query, userId }: FetchClientProps): Promise<Client[]> {
        const clients = await prisma.client.findMany({
            where: {
                businessId: userId,
                name: {
                    contains: query,
                    mode: "insensitive"
                }
            },
            take: 20,
            orderBy: {
                createdAt: "desc"
            }
        })

        return clients.map(PrismaClientMapper.toDomain)
    }
    async delete(client: Client): Promise<void> {
        await prisma.client.delete({
            where: {
                id: client.id.toString()
            }
        })
    }
    
}