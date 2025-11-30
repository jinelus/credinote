'use server'

import dayjs from 'dayjs'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/src/db/prisma'
import { withErrorHandling } from '@/src/utils/error-handler'

export interface RegisterClientProps {
  name: string
  cpf: string
  telephone?: string
  slug: string
}

export interface EditClientUseCaseProps {
  organizationId: string
  clientId: string
  name: string
  telephone?: string
}

export interface DeleteClientUseCaseProps {
  userId: string
  clientId: string
}

export interface FetchClientsParams {
  slug: string
  params?: {
    page?: number
    perPage: number
    search?: string
    order?: 'asc' | 'desc'
    orderBy?: string
  }
}

export interface GetClientByCpfParams {
  slug: string
  cpf: string
}

export type ClientResponse = {
  amount: number
  name: string
  id: string
  cpf: string
  telephone: string
  createdAt: Date
  updatedAt: Date
  organizationId: string
} | null

export async function registerClient(client: RegisterClientProps) {
  const { name, cpf, telephone, slug } = client

  const result = await withErrorHandling(async () => {
    const organization = await prisma.organization.findUnique({
      where: {
        slug,
      },
    })

    if (!organization) {
      return {
        success: false,
        error: 'Não faz parte de uma organização',
      }
    }

    const existing = await prisma.client.findUnique({
      where: {
        cpf,
      },
    })

    if (existing) {
      return {
        success: false,
        error: 'Esse cliente já foi cadastrado',
      }
    }

    const createdClient = await prisma.client.create({
      data: {
        name,
        cpf,
        telephone: telephone || '',
        organizationId: organization.id,
        amount: 0,
      },
    })

    return {
      success: true,
      data: {
        ...createdClient,
        amount: Number(createdClient.amount),
      },
    }
  })

  return result
}

export async function editClient(client: EditClientUseCaseProps) {
  const { name, telephone, clientId, organizationId } = client

  const result = await withErrorHandling(async () => {
    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    })

    if (!organization) {
      return {
        success: false,
        error: 'Organization not found',
      }
    }

    await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        name,
        telephone,
      },
    })

    revalidatePath(`/dashboard/clientes/${clientId}`)

    return {
      success: true,
      data: null,
    }
  })

  return result
}

export async function deleteClient({ clientId, userId }: DeleteClientUseCaseProps) {
  const result = await withErrorHandling(async () => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      }
    }

    await prisma.client.delete({
      where: {
        id: clientId,
      },
    })

    return {
      success: true,
      data: 'Client deleted',
    }
  })

  return result
}

export async function fetchClients({ slug, params }: FetchClientsParams) {
  const organization = await prisma.organization.findUnique({
    where: {
      slug,
    },
  })

  const result = await withErrorHandling(async () => {
    const perPage = params?.perPage || 10
    const page = params?.page || 1

    const clients = await prisma.client.findMany({
      where: {
        organizationId: organization?.id,
        ...(params?.search
          ? {
              OR: [
                {
                  name: {
                    contains: params.search,
                    mode: 'insensitive',
                  },
                },
                {
                  cpf: {
                    contains: params.search,
                    mode: 'insensitive',
                  },
                },
                {
                  telephone: {
                    contains: params.search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        [params?.orderBy || 'createdAt']: params?.order,
      },
    })

    const clientsCount = await prisma.client.count({
      where: {
        organizationId: organization?.id,
        ...(params?.search
          ? {
              OR: [
                {
                  name: {
                    contains: params.search,
                    mode: 'insensitive',
                  },
                },
                {
                  cpf: {
                    contains: params.search,
                    mode: 'insensitive',
                  },
                },
                {
                  telephone: {
                    contains: params.search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      },
    })

    const maxPage = Math.ceil(clientsCount / (params?.perPage ?? 10))

    return {
      success: true,
      data: {
        clients: clients.map((client) => ({
          ...client,
          amount: Number(client.amount),
        })),
        total: clientsCount,
        maxPage,
      },
    }
  })

  return result
}

export async function getClientByCpf({ slug, cpf }: GetClientByCpfParams) {
  const result = await withErrorHandling(async () => {
    const organization = await prisma.organization.findUnique({
      where: { slug },
    })

    if (!organization) {
      return {
        success: false,
        error: 'Organization not found',
      }
    }

    const client = await prisma.client.findUnique({
      where: {
        cpf,
        organizationId: organization.id,
      },
    })

    if (!client) {
      return {
        success: false,
        error: 'Cliente não encontrado!',
      }
    }

    return {
      success: true,
      data: {
        ...client,
        amount: Number(client.amount),
      },
    }
  })

  return result
}

export async function getClientById(id: string) {
  const result = await withErrorHandling(async () => {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    })

    if (!client) {
      return {
        success: false,
        error: 'Client not found',
      }
    }

    return {
      success: true,
      data: {
        ...client,
        amount: Number(client.amount),
      },
    }
  })

  return result
}

export interface FetchClientDetailsParams {
  clientId: string
  organizationId: string
  page?: number
  perPage?: number
}

export type TimelineEventData = {
  id: string
  type: 'order' | 'payment'
  date: string
  amount: number
  description: string
  status?: 'completed' | 'pending' | 'cancelled'
  method?: string
}

export async function getClientDetails({
  clientId,
  organizationId,
  page = 1,
  perPage = 10,
}: FetchClientDetailsParams) {
  const result = await withErrorHandling(async () => {
    const client = await prisma.client.findFirst({
      where: {
        id: clientId,
        organizationId,
      },
    })

    if (!client) {
      return {
        success: false,
        error: 'Client not found',
      }
    }

    // Get total counts in parallel
    const [ordersCount, paymentsCount] = await Promise.all([
      prisma.order.count({ where: { clientId } }),
      prisma.payment.count({ where: { clientId } }),
    ])

    const totalEvents = ordersCount + paymentsCount
    const maxPage = Math.ceil(totalEvents / perPage)
    const skip = (page - 1) * perPage

    // Fetch orders and payments with sufficient limit to sort together
    const [orders, payments] = await Promise.all([
      prisma.order.findMany({
        where: { clientId },
        orderBy: { date: 'desc' },
        take: perPage * 2, // Fetch more to ensure we have enough after merging
      }),
      prisma.payment.findMany({
        where: { clientId },
        orderBy: { paidAt: 'desc' },
        take: perPage * 2,
      }),
    ])

    const parsedOrders = orders.map((order) => ({
      id: order.id,
      type: 'order' as const,
      date: order.date.toISOString(),
      amount: Number(order.total),
      description: order.description ?? 'Pedido registrado, sem detalhes',
      status: 'completed' as const,
    }))

    const parsedPayments = payments.map((payment) => ({
      id: payment.id,
      type: 'payment' as const,
      date: payment.paidAt.toISOString(),
      amount: Number(payment.amount),
      description: ``,
      method: payment.method,
    }))

    const allEvents: TimelineEventData[] = [...parsedOrders, ...parsedPayments]
      .sort((a, b) => (dayjs(b.date).isAfter(dayjs(a.date)) ? 1 : -1))
      .slice(skip, skip + perPage)

    return {
      success: true,
      data: {
        client: {
          id: client.id,
          name: client.name,
          cpf: client.cpf,
          telephone: client.telephone,
          amount: Number(client.amount),
          createdAt: client.createdAt,
          updatedAt: client.updatedAt,
        },
        events: allEvents,
        totalEvents,
        maxPage,
        currentPage: page,
      },
    }
  })

  return result
}
