import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";
import { DeleteUserUseCase } from "./delete-user";
import { makeUser } from "@/test/factories/make-user";


describe('Delete user use case', () => {
    let sut: DeleteUserUseCase
    let userRepository: InMemoryUserRepository

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new DeleteUserUseCase(userRepository)
    })

    it('should be able to delete a user', async () => {
        const user = makeUser({})

        await userRepository.create(user)

        const result = await sut.execute({
            userId: user.id.toString(),
        })

        expect(result.isRight()).toBe(true)
        expect(userRepository.items).toHaveLength(0)
    })
});