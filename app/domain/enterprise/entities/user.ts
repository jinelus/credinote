import { Entity } from "@/app/core/entities/entity"
import { Optional } from "@/app/core/types/optional"


export interface UserProps {
    name: string
    email: string
    password: string
    createdAt: Date
    role: 'ADMIN' | 'USER'
}

export class User extends Entity<UserProps> {
    
    static create(props: Optional<UserProps, 'createdAt' | 'role'>, id?: string) {
        const user = new User({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            role: props.role ?? 'USER'
        }, id)
        return user
    }

    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }
    get email() {
        return this.props.email
    }

    set email(email: string) {
        this.props.email = email
    }
    get password() {
        return this.props.password
    }

    set password(password: string) {
        this.props.password = password
    }

    get createdAt() {
        return this.props.createdAt
    }
    
    get role() {
        return this.props.role
    }

    set role(role: 'ADMIN' | 'USER') {
        this.props.role = role
    }
}