import { Either, left, right } from "@/app/core/either"
import { NotAllowedError } from "@/app/core/errors/not-allowed-error"
import { RessourceNotFoundError } from "@/app/core/errors/ressource-not-found-error"
import { ClientRepository } from "../repositories/client-repository"

export interface DeleteClientUseCaseProps {
    clientId: string
    userId: string
}

type DeleteClientUseCaseResponse = Either<RessourceNotFoundError | NotAllowedError, unknown>

export class DeleteClientUseCase {
    constructor(
        private clientRepository: ClientRepository){}

    async execute({ clientId, userId }: DeleteClientUseCaseProps): Promise<DeleteClientUseCaseResponse> {
        const client = await this.clientRepository.findById(clientId)

        if (!client) {
            return left(new RessourceNotFoundError())
        }

        if(client.businessId.toString() !== userId) {
            return left(new NotAllowedError())
        }

        await this.clientRepository.delete(client)

        return right({})
    }
}