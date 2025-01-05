
import { Either, right } from "@/app/core/either";
import { ClientRepository } from "../repositories/client-repository";
import { Client } from "@/app/domain/enterprise/entities/client";

export interface FetchRecentClientUseCaseProps {
    page: number
}

type FetchRecentClientUseCaseResponse = Either<null, { clients: Client[] }>

export class FetchRecentClientUseCase {
    constructor(
        private clientRepository: ClientRepository,
    ) {}

    async execute({ page }: FetchRecentClientUseCaseProps): Promise<FetchRecentClientUseCaseResponse> {
        const clients = await this.clientRepository.findManyRecent({page})
        
        return right({ clients })
    }
}