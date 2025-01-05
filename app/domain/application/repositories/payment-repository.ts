import { Payment } from "../../enterprise/entities/payment";

export interface PaymentRepository {
    create(payment: Payment): Promise<void>
}