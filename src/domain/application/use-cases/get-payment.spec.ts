import { InMemoryPaymentRepository } from "@/test/repositories/in-memory-payment-repository"
import { GetPaymentUseCase } from "./get-payment"
import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error"
import { makePayment } from "@/test/factories/make-payment"


describe('Get payment', () => {
    let sut: GetPaymentUseCase
    let paymentRepository: InMemoryPaymentRepository

    beforeEach(() => {
        paymentRepository = new InMemoryPaymentRepository()
        sut = new GetPaymentUseCase(paymentRepository)
    })

    it('should be able to get a payment', async () => {

        const payment = makePayment({})

        await paymentRepository.create(payment)

        const result = await sut.execute({
            paymentId: payment.id.toString()
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({ payment })
    })

    it('should not be able to get a payment', async () => {
        const payment = makePayment({})

        await paymentRepository.create(payment)

        const result = await sut.execute({
            paymentId: 'invalid-id'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(RessourceNotFoundError)
    })

})