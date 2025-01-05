
import { Either, right } from "@/app/core/either";
import { ClientRepository } from "../repositories/client-repository";
import { Client } from "@/app/domain/enterprise/entities/client";

export interface FetchClientByNameUseCaseProps {
    userId: string
    query: string
}

type FetchClientByNameUseCaseResponse = Either<null, { clients: Client[] }>

export class FetchClientByNameUseCase {
    constructor(
        private clientRepository: ClientRepository,
    ) {}

    async execute({ userId, query }: FetchClientByNameUseCaseProps): Promise<FetchClientByNameUseCaseResponse> {
        const clients = await this.clientRepository.findManyByName({userId, query})
        
        return right({ clients })
    }
}