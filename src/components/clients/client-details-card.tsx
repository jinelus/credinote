import { User, X } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/src/components/base-components/card'
import { Button } from '../ui/button'

interface Client {
	id: string
	name: string
	cpf: string
	telephone: string
	amount: number
}

interface ClientDetailsCardProps {
	client: Client
	redirectCancelLink: string
}

export function ClientDetailsCard({
	client,
	redirectCancelLink,
}: ClientDetailsCardProps) {
	return (
		<div className="w-full lg:w-96">
			<Card className="sticky top-4">
				<div className="p-6">
					<div className="mb-6 flex items-center justify-between">
						<h2 className="font-bold text-slate-800 text-xl">
							Detalhes do Cliente
						</h2>
						<Link href={`${redirectCancelLink}`}>
							<button className="text-slate-400 hover:text-slate-500">
								<X className="h-5 w-5" />
							</button>
						</Link>
					</div>

					<div className="space-y-6">
						<div className="flex items-center space-x-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
								<User className="h-8 w-8 text-slate-500" />
							</div>
							<div>
								<h3 className="font-semibold text-lg text-slate-900">
									{client.name}
								</h3>
							</div>
						</div>

						<div className="space-y-4">
							<div>
								<label className="block font-medium text-slate-700 text-sm">
									CPF
								</label>
								<p className="mt-1 text-slate-900 text-sm">{client.cpf}</p>
							</div>
							<div>
								<label className="block font-medium text-slate-700 text-sm">
									Telefone
								</label>
								<p className="mt-1 text-slate-900 text-sm">
									{client.telephone}
								</p>
							</div>
							<div>
								<label className="block font-medium text-slate-700 text-sm">
									Total Gasto
								</label>
								<p className="mt-1 text-slate-900 text-sm">
									R$ {client.amount}
								</p>
							</div>
						</div>

						<div className="flex w-full flex-wrap items-center justify-between gap-4 pt-6">
							<Link href={`/dashboard/nova-compra?client=${client.id}`}>
								<Button variant="outline" className="w-full">
									Nova Compra
								</Button>
							</Link>
							<Link href={`/dashboard/novo-pagamento?client=${client.id}`}>
								<Button className="w-full bg-slate-800 text-white hover:bg-slate-900">
									Novo Pagamento
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</Card>
		</div>
	)
}
