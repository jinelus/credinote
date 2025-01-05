import { RessourceNotFoundError } from "@/app/core/errors/ressource-not-found-error";
import { ClientRepository } from "../repositories/client-repository";
import { Client } from "@/app/domain/enterprise/entities/client";
import { Either, left, right } from "@/app/core/either";

export interface GetClientUseCaseProps {
    userId: string
    clientId: string
}

type GetClientUseCaseResponse = Either<RessourceNotFoundError, { client: Client }>

export class GetClientUseCase {
    constructor(
        private clientRepository: ClientRepository,
    ) {}

    async execute({ clientId, userId }: GetClientUseCaseProps): Promise<GetClientUseCaseResponse> {
        const client = await this.clientRepository.findById(clientId)

        if (!client) {
            return left(new RessourceNotFoundError())
        }

        if(client.businessId.toString() !== userId) {
            return left(new RessourceNotFoundError())
        }
        
        return right({ client })
    }
}