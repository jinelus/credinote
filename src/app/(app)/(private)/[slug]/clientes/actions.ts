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
    userId: string;
    clientId: string;
    name: string;
    telephone?: string;
}

export interface DeleteClientUseCaseProps {
    userId: string;
    clientId: string;
}

export interface FetchClientsParams {
    slug: string
    params: {
        page?: number
    }
}

export interface GetClientByCpfParams {
    slug: string
    cpf: string
}

export type ClientResponse = {
    amount: number;
    name: string;
    id: string;
    cpf: string;
    telephone: string;
    createdAt: Date;
    updatedAt: Date;
    organizationId: string;
} | null


export async function registerClient(client: RegisterClientProps ) {

    const { name, cpf, telephone, slug } = client

    const result = await withErrorHandling(async () => {
        const organization = await prisma.organization.findUnique({
            where: {
                slug
            }
        })
    
        if (!organization) {
            return {
                success: false,
                error: 'Não faz parte de uma organização'
            }
        }

        const existing = await prisma.client.findUnique({
            where: {
                cpf,
            }
        })

        if (existing) {
            return {
                success: false,
                error: 'Esse cliente já foi cadastrado'
            }
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
            success: true,
            data: {
                ...createdClient,
                amount: Number(createdClient.amount)
            }
        }
    })
    
    return result
}

export async function editClient(client: EditClientUseCaseProps) {

    const { name, telephone, clientId, userId } = client

    const result = await withErrorHandling(async () => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    
        if(!user) {
            return {
                success: false,
                error: 'User not found'
            }
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
        
        return {
            success: true,
            data: updatedClient
        }
    })

    return result
}

export async function deleteClient({ clientId, userId }: DeleteClientUseCaseProps) {

    const result = await withErrorHandling(async () => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    
        if(!user) {
            return {
                success: false,
                error: 'User not found'
            }
        }
    
        await prisma.client.delete({
            where: {
                id: clientId
            }
        })

        return {
            success: true,
            data: 'Client deleted'
        }
    })

    return result
}

export async function fetchClients({ slug, params }: FetchClientsParams) {

    const organization = await prisma.organization.findUnique({
        where: {
            slug
        }
    })

    const result = await withErrorHandling(async () => {
        const { page = 1 } = params
    
        const clients = await prisma.client.findMany({
            where: {
                organizationId: organization?.id,
            },
            skip: (page - 1) * 10,
            take: 10,
            orderBy: {
                createdAt: 'desc'
            }
        })
    
        return {
            success: true,
            data: clients.map((client) => ({
                ...client,
                amount: Number(client.amount)
            }))
        }
    })

    return result
}

export async function getClientByCpf({ slug, cpf }: GetClientByCpfParams) {
    const result = await withErrorHandling(async () => {
        const organization = await prisma.organization.findUnique({
            where: { slug }
        })
    
        if (!organization) {
            return {
                success: false,
                error: 'Organization not found'
            }
        }
    
        const client = await prisma.client.findUnique({
            where: {
                cpf,
                organizationId: organization.id
            }
        })

        if (!client) {
            return {
                success: false,
                error: 'Client not found'
            }
        }
    
        return {
            success: true,
            data: {
                ...client,
                amount: Number(client.amount)
            }
        }
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
            return {
                success: false,
                error: 'Client not found'
            }
        }

        return {
            success: true,
            data: {
                ...client,
                amount: Number(client.amount)
            }
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