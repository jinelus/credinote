import { Order } from "../../enterprise/entities/order"

export interface OrderRepository {
    create(order: Order): Promise<void>
    findById(id: string): Promise<Order | null>
    findAll(): Promise<Order[]>
    delete(order: Order): Promise<void>
}