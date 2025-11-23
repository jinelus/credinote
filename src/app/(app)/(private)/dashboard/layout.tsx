import { Navbar } from '@/src/components/navbar'
import { DownloadReportButton } from '@/src/components/navbar/download-report-button'
import { AppSidebar } from '@/src/components/sidebar'
import { SidebarInset, SidebarProvider } from '../../../../components/ui/sidebar'

export default async function PrivateRootLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider defaultOpen={false}>
			<main className="flex h-screen w-full flex-col overflow-hidden bg-background">
				<Navbar />
				<section className="relative flex flex-1 overflow-hidden">
					<AppSidebar />
					<SidebarInset className="flex-1 space-y-4 overflow-y-auto py-4">
						<div className='flex max-w-7xl items-center justify-end'>
							<DownloadReportButton />
						</div>
						<div className="w-full">{children}</div>
					</SidebarInset>
				</section>
			</main>
		</SidebarProvider>
	)
}
