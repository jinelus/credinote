import { Either, left, right } from "@/src/core/either"
import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error"
import { PaymentRepository } from "../repositories/payment-repository"
import { ClientRepository } from "../repositories/client-repository"
import { UniqueEntityId } from "@/src/core/entities/unique-entity-id"
import { Payment } from "../../enterprise/entities/payment"
import { AmountInvalidError } from "./errors/amount-invalid-error"

export interface MakePaymentUseCaseProps {
    idClient: string
    amount: number
    method: 'CASH' | 'CARD' | 'PIX'
}

type MakePaymentUseCaseResponse = Either<RessourceNotFoundError | AmountInvalidError, unknown>

export class MakePaymentUseCase {
    constructor(
        private paymentRepository: PaymentRepository,
        private clientRepository: ClientRepository
    ){}

    async execute({ idClient, amount, method }: MakePaymentUseCaseProps): Promise<MakePaymentUseCaseResponse> {

        const client = await this.clientRepository.findById(idClient)

        if (!client) {
            return left(new RessourceNotFoundError())
        }

        if (client.amount < amount || client.amount === 0 || amount <= 0) {
            return left(new AmountInvalidError())
        }

        const payment = Payment.create({ idClient: new UniqueEntityId(idClient), amount, method })

        await this.paymentRepository.create(payment)

        client.amount -= amount

        await this.clientRepository.save(client)

        return right({})
    }
}