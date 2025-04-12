
import { UniqueEntityId } from "@/src/core/entities/unique-entity-id";
import { ClientRepository } from "../repositories/client-repository";
import { Client } from "@/src/domain/enterprise/entities/client";
import { Either, left, right } from "@/src/core/either";
import type { UserRepository } from "../repositories/user-repository";
import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error";

export interface RegisterClientUseCaseProps {
    name: string
    cpf: string
    telephone?: string
    organizationId: string
}
type RegisterClientUseCaseResponse = Either<null | RessourceNotFoundError, unknown>
export class RegisterClientUseCase {
    constructor(
        private clientRepository: ClientRepository,
        private organizationRepository: UserRepository
    ){}

    async execute({
        name,
        cpf,
        telephone,
        organizationId
    }: RegisterClientUseCaseProps): Promise<RegisterClientUseCaseResponse> {

        const organization = await this.organizationRepository.findById(organizationId)

        if (!organization) {
            return left(new RessourceNotFoundError())
        }

        const client = Client.create({
            name,
            cpf,
            telephone,
            organizationId: new UniqueEntityId(organizationId)
        })

        await this.clientRepository.create(client)

        return right({})
    }
}