'use client'

import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Card } from '@/src/components/base-components/card'
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
	totalItems: number
	maxPage: number
}

export function ClientList({
	clients,
	selectedClientId,
	currentPage,
	maxPage,
}: ClientListProps) {
	const router = useRouter()

	const handleClientSelect = (clientId: string) => {
		const params = new URLSearchParams()
		params.set('client', clientId)
		params.set('page', currentPage.toString())
		router.push(`/dashboard/clientes?${params.toString()}`)
	}

	return (
		<div className="flex-1">
			<SearchFilter placeholder="Buscar por nome, CPF ou telefone..." />

			<Card className="overflow-hidden">
				<div className="-mx-6 overflow-x-auto sm:mx-0">
					<table className="w-full">
						<thead className="bg-slate-100">
							<tr>
								<th className="px-6 py-3 text-left font-medium text-slate-500 text-xs uppercase tracking-wider">
									Nome
								</th>
								<th className="hidden px-6 py-3 text-left font-medium text-slate-500 text-xs uppercase tracking-wider sm:table-cell">
									CPF
								</th>
								<th className="px-6 py-3 text-left font-medium text-slate-500 text-xs uppercase tracking-wider">
									Total Gasto
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-200">
							{clients.length === 0 ? (
								<tr>
									<td
										colSpan={4}
										className="px-6 py-4 text-center text-slate-500 text-sm"
									>
										Nenhum cliente encontrado
									</td>
								</tr>
							) : (
								clients.map((client) => (
									<tr
										key={client.id}
										onClick={() => handleClientSelect(client.id)}
										className={`cursor-pointer hover:bg-slate-50 ${
											selectedClientId === client.id ? 'bg-slate-50' : ''
										}`}
									>
										<td className="whitespace-nowrap px-6 py-4">
											<div className="flex w-full items-center px-2">
												<div className="h-10 w-10 flex-shrink-0">
													<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
														<User className="h-5 w-5 text-slate-500" />
													</div>
												</div>
												<div className="ml-4">
													<div className="font-medium text-slate-900 text-sm">
														{client.name}
													</div>
													<div className="text-slate-500 text-sm">
														{client.telephone}
													</div>
													<div className="text-slate-500 text-sm sm:hidden">
														{client.cpf}
													</div>
												</div>
											</div>
										</td>
										<td className="hidden whitespace-nowrap px-6 py-4 sm:table-cell">
											<div className="text-slate-900 text-sm">{client.cpf}</div>
										</td>
										<td className="whitespace-nowrap px-6 py-4">
											<div className="text-slate-900 text-sm">
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
