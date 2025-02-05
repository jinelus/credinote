import { PaginationationParams } from "@/src/core/repositories/pagination-params"
import { PaymentRepository } from "@/src/domain/application/repositories/payment-repository"
import { Payment } from "@/src/domain/enterprise/entities/payment"

export class InMemoryPaymentRepository implements PaymentRepository {
    
    public items: Payment[] = []

    async create(payment: Payment): Promise<void> {
        this.items.push(payment)
    }

    async findById(id: string): Promise<Payment | null> {
        const payment = this.items.find(item => item.id.toString() === id)

        if(!payment){
            return null
        }

        return payment
    }
    async findPaymentsByClient(clientId: string, { page }: PaginationationParams): Promise<Payment[]> {
        const payments = this.items.filter(item => item.idClient.toString() === clientId)
        .slice((page - 1) * 20, page * 20)

        return payments
    }
    async delete(payment: Payment): Promise<void> {
        const paymentIndex = this.items.findIndex(item => item.id === payment.id)
        this.items.splice(paymentIndex, 1)
    }

}