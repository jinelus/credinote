import { UniqueEntityId } from "@/src/core/entities/unique-entity-id";
import { Client, ClientProps } from "@/src/domain/enterprise/entities/client";
import { faker } from "@faker-js/faker";

export function makeClient(override: Partial<ClientProps>, id?: string) {
    const client = Client.create({
        name: faker.person.fullName(),
        cpf: faker.number.toString(),
        telephone: faker.phone.number(),
        organizationId: new UniqueEntityId(),
        ...override
    }, id)

    return client
}