'use client'

import { Card } from '@/src/components/base-components/card'
import Button from '@/src/components/base-components/button'
import { useRouter } from 'next/navigation'
import { User, Search } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'

interface Client {
  id: string
  name: string
  cpf: string
  phone: string
  ordersCount: number
  totalSpent: number
}

interface ClientListProps {
  clients: Client[]
  selectedClientId: string | null
  currentPage: string
}

const ITEMS_PER_PAGE = 10

export function ClientList({ clients, selectedClientId, currentPage }: ClientListProps) {
  const router = useRouter()
  const page = Number(currentPage) || 1
  const [searchTerm, setSearchTerm] = useState('')

  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients
    const term = searchTerm.toLowerCase()
    return clients.filter(client => 
      client.name.toLowerCase().includes(term) ||
      client.cpf.includes(term) ||
      client.phone.includes(term)
    )
  }, [searchTerm, clients])

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE)
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const paginatedClients = filteredClients.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (page !== 1) {
      router.push('/clientes?page=1')
    }
  }

  const handleClientSelect = (clientId: string) => {
    const params = new URLSearchParams()
    params.set('clientId', clientId)
    params.set('page', page.toString())
    router.push(`/clientes?${params.toString()}`)
  }

  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Clientes</h1>
        <Button
          onClick={() => router.push('/novo-cliente')}
          className="bg-slate-800 text-white hover:bg-slate-900 w-full sm:w-auto"
        >
          Novo Cliente
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar por nome, CPF ou telefone..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
            />
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                  Pedidos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Total Gasto
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedClients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-slate-500">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              ) : (
                paginatedClients.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => handleClientSelect(client.id)}
                    className={`hover:bg-slate-50 cursor-pointer ${
                      selectedClientId === client.id ? 'bg-slate-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-slate-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{client.name}</div>
                          <div className="text-sm text-slate-500">{client.phone}</div>
                          <div className="text-sm text-slate-500 sm:hidden">{client.cpf}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-slate-900">{client.cpf}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-slate-900">{client.ordersCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">
                        R$ {client.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-t border-slate-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <Link
              href={`/clientes?page=${page - 1}`}
              className={`relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md ${
                page === 1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Anterior
            </Link>
            <Link
              href={`/clientes?page=${page + 1}`}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md ${
                page === totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Próximo
            </Link>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700">
                Mostrando <span className="font-medium">{startIndex + 1}</span> a{' '}
                <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, filteredClients.length)}</span> de{' '}
                <span className="font-medium">{filteredClients.length}</span> resultados
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <Link
                  key={pageNumber}
                  href={`/clientes?page=${pageNumber}`}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    page === pageNumber
                      ? 'z-10 bg-slate-800 border-slate-800 text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {pageNumber}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 