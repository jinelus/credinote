'use client'

import { useQueryState } from 'nuqs'

interface Order {
	total: number
	clientName: string | undefined
	id: string
	date: Date
	clientId: string
}

interface OrderListParams {
	order: Order
	index: number
}

export const OrderList = ({ index, order }: OrderListParams) => {
	const [, setClient] = useQueryState('client', {
		shallow: false,
	})

	const handleSelectedClient = () => {
		setClient(order.clientId.toString())
	}

	return (
		<tr
			className={`cursor-pointer hover:bg-slate-100 ${index % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}`}
			onClick={handleSelectedClient}
		>
			<td className="whitespace-nowrap px-6 py-4">
				<div className="font-medium text-slate-900 text-sm">
					{order.clientName}
				</div>
			</td>
			<td className="whitespace-nowrap px-6 py-4">
				<div className="text-slate-900 text-sm">
					R$ {order.total.toFixed(2)}
				</div>
			</td>
			<td className="whitespace-nowrap px-6 py-4 text-slate-500 text-sm">
				{new Date(order.date).toLocaleDateString('pt-BR')}
			</td>
		</tr>
	)
}
