import { InMemoryClientRepository } from "@/test/repositories/in-memory-client-repository"
import { FetchRecentClientUseCase } from "./fetch-recent-clients"
import { makeClient } from "@/test/factories/make-client"
import { makeUser } from "@/test/factories/make-user"

describe('Fetch recent clients', () => {
    let sut: FetchRecentClientUseCase
    let clientRepository: InMemoryClientRepository

    beforeEach(() => {
        clientRepository = new InMemoryClientRepository()
        sut = new FetchRecentClientUseCase(clientRepository)
    })

    it('should be able to fetch recent clients', async () => {
        const user = makeUser({})

        const client1 = makeClient({organizationId: user.id})
        const client2 = makeClient({organizationId: user.id})
        const client3 = makeClient({organizationId: user.id})
        const client4 = makeClient({})

        await clientRepository.create(client1)
        await clientRepository.create(client2)
        await clientRepository.create(client3)
        await clientRepository.create(client4)

        const result = await sut.execute({ userId: user.id.toString(), page: 1 })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            clients: expect.arrayContaining([client1, client2, client3])
        })
    })

    it('should be able to fetch paginated clients', async () => {
        const user = makeUser({})

        for(let i = 0; i < 22; i++) {
            const client = makeClient({organizationId: user.id}, String(i))

            await clientRepository.create(client)
        }

        const result = await sut.execute({ userId: user.id.toString(), page: 2 })

        expect(result.isRight()).toBe(true)
        expect(result.value?.clients).toHaveLength(2)
    })
})