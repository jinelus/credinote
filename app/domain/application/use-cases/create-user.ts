import { User } from "@/app/domain/enterprise/entities/user";
import { UserRepository } from "../repositories/user-repository";
import { hash } from "bcryptjs";

export interface CreateUserUseCaseProps {
    name: string
    email: string
    password: string
}
export class CreateUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute({
        name,
        email,
        password
    }: CreateUserUseCaseProps) {
        const user = User.create({
            name, 
            email, 
            password: await hash(password, 8),
        })

        await this.userRepository.create(user)
    }
}