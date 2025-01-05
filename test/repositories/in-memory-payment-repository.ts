import { PaymentRepository } from "@/app/domain/application/repositories/payment-repository";
import { Payment } from "@/app/domain/enterprise/entities/payment";

export class InMemoryPaymentRepository implements PaymentRepository {
    public items: Payment[] = []

    async create(payment: Payment): Promise<void> {
        this.items.push(payment)
    }

}