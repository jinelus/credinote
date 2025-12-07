import Link from 'next/link'
import { fetchPayments } from '@/src/app/(app)/(private)/dashboard/pagamentos/actions'
import { getSession } from '@/src/lib/get-session'
import type { PaginationParams } from '@/src/utils/types'
import Button from '../../base-components/button'
import { Container } from '../../base-components/container'
import { OrderSelect } from '../../filter/order-select'
import { SearchFilter } from '../../filter/search'
import { PaginationButtons } from '../../pagination'
import { PaymentList, PaymentListSkeleton } from '../../payments/payment-list'
import { Skeleton } from '../../ui/skeleton'

type SearchParams = {
  perPage: number | null
  page: number | null
  orderBy: string | null
  order: string | null
  search: string | null
}

export const PaymentsPageContainer = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) => {
  const { organization } = await getSession()

  const queries = await searchParams

  const defaultParams: PaginationParams = {
    page: queries.page ?? 1,
    perPage: queries.perPage ?? 10,
    orderBy: queries.orderBy ?? 'createdAt',
    order: (queries.order as 'asc' | 'desc') ?? 'desc',
    search: queries.search ?? '',
  }

  const response = await fetchPayments({
    organizationId: organization.id,
    params: defaultParams,
  })

  if (!response.success) {
    return
  }

  return (
    <Container className="min-h-screen">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <h1 className="font-bold text-2xl text-slate-800 sm:text-3xl">Pagamentos</h1>
            <div className="flex items-center gap-4">
              <OrderSelect />
              <Link href={`/dashboard/novo-pagamento`}>
                <Button className="">Novo pagemento</Button>
              </Link>
            </div>
          </div>
          <SearchFilter placeholder="Buscar por nome..." />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <PaymentList payments={response.data.payments ?? []} />
          <PaginationButtons currentPage={queries.page ?? 1} maxPage={response.data.maxPage} />
        </div>
      </div>
    </Container>
  )
}

export const PaymentsPageContainerSkeleton = () => {
  return (
    <Container className="min-h-screen">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <h1 className="font-bold text-2xl text-slate-800 sm:text-3xl">Pagamentos</h1>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-[180px]" />
              <Button disabled>Novo pagamento</Button>
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <PaymentListSkeleton />
          <div className="flex items-center justify-center gap-2 border-slate-200 border-t px-6 py-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </Container>
  )
}
