import { InMemoryPaymentRepository } from "@/test/repositories/in-memory-payment-repository"
import { makePayment } from "@/test/factories/make-payment"
import { makeClient } from "@/test/factories/make-client"
import { FetchPaymentsByClientUseCase } from "./fetch-payments-client"
import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"


describe('Fetch client payments', () => {
    let sut: FetchPaymentsByClientUseCase
    let paymentRepository: InMemoryPaymentRepository
    let clientRepository: InMemoryClientRepository

    beforeEach(() => {
        paymentRepository = new InMemoryPaymentRepository()
        clientRepository = new InMemoryClientRepository()
        sut = new FetchPaymentsByClientUseCase(paymentRepository, clientRepository)
    })

    it('should be able to fetch client payments', async () => {
        const client = makeClient({})

        await clientRepository.create(client)

        const payment1 = makePayment({ idClient: client.id })
        const payment2 = makePayment({ idClient: client.id })

        await paymentRepository.create(payment1)
        await paymentRepository.create(payment2)

        const result = await sut.execute({
            clientId: client.id.toString(),
            page: 1
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({ payments: expect.arrayContaining([
            payment1,
            payment2
        ])})
    })

})