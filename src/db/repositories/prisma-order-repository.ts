import { OrderRepository } from "@/src/domain/application/repositories/order-repository";
import { Order } from "@/src/domain/enterprise/entities/order";
import { prisma } from "../prisma-service";
import { PrismaOrderMapper } from "../mappers/prisma-order-mapper";
import { PaginationationParams } from "@/src/core/repositories/pagination-params";

export class PrismaOrderRepository implements OrderRepository {
    async create(order: Order): Promise<void> {
        await prisma.order.create({
            data: PrismaOrderMapper.toDatabase(order)
        })
    }
    async findById(id: string): Promise<Order | null> {
        const order = await prisma.order.findUnique({
            where: {
                id
            }
        })

        if(!order) return null  

        return PrismaOrderMapper.toDomain(order)
    }
    async findOrdersByClient(clientId: string, { page }: PaginationationParams): Promise<Order[]> {
        const orders = await prisma.order.findMany({
            where: {
                idClient: clientId
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return orders.map(PrismaOrderMapper.toDomain)
    }
    async delete(order: Order): Promise<void> {
        await prisma.order.delete({
            where: {
                id: order.id.toString()
            }
        })
    }
    
}