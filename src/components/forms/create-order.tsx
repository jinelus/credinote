'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { OrderStatus, PaymentMethod } from '@prisma/client'
import Button from '../base-components/button'
import { Input } from '../base-components/input'
import { Search } from 'lucide-react'

const formSchema = z.object({
  total: z.string().min(1, 'O valor é obrigatório'),
  status: z.nativeEnum(OrderStatus),
  paymentMethod: z.nativeEnum(PaymentMethod),
  clientId: z.string().min(1, 'O cliente é obrigatório'),
  clientCpf: z.string().min(11, 'CPF inválido'),
})

type FormValues = z.infer<typeof formSchema>

// Simulação de server action - será substituída posteriormente
async function createOrder(data: FormValues) {
  console.log('Dados da compra:', data)
  return { success: true }
}

// Simulação de busca de cliente - será substituída posteriormente
async function searchClient(cpf: string) {
  console.log('Buscando cliente com CPF:', cpf)
  return {
    id: '1',
    name: 'Cliente Exemplo',
    cpf: cpf,
    telephone: '(00) 00000-0000',
  }
}

export default function CreateOrderForm() {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      total: '',
      status: OrderStatus.UNPAID,
      paymentMethod: PaymentMethod.CASH,
      clientId: '',
      clientCpf: '',
    },
  })

  const handleCpfSearch = async () => {
    const cpf = form.getValues('clientCpf')
    if (cpf.length === 11) {
      try {
        const client = await searchClient(cpf)
        form.setValue('clientId', client.id)
        // Aqui você pode adicionar mais campos do cliente que serão exibidos
      } catch (error) {
        console.error('Erro ao buscar cliente:', error)
      }
    }
  }

  async function onSubmit(values: FormValues) {
    try {
      const result = await createOrder(values)
      if (result.success) {
        router.push('/compras')
      }
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Nova Compra</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
          <div className="flex flex-col gap-2">
            <label htmlFor="clientCpf" className="text-sm font-medium">
              CPF do Cliente
            </label>
            <div className="flex gap-2">
              <Input
                id="clientCpf"
                type="text"
                placeholder="000.000.000-00"
                {...form.register('clientCpf')}
              />
              <Button
                type="button"
                onClick={handleCpfSearch}
                disabled={form.formState.isSubmitting}
                className='flex w-10 items-center justify-center'
              >
                <Search className='text-white text-xl' />
              </Button>
            </div>
            {form.formState.errors.clientCpf && (
              <p className="text-sm text-red-500">
                {form.formState.errors.clientCpf.message}
              </p>
            )}
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col gap-2">
            <label htmlFor="clientName" className="text-sm font-medium">
              Nome do Cliente
            </label>
            <Input
              id="clientName"
              type="text"
              disabled
              value={form.watch('clientId') ? 'Cliente Exemplo' : ''}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="total" className="text-sm font-medium">
              Valor
            </label>
            <Input
              id="total"
              type="number"
              step="0.01"
              {...form.register('total')}
            />
            {form.formState.errors.total && (
              <p className="text-sm text-red-500">
                {form.formState.errors.total.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              {...form.register('status')}
            >
              <option value={OrderStatus.UNPAID}>Crédito</option>
              <option value={OrderStatus.PAID}>Débito</option>
            </select>
            {form.formState.errors.status && (
              <p className="text-sm text-red-500">
                {form.formState.errors.status.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="paymentMethod" className="text-sm font-medium">
              Método de pagamento
            </label>
            <select
              id="paymentMethod"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              {...form.register('paymentMethod')}
            >
              <option value={PaymentMethod.CASH}>Dinheiro</option>
              <option value={PaymentMethod.CARD}>Cartão</option>
              <option value={PaymentMethod.PIX}>PIX</option>
            </select>
            {form.formState.errors.paymentMethod && (
              <p className="text-sm text-red-500">
                {form.formState.errors.paymentMethod.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            disabled={form.formState.isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Cadastrando...' : 'Cadastrar compra'}
          </Button>
        </div>
      </form>
    </div>
  )
} 