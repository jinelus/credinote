import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository"
import { GetUserProfileUseCase } from "./get-user-profile"
import { User } from "@/app/domain/enterprise/entities/user"

describe('Get user profile', () => {
    let sut: GetUserProfileUseCase
    let userRepository: InMemoryUserRepository

    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new GetUserProfileUseCase(userRepository)
    })

    it('should be able to get user profile', async () => {
        const userCreated = User.create({
            name: 'John Doe',
            email: '7bPbM@example.com',
            password: '123456',
        })

        await userRepository.create(userCreated)

        const userProfile = await sut.execute({
            id: userCreated.id.toString()
        })

        expect(userProfile.isRight()).toBe(true)
        expect(userProfile.value).toEqual({ user: userCreated })
    })
})