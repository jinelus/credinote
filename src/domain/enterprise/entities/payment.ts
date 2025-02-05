import { Entity } from "@/src/core/entities/entity"
import { UniqueEntityId } from "@/src/core/entities/unique-entity-id"
import { Optional } from "@/src/core/types/optional"

export interface PaymentProps {
    idClient: UniqueEntityId
    paidAt: Date
    amount: number
    method: 'CASH' | 'CARD' | 'PIX'
}

export class Payment extends Entity<PaymentProps> {
    
    static create(props: Optional<PaymentProps, 'paidAt'>, id?: string) {
        const payment = new Payment({
            ...props,
            paidAt: props.paidAt ?? new Date()
        }, id)
        return payment
    }

    get idClient() {
        return this.props.idClient
    }

    get paidAt() {
        return this.props.paidAt
    }

    get amount() {
        return this.props.amount
    }

    set amount(amount: number) {
        this.props.amount = amount
    }

    get method() {
        return this.props.method
    }

    set method(method: 'CASH' | 'CARD' | 'PIX') {
        this.props.method = method
    }

}