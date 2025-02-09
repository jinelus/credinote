import { UniqueEntityId } from "@/src/core/entities/unique-entity-id";
import { Payment, PaymentProps } from "@/src/domain/enterprise/entities/payment";
import { faker } from "@faker-js/faker";

export function makePayment(override: Partial<PaymentProps>, id?: string) {
    const payment = Payment.create({
        idClient: new UniqueEntityId(),
        amount: faker.number.int(),
        method: 'CASH',
        ...override
    }, id)

    return payment
}