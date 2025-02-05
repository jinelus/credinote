import { User } from "@/src/domain/enterprise/entities/user";
import { UserRepository } from "../repositories/user-repository";
import { hash } from "bcryptjs";
import { Either, right } from "@/src/core/either";

export interface CreateUserUseCaseProps {
    name: string
    email: string
    password: string
}

type CreateUserUseCaseResponse = Either<null, unknown>
export class CreateUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute({
        name,
        email,
        password
    }: CreateUserUseCaseProps): Promise<CreateUserUseCaseResponse> {
        const user = User.create({
            name, 
            email, 
            password: await hash(password, 8),
        })

        await this.userRepository.create(user)

        return right({})
    }
}