import { Container } from '@/src/components/base-components/container'
import CreateOrderForm from '@/src/components/forms/create-order'

export default async function CreateOrderPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params

  return (
    <Container className="min-h-screen">
      <CreateOrderForm slug={slug} />
    </Container>
  )
}
