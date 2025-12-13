import { createLoader, parseAsString, type SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import {
  NewPaymentContainer,
  NewPaymentContainerSkeleton,
} from '@/src/components/page-containers/payments/new-payment'

const clientIdSearchParams = {
  client: parseAsString,
}

const loadSearchParams = createLoader(clientIdSearchParams)

export default function CreatePaymentPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const queries = loadSearchParams(searchParams)

  return (
    <Suspense fallback={<NewPaymentContainerSkeleton />}>
      <NewPaymentContainer searchParams={queries} />
    </Suspense>
  )
}
