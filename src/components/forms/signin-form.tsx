'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { getUserWithOrganization } from '@/src/app/actions/organization'
import { authClient } from '@/src/lib/auth'
import Button from '../base-components/button'
import { Input } from '../base-components/input'

const FormDataSchema = z.object({
	email: z.string().email({ message: 'E-mail inválido' }),
	password: z
		.string({ message: 'Senha inválida' })
		.min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})

type FormData = z.infer<typeof FormDataSchema>

export default function SignInForm() {
	const router = useRouter()
	const [error, setError] = useState<string>('')

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(FormDataSchema),
	})

	const onSubmit = async (data: FormData) => {
		const { data: dataResponse } = await authClient.signIn.email(
			{
				email: data.email,
				password: data.password,
			},
			{
				onError: () => {
					setError('Credenciais inválidas. Verifique seu e-mail e senha.')
				},
			},
		)

		if (dataResponse?.user) {
			const data = await getUserWithOrganization(dataResponse?.user.email)

			if (!data) {
				setError('Você não faz parte de nenhum organização')
				return
			}
			toast.success('Login com succeso!')
			router.push(`/dashboard`)
		}
	}

	// const onSignUp = async (data: FormData) => {
	//     const { data: dataResponse } = await authClient.signUp.email({
	//         email: data.email,
	//         password: data.password,
	//         name: 'Judelin Inélus',
	//     }, {
	//         onError: () => {
	//             setError('Credenciais inválidas. Verifique seu e-mail e senha.')
	//         },
	//     })

	//     if (dataResponse?.user) {
	//         const data = await createOrganization({ name: 'JCB Mercado', userId: dataResponse.user.id })

	//         if (!data) {
	//             setError('Você não faz parte de nenhum organização')
	//             return
	//         }

	//         toast.success('Conta e Organização criadas com succeso!')
	//     }
	// }

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-md space-y-6 p-8"
		>
			<div className="space-y-2 text-center">
				<h1 className="font-bold text-3xl">Login</h1>
				<p className="text-gray-500">
					Digite suas credenciais para acessar sua conta
				</p>
			</div>
			{error && (
				<div className="rounded-md bg-red-50 p-3 text-red-500 text-sm">
					{error}
				</div>
			)}
			<div className="space-y-4">
				<div className="flex flex-col gap-2">
					<label htmlFor="email" className="font-medium text-sm">
						E-mail
					</label>
					<Input
						id="email"
						type="email"
						placeholder="exemplo@email.com"
						{...register('email')}
					/>
					{errors.email && (
						<p className="text-red-500 text-sm">{errors.email.message}</p>
					)}
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="password" className="font-medium text-sm">
						Senha
					</label>
					<Input
						id="password"
						type="password"
						placeholder="••••••••"
						{...register('password')}
					/>
					{errors.password && (
						<p className="text-red-500 text-sm">{errors.password.message}</p>
					)}
				</div>
				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? 'Entrando...' : 'Entrar'}
				</Button>
			</div>
		</form>
	)
}
