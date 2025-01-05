import { Entity } from "@/app/core/entities/entity"
import { UniqueEntityId } from "@/app/core/entities/unique-entity-id"
import { Optional } from "@/app/core/types/optional"

export interface OrderProps {
    idClient: UniqueEntityId
    date: Date
    total: number
    status: 'PAID' | 'UNPAID'
    datePaid?: Date
}

export class Order extends Entity<OrderProps> {
    
    static create(props: Optional<OrderProps, 'date'>, id?: string) {
        const order = new Order({
            ...props,
            date: props.date ?? new Date()
        }, id)
        return order
    }

    get idClient() {
        return this.props.idClient
    }

    get date() {
        return this.props.date
    }

    set date(date: Date) {
        this.props.date = date
    }

    get total() {
        return this.props.total
    }

    get status() {
        return this.props.status
    }

    set status(status: 'PAID' | 'UNPAID') {
        this.props.status = status
    }
}