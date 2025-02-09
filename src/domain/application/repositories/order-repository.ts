import { PaginationationParams } from "@/src/core/repositories/pagination-params"
import { Order } from "../../enterprise/entities/order"

export interface OrderRepository {
    create(order: Order): Promise<void>
    findById(id: string): Promise<Order | null>
    findOrdersByClient(clientId: string, params: PaginationationParams): Promise<Order[]>
    delete(order: Order): Promise<void>
}