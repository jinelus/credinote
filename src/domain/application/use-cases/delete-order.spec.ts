import { InMemoryOrderRepository } from "@/test/repositories/in-memory-order-repository";
import { DeleteOrderUseCase } from "./delete-order";
import { makeOrder } from "@/test/factories/make-order";
import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error";


describe('Delete order use case', () => {
    let sut: DeleteOrderUseCase
    let orderRepository: InMemoryOrderRepository

    beforeEach(() => {
        orderRepository = new InMemoryOrderRepository()
        sut = new DeleteOrderUseCase(orderRepository)
    })

    it('should be able to delete a order', async () => {

        const order = makeOrder({})
        await orderRepository.create(order)

        const result = await sut.execute({
            orderId: order.id.toString(),
        })

        expect(result.isRight()).toBe(true)
        expect(orderRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a order', async () => {

        const order = makeOrder({})
        await orderRepository.create(order)

        const result = await sut.execute({
            orderId: 'invalid-id',
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(RessourceNotFoundError)
    })
});