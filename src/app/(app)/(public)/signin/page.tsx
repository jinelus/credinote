import Image from 'next/image'
import loginImg from '@/public/signin.jpg'
import SignInForm from '@/src/components/forms/signin-form'

export default function SignIn() {
	return (
		<main className="relative flex h-dvh w-full">
			<div className="h-full flex-1 lg:relative">
				<Image
					src={loginImg}
					alt="jcb mercado"
					width={920}
					height={860}
					className="h-full w-full object-cover"
				/>
				<div className="absolute top-0 left-0 hidden h-full w-full bg-black/50 lg:block" />
			</div>
			<div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-white/95 lg:relative lg:flex-1 lg:bg-white">
				<SignInForm />
			</div>
		</main>
	)
}
