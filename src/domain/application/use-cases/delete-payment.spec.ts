import { InMemoryPaymentRepository } from "@/test/repositories/in-memory-payment-repository";
import { DeletePaymentUseCase } from "./delete-payment";
import { makePayment } from "@/test/factories/make-payment";
import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error";


describe('Delete payment use case', () => {
    let sut: DeletePaymentUseCase
    let paymentRepository: InMemoryPaymentRepository

    beforeEach(() => {
        paymentRepository = new InMemoryPaymentRepository()
        sut = new DeletePaymentUseCase(paymentRepository)
    })

    it('should be able to delete a payment', async () => {

        const payment = makePayment({})
        await paymentRepository.create(payment)

        const result = await sut.execute({
            paymentId: payment.id.toString(),
        })

        expect(result.isRight()).toBe(true)
        expect(paymentRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a payment', async () => {

        const payment = makePayment({})
        await paymentRepository.create(payment)

        const result = await sut.execute({
            paymentId: 'invalid-id',
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(RessourceNotFoundError)
    })
});