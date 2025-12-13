'use client'

import { useRouter } from 'next/navigation'
import { Skeleton } from '../ui/skeleton'

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
  const router = useRouter()

  return (
    <tr
      className={`cursor-pointer hover:bg-slate-100 ${index % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}`}
      onClick={() => router.push(`/dashboard/clientes/${order.clientId}`)}
    >
      <td className="whitespace-nowrap px-6 py-4">
        <div className="font-medium text-slate-900 text-sm">{order.clientName}</div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-slate-900 text-sm">R$ {order.total.toFixed(2)}</div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-slate-500 text-sm">
        {new Date(order.date).toLocaleDateString('pt-BR')}
      </td>
    </tr>
  )
}

export const OrderListSkeleton = () => {
  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4">
        <Skeleton className="h-4 w-32 rounded-md" />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <Skeleton className="h-4 w-16 rounded-md" />
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-slate-500 text-sm">
        <Skeleton className="h-4 w-24 rounded-md" />
      </td>
    </tr>
  )
}
