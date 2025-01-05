import { InMemoryOrderRepository } from "@/test/repositories/in-memory-order-repository"
import { CreateOrderUseCase } from "./create-order"
import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"
import { makeClient } from "@/test/factories/make-client"

describe('Create order use case', () => {
    let sut: CreateOrderUseCase
    let orderRepository: InMemoryOrderRepository
    let clientRepository: InMemoryClientRepository

    beforeEach(() => {
        orderRepository = new InMemoryOrderRepository()
        clientRepository = new InMemoryClientRepository()
        sut = new CreateOrderUseCase(orderRepository, clientRepository)
    })

    it('should be able to create a order', async () => {
        const client = makeClient({})

        await clientRepository.create(client)

        const response = await sut.execute({ idClient: client.id.toString(), total: 100 })

        expect(response.isRight()).toBe(true)
        expect(orderRepository.items).toHaveLength(1)
        expect(clientRepository.items[0].amount).toEqual(100)
    })
})