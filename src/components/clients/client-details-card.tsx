import { Card } from '@/src/components/base-components/card'
import Button from '@/src/components/base-components/button'
import { User, X } from 'lucide-react'
import Link from 'next/link'

interface Client {
  id: string
  name: string
  cpf: string
  telephone: string
  amount: number
}

interface ClientDetailsCardProps {
  client: Client
  slug: string
  redirectCancelLink: string
}

export function ClientDetailsCard({ client, slug, redirectCancelLink }: ClientDetailsCardProps) {


  return (
    <div className="lg:w-96 w-full">
      <Card className="sticky top-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Detalhes do Cliente</h2>
            <Link href={`${redirectCancelLink}`}>
              <button
                className="text-slate-400 hover:text-slate-500"
                >
                <X className="h-5 w-5" />
              </button>
              </Link>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="h-8 w-8 text-slate-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{client.name}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">CPF</label>
                <p className="mt-1 text-sm text-slate-900">{client.cpf}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Telefone</label>
                <p className="mt-1 text-sm text-slate-900">{client.telephone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Total Gasto</label>
                <p className="mt-1 text-sm text-slate-900">
                  R$ {client.amount}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Link href={`/${slug}/nova-compra?client=${client.id}`}>
                <Button
                  className="w-full bg-slate-800 text-white hover:bg-slate-900"
                  >
                  Nova Compra
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 