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
      shallow: false
    })


    const handleSelectedClient = () => {
        setClient(order.clientId.toString())
    }

    return (
      <tr 
        className={`hover:bg-slate-100 cursor-pointer ${index % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}`}
        onClick={handleSelectedClient}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-slate-900">{order.clientName}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-slate-900">
            R$ {order.total.toFixed(2)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
          {new Date(order.date).toLocaleDateString('pt-BR')}
        </td>
      </tr>
    )
}