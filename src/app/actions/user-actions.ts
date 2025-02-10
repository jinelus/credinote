'use server'

import { PrismaUserRepository } from "@/src/db/repositories/prisma-user-repository"
import { AuthentifcateUseCase } from "@/src/domain/application/use-cases/authenticate-user"
import { CreateUserUseCase, CreateUserUseCaseProps } from "@/src/domain/application/use-cases/create-user"
import { DeleteUserUseCase } from "@/src/domain/application/use-cases/delete-user"
import { EditUserUseCase, EditUserUseCaseProps } from "@/src/domain/application/use-cases/edit-user"
import { GetUserProfileUseCase } from "@/src/domain/application/use-cases/get-user-profile"

const userRepository = new PrismaUserRepository()

export async function createUser(user: CreateUserUseCaseProps) {
    const { email, name, password} = user

    const createUserUseCase = new CreateUserUseCase(userRepository)

    await createUserUseCase.execute({email, name, password})

}

export async function getUser(id: string) {
    const getUserUseCase = new GetUserProfileUseCase(userRepository)

    const user = await getUserUseCase.execute({id})

    if(user.isLeft()) {
        return user.value
    }

    return user.value.user
}

export async function EditUser(user: EditUserUseCaseProps) {
    const {email, name, password, userId} = user

    const editUserUseCase = new EditUserUseCase(userRepository)

    const result = await editUserUseCase.execute({email, name, password, userId})

    if(result.isLeft()) {
        return result.value
    }

    return result.value.user
}

export async function deleteUser(userId: string){
    const deleteClientUseCase = new DeleteUserUseCase(userRepository)

    const result = await deleteClientUseCase.execute({userId})

    if(result.isLeft()) {
        return result.value
    }
}

export async function authenticate({email, password}: {email: string, password: string}) {
    const authenticateUseCase = new AuthentifcateUseCase(userRepository)

    const result = await authenticateUseCase.execute({email, password})

    if(result.isLeft()) {
        return result.value
    }

    return result.value.user
}