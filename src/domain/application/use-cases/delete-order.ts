import { Either, left, right } from "@/src/core/either"
import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error"
import { OrderRepository } from "../repositories/order-repository"

export interface DeleteOrderUseCaseProps {
    orderId: string
}

type DeleteOrderUseCaseResponse = Either<RessourceNotFoundError, unknown>

export class DeleteOrderUseCase {
    constructor(
        private orderRepository: OrderRepository){}

    async execute({ orderId }: DeleteOrderUseCaseProps): Promise<DeleteOrderUseCaseResponse> {
        const order = await this.orderRepository.findById(orderId)

        if (!order) {
            return left(new RessourceNotFoundError())
        }

        await this.orderRepository.delete(order)

        return right({})
    }
}