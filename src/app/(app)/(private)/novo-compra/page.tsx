// 'use client'

// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
// import OrderForm from '@/components/forms/order-form'
// import { Card } from '@/components/base-components/card'
// import { Container } from '@/components/base-components/container'
// import { Button } from '@/components/base-components/button'
// import ClientList from '@/components/clients/client-list'

// export default function NewOrderPage() {
//   const router = useRouter()
//   const [selectedClientId, setSelectedClientId] = useState<string | null>(null)

//   const handleOrderSubmit = async (data: any) => {
//     if (!selectedClientId) return

//     try {
//       // We'll implement this action next
//       // await createOrder({
//       //   idClient: selectedClientId,
//       //   total: data.amount,
//       // })
//       router.push('/clientes')
//       router.refresh()
//     } catch (error) {
//       console.error('Error creating order:', error)
//     }
//   }

//   return (
//     <Container>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold">Novo Pedido</h1>
//           <Button
//             variant="ghost"
//             onClick={() => router.back()}
//           >
//             Voltar
//           </Button>
//         </div>

//         <Card>
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-lg font-semibold mb-4">Selecione o Cliente</h2>
//               <ClientList
//                 onClientSelect={(clientId) => setSelectedClientId(clientId)}
//                 selectedClientId={selectedClientId}
//               />
//             </div>

//             {selectedClientId && (
//               <div>
//                 <h2 className="text-lg font-semibold mb-4">Detalhes do Pedido</h2>
//                 <OrderForm onSubmit={handleOrderSubmit} />
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </Container>
//   )
// }