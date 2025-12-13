import { createLoader, parseAsInteger, parseAsString, type SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { OrdersContainer, OrdersContainerSkeleton } from '@/src/components/page-containers/orders'

const filterSearchParams = {
  perPage: parseAsInteger,
  page: parseAsInteger,
  orderBy: parseAsString,
  order: parseAsString,
  search: parseAsString,
}

const loadSearchParams = createLoader(filterSearchParams)

export default function OrdersPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const queries = loadSearchParams(searchParams)

  return (
    <Suspense fallback={<OrdersContainerSkeleton />}>
      <OrdersContainer queryParams={queries} />
    </Suspense>
  )
}
