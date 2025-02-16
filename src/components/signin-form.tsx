'use client'

import { z } from "zod";
import Button from "./base-components/button";
import { Input } from "./base-components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const FormDataSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string({ message: 'Senha inválida' }).min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})

type FormData = z.infer<typeof FormDataSchema>

export default function SignInForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema)
    })

    const handleSignIn = (data: FormData) => {
        console.log(data)
    }

    return (
        <section className="flex flex-col gap-14 items-center justify-center lg:bg-white">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl font-bold text-slate-900"> JCB Mercado </h1>
            </div>
            <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-10 items-start w-full">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2.5 w-full">
                        <label htmlFor="email" className="text-slate-900">E-mail</label>
                        <Input type="email" id="email" placeholder="exemplo@gmail.com" {...register('email')} required />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2.5 w-full">
                        <label htmlFor="password" className="text-slate-900">Senha</label>
                        <Input type="text" id="password" {...register('password')} required />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                </div>
                <Button type="submit" size="lg" variant="solid">Entrar</Button>
            </form>
        </section>
    )
}