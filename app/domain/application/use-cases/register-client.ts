
import { UniqueEntityId } from "@/app/core/entities/unique-entity-id";
import { ClientRepository } from "../repositories/client-repository";
import { Client } from "@/app/domain/enterprise/entities/client";

export interface RegisterClientUseCaseProps {
    name: string
    cpf: string
    telephone?: string
    businessId: string
}
export class RegisterClientUseCase {
    constructor(private clientRepository: ClientRepository){}

    async execute({
        name,
        cpf,
        telephone,
        businessId
    }: RegisterClientUseCaseProps) {
        const client = Client.create({
            name,
            cpf,
            telephone,
            businessId: new UniqueEntityId(businessId)
        })

        await this.clientRepository.create(client)
    }
}