import { Container } from '@/src/components/base-components/container'
import CreateClientForm from '@/src/components/forms/create-client'
import { getSession } from '@/src/lib/get-session'

export default async function ClientPage() {
	const { organization } = await getSession()

	return (
		<Container className="">
			<CreateClientForm slug={organization.slug} />
		</Container>
	)
}
