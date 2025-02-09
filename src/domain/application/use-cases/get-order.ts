import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error";
import { Either, left, right } from "@/src/core/either";
import { OrderRepository } from "../repositories/order-repository";
import { Order } from "../../enterprise/entities/order";

export interface GetOrderUseCaseProps {
    orderId: string
}

type GetOrderUseCaseResponse = Either<RessourceNotFoundError, { order: Order }>

export class GetOrderUseCase {
    constructor(
        private orderRepository: OrderRepository,
    ) {}

    async execute({ orderId }: GetOrderUseCaseProps): Promise<GetOrderUseCaseResponse> {
        const order = await this.orderRepository.findById(orderId)

        if (!order) {
            return left(new RessourceNotFoundError())
        }
        
        return right({ order })
    }
}