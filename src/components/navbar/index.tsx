'use client'

import { SidebarTrigger } from '../ui/sidebar'
import { DownloadReportButton } from './download-report-button'
import { ProfileButton } from './profile-button'

export const Navbar = () => {
	return (
		<nav className="flex w-full items-center justify-between gap-6 border-slate-200 border-b px-6 py-5">
			<div className="flex items-center gap-6">
				<SidebarTrigger />
			</div>

			<div className="flex items-center gap-6">
				<DownloadReportButton />
				<div className="cursor-pointer text-lg">
					<ProfileButton />
				</div>
			</div>
		</nav>
	)
}
