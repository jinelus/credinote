import { Either, left, right } from "@/app/core/either"
import { OrderRepository } from "../repositories/order-repository"
import { Order } from "../../enterprise/entities/order"
import { UniqueEntityId } from "@/app/core/entities/unique-entity-id"
import { ClientRepository } from "../repositories/client-repository"
import { RessourceNotFoundError } from "@/app/core/errors/ressource-not-found-error"

export interface CreateOrderUseCaseProps {
        idClient: string
        total: number
}

type CreateOrderUseCaseResponse = Either<RessourceNotFoundError, unknown>

export class CreateOrderUseCase {
    constructor(private orderRepository: OrderRepository, private clientRepository: ClientRepository){}

    async execute({ idClient, total }: CreateOrderUseCaseProps): Promise<CreateOrderUseCaseResponse> {

        const client = await this.clientRepository.findById(idClient)

        if (!client) {
            return left(new RessourceNotFoundError())
        }

        const order = Order.create({ 
            idClient: new UniqueEntityId(idClient),  
            total, 
        })

        await this.orderRepository.create(order)

        client.amount += total

        await this.clientRepository.save(client)

        return right({})
    }
}