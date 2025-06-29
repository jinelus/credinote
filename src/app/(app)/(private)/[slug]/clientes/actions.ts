'use server'

import { prisma } from "@/src/db/prisma";
import { withErrorHandling } from "@/src/utils/error-handler";

export interface RegisterClientProps {
    name: string;
    cpf: string;
    telephone?: string;
    slug: string;
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

export interface FetchClientsParams {
    organizationId: string
    params: {
        page?: number
    }
}

export interface GetClientByCpfParams {
    slug: string
    cpf: string
}


export async function registerClient(client: RegisterClientProps ) {

    const { name, cpf, telephone, slug } = client

    const result = await withErrorHandling(async () => {
        const organization = await prisma.organization.findUnique({
            where: {
                slug
            }
        })
    
        if (!organization) {
            throw new Error()
        }

        const existing = await prisma.client.findUnique({
            where: {
                cpf,
            }
        })

        if (existing) {
            throw new Error()
        }
    
        const createdClient = await prisma.client.create({
            data: {
                name,
                cpf,
                telephone: telephone || '',
                organizationId: organization.id,
                amount: 0,
            }
        })
    
        return {
            ...createdClient,
            amount: Number(createdClient.amount)
        }
    })
    
    return result
}

export async function editClient(client: EditClientUseCaseProps) {

    const { name, telephone, clientId, organizationId } = client

    const result = await withErrorHandling(async () => {
        const organization = await prisma.organization.findUnique({
            where: {
                id: organizationId
            }
        })
    
        if(!organization) {
            throw new Error('Organization not found')
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
    })

    return result
}

export async function deleteClient({ clientId, organizationId }: DeleteClientUseCaseProps) {

    const result = await withErrorHandling(async () => {
        const organization = await prisma.organization.findUnique({
            where: {
                id: organizationId
            }
        })
    
        if(!organization) {
            throw new Error('Organization not found')
        }
    
        await prisma.client.delete({
            where: {
                id: clientId
            }
        })
    })

    return result
}

export async function fetchClients({ organizationId, params }: FetchClientsParams) {
    const result = await withErrorHandling(async () => {
        const { page = 1 } = params
    
        const clients = await prisma.client.findMany({
            where: {
                organizationId,
            },
            skip: (page - 1) * 10,
            take: 10,
            orderBy: {
                createdAt: 'desc'
            }
        })
    
        return clients.map((client) => ({
            ...client,
            amount: Number(client.amount)
        }))
    })

    return result
}

export async function getClientByCpf({ slug, cpf }: GetClientByCpfParams) {
    const result = await withErrorHandling(async () => {
        const organization = await prisma.organization.findUnique({
            where: { slug }
        })
    
        if (!organization) {
            return null
        }
    
        const client = await prisma.client.findUnique({
            where: {
                cpf,
                organizationId: organization.id
            },
            select: {
                id: true,
                name: true
            }
        })
    
        return client
    })

    return result
}

export async function getClientById(id: string) {

    const result = await withErrorHandling(async () => {
        const client = await prisma.client.findUnique({
            where: {
                id
            }
        })

        if (!client) {
            return null
        }

        return {
            ...client,
            amount: Number(client.amount)
        }
    })

    return result
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