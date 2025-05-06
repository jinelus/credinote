import { Container } from '@/src/components/base-components/container'
import CreateOrderForm from '@/src/components/forms/create-order'

export default function CreateOrderPage() {
  return (
    <Container className="min-h-screen">
      <CreateOrderForm />
    </Container>
  )
}
