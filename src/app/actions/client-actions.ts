'use server'

import { RegisterClientUseCase, RegisterClientUseCaseProps } from "@/src/domain/application/use-cases/register-client"
import { PrismaClientRepository } from "../../db/repositories/prisma-client-repository"
import { EditClientUseCase, EditClientUseCaseProps } from "@/src/domain/application/use-cases/edit-client"
import { DeleteClientUseCase, DeleteClientUseCaseProps } from "@/src/domain/application/use-cases/delete-client"
import { FetchClientByNameUseCase, FetchClientByNameUseCaseProps } from "@/src/domain/application/use-cases/fetch-client-by-name"
import { GetClientUseCase, GetClientUseCaseProps } from "@/src/domain/application/use-cases/get-client"
import { FetchRecentClientUseCase } from "@/src/domain/application/use-cases/fetch-recent-clients"


const clientRepository = new PrismaClientRepository()
export async function registerClient(client: RegisterClientUseCaseProps ) {

    const { name, cpf, telephone, businessId } = client

    const registerClientUseCase = new RegisterClientUseCase(clientRepository)

    await registerClientUseCase.execute({
        name,
        cpf,
        telephone,
        businessId
    })

}

export async function editClient(client: EditClientUseCaseProps) {

    const { name, cpf, telephone, businessId, clientId } = client
   
    const editClientUseCase = new EditClientUseCase(clientRepository)

    const response = await editClientUseCase.execute({
        clientId,
        name,
        cpf,
        telephone,        
        businessId
    })

    if(response.isLeft()) {
        return response.value
    }
}

export async function deleteClient({ clientId, userId }: DeleteClientUseCaseProps) {

    const deleteClientUseCase = new DeleteClientUseCase(clientRepository)

    const response = await deleteClientUseCase.execute({
        clientId,
        userId
    })

    if(response.isLeft()) {
        return response.value
    }
}

export async function fetchClientByName({ userId, query }: FetchClientByNameUseCaseProps) {

    const fetchClientByNameUseCase = new FetchClientByNameUseCase(clientRepository)

    const response = await fetchClientByNameUseCase.execute({ userId, query })

    if(response.isLeft()) {
        return []
    }

    return response.value.clients
}

export async function getClient({ clientId, userId}: GetClientUseCaseProps){
    const getClientUseCase = new GetClientUseCase(clientRepository)

    const response = await getClientUseCase.execute({ clientId, userId })

    if(response.isLeft()) {
        return response.value
    }

    return response.value.client
}

export async function fetchRecentClients(userId: string, page = 1) {
    const fetchRecentClientsUseCase = new FetchRecentClientUseCase(clientRepository)

    const response = await fetchRecentClientsUseCase.execute({ page, userId })

    if(response.isLeft()) {
        return []
    }

    return response.value.clients
}