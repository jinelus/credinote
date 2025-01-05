import { Either, left, right } from "@/app/core/either"
import { RessourceNotFoundError } from "@/app/core/errors/ressource-not-found-error"
import { UserRepository } from "../repositories/user-repository"

export interface DeleteUserUseCaseProps {
    userId: string
}

type DeleteUserUseCaseResponse = Either<RessourceNotFoundError, unknown>

export class DeleteUserUseCase {
    constructor(
        private userRepository: UserRepository){}

    async execute({ userId }: DeleteUserUseCaseProps): Promise<DeleteUserUseCaseResponse> {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            return left(new RessourceNotFoundError())
        }

        await this.userRepository.delete(user)

        return right({})
    }
}