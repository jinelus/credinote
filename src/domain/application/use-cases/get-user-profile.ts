import { Either, left, right } from "@/src/core/either";
import { UserRepository } from "../repositories/user-repository";
import { User } from "@/src/domain/enterprise/entities/user";
import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error";

export interface GetUserProfileUseCaseProps {
    id: string
}

type GetUserProfileUseCaseResponse = Either<RessourceNotFoundError, { user: User }>

export class GetUserProfileUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ id }: GetUserProfileUseCaseProps): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.userRepository.findById(id)

        if (!user) {
            return left(new RessourceNotFoundError())
        }
        
        return right({ user })
    }
}