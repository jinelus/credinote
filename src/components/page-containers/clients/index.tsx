import Link from 'next/link'
import { fetchClients } from '@/src/app/(app)/(private)/dashboard/clientes/actions'
import { getSession } from '@/src/lib/get-session'
import Button from '../../base-components/button'
import { Container } from '../../base-components/container'
import { ClientList } from '../../clients/client-list'
import { OrderSelect } from '../../filter/order-select'

type SearchParams = {
  page: number | null
  perPage: number | null
  orderBy: string | null
  order: string | null
  search: string | null
}

export const ClientsPageContainer = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) => {
  const { organization } = await getSession()
  const queries = await searchParams

  const response = await fetchClients({
    slug: organization.slug,
    params: {
      perPage: queries.perPage ?? 10,
      page: queries.page ?? 1,
      search: queries.search ?? '',
      order: (queries.order as 'asc' | 'desc') ?? 'desc',
      orderBy: queries.orderBy ?? 'createdAt',
    },
  })

  if (!response.success) {
    return
  }

  return (
    <Container className="min-h-screen">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="font-bold text-2xl text-slate-800 sm:text-3xl">Clientes</h1>
        <div className="flex items-center gap-4">
          <OrderSelect />
          <Link href={`/dashboard/novo-cliente`}>
            <Button size="sm">Novo Cliente</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <ClientList
            clients={response.data.clients ?? []}
            currentPage={queries.page ?? 1}
            maxPage={response.data.maxPage}
            totalItems={response.data.total}
          />
        </div>
      </div>
    </Container>
  )
}
