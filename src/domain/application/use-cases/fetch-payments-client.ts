import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error";
import { Either, left, right } from "@/src/core/either";
import { ClientRepository } from "../repositories/client-repository";
import { Payment } from "../../enterprise/entities/payment";
import { PaymentRepository } from "../repositories/payment-repository";

export interface FetchPaymentsByClientUseCaseProps {
    clientId: string
    page: number
}

type FetchPaymentsByClientUseCaseResponse = Either<RessourceNotFoundError, { payments: Payment[] }>

export class FetchPaymentsByClientUseCase {
    constructor(
        private paymentRepository: PaymentRepository,
        private clientRepository: ClientRepository
    ) {}

    async execute({ clientId, page }: FetchPaymentsByClientUseCaseProps): Promise<FetchPaymentsByClientUseCaseResponse> {
        const client = await this.clientRepository.findById(clientId)

        if (!client) {
            return left(new RessourceNotFoundError())
        }

        const payments = await this.paymentRepository.findPaymentsByClient(clientId, {page})

        return right({ payments })
    }
}