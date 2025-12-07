'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import type { Payment } from '@/src/app/(app)/(private)/dashboard/pagamentos/actions'
import { formatCurrency } from '@/src/lib/utils'
import { Skeleton } from '../ui/skeleton'

type PaymentListProps = {
  payments: Payment[]
}

export function PaymentList({ payments }: PaymentListProps) {
  const router = useRouter()
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="px-6 py-3 text-center font-medium text-slate-500 text-xs uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-center font-medium text-slate-500 text-xs uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-center font-medium text-slate-500 text-xs uppercase tracking-wider">
                Método
              </th>
              <th className="px-6 py-3 text-center font-medium text-slate-500 text-xs uppercase tracking-wider">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {payments.map((payment, index) => (
              <tr
                key={payment.id}
                className={`hover:bg-slate-50 ${index % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}`}
                onClick={() => router.push(`/dashboard/clientes/${payment.clientId}`)}
              >
                <td className="whitespace-nowrap px-6 py-4 text-center">{payment.clientName}</td>
                <td className="whitespace-nowrap px-6 py-4 text-center text-slate-900 text-sm">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-2 font-semibold text-xs leading-5 ${
                      payment.method === 'CASH'
                        ? 'bg-green-100 text-green-800'
                        : payment.method === 'CARD'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {payment.method === 'CASH'
                      ? 'Dinheiro'
                      : payment.method === 'CARD'
                        ? 'Cartão'
                        : 'PIX'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center text-slate-900 text-sm">
                  {format(payment.paidAt, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const PaymentListSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="px-6 py-3 text-center font-medium text-slate-500 text-xs uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-center font-medium text-slate-500 text-xs uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-center font-medium text-slate-500 text-xs uppercase tracking-wider">
                Método
              </th>
              <th className="px-6 py-3 text-center font-medium text-slate-500 text-xs uppercase tracking-wider">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {Array.from({ length: 10 }).map((_, index) => (
              <tr
                key={`skeleton-payment-${index}`}
                className={index % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-28" />
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-20" />
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex justify-center">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-36" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
