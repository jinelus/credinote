import { Container } from '@/src/components/base-components/container'
import { ClientList } from '@/src/components/clients/client-list'
import { ClientDetailsCard } from '@/src/components/clients/client-details-card'
import Button from '@/src/components/base-components/button'
import Link from 'next/link'
import { fetchClients } from '@/src/app/(app)/(private)/[slug]/clientes/actions'
import { createLoader, parseAsInteger, parseAsString, type SearchParams } from 'nuqs/server'

const filterSearchParams = {
  client: parseAsString,
  page: parseAsInteger
}

const loadSearchParams = createLoader(filterSearchParams)

export default async function ClientsPage({
  searchParams,
  params
}: {
  searchParams: Promise<SearchParams>
  params: Promise<{ slug: string }>
}) {
  const { client, page } = await loadSearchParams(searchParams)
  const { slug } = await params

  const clients = await fetchClients({ 
    slug, 
    params: {
      page: Number(page) || 1
    } 
  })

  if(!clients.success) {
    return
  }


  const selectedClient = client 
    ? clients.data?.find(c => c.id === client)
    : null

  return (
    <Container className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Clientes</h1>
        <div className='flex items-center gap-4'>
          <select
            // value={sortBy}
            // onChange={}
            className="h-10 hover:cursor-pointer rounded-md bg-white border border-slate-700 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800"
          >
            <option value="date-desc">Data (mais recente)</option>
            <option value="date-asc">Data (mais antiga)</option>
            <option value="value-desc">Valor (maior)</option>
            <option value="value-asc">Valor (menor)</option>
          </select>
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
            clients={clients.data ?? []}
            selectedClientId={client || null}
            currentPage={page ?? 1}
            slug={slug}
          />
        </div>

        {selectedClient && (
          <div className="lg:w-96 w-full">
            <ClientDetailsCard
              client={selectedClient}
              slug={slug}
              redirectCancelLink={`/${slug}/clientes?page=${page}`}
            />
          </div>
        )}
      </div>
    </Container>
  )
}
