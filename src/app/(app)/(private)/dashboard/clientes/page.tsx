import { createLoader, parseAsInteger, parseAsString, type SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { ClientsPageContainer } from '@/src/components/page-containers/clients'
import { OrdersContainerSkeleton } from '@/src/components/page-containers/orders'

const filterSearchParams = {
  page: parseAsInteger,
  perPage: parseAsInteger,
  search: parseAsString,
  orderBy: parseAsString,
  order: parseAsString,
}

const loadSearchParams = createLoader(filterSearchParams)

export default function ClientsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const queries = loadSearchParams(searchParams)

  return (
    <Suspense fallback={<OrdersContainerSkeleton />}>
      <ClientsPageContainer searchParams={queries} />
    </Suspense>
  )
}
