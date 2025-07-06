
import { Container } from '@/src/components/base-components/container'
import Button from '@/src/components/base-components/button'
import { Plus, Users, ShoppingCart, Package } from 'lucide-react'
import { Card } from '@/src/components/base-components/card'
import Link from 'next/link'
import { getClient, getOrders } from './action'
import { ClientDetailsCard } from '@/src/components/clients/client-details-card'
import { OrderList } from '@/src/components/orders/order-list'
import { createLoader, parseAsString } from 'nuqs/server'

const filterSearchParams = {
  client: parseAsString
}

const loadSearchParams = createLoader(filterSearchParams)

export default async function DashboardPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {

  const { slug } = await params
  const { client } = await loadSearchParams(searchParams)

  const quickActions = [
    {
      title: 'Novo Cliente',
      description: 'Cadastre um novo cliente',
      icon: <Plus className="w-6 h-6" />,
      href: `/${slug}/novo-cliente`,
      color: 'bg-blue-500'
    },
    {
      title: 'Lista de Clientes',
      description: 'Visualize todos os clientes',
      icon: <Users className="w-6 h-6" />,
      href: `/${slug}/clientes`,
      color: 'bg-green-500'
    },
    {
      title: 'Pedidos',
      description: 'Gerencie os pedidos',
      icon: <Package className="w-6 h-6" />,
      href: `/${slug}/pedidos`,
      color: 'bg-purple-500'
    },
    {
      title: 'Compras',
      description: 'Registre novas compras',
      icon: <ShoppingCart className="w-6 h-6" />,
      href: `/${slug}/compras`,
      color: 'bg-orange-500'
    }
  ]

  const recentOrders = await getOrders({})

  if (!recentOrders.success || !recentOrders.data) {
    return
  }

  const selectedClient = client ? await getClient(client) : null

  return (
    <Container className="min-h-screen">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600 mt-2">Bem-vindo ao seu painel de controle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Card key={action.title} className="p-6 hover:shadow-lg transition-shadow">
              <Link href={action.href} className="flex flex-col items-start justify-between">
                <div className={`p-3 rounded-lg ${action.color} text-white`}>
                  {action.icon}
                </div>
              <h3 className="text-lg font-semibold mt-4 text-slate-800">{action.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{action.description}</p>
              </Link>
            </Card>
          ))}
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          <div className="mt-8 flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Pedidos Recentes</h2>
              <div className="flex items-center gap-4">
                <Link href={`/${slug}/pedidos`} className="text-slate-600 hover:text-slate-900">
                  <Button
                    variant="ghost"
                    size='sm'
                    className="text-slate-600 hover:text-white"
                  >
                    Ver todos
                  </Button>
              </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {recentOrders.data.length > 0 ? recentOrders.data.map((order, index) => (
                      <OrderList
                        key={order.id}
                        index={index}
                        order={order}
                      />
                    )) : (
                      <tr>
                        <td colSpan={3} className='text-center py-3'> Nenhum pedido achado </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {selectedClient?.success && selectedClient.data && (
          <div className="lg:w-96 w-full">
            <ClientDetailsCard
              client={selectedClient.data}
              slug={slug}
              redirectCancelLink={`/${slug}`}
            />
          </div>
        )}
        </div>
      </div>
    </Container>
  )
} 