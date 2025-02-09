import { UniqueEntityId } from "@/src/core/entities/unique-entity-id";
import { Order, OrderProps } from "@/src/domain/enterprise/entities/order";
import { faker } from "@faker-js/faker";

export function makeOrder(override: Partial<OrderProps>, id?: string) {
    const order = Order.create({
        idClient: new UniqueEntityId(),
        total: faker.number.int(),
        ...override
    }, id)

    return order
}