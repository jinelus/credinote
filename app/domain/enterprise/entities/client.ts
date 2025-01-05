import { Entity } from "@/app/core/entities/entity"
import { UniqueEntityId } from "@/app/core/entities/unique-entity-id"
import { Optional } from "@/app/core/types/optional"


export interface ClientProps {
    name: string
    cpf: string
    telephone?: string
    createdAt: Date
    businessId: UniqueEntityId
}

export class Client extends Entity<ClientProps> {
    
    static create(props: Optional<ClientProps, 'createdAt'>, id?: string) {
        const client = new Client({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return client
    }

    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get cpf() {
        return this.props.cpf
    }

    set cpf(cpf: string) {
        this.props.cpf = cpf
    }

    get telephone() {
        return this.props.telephone || ''
    }

    set telephone(telephone: string) {
        this.props.telephone = telephone
    }

    get createdAt() {
        return this.props.createdAt
    }

    get businessId() {
        return this.props.businessId.toString()
    }

    set businessId(businessId: string) {
        this.props.businessId = new UniqueEntityId(businessId)
    }

}