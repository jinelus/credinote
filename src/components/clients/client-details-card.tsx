'use client'

import { Card } from '@/src/components/base-components/card'
import Button from '@/src/components/base-components/button'
import { useRouter } from 'next/navigation'
import { User, X } from 'lucide-react'

interface Client {
  id: string
  name: string
  cpf: string
  phone: string
  address: string
  ordersCount: number
  totalSpent: number
  createdAt?: string
}

interface ClientDetailsCardProps {
  client: Client
  currentPage: string
}

export function ClientDetailsCard({ client, currentPage }: ClientDetailsCardProps) {
  const router = useRouter()

  const handleClose = () => {
    router.push(`/clientes?page=${currentPage}`)
  }

  return (
    <div className="lg:w-96 w-full">
      <Card className="sticky top-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Detalhes do Cliente</h2>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="h-8 w-8 text-slate-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{client.name}</h3>
                <p className="text-sm text-slate-500">Cliente desde {client.createdAt}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">CPF</label>
                <p className="mt-1 text-sm text-slate-900">{client.cpf}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Telefone</label>
                <p className="mt-1 text-sm text-slate-900">{client.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Total de Pedidos</label>
                <p className="mt-1 text-sm text-slate-900">{client.ordersCount}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Total Gasto</label>
                <p className="mt-1 text-sm text-slate-900">
                  R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Button
                onClick={() => router.push('/novo-pedido')}
                className="w-full bg-slate-800 text-white hover:bg-slate-900"
              >
                Novo Pedido
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 