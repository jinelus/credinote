import { createLoader, parseAsString, type SearchParams } from 'nuqs/server'
import { Container } from '@/src/components/base-components/container'
import CreatePaymentForm from '@/src/components/forms/create-payment'
import { getSession } from '@/src/lib/get-session'
import { getClientById } from '../clientes/actions'

const clientIdSearchParams = {
	client: parseAsString,
}

const loadSearchParams = createLoader(clientIdSearchParams)

export default async function CreatePaymentPage({
	searchParams,
}: {
	searchParams: Promise<SearchParams>
}) {
	const { organization } = await getSession()

	const { client } = await loadSearchParams(searchParams)

	let clientFetched = null

	if (client) {
		const result = await getClientById(client)

		if (result.success && result.data) {
			clientFetched = result.data
		}
	}

	return (
		<Container className="">
			<CreatePaymentForm slug={organization.slug} client={clientFetched} />
		</Container>
	)
}
