import { Container } from '@/src/components/base-components/container'
import { ClientList } from '@/src/components/clients/client-list'
import { ClientDetailsCard } from '@/src/components/clients/client-details-card'
import Button from '@/src/components/base-components/button'
import Link from 'next/link'
import { fetchClients } from '@/src/app/actions/client-actions'


// const clients = Array.from({ length: 50 }, (_, i) => ({
//   id: `client-${i + 1}`,
//   name: `Cliente ${i + 1}`,
//   cpf: `${Math.floor(Math.random() * 99999999999).toString().padStart(11, '0')}`,
//   phone: `(11) 9${Math.floor(Math.random() * 99999999).toString().padStart(8, '0')}`,
//   address: `Rua ${i + 1}, ${Math.floor(Math.random() * 1000)} - São Paulo/SP`,
//   ordersCount: Math.floor(Math.random() * 20),
//   totalSpent: Math.floor(Math.random() * 10000) + 1000
// }))

export default async function ClientsPage({
  searchParams,
  params
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
  params: Promise<{ slug: string }>
}) {
  const { clientId, page = '1' } = (await searchParams)
  const { slug } = await params

  const clients = await fetchClients({ slug, params: {
    page: Number(page) || 1
  } })

  if(!clients) {
    return
  }

  const selectedClient = clientId 
    ? clients.find(client => client.id === clientId)
    : null

  return (
    <Container className="min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Clientes</h1>
        <Link href={`/${slug}/novo-cliente`}>
          <Button
            className="bg-slate-800 text-white hover:bg-slate-900"
            size='sm'
          >
            Novo Cliente
          </Button>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <ClientList 
            clients={clients}
            selectedClientId={clientId || null}
            currentPage={page}
            slug={slug}
          />
        </div>

        {selectedClient && (
          <div className="lg:w-96 w-full">
            <ClientDetailsCard
              client={selectedClient}
              currentPage={page}
              slug={slug}
            />
          </div>
        )}
      </div>
    </Container>
  )
}
