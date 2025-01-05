import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"
import { GetClientUseCase } from "./get-client"
import { makeUser } from "@/test/factories/make-user"
import { makeClient } from "@/test/factories/make-client"
import { RessourceNotFoundError } from "@/app/core/errors/ressource-not-found-error"


describe('Get client', () => {
    let sut: GetClientUseCase
    let clientRepository: InMemoryClientRepository

    beforeEach(() => {
        clientRepository = new InMemoryClientRepository()
        sut = new GetClientUseCase(clientRepository)
    })

    it('should be able to get a client', async () => {
        const user = makeUser({})

        const client = makeClient({ businessId: user.id })
        clientRepository.create(client)

        const result = await sut.execute({
            clientId: client.id.toString(),
            userId: user.id.toString(),
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({ client })
    })

    it('should not be able to get a client', async () => {
        const user = makeUser({})

        const client = makeClient({ businessId: user.id })

        const result = await sut.execute({
            clientId: client.id.toString(),
            userId: 'wrong-user-id',
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(RessourceNotFoundError)
    })

})