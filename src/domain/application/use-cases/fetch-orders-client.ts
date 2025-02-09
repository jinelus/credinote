import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error";
import { Either, left, right } from "@/src/core/either";
import { OrderRepository } from "../repositories/order-repository";
import { Order } from "../../enterprise/entities/order";
import { ClientRepository } from "../repositories/client-repository";

export interface FetchOrdersByClientUseCaseProps {
    clientId: string
    page: number
}

type FetchOrdersByClientUseCaseResponse = Either<RessourceNotFoundError, { orders: Order[] }>

export class FetchOrdersByClientUseCase {
    constructor(
        private orderRepository: OrderRepository,
        private clientRepository: ClientRepository
    ) {}

    async execute({ clientId, page }: FetchOrdersByClientUseCaseProps): Promise<FetchOrdersByClientUseCaseResponse> {
        const client = await this.clientRepository.findById(clientId)

        if (!client) {
            return left(new RessourceNotFoundError())
        }

        const orders = await this.orderRepository.findOrdersByClient(clientId, {page})

        return right({ orders })
    }
}