import { Container } from '@/src/components/base-components/container'
import { ClientList } from '@/src/components/clients/client-list'
import { ClientDetailsCard } from '@/src/components/clients/client-details-card'


const clients = Array.from({ length: 50 }, (_, i) => ({
  id: `client-${i + 1}`,
  name: `Cliente ${i + 1}`,
  cpf: `${Math.floor(Math.random() * 99999999999).toString().padStart(11, '0')}`,
  phone: `(11) 9${Math.floor(Math.random() * 99999999).toString().padStart(8, '0')}`,
  address: `Rua ${i + 1}, ${Math.floor(Math.random() * 1000)} - São Paulo/SP`,
  ordersCount: Math.floor(Math.random() * 20),
  totalSpent: Math.floor(Math.random() * 10000) + 1000
}))

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { clientId, page = '1' } = (await searchParams)

  const selectedClient = clientId 
    ? clients.find(client => client.id === clientId)
    : null

  return (
    <Container className="min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <ClientList 
            clients={clients}
            selectedClientId={clientId || null}
            currentPage={page}
          />
        </div>

        {selectedClient && (
          <div className="lg:w-96 w-full">
            <ClientDetailsCard
              client={selectedClient}
              currentPage={page}
            />
          </div>
        )}
      </div>
    </Container>
  )
}
