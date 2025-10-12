import Link from 'next/link'
import {
	createLoader,
	parseAsInteger,
	parseAsString,
	type SearchParams,
} from 'nuqs/server'
import Button from '@/src/components/base-components/button'
import { Container } from '@/src/components/base-components/container'
import { ClientDetailsCard } from '@/src/components/clients/client-details-card'
import { OrderSelect } from '@/src/components/filter/order-select'
import { SearchFilter } from '@/src/components/filter/search'
import { OrderList } from '@/src/components/orders/order-list'
import { PaginationButtons } from '@/src/components/pagination'
import { getSession } from '@/src/lib/get-session'
import type { PaginationParams } from '@/src/utils/types'
import { getClient, getOrders } from '../action'

const filterSearchParams = {
	client: parseAsString,
	perPage: parseAsInteger,
	page: parseAsInteger,
	orderBy: parseAsString,
	order: parseAsString,
	search: parseAsString,
}

const loadSearchParams = createLoader(filterSearchParams)

export default async function OrdersPage({
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

	const response = await getOrders(organization.slug, defaultParams)

	if (!response.success || !response.data) {
		return
	}

	const selectedClient = queries.client ? await getClient(queries.client) : null

	return (
		<Container className="flex flex-col gap-8 lg:flex-row">
			<div className="mt-8 flex-1">
				<div>
					<div className="mb-6 flex items-center justify-between">
						<h2 className="font-semibold text-slate-800 text-xl">
							Todos Pedidos
						</h2>
						<div className="flex items-center gap-4">
							<OrderSelect />
							<Link href={`/dashboard/nova-compra`}>
								<Button>Nova compra</Button>
							</Link>
						</div>
					</div>
					<SearchFilter placeholder="Buscar por nome..." />
				</div>

				<div className="overflow-hidden rounded-lg bg-white shadow">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-slate-200">
								<tr>
									<th className="px-6 py-3 text-left font-medium text-slate-500 text-xs uppercase tracking-wider">
										Cliente
									</th>
									<th className="px-6 py-3 text-left font-medium text-slate-500 text-xs uppercase tracking-wider">
										Valor
									</th>
									<th className="px-6 py-3 text-left font-medium text-slate-500 text-xs uppercase tracking-wider">
										Data
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-200">
								{response.data.orders.length > 0 ? (
									response.data.orders.map((order, index) => (
										<OrderList key={order.id} index={index} order={order} />
									))
								) : (
									<tr>
										<td colSpan={3} className="py-3 text-center">
											{' '}
											Nenhum pedido achado{' '}
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
					<PaginationButtons
						currentPage={queries.page ?? 1}
						maxPage={response.data.maxPage}
					/>
				</div>
			</div>

			{selectedClient?.success && selectedClient.data && (
				<div className="w-full lg:w-96">
					<ClientDetailsCard
						client={selectedClient.data}
						redirectCancelLink={`/dashboard/pedidos`}
					/>
				</div>
			)}
		</Container>
	)
}
