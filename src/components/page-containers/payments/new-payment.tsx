import { getClientById } from '@/src/app/(app)/(private)/dashboard/clientes/actions'
import { getSession } from '@/src/lib/get-session'
import { Container } from '../../base-components/container'
import CreatePaymentForm from '../../forms/create-payment'
import { Card } from '../../ui/card'
import { Label } from '../../ui/label'
import { Skeleton } from '../../ui/skeleton'

type SearchParams = {
  client: string | null
}

export const NewPaymentContainer = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) => {
  const { organization } = await getSession()
  const { client } = await searchParams

  let clientFetched = null

  if (client) {
    const result = await getClientById(client)

    if (result.success && result.data) {
      clientFetched = result.data
    }
  }

  return (
    <Container>
      <CreatePaymentForm slug={organization.slug} client={clientFetched} key={Date.now()} />
    </Container>
  )
}

export const NewPaymentContainerSkeleton = () => {
  return (
    <Container>
      <div className="space-y-6">
        <div>
          <Skeleton className="mb-4 h-8 w-24" />
          <h2 className="font-bold text-2xl text-slate-800">Novo Pagamento</h2>
          <p className="mt-2 text-slate-600">Registre um novo pagamento para um cliente</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <Skeleton className="h-10 w-64" />
                </div>

                <div className="space-y-2">
                  <Label>Valor</Label>
                  <Skeleton className="h-10 w-64" />
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-lg bg-slate-50 p-4 md:p-8">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Meio de pagamento</Label>
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Card key={`payment-method-skeleton-${index}`} className="p-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded" />
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    </Container>
  )
}
