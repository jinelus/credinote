'use client'

import { useRouter } from "next/navigation"
import Button from "../base-components/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CircleUserRound } from "lucide-react"
import { authClient } from "@/src/lib/auth"


export const ProfileButton = () => {

    const router = useRouter()

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/signin");
              },
            },
          })
    }

    return (
        <Popover>
            <PopoverTrigger>
                <CircleUserRound size={28} />
            </PopoverTrigger>
            <PopoverContent align="end" className="max-w-48">
                <Button 
                    className="bg-transparent border-none text-slate-800 hover:bg-slate-200 w-full"
                    onClick={handleSignOut}
                >
                    Sair
                </Button>
            </PopoverContent>
        </Popover>
    )
}