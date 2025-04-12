import { Entity } from "@/src/core/entities/entity"
import { UniqueEntityId } from "@/src/core/entities/unique-entity-id"
import { Optional } from "@/src/core/types/optional"

export interface OrderProps {
    idClient: UniqueEntityId
    description: string
    date: Date
    total: number
    status: 'PAID' | 'UNPAID'
    datePaid?: Date
}

export class Order extends Entity<OrderProps> {
    
    static create(props: Optional<OrderProps, 'date' | 'status' | 'description'>, id?: string) {
        const order = new Order({
            ...props,
            date: props.date ?? new Date(),
            status: props.status ?? 'UNPAID',
            description: props.description ?? ''
        }, id)
        return order
    }

    get idClient() {
        return this.props.idClient
    }

    set idClient(idClient: UniqueEntityId) {
        this.props.idClient = idClient
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

    set total(total: number) {
        this.props.total = total
    }

    get status() {
        return this.props.status
    }

    set status(status: 'PAID' | 'UNPAID') {
        this.props.status = status
    }

    get datePaid(): Date | undefined {
        return this.props.datePaid
    }

    set datePaid(datePaid: Date) {
        this.props.datePaid = datePaid
    }

    get description() {
        return this.props.description
    }   

    set description(description: string) {
        this.props.description = description
    }
    
}