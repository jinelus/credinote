import { getClientById } from '@/src/app/(app)/(private)/dashboard/clientes/actions'
import { getSession } from '@/src/lib/get-session'
import { Container } from '../../base-components/container'
import CreateOrderForm from '../../forms/create-order'

type SearchParams = {
  client: string | null
}

export const NewOrderPageContainer = async ({
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
    <Container className="min-h-screen">
      <CreateOrderForm slug={organization.slug} client={clientFetched} key={Date.now()} />
    </Container>
  )
}
