import Link from 'next/link'
import { createLoader, parseAsInteger, parseAsString, type SearchParams } from 'nuqs/server'
import Button from '@/src/components/base-components/button'
import { Container } from '@/src/components/base-components/container'
import { ClientList } from '@/src/components/clients/client-list'
import { OrderSelect } from '@/src/components/filter/order-select'
import { getSession } from '@/src/lib/get-session'
import { fetchClients } from './actions'

const filterSearchParams = {
  page: parseAsInteger,
  perPage: parseAsInteger,
  search: parseAsString,
  orderBy: parseAsString,
  order: parseAsString,
}

const loadSearchParams = createLoader(filterSearchParams)

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { organization } = await getSession()
  const queries = await loadSearchParams(searchParams)

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
            <Button className="bg-slate-800 text-white hover:bg-slate-900" size="sm">
              Novo Cliente
            </Button>
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

        {/* {selectedClient && (
					<div className="w-full lg:w-96">
						<ClientDetailsCard
							client={selectedClient}
							redirectCancelLink={`/dashboard/clientes?page=${queries.page}`}
						/>
					</div>
				)} */}
      </div>
    </Container>
  )
}
