import { InMemoryOrderRepository } from "@/test/repositories/in-memory-order-repository"
import { GetOrderUseCase } from "./get-order"
import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error"
import { makeOrder } from "@/test/factories/make-order"


describe('Get order', () => {
    let sut: GetOrderUseCase
    let orderRepository: InMemoryOrderRepository

    beforeEach(() => {
        orderRepository = new InMemoryOrderRepository()
        sut = new GetOrderUseCase(orderRepository)
    })

    it('should be able to get a order', async () => {

        const order = makeOrder({})

        await orderRepository.create(order)

        const result = await sut.execute({
            orderId: order.id.toString()
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({ order })
    })

    it('should not be able to get a order', async () => {
        const order = makeOrder({})

        await orderRepository.create(order)

        const result = await sut.execute({
            orderId: 'invalid-id'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(RessourceNotFoundError)
    })

})