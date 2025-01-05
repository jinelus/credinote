import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository";
import { DeleteClientUseCase } from "./delete-client";
import { makeClient } from "@/test/factories/make-client";
import { NotAllowedError } from "@/app/core/errors/not-allowed-error";


describe('Delete client use case', () => {
    let sut: DeleteClientUseCase
    let clientRepository: InMemoryClientRepository

    beforeEach(() => {
        clientRepository = new InMemoryClientRepository()
        sut = new DeleteClientUseCase(clientRepository)
    })

    it('should be able to delete a client', async () => {
        const user = makeClient({})

        const client = makeClient({ businessId: user.id })
        await clientRepository.create(client)

        const result = await sut.execute({
            clientId: client.id.toString(),
            userId: user.id.toString(),
        })

        expect(result.isRight()).toBe(true)
        expect(clientRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a client', async () => {
        const user = makeClient({})

        const client = makeClient({})
        await clientRepository.create(client)

        const result = await sut.execute({
            clientId: client.id.toString(),
            userId: user.id.toString(),
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
});