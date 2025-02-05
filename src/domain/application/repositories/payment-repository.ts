import { PaginationationParams } from "@/src/core/repositories/pagination-params";
import { Payment } from "../../enterprise/entities/payment";

export interface PaymentRepository {
    create(payment: Payment): Promise<void>
    findById(id: string): Promise<Payment | null>
    findPaymentsByClient(clientId: string, params: PaginationationParams): Promise<Payment[]>
    delete(payment: Payment): Promise<void>
}