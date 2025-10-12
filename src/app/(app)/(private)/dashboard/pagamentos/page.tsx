import Link from 'next/link'
import {
	createLoader,
	parseAsInteger,
	parseAsString,
	type SearchParams,
} from 'nuqs/server'
import Button from '@/src/components/base-components/button'
import { Container } from '@/src/components/base-components/container'
import { OrderSelect } from '@/src/components/filter/order-select'
import { SearchFilter } from '@/src/components/filter/search'
import { PaginationButtons } from '@/src/components/pagination'
import { PaymentList } from '@/src/components/payments/payment-list'
import { getSession } from '@/src/lib/get-session'
import type { PaginationParams } from '@/src/utils/types'
import { fetchPayments } from './actions'

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
}: {
	searchParams: Promise<SearchParams>
}) {
	const { organization } = await getSession()
	const queries = await loadSearchParams(searchParams)

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
						<h1 className="font-bold text-2xl text-slate-800 sm:text-3xl">
							Pagamentos
						</h1>
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
					<PaymentList
						payments={response.data.payments ?? []}
						currentPage={queries.page ?? 1}
					/>
					<PaginationButtons
						currentPage={queries.page ?? 1}
						maxPage={response.data.maxPage}
					/>
				</div>
			</div>
		</Container>
	)
}
