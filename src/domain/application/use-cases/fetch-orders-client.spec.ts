import { InMemoryOrderRepository } from "@/test/repositories/in-memory-order-repository"
import { makeOrder } from "@/test/factories/make-order"
import { makeClient } from "@/test/factories/make-client"
import { FetchOrdersByClientUseCase } from "./fetch-orders-client"
import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"


describe('Fetch client orders', () => {
    let sut: FetchOrdersByClientUseCase
    let orderRepository: InMemoryOrderRepository
    let clientRepository: InMemoryClientRepository

    beforeEach(() => {
        orderRepository = new InMemoryOrderRepository()
        clientRepository = new InMemoryClientRepository()
        sut = new FetchOrdersByClientUseCase(orderRepository, clientRepository)
    })

    it('should be able to fetch client orders', async () => {
        const client = makeClient({})

        await clientRepository.create(client)

        const order1 = makeOrder({ idClient: client.id })
        const order2 = makeOrder({ idClient: client.id })

        await orderRepository.create(order1)
        await orderRepository.create(order2)

        const result = await sut.execute({
            clientId: client.id.toString(),
            page: 1
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({ orders: expect.arrayContaining([
            order1,
            order2
        ])})
    })

})