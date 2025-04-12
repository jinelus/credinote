import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"
import { RegisterClientUseCase } from "./register-client"
import { makeUser } from "@/test/factories/make-user"

describe('Register client', () => {
    let sut: RegisterClientUseCase
    let clientRepository: InMemoryClientRepository

    beforeEach(() => {
        clientRepository = new InMemoryClientRepository()
        sut = new RegisterClientUseCase(clientRepository)
    })

    it('should be able to register a client', async () => {
        const user = makeUser({})

        await sut.execute({
            name: 'John Doe',
            cpf: '12345678901',
            telephone: '12345678901',
            organizationId: user.id.toString()
        })

        expect(clientRepository.items).toHaveLength(1)
        expect(clientRepository.items[0].name).toBe('John Doe')
    })
})