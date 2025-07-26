import { Container } from '@/src/components/base-components/container'
import { ClientList } from '@/src/components/clients/client-list'
import { ClientDetailsCard } from '@/src/components/clients/client-details-card'
import Button from '@/src/components/base-components/button'
import Link from 'next/link'
import { fetchClients } from '@/src/app/(app)/(private)/[slug]/clientes/actions'
import { createLoader, parseAsInteger, parseAsString, type SearchParams } from 'nuqs/server'
import { OrderSelect } from '@/src/components/filter/order-select'

const filterSearchParams = {
  client: parseAsString,
  page: parseAsInteger,
  perPage: parseAsInteger,
  search: parseAsString,
  orderBy: parseAsString,
  order: parseAsString
}

const loadSearchParams = createLoader(filterSearchParams)

export default async function ClientsPage({
  searchParams,
  params
}: {
  searchParams: Promise<SearchParams>
  params: Promise<{ slug: string }>
}) {
  const queries = await loadSearchParams(searchParams)
  const { slug } = await params

  const response = await fetchClients({ 
    slug,
    params: {
      perPage: queries.perPage ?? 10,
      page: queries.page ?? 1,
      search: queries.search ?? '',
      order: queries.order as ('asc' | 'desc') ?? 'desc',
      orderBy: queries.orderBy ?? 'createdAt'
    }
  })

  if(!response.success) {
    return
  }


  const selectedClient = queries.client 
    ? response.data.clients?.find(c => c.id === queries.client)
    : null

  return (
    <Container className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Clientes</h1>
        <div className='flex items-center gap-4'>
          <OrderSelect />
          <Link href={`/${slug}/novo-cliente`}>
            <Button
              className="bg-slate-800 text-white hover:bg-slate-900"
              size='sm'
            >
              Novo Cliente
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <ClientList 
            clients={response.data.clients ?? []}
            selectedClientId={queries.client || null}
            currentPage={queries.page ?? 1}
            slug={slug}
            maxPage={response.data.maxPage}
            totalItems={response.data.total}
          />
        </div>

        {selectedClient && (
          <div className="lg:w-96 w-full">
            <ClientDetailsCard
              client={selectedClient}
              slug={slug}
              redirectCancelLink={`/${slug}/clientes?page=${queries.page}`}
            />
          </div>
        )}
      </div>
    </Container>
  )
}
