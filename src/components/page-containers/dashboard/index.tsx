import { HandCoins, Package, Plus, Users } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { DashboardChartsSkeleton } from '@/src/components/charts/dashboard-charts'
import { getSession } from '@/src/lib/get-session'
import Button from '../../base-components/button'
import { Card } from '../../base-components/card'
import { Container } from '../../base-components/container'
import { Skeleton } from '../../ui/skeleton'
import { ChartsContainer } from './charts'
import { RecentOrdersTable, RecentOrdersTableSkeleton } from './table'

const quickActions = [
  {
    title: 'Novo Cliente',
    description: 'Registre novo cliente',
    icon: <Plus className="size-4" />,
    href: `/dashboard/novo-cliente`,
    color: 'bg-blue-500',
  },
  {
    title: 'Lista de Clientes',
    description: 'Visualize todos os clientes',
    icon: <Users className="size-4" />,
    href: `/dashboard/clientes`,
    color: 'bg-green-500',
  },
  {
    title: 'Nova Compra',
    description: 'Registre nova compra',
    icon: <Package className="size-4" />,
    href: `/dashboard/nova-compra`,
    color: 'bg-purple-500',
  },
  {
    title: 'Novo Pagamento',
    description: 'Registre novo pagamento',
    icon: <HandCoins className="size-4" />,
    href: `/dashboard/novo-pagamento`,
    color: 'bg-orange-500',
  },
]

export const DashboardPageContainer = async () => {
  const { organization } = await getSession()

  return (
    <Container>
      <div className="space-y-8 pb-8">
        <div>
          <h1 className="font-bold text-3xl text-foreground">Dashboard</h1>
          <p className="mt-2">Bem-vindo ao seu painel de controle</p>
        </div>

        <Suspense fallback={<DashboardChartsSkeleton />}>
          <ChartsContainer slug={organization.slug} />
        </Suspense>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Card key={action.title} className="p-4 transition-shadow hover:shadow-lg">
              <Link href={action.href as Route} className="flex items-center justify-center gap-3">
                <div className={`rounded-lg p-2 ${action.color} text-white`}>{action.icon}</div>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-foreground text-lg">{action.title}</h1>
                  <p className="mt-1 text-muted-foreground text-sm">{action.description}</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="mt-8 flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold text-foreground text-xl">Pedidos Recentes</h2>
              <div className="flex items-center gap-4">
                <Link
                  href={`/dashboard/pedidos`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Ver todos
                  </Button>
                </Link>
              </div>
            </div>
            <Suspense fallback={<RecentOrdersTableSkeleton />}>
              <RecentOrdersTable slug={organization.slug} />
            </Suspense>
          </div>
        </div>
      </div>
    </Container>
  )
}

export const DashboardPageContainerSkeleton = () => {
  return (
    <Container>
      <div className="space-y-8 pb-8">
        <div>
          <h1 className="font-bold text-3xl text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Bem-vindo ao seu painel de controle</p>
        </div>

        <DashboardChartsSkeleton />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="p-4">
              <div className="flex items-center justify-center gap-4">
                <div className={`rounded-lg p-3 ${action.color} text-white`}>{action.icon}</div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-foreground text-lg">{action.title}</h3>
                  <p className="mt-1 text-muted-foreground text-sm">{action.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="mt-8 flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold text-foreground text-xl">Pedidos Recentes</h2>
              <Skeleton className="h-8 w-20" />
            </div>
            <RecentOrdersTableSkeleton />
          </div>
        </div>
      </div>
    </Container>
  )
}
