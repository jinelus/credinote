import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"
import { EditClientUseCase } from "./edit-client"
import { makeUser } from "@/test/factories/make-user"
import { makeClient } from "@/test/factories/make-client"
import { NotAllowedError } from "@/app/core/errors/not-allowed-error"

describe('Edit client use case', () => {
    let sut: EditClientUseCase
    let clientRepository: InMemoryClientRepository

    beforeEach(() => {
        clientRepository = new InMemoryClientRepository()
        sut = new EditClientUseCase(clientRepository)
    })

    it('should be able to edit a client', async () => {
        const user = makeUser({})

        const client = makeClient({ businessId: user.id })
        await clientRepository.create(client)

        const result = await sut.execute({
            name: 'John Doe',
            cpf: client.cpf,
            businessId: user.id.toString(),
            clientId: client.id.toString()
        })

        expect(result.isRight()).toBe(true)
        expect(clientRepository.items[0].name).toEqual('John Doe')
    })

    it('should not be able to edit a client', async () => {
        const user = makeUser({})

        const client = makeClient({ businessId: user.id })
        await clientRepository.create(client)

        const result = await sut.execute({
            name: 'John Doe',
            cpf: client.cpf,
            businessId: 'invalid-id',
            clientId: client.id.toString()
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})