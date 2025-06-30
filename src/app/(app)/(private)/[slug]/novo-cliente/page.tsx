import { getOrganizationBySlug } from '@/src/app/actions/organization'
import { Container } from '@/src/components/base-components/container'
import CreateClientForm from '@/src/components/forms/create-client'
import { redirect } from 'next/navigation'


export default async function ClientPage({ params }: { params: Promise<{ slug: string }>}) {

  const slug = (await params).slug

  const result = await getOrganizationBySlug(slug)

  if(!result) {
    redirect('/signin')
  }

  return (
    <Container className="min-h-screen">
      <CreateClientForm slug={slug} />
    </Container>
  )
}
