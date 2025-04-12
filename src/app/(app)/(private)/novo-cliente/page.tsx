import { Container } from '@/src/components/base-components/container'
import CreateClientForm from '@/src/components/forms/create-client'


export default function ClientPage() {


  return (
    <Container className="min-h-screen">
      <CreateClientForm />
    </Container>
  )
}
