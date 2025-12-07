import Link from 'next/link'
import { getOrders } from '@/src/app/(app)/(private)/dashboard/action'
import { getSession } from '@/src/lib/get-session'
import type { PaginationParams } from '@/src/utils/types'
import Button from '../../base-components/button'
import { Container } from '../../base-components/container'
import { OrderSelect } from '../../filter/order-select'
import { SearchFilter } from '../../filter/search'
import { OrderList, OrderListSkeleton } from '../../orders/order-list'
import { PaginationButtons } from '../../pagination'
import { Skeleton } from '../../ui/skeleton'

type SearchParams = {
  perPage: number | null
  page: number | null
  orderBy: string | null
  order: string | null
  search: string | null
}

export async function OrdersContainer({ queryParams }: { queryParams: Promise<SearchParams> }) {
  const { organization } = await getSession()

  const queries = await queryParams

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
  return (
    <Container className="flex flex-col gap-8 lg:flex-row">
      <div className="mt-8 flex-1">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 text-xl">Todos Pedidos</h2>
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
          <PaginationButtons currentPage={queries.page ?? 1} maxPage={response.data.maxPage} />
        </div>
      </div>
    </Container>
  )
}

export const OrdersContainerSkeleton = () => {
  return (
    <Container className="flex flex-col gap-8 lg:flex-row">
      <div className="mt-8 flex-1">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 text-xl">Todos Pedidos</h2>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
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
                <OrderListSkeleton />
              </tbody>
            </table>
          </div>
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
