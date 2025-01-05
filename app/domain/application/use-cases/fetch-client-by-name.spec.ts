import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"
import { makeClient } from "@/test/factories/make-client"
import { FetchClientByNameUseCase } from "./fetch-client-by-name"

describe('Fetch recent clients', () => {
    let sut: FetchClientByNameUseCase
    let clientRepository: InMemoryClientRepository

    beforeEach(() => {
        clientRepository = new InMemoryClientRepository()
        sut = new FetchClientByNameUseCase(clientRepository)
    })

    it('should be able to fetch recent clients', async () => {
        const user = makeClient({})

        const client1 = makeClient({name: 'John Doe', businessId: user.id})

        await clientRepository.create(client1)
        const result = await sut.execute({ query:  'john', userId: user.id.toString() })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            clients: expect.arrayContaining([client1])
        })
    })

    it('should not be able to fetch most 10 clients by name', async () => {
        const user = makeClient({})

        for(let i = 0; i < 22; i++) {
            const client = makeClient({name: 'John Doe', businessId: user.id}, String(i))

            await clientRepository.create(client)
        }

        const result = await sut.execute({ query:  'john', userId: user.id.toString() })

        expect(result.isRight()).toBe(true)
        expect(result.value?.clients).toHaveLength(10)
    })
})