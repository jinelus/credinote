import type { PaymentMethod } from '@prisma/client'
import dayjs from 'dayjs'
import { Calendar, CreditCard, ShoppingBag } from 'lucide-react'
import { formatCurrency } from '@/src/lib/utils'
import { formatPaymentMethod } from '../utils/format'

export type TimelineEvent = {
  id: string
  type: 'order' | 'payment'
  date: string
  amount: number
  description: string
  method?: string
}

interface ClientTimelineProps {
  clientId: string
  events: TimelineEvent[]
}

export default function ClientTimeline({ events }: ClientTimelineProps) {
  return (
    <div className="relative space-y-8 pl-6 before:absolute before:top-2 before:left-2 before:h-full before:w-[2px] before:bg-muted">
      {events.length > 0 ? (
        events.map((event) => <TimelineItem key={event.id} event={event} />)
      ) : (
        <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
          Nenhum evento encontrado
        </div>
      )}
    </div>
  )
}

function TimelineItem({ event }: { event: TimelineEvent }) {
  const isOrder = event.type === 'order'
  const formattedAmount = formatCurrency(event.amount)
  const formattedDate = dayjs(event.date).format('DD [de] MMMM [às] HH:mm')

  return (
    <div className="relative">
      {/* Icon Indicator */}
      <div
        className={`-left-[29px] absolute top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background ${isOrder ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
          }`}
      >
        {isOrder ? <ShoppingBag className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
      </div>

      {/* Card Content */}
      <div className="group rounded-xl border bg-card p-4 transition-all hover:shadow-md">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 font-medium text-xs ${isOrder ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                }`}
            >
              {isOrder ? 'Pedido Realizado' : 'Pagamento Recebido'}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
          </div>
          <span className={`font-bold ${isOrder ? 'text-foreground' : 'text-emerald-600'}`}>
            {formattedAmount}
          </span>
        </div>

        {event.description.length > 0 && (
          <p className='line-clamp-3 text-muted-foreground text-sm'>{event.description}</p>
        )}

        {event.method && (
          <p className="mt-1 text-muted-foreground text-sm">
            Método:{' '}
            <span className="font-medium text-foreground">
              {formatPaymentMethod(event.method as PaymentMethod)}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export function TimelineSkeleton() {
  return (
    <div className="relative space-y-8 pl-6 before:absolute before:top-2 before:left-2 before:h-full before:w-[2px] before:bg-muted">
      {[1, 2, 3].map((item) => (
        <div key={item} className="relative">
          <div className="-left-[29px] absolute top-1 h-8 w-8 rounded-full border-4 border-background bg-muted" />
          <div className="h-24 rounded-xl border bg-card p-4">
            <div className="mb-4 h-4 w-1/3 rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}
