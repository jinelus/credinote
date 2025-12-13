'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { getClientByCpf } from '@/src/app/(app)/(private)/dashboard/clientes/actions'
import { addOrder } from '@/src/app/(app)/(private)/dashboard/nova-compra/actions'
import { handleCpfInputFormatting } from '@/src/utils/format'
import { GoBackBtn } from '../back-btn'
import Button from '../base-components/button'
import Spinner from '../base-components/spinner'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  total: z.coerce.number().min(1, 'O valor é obrigatório'),
  clientId: z.string().min(1, 'O cliente é obrigatório'),
  clientName: z.string(),
  description: z.string().optional(),
  clientCpf: z.string().length(14, 'CPF inválido'),
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
      description: '',
    },
    mode: 'onChange',
  })

  const total = useWatch({
    control: form.control,
    name: 'total',
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
        total: Number(values.total),
        description: values.description,
      })
      if (!result.success) {
        toast.error(result.error)
      } else {
        toast.success('Compra cadastrada com sucesso')
        form.reset()
        router.refresh()
        router.push(`/dashboard`)
      }
    } catch (error) {
      toast.error(error as string)
      console.error('Erro:', error)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <GoBackBtn />
        <h1 className="mb-8 font-bold text-3xl text-slate-800">Nova Compra</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="clientCpf"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="clientCpf" className="font-medium text-sm">
                    CPF do Cliente
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        id="clientCpf"
                        type="text"
                        placeholder="000.000.000-00"
                        {...field}
                        maxLength={14}
                        onChange={(e) => {
                          handleCpfInputFormatting(e)
                          field.onChange(e)

                          if (e.target.value.length === 14) {
                            handleCpfSearch(e.target.value)
                          }
                        }}
                        disabled={!!client}
                        className="disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-800"
                      />
                      {isLoading && (
                        <Button type="button" className="flex w-10 items-center justify-center">
                          <Spinner />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="clientName" className="font-medium text-sm">
                    Nome do Cliente
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="clientName"
                      type="text"
                      placeholder="Nome completo do cliente"
                      {...field}
                      disabled
                      className="disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="total" className="font-medium text-sm">
                    Valor Total
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="total"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      className="flex"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="description" className="font-medium text-sm">
                    Descrição (opcional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Detalhes adicionais sobre a compra"
                      {...field}
                      className="flex h-32 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              className="disabled:text-gray-400"
            >
              {form.formState.isSubmitting ? 'Cadastrando...' : 'Cadastrar compra'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
