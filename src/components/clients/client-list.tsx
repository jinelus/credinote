'use client'

import { Card } from '@/src/components/base-components/card'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { SearchFilter } from '../filter/search'
import { PaginationButtons } from '../pagination'

interface Client {
  id: string
  name: string
  cpf: string
  telephone: string
  amount: number
}

interface ClientListProps {
  clients: Client[]
  selectedClientId: string | null
  currentPage: number
  slug: string
  totalItems: number
  maxPage: number
}

export function ClientList({ 
  clients, 
  selectedClientId, 
  currentPage, 
  slug,
  maxPage,
}: ClientListProps) {
  const router = useRouter()

  const handleClientSelect = (clientId: string) => {
    const params = new URLSearchParams()
    params.set('client', clientId)
    params.set('page', currentPage.toString())
    router.push(`/${slug}/clientes?${params.toString()}`)
  }

  return (
    <div className="flex-1">

      <SearchFilter placeholder="Buscar por nome, CPF ou telefone..." />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Total Gasto
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-slate-500">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => handleClientSelect(client.id)}
                    className={`hover:bg-slate-50 cursor-pointer ${
                      selectedClientId === client.id ? 'bg-slate-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center w-full px-2">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-slate-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{client.name}</div>
                          <div className="text-sm text-slate-500">{client.telephone}</div>
                          <div className="text-sm text-slate-500 sm:hidden">{client.cpf}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-slate-900">{client.cpf}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">
                        {client.amount.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <PaginationButtons currentPage={currentPage} maxPage={maxPage} />
      </Card>
    </div>
  )
} 

