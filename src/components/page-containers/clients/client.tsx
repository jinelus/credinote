import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getClientDetails } from '@/src/app/(app)/(private)/dashboard/clientes/actions'
import { getSession } from '@/src/lib/get-session'
import { formatCurrency } from '@/src/lib/utils'
import { GoBackBtn } from '../../back-btn'
import { Card } from '../../base-components/card'
import { Container } from '../../base-components/container'
import ClientTimeline, { TimelineSkeleton } from '../../client-timeline'
import { EditUser } from '../../dialog/edit-client'
import { PaginationButtons } from '../../pagination'
import { Button } from '../../ui/button'
import { Skeleton } from '../../ui/skeleton'

type SearchParams = {
  page: number | null
  perPage: number | null
}

type Params = {
  clientId: string
}

interface ClientPageContainerProps {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}

export const ClientPageContainer = async ({ params, searchParams }: ClientPageContainerProps) => {
  const { clientId } = await params
  const { organization } = await getSession()

  const queries = await searchParams

  const page = queries.page ?? 1
  const perPage = queries.perPage ?? 10

  const response = await getClientDetails({
    clientId,
    organizationId: organization.id,
    page,
    perPage,
  })

  if (!response.success || !response.data) {
    notFound()
  }

  const { client, events, maxPage } = response.data

  const outstandingBalance = client.amount

  const ordersCount = events.filter((event) => event.type === 'order').length
  const paymentsCount = events.filter((event) => event.type === 'payment').length

  return (
    <Container className="py-8">
      <div className="space-y-8">
        <GoBackBtn />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mt-2 font-bold text-3xl text-foreground">{client.name}</h1>
            <p className="text-muted-foreground text-sm">CPF: {client.cpf}</p>
          </div>
          <div className="flex gap-4">
            <EditUser client={client} organizationId={organization.id} />
          </div>
        </div>

        <div className="grid items-start gap-4 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="font-medium text-foreground text-sm">Pedidos</h3>
            <p className="text-muted-foreground text-sm">{ordersCount} pedido(s) registrados</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-medium text-foreground text-sm">Pagamentos</h3>
            <p className="text-muted-foreground text-sm">
              {paymentsCount} pagamento(s) registrados
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-medium text-foreground text-sm">Saldo em aberto</h3>
            <p className="mt-2 font-semibold text-2xl text-foreground">
              {formatCurrency(outstandingBalance)}
            </p>
            <p className="text-muted-foreground text-sm">
              Atualizado automaticamente após pagamentos
            </p>
          </Card>
        </div>

        <div className="flex w-full flex-col-reverse items-start gap-8 lg:flex-row">
          <div className="w-full lg:w-auto lg:flex-1">
            <Card className="px-3 py-6 lg:p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-semibold text-foreground text-xl">Linha do tempo</h2>
                <span className="text-muted-foreground text-sm">{events.length} evento(s)</span>
              </div>
              <ClientTimeline clientId={client.id} events={events} />
            </Card>
            {maxPage > 1 && <PaginationButtons currentPage={page} maxPage={maxPage} />}
          </div>

          <div className="top-0 w-full space-y-4 lg:sticky lg:w-auto">
            <div className="flex w-full flex-col gap-4">
              <Link href={`/dashboard/nova-compra?client=${client.id}`}>
                <Button variant="outline" className="w-full">
                  Nova Compra
                </Button>
              </Link>
              <Link href={`/dashboard/novo-pagamento?client=${client.id}`}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Novo Pagamento
                </Button>
              </Link>
            </div>
            <Card className="w-full space-y-4 p-6 lg:w-auto">
              <h2 className="font-semibold text-foreground text-xl">Informações do cliente</h2>
              <div className="space-y-3 text-muted-foreground text-sm">
                <p>
                  <span className="font-medium text-foreground">Telefone: </span>
                  {client.telephone || 'Não informado'}
                </p>
                <p>
                  <span className="font-medium text-foreground">Criado em: </span>
                  {client.createdAt.toLocaleDateString('pt-BR')}
                </p>
                <p>
                  <span className="font-medium text-foreground">Última atualização: </span>
                  {client.updatedAt.toLocaleDateString('pt-BR')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  )
}

export const ClientPageContainerSkeleton = () => {
  return (
    <Container className="py-8">
      <div className="space-y-8">
        <Skeleton className="h-8 w-24" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Skeleton className="mt-2 h-9 w-48" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="grid items-start gap-4 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="font-medium text-foreground text-sm">Pedidos</h3>
            <Skeleton className="mt-1 h-4 w-32" />
          </Card>
          <Card className="p-6">
            <h3 className="font-medium text-foreground text-sm">Pagamentos</h3>
            <Skeleton className="mt-1 h-4 w-40" />
          </Card>
          <Card className="p-6">
            <h3 className="font-medium text-foreground text-sm">Saldo em aberto</h3>
            <Skeleton className="mt-2 h-8 w-28" />
            <Skeleton className="mt-1 h-4 w-full" />
          </Card>
        </div>

        <div className="flex w-full flex-col-reverse items-start gap-8 lg:flex-row">
          <div className="w-full lg:w-auto lg:flex-1">
            <Card className="px-3 py-6 lg:p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-semibold text-foreground text-xl">Linha do tempo</h2>
                <Skeleton className="h-4 w-20" />
              </div>
              <TimelineSkeleton />
            </Card>
            <div className="flex items-center justify-center gap-2 px-6 py-4">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>

          <div className="top-0 w-full space-y-4 lg:sticky lg:w-auto">
            <div className="flex w-full flex-col gap-4">
              <Button variant="outline" className="w-full" disabled>
                Nova Compra
              </Button>
              <Button className="w-full bg-primary text-primary-foreground" disabled>
                Novo Pagamento
              </Button>
            </div>
            <Card className="w-full space-y-4 p-6 lg:w-auto">
              <h2 className="font-semibold text-foreground text-xl">Informações do cliente</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-foreground">Telefone: </span>
                  <Skeleton className="inline-block h-4 w-28" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Criado em: </span>
                  <Skeleton className="inline-block h-4 w-24" />
                </div>
                <div>
                  <span className="font-medium text-foreground">Última atualização: </span>
                  <Skeleton className="inline-block h-4 w-24" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  )
}
