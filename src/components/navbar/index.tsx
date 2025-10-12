'use client'

import { MapPinHouse } from 'lucide-react'
import { ProfileButton } from './profile-button'
import { SidebarCustomTrigger } from './sidebar-trigger'

export const Navbar = () => {
	return (
		<nav className="flex h-24 w-full items-center justify-between gap-6 border-slate-200 border-b px-20 py-5 md:justify-between">
			<div className="flex items-center gap-6">
				<SidebarCustomTrigger />
				<div className="font-bold text-2xl text-slate-800">JCB Mercado</div>
			</div>

			<div className="flex items-center gap-6">
				<div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 font-semibold text-sm">
					<MapPinHouse size={20} />
					<span>Erechim</span>
				</div>
				<div className="cursor-pointer text-lg">
					<ProfileButton />
				</div>
			</div>
		</nav>
	)
}
