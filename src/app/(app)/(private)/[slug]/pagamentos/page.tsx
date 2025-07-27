import { Container } from '@/src/components/base-components/container'
import { getOrganizationBySlug } from '@/src/app/actions/organization'
import { redirect } from 'next/navigation'
import { createLoader, parseAsInteger, parseAsString, type SearchParams } from 'nuqs/server'
import { PaymentList } from '@/src/components/payments/payment-list'
import { fetchPayments } from './actions'
import { OrderSelect } from '@/src/components/filter/order-select'
import { SearchFilter } from '@/src/components/filter/search'
import type { PaginationParams } from '@/src/utils/types'
import { PaginationButtons } from '@/src/components/pagination'
import Link from 'next/link'
import Button from '@/src/components/base-components/button'

const filterSearchParams = {
  payment: parseAsString,
  perPage: parseAsInteger,
  page: parseAsInteger,
  orderBy: parseAsString,
  order: parseAsString,
  search: parseAsString,
}

const loadSearchParams = createLoader(filterSearchParams)

export default async function PaymentsPage({
  searchParams,
  params
}: {
  searchParams: Promise<SearchParams>
  params: Promise<{ slug: string }>
}) {
  const queries = await loadSearchParams(searchParams)
  const { slug } = await params

  const defaultParams: PaginationParams = {
    page: queries.page ?? 1,
    perPage: queries.perPage ?? 10,
    orderBy: queries.orderBy ?? 'createdAt',
    order: queries.order as ('asc' | 'desc') ?? 'desc',
    search: queries.search ?? ''
}

  const organization = await getOrganizationBySlug(slug)

  if (!organization) {
    redirect('/signin')
  }

  const response = await fetchPayments({ 
    organizationId: organization.id, 
    params: defaultParams
  })

  if(!response.success) {
    return
  }


  return (
    <Container className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className='flex flex-col gap-4 w-full'>
            <div className="flex items-center justify-between w-full">
               <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Pagamentos</h1>
               <div className='flex items-center gap-4'>
                 <OrderSelect />
                 <Link href={`/${slug}/novo-pagamento`}>
                    <Button className=''>
                      Novo pagemento
                    </Button>
                 </Link>
               </div>
            </div>
            <SearchFilter placeholder="Buscar por nome..." />
          </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <PaymentList 
            payments={response.data.payments ?? []}
            currentPage={queries.page ?? 1}
            slug={slug}
          />
          <PaginationButtons currentPage={queries.page ?? 1} maxPage={response.data.maxPage} />
        </div>
      </div>
    </Container>
  )
} 