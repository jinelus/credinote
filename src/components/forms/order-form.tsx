'use client'

import { z } from "zod"
import { Input } from "../base-components/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const orderSchema = z.object({
    description: z.string().min(3, { message: 'A descrição deve ter pelo menos 3 caracteres' }),
    amount: z.number().min(0, { message: 'O valor deve ser maior ou igual a zero' }),
    paymentMethod: z.enum(['PIX', 'DINHEIRO', 'CARTÃO'], {
        errorMap: () => ({ message: 'Selecione um método de pagamento válido' })
    })
})

type OrderFormData = z.infer<typeof orderSchema>

interface OrderFormProps {
    onSubmit: (data: OrderFormData) => void
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<OrderFormData>({
        resolver: zodResolver(orderSchema)
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-sm font-medium">
                        Descrição do Pedido
                    </label>
                    <Input
                        id="description"
                        type="text"
                        placeholder="Descreva o pedido"
                        {...register('description')}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="amount" className="text-sm font-medium">
                        Valor Total
                    </label>
                    <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        {...register('amount', { valueAsNumber: true })}
                    />
                    {errors.amount && (
                        <p className="text-sm text-red-500">{errors.amount.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="paymentMethod" className="text-sm font-medium">
                        Método de Pagamento
                    </label>
                    <select
                        id="paymentMethod"
                        className="h-10 px-2 rounded-md bg-transparent border border-slate-400 outline-none focus:ring-2 focus:ring-slate-800 focus:outline-none focus:ring-offset-2"
                        {...register('paymentMethod')}
                    >
                        <option value="">Selecione o método de pagamento</option>
                        <option value="PIX">PIX</option>
                        <option value="DINHEIRO">Dinheiro</option>
                        <option value="CARTÃO">Cartão</option>
                    </select>
                    {errors.paymentMethod && (
                        <p className="text-sm text-red-500">{errors.paymentMethod.message}</p>
                    )}
                </div>
            </div>
        </form>
    )
} 