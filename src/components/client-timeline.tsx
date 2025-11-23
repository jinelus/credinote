import dayjs from 'dayjs'
import { Calendar, DollarSign, ShoppingCart } from 'lucide-react'
import { formatCurrency } from '@/src/lib/utils'

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
    <div className="space-y-6">
      <div className="relative">
        <div className={'-translate-x-1/2 absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-200'} />

        <div className="space-y-4">
          {events.length > 0 ? (
            events.map((event) => <TimelineItem key={event.id} event={event} />)
          ) : (
            <div className="flex items-center justify-center py-12 text-slate-500 text-sm">
              Nenhum evento encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TimelineItem({ event }: { event: TimelineEvent }) {
  const isOrder = event.type === 'order'
  const formattedAmount = formatCurrency(event.amount)
  const formattedDate = dayjs(event.date).format('DD/MM/YYYY - HH:mm')

  return (
    <div className={`flex items-center gap-4 ${isOrder ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-5/12 ${isOrder ? 'text-right' : 'text-left'}`}>
        <div
          className={`rounded-lg border-l-4 bg-white p-4 shadow-md ${isOrder ? 'border-blue-500' : 'border-green-500'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOrder ? (
                <ShoppingCart className="h-5 w-5 text-blue-500" aria-hidden />
              ) : (
                <DollarSign className="h-5 w-5 text-green-500" aria-hidden />
              )}
              <span className="hidden font-semibold lg:block">
                {isOrder ? 'Pedido' : 'Pagamento'}
              </span>
            </div>
          </div>

          <p className="mb-1 text-slate-600 text-sm">{event.description}</p>
          <p className="font-bold text-lg">{formattedAmount}</p>

          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <Calendar className="hidden h-3 w-3 lg:flex" aria-hidden />
            {formattedDate}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div
          className={`h-4 w-4 rounded-full border-4 ${isOrder ? 'border-blue-200 bg-blue-500' : 'border-green-200 bg-green-500'}`}
        />
      </div>

      <div className="w-5/12" />
    </div>
  )
}

export function TimelineSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center gap-4">
          <div className="h-24 w-5/12 rounded bg-slate-200" />
          <div className="h-4 w-4 rounded-full bg-slate-300" />
          <div className="w-5/12" />
        </div>
      ))}
    </div>
  )
}
