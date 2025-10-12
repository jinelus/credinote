'use client'

import { CircleUserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/src/lib/auth'
import Button from '../base-components/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export const ProfileButton = () => {
	const router = useRouter()

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push('/signin')
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
					className="w-full border-none bg-transparent text-slate-800 hover:bg-slate-200"
					onClick={handleSignOut}
				>
					Sair
				</Button>
			</PopoverContent>
		</Popover>
	)
}
