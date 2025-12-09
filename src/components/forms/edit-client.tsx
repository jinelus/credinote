'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { editClient } from '@/src/app/(app)/(private)/dashboard/clientes/actions'
import Button from '@/src/components/base-components/button'
import { Input } from '@/src/components/base-components/input'
import { handleTelephoneInput } from '@/src/utils/format'

const clientSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  telephone: z.string().optional(),
})

type ClientFormData = z.infer<typeof clientSchema>

type EditClientFormProps = {
  client: {
    id: string
    name: string
    telephone?: string | null
  }
  organizationId: string
  onClose: () => void
}

export default function EditClientForm({ client, organizationId, onClose }: EditClientFormProps) {
  const _router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client.name,
      telephone: client.telephone || '',
    },
  })

  const onSubmit = async (data: ClientFormData) => {
    try {
      const clientData = {
        ...data,
      }

      const result = await editClient({
        clientId: client.id,
        name: clientData.name,
        telephone: clientData.telephone,
        organizationId,
      })

      if (!result.success) {
        toast.error(result.error || 'Erro ao editar cliente')

        return
      }

      toast.success('Cliente editado com sucesso!')
      onClose()
    } catch (error) {
      console.error('Erro ao editar cliente:', error)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-14">
        <div className="flex flex-col gap-4">
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
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>
      </form>
    </div>
  )
}
