'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { registerClient } from '@/src/app/(app)/(private)/dashboard/clientes/actions'
import Button from '@/src/components/base-components/button'
import { Input } from '@/src/components/base-components/input'
import { handleCpfInputFormatting, handleTelephoneInput } from '@/src/utils/format'

const clientSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  cpf: z.string().min(11, { message: 'CPF inválido' }),
  telephone: z.string().optional(),
  slug: z.string(),
})

type ClientFormData = z.infer<typeof clientSchema>

export default function CreateClientForm({ slug }: { slug: string }) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      slug,
    },
  })

  const onSubmit = async (data: ClientFormData) => {
    try {
      if (data.cpf.length < 14) {
        toast.error('O formato do CPF está errado! Por favor, confere de novo!')
        return
      }

      const clientData = {
        ...data,
      }

      const result = await registerClient(clientData)

      if (!result.success) {
        toast.error(result.error || 'Erro ao cadastrar cliente')
      } else {
        router.push(`/dashboard/nova-compra?client=${result.data.id}`)
      }
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 font-bold text-3xl text-slate-800">Novo Cliente</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium text-sm">
              Nome completo
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome completo"
              {...register('name')}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="cpf" className="font-medium text-sm">
              CPF
            </label>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              maxLength={14}
              {...register('cpf')}
              onChange={(e) => {
                handleCpfInputFormatting(e)
              }}
            />
            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="telephone" className="font-medium text-sm">
              Telefone
            </label>
            <Input
              id="telephone"
              type="tel"
              placeholder="(00) 00000-0000"
              {...register('telephone')}
              maxLength={16}
              onChange={(e) => {
                handleTelephoneInput(e)
              }}
            />
            {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone.message}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </div>
  )
}
