import { ClientRepository } from "../repositories/client-repository";
import { Client } from "@/src/domain/enterprise/entities/client";
import { Either, left, right } from "@/src/core/either";
import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error";
import { NotAllowedError } from "@/src/core/errors/not-allowed-error";

export interface EditClientUseCaseProps {
    clientId: string
    name: string
    cpf: string
    telephone?: string
    organizationId: string
}

type EditClientUseCaseResponse = Either<RessourceNotFoundError | NotAllowedError, { client: Client }>
export class EditClientUseCase {
    constructor(private clientRepository: ClientRepository){}

    async execute({
        name,
        cpf,
        telephone,
        organizationId,
        clientId
    }: EditClientUseCaseProps): Promise<EditClientUseCaseResponse> {
        const client = await this.clientRepository.findById(clientId)

        if (!client){
            return left(new RessourceNotFoundError())
        }

        if(client.organizationId.toString() !== organizationId){
            return left(new NotAllowedError())
        }

        client.name = name
        client.cpf = cpf
        client.telephone = telephone ?? ''

        await this.clientRepository.save(client)

        return right({ client })
    }
}