import { getSession } from '@/src/lib/get-session'
import { Container } from '../../base-components/container'
import CreateClientForm from '../../forms/create-client'

export const NewClientPageContainer = async () => {
  const { organization } = await getSession()

  return (
    <Container>
      <CreateClientForm slug={organization.slug} />
    </Container>
  )
}
