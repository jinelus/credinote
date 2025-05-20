
import { Container } from '@/src/components/base-components/container'
import Button from '@/src/components/base-components/button'
import { Plus, Users, ShoppingCart, Package } from 'lucide-react'
import { Card } from '@/src/components/base-components/card'
import Link from 'next/link'

export default function DashboardPage() {

  const quickActions = [
    {
      title: 'Novo Cliente',
      description: 'Cadastre um novo cliente',
      icon: <Plus className="w-6 h-6" />,
      href: '/novo-cliente',
      color: 'bg-blue-500'
    },
    {
      title: 'Lista de Clientes',
      description: 'Visualize todos os clientes',
      icon: <Users className="w-6 h-6" />,
      href: '/clientes',
      color: 'bg-green-500'
    },
    {
      title: 'Pedidos',
      description: 'Gerencie os pedidos',
      icon: <Package className="w-6 h-6" />,
      href: '/pedidos',
      color: 'bg-purple-500'
    },
    {
      title: 'Compras',
      description: 'Registre novas compras',
      icon: <ShoppingCart className="w-6 h-6" />,
      href: '/compras',
      color: 'bg-orange-500'
    }
  ]

  const recentOrders = [
    {
      id: '1',
      clientName: 'João Silva',
      amount: 150.00,
      status: 'Pago',
      date: '2024-04-12'
    },
    {
      id: '2',
      clientName: 'Maria Santos',
      amount: 230.50,
      status: 'Pendente',
      date: '2024-04-11'
    },
    {
      id: '3',
      clientName: 'Pedro Oliveira',
      amount: 89.90,
      status: 'Pago',
      date: '2024-04-10'
    },
    {
      id: '4',
      clientName: 'Ana Costa',
      amount: 450.00,
      status: 'Pendente',
      date: '2024-04-09'
    }
  ]

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

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Pedidos Recentes</h2>
            <div className="flex items-center gap-4">
              <select
                // value={sortBy}
                // onChange={}
                className="h-10 hover:cursor-pointer rounded-md bg-white  text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800"
              >
                <option value="date-desc">Data (mais recente)</option>
                <option value="date-asc">Data (mais antiga)</option>
                <option value="value-desc">Valor (maior)</option>
                <option value="value-asc">Valor (menor)</option>
              </select>
              <Link href="/pedidos" className="text-slate-600 hover:text-slate-900">
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
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recentOrders.map((order, index) => (
                    <tr key={order.id} className={`hover:bg-slate-100 cursor-pointer ${index % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{order.clientName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">
                          R$ {order.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Pago' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(order.date).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
} 