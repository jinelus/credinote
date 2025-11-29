import { HandCoins, Package, Plus, Users } from 'lucide-react'
import Link from 'next/link'
import Button from '@/src/components/base-components/button'
import { Card } from '@/src/components/base-components/card'
import { Container } from '@/src/components/base-components/container'
import { OrderList } from '@/src/components/orders/order-list'
import { getSession } from '@/src/lib/get-session'
import { getOrders, getOrdersAndPaymentsData, getTopClientsByOrders } from './action'
import { DashboardCharts } from './dashboard-charts'

export default async function DashboardPage() {
  const { organization } = await getSession()

  const quickActions = [
    {
      title: 'Novo Cliente',
      description: 'Cadastre um novo cliente',
      icon: <Plus className="h-6 w-6" />,
      href: `/dashboard/novo-cliente`,
      color: 'bg-blue-500',
    },
    {
      title: 'Lista de Clientes',
      description: 'Visualize todos os clientes',
      icon: <Users className="h-6 w-6" />,
      href: `/dashboard/clientes`,
      color: 'bg-green-500',
    },
    {
      title: 'Nova Compra',
      description: 'Cadastre um nova compra',
      icon: <Package className="h-6 w-6" />,
      href: `/dashboard/nova-compra`,
      color: 'bg-purple-500',
    },
    {
      title: 'Novo Pagamento',
      description: 'Registre novo pagamento',
      icon: <HandCoins className="h-6 w-6" />,
      href: `/dashboard/novo-pagamento`,
      color: 'bg-orange-500',
    },
  ]

  const recentOrders = await getOrders(organization.slug, { perPage: 5 })

  // Fetch chart data
  const ordersPaymentsData = await getOrdersAndPaymentsData(organization.slug, '90d')
  const topClientsData = await getTopClientsByOrders(organization.slug)

  if (!recentOrders.success || !recentOrders.data) {
    return
  }

  return (
    <Container>
      <div className="space-y-8 pb-8">
        <div>
          <h1 className="font-bold text-3xl text-slate-800">Dashboard</h1>
          <p className="mt-2 text-slate-600">Bem-vindo ao seu painel de controle</p>
        </div>
        <DashboardCharts
          slug={organization.slug}
          initialOrdersPaymentsData={ordersPaymentsData.success ? ordersPaymentsData.data : []}
          topClientsData={topClientsData.success ? topClientsData.data : []}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="p-3 transition-shadow hover:shadow-lg">
              <Link href={action.href} className='flex items-center justify-center gap-2'>
                <div className={`rounded-lg p-3 ${action.color} text-white`}>{action.icon}</div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg text-slate-800">{action.title}</h3>
                  <p className="mt-1 text-muted-foreground text-sm">{action.description}</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="mt-8 flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800 text-xl">Pedidos Recentes</h2>
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/pedidos`} className="text-slate-600 hover:text-slate-900">
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:text-white">
                    Ver todos
                  </Button>
                </Link>
              </div>
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
                    {recentOrders.data.orders.length > 0 ? (
                      recentOrders.data.orders.map((order, index) => (
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
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
