import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createLoader, parseAsInteger, type SearchParams } from 'nuqs/server'
import { GoBackBtn } from '@/src/components/back-btn'
import { Card } from '@/src/components/base-components/card'
import { Container } from '@/src/components/base-components/container'
import ClientTimeline from '@/src/components/client-timeline'
import { EditUser } from '@/src/components/dialog/edit-client'
import { PaginationButtons } from '@/src/components/pagination'
import { Button } from '@/src/components/ui/button'
import { getSession } from '@/src/lib/get-session'
import { formatCurrency } from '@/src/lib/utils'
import { getClientDetails } from '../actions'

const filterSearchParams = {
  page: parseAsInteger,
  perPage: parseAsInteger,
}

const loadSearchParams = createLoader(filterSearchParams)

export default async function ClientDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ clientId: string }>
  searchParams: Promise<SearchParams>
}) {
  const { clientId } = await params
  const { organization } = await getSession()
  const queries = await loadSearchParams(searchParams)

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mt-2 font-bold text-3xl text-slate-800">{client.name}</h1>
            <p className="text-slate-500 text-sm">CPF: {client.cpf}</p>
          </div>
          <div className="flex gap-4">
            <EditUser client={client} organizationId={organization.id} />
          </div>
        </div>

        <div className="grid items-start gap-4 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="font-medium text-slate-800 text-sm">Pedidos</h3>
            <p className="text-slate-500 text-sm">{ordersCount} pedido(s) registrados</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-medium text-slate-800 text-sm">Pagamentos</h3>
            <p className="text-slate-500 text-sm">{paymentsCount} pagamento(s) registrados</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-medium text-slate-800 text-sm">Saldo em aberto</h3>
            <p className="mt-2 font-semibold text-2xl text-slate-800">
              {formatCurrency(outstandingBalance)}
            </p>
            <p className="text-slate-500 text-sm">Atualizado automaticamente após pagamentos</p>
          </Card>
        </div>

        <div className="flex w-full flex-col-reverse items-start gap-8 lg:flex-row">
          <div className="w-full lg:w-auto lg:flex-1">
            <Card className="px-3 py-6 lg:p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-semibold text-slate-800 text-xl">Linha do tempo</h2>
                <span className="text-slate-500 text-sm">{events.length} evento(s)</span>
              </div>
              <ClientTimeline clientId={client.id} events={events} />
            </Card>
            {maxPage > 1 && <PaginationButtons currentPage={page} maxPage={maxPage} />}
          </div>

          <div className="sticky top-0 w-full space-y-4 lg:w-auto">
            <div className='flex w-full flex-col gap-4'>
              <Link href={`/dashboard/nova-compra?client=${client.id}`}>
                <Button variant="outline" className="w-full">
                  Nova Compra
                </Button>
              </Link>
              <Link href={`/dashboard/novo-pagamento?client=${client.id}`}>
                <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                  Novo Pagamento
                </Button>
              </Link>
            </div>
            <Card className="w-full space-y-4 p-6 lg:w-auto">
              <h2 className="font-semibold text-slate-800 text-xl">Informações do cliente</h2>
              <div className="space-y-3 text-slate-600 text-sm">
                <p>
                  <span className="font-medium text-slate-500">Telefone: </span>
                  {client.telephone || 'Não informado'}
                </p>
                <p>
                  <span className="font-medium text-slate-500">Criado em: </span>
                  {client.createdAt.toLocaleDateString('pt-BR')}
                </p>
                <p>
                  <span className="font-medium text-slate-500">Última atualização: </span>
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
