'use client'

import { Payment } from '@/src/app/(app)/(private)/[slug]/pagamentos/actions'
import { formatCurrency } from '@/src/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type PaymentListProps = {
  payments: Payment[]
  selectedPaymentId: string | null
  currentPage: number
  slug: string
}

export function PaymentList({ payments, selectedPaymentId, currentPage, slug }: PaymentListProps) {

  const router = useRouter()

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">
                Cliente
              </th>
              <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">
                Valor
              </th>
              <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">
                Método
              </th>
              <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider text-center">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className={`hover:bg-slate-50 cursor-pointer ${
                  selectedPaymentId === payment.id ? 'bg-slate-100' : ''
                }`}
                onClick={() => router.push(`/${slug}/pagamentos?payment=${payment.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Link
                    href={`/${slug}/pagamentos?payment=${payment.id}&page=${currentPage}`}
                    className="text-sm text-slate-900"
                  >
                    {payment.clientName}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-center">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-center">
                  {format(payment.paidAt, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 