'use server'

import { prisma } from "@/src/db/prisma";

export interface RegisterClientProps {
    name: string;
    cpf: string;
    telephone?: string;
    organizationId: string;
}

export interface EditClientUseCaseProps {
    organizationId: string;
    clientId: string;
    name: string;
    telephone?: string;
}

export interface DeleteClientUseCaseProps {
    organizationId: string;
    clientId: string;
}


export async function registerClient(client: RegisterClientProps ) {

    const { name, cpf, telephone, organizationId } = client

    const createdClient = await prisma.client.create({
        data: {
            name,
            cpf,
            telephone: telephone || '',
            organizationId,
            amount: 0,
        }
    })

    return createdClient
}

export async function editClient(client: EditClientUseCaseProps) {

    const { name, telephone, clientId, organizationId } = client

    const organization = await prisma.organization.findUnique({
        where: {
            id: organizationId
        }
    })

    if(!organization) {
        return null
    }

    const updatedClient = await prisma.client.update({
        where: {
            id: clientId
        },
        data: {
            name,
            telephone
        }
    })
    
    return updatedClient
}

export async function deleteClient({ clientId, organizationId }: DeleteClientUseCaseProps) {

    const organization = await prisma.organization.findUnique({
        where: {
            id: organizationId
        }
    })

    if(!organization) {
        return null
    }

    await prisma.client.delete({
        where: {
            id: clientId
        }
    })
}

// export async function fetchClientByName({ userId, query }: FetchClientByNameUseCaseProps) {

//     const fetchClientByNameUseCase = new FetchClientByNameUseCase(clientRepository)

//     const response = await fetchClientByNameUseCase.execute({ userId, query })

//     if(response.isLeft()) {
//         return []
//     }

//     return response.value.clients
// }

// export async function getClient({ clientId, userId}: GetClientUseCaseProps){
//     const getClientUseCase = new GetClientUseCase(clientRepository)

//     const response = await getClientUseCase.execute({ clientId, userId })

//     if(response.isLeft()) {
//         return response.value
//     }

//     return response.value.client
// }

// export async function fetchRecentClients(userId: string, page = 1) {
//     const fetchRecentClientsUseCase = new FetchRecentClientUseCase(clientRepository)

//     const response = await fetchRecentClientsUseCase.execute({ page, userId })

//     if(response.isLeft()) {
//         return []
//     }

//     return response.value.clients
// }