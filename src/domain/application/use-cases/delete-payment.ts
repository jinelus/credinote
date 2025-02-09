import { Either, left, right } from "@/src/core/either"
import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error"
import { PaymentRepository } from "../repositories/payment-repository"

export interface DeletePaymentUseCaseProps {
    paymentId: string
}

type DeletePaymentUseCaseResponse = Either<RessourceNotFoundError, unknown>

export class DeletePaymentUseCase {
    constructor(
        private paymentRepository: PaymentRepository){}

    async execute({ paymentId }: DeletePaymentUseCaseProps): Promise<DeletePaymentUseCaseResponse> {
        const payment = await this.paymentRepository.findById(paymentId)

        if (!payment) {
            return left(new RessourceNotFoundError())
        }

        await this.paymentRepository.delete(payment)

        return right({})
    }
}