import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"
import { MakePaymentUseCase } from "./make-payment"
import { InMemoryPaymentRepository } from "@/test/repositories/in-memory-payment-repository"
import { makeClient } from "@/test/factories/make-client"

describe('Make payment use case', () => {
    let sut: MakePaymentUseCase
    let paymentRepository: InMemoryPaymentRepository
    let clientRepository: InMemoryClientRepository

    beforeEach(() => {
        paymentRepository = new InMemoryPaymentRepository()
        clientRepository = new InMemoryClientRepository()
        sut = new MakePaymentUseCase(paymentRepository, clientRepository)
    })

    it('should be able to make a payment', async () => {
        const client = makeClient({amount: 300})

        await clientRepository.create(client)

        const response = await sut.execute({ idClient: client.id.toString(), amount: 200, method: 'CASH' })

        expect(response.isRight()).toBe(true)
        expect(paymentRepository.items).toHaveLength(1)
        expect(clientRepository.items[0].amount).toEqual(100)
    })
})