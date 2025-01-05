import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"
import { FetchRecentClientUseCase } from "./fetch-recent-clients"
import { makeClient } from "@/test/factories/make-client"

describe('Fetch recent clients', () => {
    let sut: FetchRecentClientUseCase
    let clientRepository: InMemoryClientRepository

    beforeEach(() => {
        clientRepository = new InMemoryClientRepository()
        sut = new FetchRecentClientUseCase(clientRepository)
    })

    it('should be able to fetch recent clients', async () => {
        const client1 = makeClient({})
        const client2 = makeClient({})
        const client3 = makeClient({})

        await clientRepository.create(client1)
        await clientRepository.create(client2)
        await clientRepository.create(client3)

        const result = await sut.execute({ page: 1 })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            clients: expect.arrayContaining([client1, client2, client3])
        })
    })

    it('should be able to fetch paginated clients', async () => {
        for(let i = 0; i < 22; i++) {
            const client = makeClient({}, String(i))

            await clientRepository.create(client)
        }

        const result = await sut.execute({ page: 2 })

        expect(result.isRight()).toBe(true)
        expect(result.value?.clients).toHaveLength(2)
    })
})