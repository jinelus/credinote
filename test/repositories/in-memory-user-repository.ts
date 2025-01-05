import { UserRepository } from "@/app/domain/application/repositories/user-repository";
import { User } from "@/app/domain/enterprise/entities/user";

export class InMemoryUserRepository implements UserRepository {

    public items: User[] = []
    async create(user: User): Promise<void> {
        this.items.push(user)
    }
    async save(user: User): Promise<void> {
        const userIndex = this.items.findIndex(item => item.id === user.id)
        this.items[userIndex] = user
    }
    async findById(id: string): Promise<User | null> {
        const user = this.items.find(item => item.id.toString() === id)

        if(!user){
            return null
        }

        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)

        if(!user){
            return null
        }

        return user
    }

    async delete(user: User): Promise<void> {
        const userIndex = this.items.findIndex(item => item.id === user.id)
        this.items.splice(userIndex, 1)
    }
    
}