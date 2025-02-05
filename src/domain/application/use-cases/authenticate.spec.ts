
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";
import { AuthentifcateUseCase } from "./authenticate-user";
import { makeUser } from "@/test/factories/make-user";
import { InvalidCredentialsError } from "@/src/core/errors/invalid-credentials-error";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUserRepository
let sut: AuthentifcateUseCase


describe('Authenticate use case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUserRepository()
        sut = new AuthentifcateUseCase(usersRepository)
    })

    it('should be able to authenticate', async () => {
        
        const userCreated = makeUser({password: await hash('123456', 8)})

        await usersRepository.create(userCreated)

        const result = await sut.execute({
            email: userCreated.email,
            password: '123456'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({user: userCreated})
    })

    it('should be not able to authenticate with wrong password', async () => {
        const userCreated = makeUser({password: '123456'})

        await usersRepository.create(userCreated)

        const result = await sut.execute({
            email: userCreated.email,
            password: '12345675'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toEqual(new InvalidCredentialsError())
    })


    it('should not be able to authenticate with wrong email', async () => {
        
        const userCreated = makeUser({password: '123456'})

        await usersRepository.create(userCreated)

        const result = await sut.execute({
            email: 'TtK7g@example.com',
            password: '123456'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toEqual(new InvalidCredentialsError())
    })
    
})