import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository"
import { EditUserUseCase } from "./edit-user"
import { makeUser } from "@/test/factories/make-user"
import { RessourceNotFoundError } from "@/src/core/errors/ressource-not-found-error"

describe('Edit user use case', () => {
    let sut: EditUserUseCase
    let userRepository: InMemoryUserRepository

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new EditUserUseCase(userRepository)
    })

    it('should be able to edit a user', async () => {
        const user = makeUser({})

        await userRepository.create(user)

        const result = await sut.execute({
            userId: user.id.toString(),
            name: 'John Doe',
            email: user.email,
            password: user.password,
        })

        expect(result.isRight()).toBe(true)
        expect(userRepository.items[0].name).toEqual('John Doe')
    })

    it('should not be able to edit a user', async () => {
        const user = makeUser({})
        await userRepository.create(user)

        const result = await sut.execute({
            name: 'John Doe',
            email: user.email,
            password: user.password,
            userId: 'invalid-id'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(RessourceNotFoundError)
    })
})