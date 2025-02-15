
import { Either, right } from "@/src/core/either";
import { ClientRepository } from "../repositories/client-repository";
import { Client } from "@/src/domain/enterprise/entities/client";

export interface FetchRecentClientUseCaseProps {
    userId: string
    page: number
}

type FetchRecentClientUseCaseResponse = Either<null, { clients: Client[] }>

export class FetchRecentClientUseCase {
    constructor(
        private clientRepository: ClientRepository,
    ) {}

    async execute({ page, userId }: FetchRecentClientUseCaseProps): Promise<FetchRecentClientUseCaseResponse> {
        const clients = await this.clientRepository.findManyRecent(userId, {page})
        
        return right({ clients })
    }
}