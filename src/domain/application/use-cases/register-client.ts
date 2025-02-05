
import { UniqueEntityId } from "@/src/core/entities/unique-entity-id";
import { ClientRepository } from "../repositories/client-repository";
import { Client } from "@/src/domain/enterprise/entities/client";
import { Either, right } from "@/src/core/either";

export interface RegisterClientUseCaseProps {
    name: string
    cpf: string
    telephone?: string
    businessId: string
}
type RegisterClientUseCaseResponse = Either<null, unknown>
export class RegisterClientUseCase {
    constructor(private clientRepository: ClientRepository){}

    async execute({
        name,
        cpf,
        telephone,
        businessId
    }: RegisterClientUseCaseProps): Promise<RegisterClientUseCaseResponse> {
        const client = Client.create({
            name,
            cpf,
            telephone,
            businessId: new UniqueEntityId(businessId)
        })

        await this.clientRepository.create(client)

        return right({})
    }
}