'use client'

import { Search, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Card } from '../base-components/card'

interface Client {
  id: string
  name: string
  cpf: string
  phone: string
}

interface ClientSelectorProps {
  clients: Client[]
  selectedClientId: string | null
  onClientSelect: (clientId: string) => void
}

export function ClientSelector({ clients, selectedClientId, onClientSelect }: ClientSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients
    const term = searchTerm.toLowerCase()
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(term) ||
        client.cpf.includes(term) ||
        client.phone.includes(term),
    )
  }, [searchTerm, clients])

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cliente por nome, CPF ou telefone..."
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pr-3 pl-10 leading-5 placeholder-slate-500 focus:border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-800 sm:text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-slate-500 text-xs uppercase tracking-wider">
                Nome
              </th>
              <th className="hidden px-6 py-3 text-left font-medium text-slate-500 text-xs uppercase tracking-wider sm:table-cell">
                CPF
              </th>
              <th className="px-6 py-3 text-left font-medium text-slate-500 text-xs uppercase tracking-wider">
                Telefone
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-slate-500 text-sm">
                  Nenhum cliente encontrado
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => onClientSelect(client.id)}
                  className={`cursor-pointer hover:bg-slate-50 ${
                    selectedClientId === client.id ? 'bg-slate-100' : ''
                  }`}
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
                          <User className="h-5 w-5 text-slate-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-slate-900 text-sm">{client.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap px-6 py-4 sm:table-cell">
                    <div className="text-slate-900 text-sm">{client.cpf}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-slate-900 text-sm">{client.phone}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
