import { getClientById } from '@/src/app/(app)/(private)/[slug]/clientes/actions'
import { getOrganizationBySlug } from '@/src/app/actions/organization'
import { Container } from '@/src/components/base-components/container'
import CreateOrderForm from '@/src/components/forms/create-order'
import { redirect } from 'next/navigation'

export default async function CreateOrderPage({ params, searchParams }: { 
  params: Promise<{ slug: string }>, 
  searchParams: Promise<{ [key: string]: string | undefined }> 
}) {

  const { client } = await searchParams

  const { slug } = await params

  const organization = await getOrganizationBySlug(slug)

  if (!organization.success || !organization.data) {
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
    <Container className="min-h-screen">
      <CreateOrderForm slug={slug} client={clientFetched} />
    </Container>
  )
}
