import { Payment } from '@/src/app/(app)/(private)/[slug]/pagamentos/actions'
import { Card } from '@/src/components/base-components/card'
import { formatCurrency } from '@/src/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import Button from '@/src/components/base-components/button'

type PaymentDetailsCardProps = {
  payment: Payment
  slug: string
  redirectCancelLink: string
}

export function PaymentDetailsCard({ payment, slug, redirectCancelLink }: PaymentDetailsCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Detalhes do Pagamento</h2>
          <p className="text-sm text-slate-600 mt-1">
            ID: {payment.id}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-500">Cliente</h3>
            <p className="mt-1 text-sm text-slate-900">{payment.clientName}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-500">Valor</h3>
            <p className="mt-1 text-sm text-slate-900">{formatCurrency(payment.amount)}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-500">Método de Pagamento</h3>
            <span
              className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-500">Data do Pagamento</h3>
            <p className="mt-1 text-sm text-slate-900">
              {format(payment.paidAt, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link href={`/${slug}/editar-pagamento/${payment.id}`}>
            <Button
              className="w-full bg-slate-800 text-white hover:bg-slate-900"
              size='sm'
            >
              Editar Pagamento
            </Button>
          </Link>
          <Link href={redirectCancelLink}>
            <Button
              variant="ghost"
              className="w-full text-slate-600 hover:text-slate-900"
              size='sm'
            >
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
} 