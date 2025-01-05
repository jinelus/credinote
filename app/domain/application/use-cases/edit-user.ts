import { UserRepository } from "../repositories/user-repository";
import { User } from "@/app/domain/enterprise/entities/user";
import { Either, left, right } from "@/app/core/either";
import { RessourceNotFoundError } from "@/app/core/errors/ressource-not-found-error";
import { NotAllowedError } from "@/app/core/errors/not-allowed-error";
import { hash } from "bcryptjs";

export interface EditUserUseCaseProps {
    userId: string
    name: string
    email: string
    password: string
}

type EditUserUseCaseResponse = Either<RessourceNotFoundError | NotAllowedError, { user: User }>
export class EditUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute({
        name,
        email,
        password,
        userId
    }: EditUserUseCaseProps): Promise<EditUserUseCaseResponse> {
        const user = await this.userRepository.findById(userId)

        if (!user){
            return left(new RessourceNotFoundError())
        }

        user.name = name
        user.email = email
        user.password = await hash(password, 8)

        await this.userRepository.save(user)

        return right({ user })
    }
}