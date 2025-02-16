import Image from "next/image";
import loginImg from "@/public/signin.jpg"
import SignInForm from "@/src/components/signin-form";

export default function SignIn() {

    return (
        <main className="w-full h-dvh flex relative">
            <div className="flex-1 h-full lg:relative">
                <Image src={loginImg} alt="jcb mercado" className="w-full h-full object-cover" />
                <div className="hidden lg:block absolute top-0 left-0 w-full h-full bg-black/50" />
            </div>
            <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center bg-white/95 lg:bg-white lg:relative lg:flex-1">
                <SignInForm />
            </div>
        </main>
    )
}