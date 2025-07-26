import { getOrganizationBySlug } from '@/src/app/actions/organization'
import { redirect } from 'next/navigation'
import { createLoader, parseAsString, type SearchParams } from 'nuqs/server'
import { getClientById } from '@/src/app/(app)/(private)/[slug]/clientes/actions'
import CreatePaymentForm from '@/src/components/forms/create-payment'
import { Container } from '@/src/components/base-components/container'

const clientIdSearchParams = {
  client: parseAsString,
}

const loadSearchParams = createLoader(clientIdSearchParams)

export default async function CreatePaymentPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>, 
  searchParams: Promise<SearchParams> 
}) {
  const { client } = await loadSearchParams(searchParams)
  const { slug } = await params

  const organization = await getOrganizationBySlug(slug)

  if (!organization) {
    redirect('/signin')
  }

  let clientFetched = null

  if (client) {
    const result = await getClientById(client)

    if (result.success && result.data) {
      clientFetched = result.data
    }
  }


  return (
    <Container className="">
      <CreatePaymentForm slug={slug} client={clientFetched} />
    </Container>
  )
} 