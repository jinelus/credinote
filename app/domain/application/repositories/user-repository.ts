import { User } from "@/domain/enterprise/entities/user";

export interface UserRepository {
    create(user: User): Promise<void>
    save(user: User): Promise<void>
    findById(id: string): Promise<User | null> 
}