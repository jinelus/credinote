'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import * as z from "zod"
import Button from "@/src/components/base-components/button"
import { Input } from "@/src/components/base-components/input"
import { Label } from "@/src/components/base-components/label"
import { Card } from "@/src/components/base-components/card"
import { createPayment } from "@/src/app/(app)/(private)/[slug]/pagamentos/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getClientByCpf } from "@/src/app/(app)/(private)/[slug]/clientes/actions"
import { ClientResponse } from "@/src/app/(app)/(private)/[slug]/clientes/actions"
import { PaymentMethod } from "@prisma/client"
import { handleCpfInputFormatting } from "@/src/utils/format"
import { toast } from "sonner"

const paymentSchema = z.object({
  clientId: z.string().min(1, "Cliente é obrigatório"),
  clientCpf: z.string().min(14, 'CPF inválido'),
  amount: z.coerce.number().min(1, "Valor é obrigatório"),
  paymentMethod: z.enum(["CASH", "CARD", "PIX"], {
    required_error: "Método de pagamento é obrigatório",
  }),
})

type PaymentFormValues = z.infer<typeof paymentSchema>

interface CreatePaymentFormProps {
  slug: string
  client?: ClientResponse
}

const paymentMethods = [
  {
    id: "CASH" as PaymentMethod,
    name: "Dinheiro",
    description: "Pagamento em espécie",
    icon: "💵"
  },
  {
    id: "CARD" as PaymentMethod,
    name: "Cartão",
    description: "Cartão de crédito ou débito",
    icon: "💳"
  },
  {
    id: "PIX" as PaymentMethod,
    name: "PIX",
    description: "Transferência instantânea",
    icon: "📱"
  }
]

export default function CreatePaymentForm({ slug, client }: CreatePaymentFormProps) {
  const router = useRouter()
  
  const [isSearching, setIsSearching] = useState(false)
  const [selectedClient, setSelectedClient] = useState<ClientResponse | null>(client || null)

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      clientId: client?.id ?? '',
      clientCpf: client?.cpf || '',
      amount: 0,
      paymentMethod: paymentMethods[0].id,
    },
  })

  const amount = useWatch({
    control: form.control,
    name: 'amount'
  })

  const onSubmit = async (data: PaymentFormValues) => {
    const toastWaiting = toast.loading('Cadastrando pagamento...')
    
    try {
      const result = await createPayment({
        clientId: data.clientId,
        amount: Number(data.amount),
        method: data.paymentMethod,
        paidAt: new Date(),
        slug,
      })
  
      toast.dismiss(toastWaiting)
  
      if (result.success) {
        toast.success('Pagamento cadastrado com successo')
        router.push(`/${slug}/pagamentos`)
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error('Error ao cadastrar o pagamento')
      console.error(error)
    }
  }

  const handleCpfSearch = async (cpf: string) => {
    setIsSearching(true)
      try {
        const client = await getClientByCpf({
          cpf,
          slug,
        })

        if (!client.success || !client.data) {
          return
        } 

        form.setValue('clientId', client.data.id)
        setSelectedClient(client.data)

      } catch (error) {
        console.error('Erro ao buscar cliente:', error)
      } finally {
        setIsSearching(false)
      }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Novo Pagamento</h2>
        <p className="text-slate-600 mt-2">Registre um novo pagamento para um cliente</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <div className="relative flex gap-4">
                  <div className="relative">
                    {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" /> */}
                    <Input
                      id="client"
                      placeholder="Digite o CPF do cliente"
                      {...form.register('clientCpf')}
                      maxLength={14}
                      onChange={(e) => {
                        handleCpfInputFormatting(e)
                        
                        if (e.target.value.length === 14) {
                          handleCpfSearch(e.target.value)
                        }
                      }}
                      disabled={!!client}
                      className='disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-800'
                      />
                  </div>
                  {isSearching && (
                    <div className="bg-white/50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-800"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Valor</Label>
                <div>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    {...form.register("amount")}
                    className="flex"
                    />
                  {form.formState.errors.amount && (
                    <p className="text-sm text-red-500">{form.formState.errors.amount.message}</p>
                  )}
                </div>
              </div>
            </div>
            {selectedClient && (
              <div className="p-4 md:p-8 bg-slate-50 rounded-lg flex flex-col gap-4">
                <div className="font-bold text-lg">{selectedClient.name}</div>
                <div className="text-sm text-slate-600 font-semibold">CPF: {selectedClient.cpf}</div>
                <div className="text-sm text-slate-600 font-semibold">Telefone: {selectedClient.telephone}</div>
                <div className="text-sm text-slate-600 font-semibold">Saldo: R$ {selectedClient.amount.toFixed(2)}</div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Meio de pagamento</Label>
            <div className="grid grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`p-4 cursor-pointer transition-all ${
                    form.watch("paymentMethod") === method.id
                      ? "border border-slate-800 bg-slate-50"
                      : "hover:border-slate-300"
                  }`}
                  onClick={() => form.setValue("paymentMethod", method.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{method.icon}</div>
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-slate-500">{method.description}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {form.formState.errors.paymentMethod && (
              <p className="text-sm text-red-500">{form.formState.errors.paymentMethod.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push(`/${slug}/pagamentos`)}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={amount <= 0 || form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Cadastramento...' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </div>
  )
} 