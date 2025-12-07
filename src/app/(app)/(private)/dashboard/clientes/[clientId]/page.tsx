import { createLoader, parseAsInteger, type SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import {
  ClientPageContainer,
  ClientPageContainerSkeleton,
} from '@/src/components/page-containers/clients/client'

const filterSearchParams = {
  page: parseAsInteger,
  perPage: parseAsInteger,
}

const loadSearchParams = createLoader(filterSearchParams)

export default function ClientDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ clientId: string }>
  searchParams: Promise<SearchParams>
}) {
  const queries = loadSearchParams(searchParams)

  return (
    <Suspense fallback={<ClientPageContainerSkeleton />}>
      <ClientPageContainer params={params} searchParams={queries} />
    </Suspense>
  )
}
