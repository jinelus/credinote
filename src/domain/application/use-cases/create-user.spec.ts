
import { CreateUserUseCase } from "./create-user";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";

describe("CreateUserUseCase", () => {
    let sut: CreateUserUseCase
    let userRepository: InMemoryUserRepository

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new CreateUserUseCase(userRepository)
    })

    it('should be able to create a user', async () => {
        await sut.execute({
            name: 'John Doe',
            email: '7bPbM@example.com',
            password: '123456'
        })

        expect(userRepository.items.length).toBe(1)
        expect(userRepository.items[0].name).toBe('John Doe')
    })
});