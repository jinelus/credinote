import { Container } from '@/src/components/base-components/container'
import { getOrganizationBySlug } from '@/src/app/actions/organization'
import { redirect } from 'next/navigation'
import { createLoader, parseAsInteger, parseAsString, type SearchParams } from 'nuqs/server'
import Button from '@/src/components/base-components/button'
import Link from 'next/link'
import { PaymentList } from '@/src/components/payments/payment-list'
import { PaymentDetailsCard } from '@/src/components/payments/payment-details-card'
import { fetchPayments, getPaymentById } from './actions'

const filterSearchParams = {
  payment: parseAsString,
  page: parseAsInteger
}

const loadSearchParams = createLoader(filterSearchParams)

export default async function PaymentsPage({
  searchParams,
  params
}: {
  searchParams: Promise<SearchParams>
  params: Promise<{ slug: string }>
}) {
  const { payment, page } = await loadSearchParams(searchParams)
  const { slug } = await params

  const organization = await getOrganizationBySlug(slug)

  if (!organization) {
    redirect('/signin')
  }

  const payments = await fetchPayments({ 
    userId: organization.id, 
    params: {
      page: Number(page) || 1
    } 
  })

  if(!payments.success) {
    return
  }

  const selectedPayment = payment 
    ? await getPaymentById(payment)
    : null

  return (
    <Container className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Pagamentos</h1>
        <div className='flex items-center gap-4'>
          <select
            className="h-10 hover:cursor-pointer rounded-md bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800"
          >
            <option value="date-desc">Data (mais recente)</option>
            <option value="date-asc">Data (mais antiga)</option>
            <option value="value-desc">Valor (maior)</option>
            <option value="value-asc">Valor (menor)</option>
          </select>
          <Link href={`/${slug}/novo-pagamento`}>
            <Button
              className="bg-slate-800 text-white hover:bg-slate-900"
              size='sm'
            >
              Novo Pagamento
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <PaymentList 
            payments={payments.data ?? []}
            selectedPaymentId={payment || null}
            currentPage={page ?? 1}
            slug={slug}
          />
        </div>

        {selectedPayment?.success && selectedPayment.data && (
          <div className="lg:w-96 w-full">
            <PaymentDetailsCard
              payment={selectedPayment.data}
              slug={slug}
              redirectCancelLink={`/${slug}/pagamentos?page=${page}`}
            />
          </div>
        )}
      </div>
    </Container>
  )
} 