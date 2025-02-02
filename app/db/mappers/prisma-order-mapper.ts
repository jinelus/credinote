import { UniqueEntityId } from "@/app/core/entities/unique-entity-id";
import { Order } from "@/app/domain/enterprise/entities/order";
import { Prisma, Order as PrismaOrder } from "@prisma/client";
export class PrismaOrderMapper {
    static toDomain(raw: PrismaOrder): Order {
        return Order.create({
            idClient: new UniqueEntityId(raw.idClient),
            total: raw.total,
            status: raw.status,
            date: raw.date,
            datePaid: raw.datePaid
        }, raw.id)
    }

    static toDatabase(order: Order): Prisma.OrderUncheckedCreateInput {
        return {
            id: order.id.toString(),
            idClient: order.idClient.toString(),
            total: order.total,
            status: order.status,
            date: order.date,
        }
    }
}