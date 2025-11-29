import { Navbar } from '@/src/components/navbar'
import { AppSidebar } from '@/src/components/sidebar'
import { SidebarInset, SidebarProvider } from '../../../../components/ui/sidebar'

export default async function PrivateRootLayout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<Navbar />
					<div className="w-full">{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</main>
	)
}
