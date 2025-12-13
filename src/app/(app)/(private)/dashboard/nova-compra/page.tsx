import { createLoader, parseAsString, type SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { NewOrderPageContainer } from '@/src/components/page-containers/orders/new'

const clientIdSearchParams = {
  client: parseAsString,
}

const loadSearchParams = createLoader(clientIdSearchParams)

export default function CreateOrderPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const queries = loadSearchParams(searchParams)

  return (
    <Suspense>
      <NewOrderPageContainer searchParams={queries} />
    </Suspense>
  )
}
