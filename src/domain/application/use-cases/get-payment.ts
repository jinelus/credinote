import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error";
import { Either, left, right } from "@/src/core/either";
import { PaymentRepository } from "../repositories/payment-repository";
import { Payment } from "../../enterprise/entities/payment";

export interface GetPaymentUseCaseProps {
    paymentId: string
}

type GetPaymentUseCaseResponse = Either<RessourceNotFoundError, { payment: Payment }>

export class GetPaymentUseCase {
    constructor(
        private paymentRepository: PaymentRepository,
    ) {}

    async execute({ paymentId }: GetPaymentUseCaseProps): Promise<GetPaymentUseCaseResponse> {
        const payment = await this.paymentRepository.findById(paymentId)

        if (!payment) {
            return left(new RessourceNotFoundError())
        }
        
        return right({ payment })
    }
}