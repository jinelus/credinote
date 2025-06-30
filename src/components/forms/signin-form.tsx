'use client'

import { z } from "zod";
import Button from "../base-components/button";
import { Input } from "../base-components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/src/lib/auth";
import { getUserWithOrganization } from "@/src/app/actions/organization";

const FormDataSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string({ message: 'Senha inválida' }).min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})

type FormData = z.infer<typeof FormDataSchema>

export default function SignInForm() {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema)
    })

    const onSubmit = async (data: FormData) => {
        const { data: dataResponse } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
        }, {
            onError: () => {
                setError('Credenciais inválidas. Verifique seu e-mail e senha.')
            },
        })

        if (dataResponse?.user) {
            const data = await getUserWithOrganization(dataResponse?.user.email)

            if (!data) {
                setError('Você não faz parte de nenhum organização')
                return
            }

            router.push(`/${data.organization?.slug}`)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-500">Digite suas credenciais para acessar sua conta</p>
            </div>
            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                    {error}
                </div>
            )}
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="exemplo@email.com"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium">Senha</label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                </Button>
            </div>
        </form>
    )
}