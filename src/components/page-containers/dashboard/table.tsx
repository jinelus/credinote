import { getOrders } from '@/src/app/(app)/(private)/dashboard/action'
import { OrderList } from '../../orders/order-list'
import { Skeleton } from '../../ui/skeleton'

export const RecentOrdersTable = async ({ slug }: { slug: string }) => {
  const recentOrders = await getOrders(slug, { perPage: 5 })

  return (
    <div className="overflow-hidden rounded-lg bg-card shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentOrders.success && recentOrders.data.orders.length > 0 ? (
              recentOrders.data.orders.map((order, index) => (
                <OrderList key={order.id} index={index} order={order} />
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-3 text-center text-muted-foreground">
                  {' '}
                  Nenhum pedido achado{' '}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const RecentOrdersTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-card shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={`skeleton-row-${index}`} className="h-[57px]">
                {' '}
                {/* ← Hauteur fixe */}
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
