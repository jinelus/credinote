import { createLoader, parseAsInteger, parseAsString, type SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import {
  PaymentsPageContainer,
  PaymentsPageContainerSkeleton,
} from '@/src/components/page-containers/payments'

const filterSearchParams = {
  payment: parseAsString,
  perPage: parseAsInteger,
  page: parseAsInteger,
  orderBy: parseAsString,
  order: parseAsString,
  search: parseAsString,
}

const loadSearchParams = createLoader(filterSearchParams)

export default function PaymentsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const queries = loadSearchParams(searchParams)

  return (
    <Suspense fallback={<PaymentsPageContainerSkeleton />}>
      <PaymentsPageContainer searchParams={queries} />
    </Suspense>
  )
}
