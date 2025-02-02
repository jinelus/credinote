import { UniqueEntityId } from "@/app/core/entities/unique-entity-id";
import { Client } from "@/app/domain/enterprise/entities/client";
import { Prisma, Client as PrismaClient } from "@prisma/client";

export class PrismaClientMapper {

    static toDomain(client: PrismaClient): Client{

        return Client.create({
            name: client.name,
            cpf: client.cpf,
            telephone: client.telephone,
            businessId: new UniqueEntityId(client.businessId),
            amount: client.amount
        }, client.id)
    }

    static toDatabase(client: Client): Prisma.ClientUncheckedCreateInput {

        return {
            id: client.id.toString(),
            name: client.name,
            cpf: client.cpf,
            telephone: client.telephone,
            businessId: client.businessId.toString(),
            amount: client.amount
        }
    }
}