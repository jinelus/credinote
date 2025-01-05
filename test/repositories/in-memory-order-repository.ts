import { OrderRepository } from "@/app/domain/application/repositories/order-repository";
import { Order } from "@/app/domain/enterprise/entities/order";

export class InMemoryOrderRepository implements OrderRepository {
    public items: Order[] = []

    async create(order: Order): Promise<void> {
        this.items.push(order)
    }
    async findById(id: string): Promise<Order | null> {
        const order = this.items.find(item => item.id.toString() === id)
        if (!order) {
            return null
        }
        return order
    }
    async findAll(): Promise<Order[]> {
        return this.items
    }
    async delete(order: Order): Promise<void> {
        const orderIndex = this.items.findIndex(item => item.id === order.id)
        this.items.splice(orderIndex, 1)
    }
}