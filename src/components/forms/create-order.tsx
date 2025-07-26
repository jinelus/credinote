'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import Button from '../base-components/button'
import Spinner from '../base-components/spinner'
import { getClientByCpf } from '@/src/app/(app)/(private)/[slug]/clientes/actions'
import { useState } from 'react'
import { addOrder } from '@/src/app/(app)/(private)/[slug]/nova-compra/actions'
import { handleCpfInputFormatting } from '@/src/utils/format'
import { toast } from 'sonner'
import { z } from 'zod'
import { Input } from '../ui/input'

const formSchema = z.object({
  total: z.coerce.number().min(1, 'O valor é obrigatório'),
  clientId: z.string().min(1, 'O cliente é obrigatório'),
  clientName: z.string(),
  clientCpf: z.string().min(14, 'CPF inválido'),
})

type FormValues = z.infer<typeof formSchema>

interface Client {
  id: string
  name: string
  cpf: string
  telephone: string
  amount: number
}

interface CreateOrderFormProps {
  slug: string
  client: Client | null
}

export default function CreateOrderForm({ slug, client }: CreateOrderFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      total: 0,
      clientId: client?.id || '',
      clientName: client?.name || '',
      clientCpf: client?.cpf || '',
    },
    mode: 'onChange',
  })

  const total = useWatch({
    control: form.control,
    name: 'total'
  })

  const handleCpfSearch = async (cpf: string) => {
    setIsLoading(true)
      try {
        const client = await getClientByCpf({
          cpf,
          slug,
        })

        if (!client.success || !client.data) {
          return
        } 

        form.setValue('clientId', client.data.id)
        form.setValue('clientName', client.data.name)

      } catch (error) {
        console.error('Erro ao buscar cliente:', error)
      } finally {
        setIsLoading(false)
      }
  }

  async function onSubmit(values: FormValues) {
    try {
      const result = await addOrder({
        clientId: values.clientId,
        slug,
        total: Number(values.total)
      })
      if (!result.success) {
        toast.error(result.error)
      } else {
        toast.success('Compra cadastrada com sucesso')
        router.push(`/${slug}`)
      }
    } catch (error) {
      toast.error(error as string)
      console.error('Erro:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Nova Compra</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                {isLoading && <Button
                  type="button"
                  className='flex w-10 items-center justify-center'
                >
                  <Spinner /> 
                </Button>}
              </div>
              {form.formState.errors.clientCpf && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.clientCpf.message}
                </p>
              )}
            </div>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col gap-2">
            <label htmlFor="clientName" className="text-sm font-medium">
              Nome do Cliente
            </label>
            <Input
              id="clientName"
              type="text"
              className='bg-gray-100 border-gray-100 text-slate-900'
              disabled
              value={form.control._getWatch('clientName')}
              {...form.register('clientName')}
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
            disabled={form.formState.isSubmitting || total <= 0}
            className='disabled:text-gray-400'
          >
            {form.formState.isSubmitting ? 'Cadastrando...' : 'Cadastrar compra'}
          </Button>
        </div>
      </form>
    </div>
  )
} 