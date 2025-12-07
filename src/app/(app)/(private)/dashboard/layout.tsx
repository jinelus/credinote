import { Suspense } from 'react'
import { Navbar } from '@/src/components/navbar'
import { AppSidebar } from '@/src/components/sidebar'
import { SidebarInset, SidebarProvider } from '../../../../components/ui/sidebar'

export default function PrivateRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="overflow-hidden">
      <SidebarProvider className="h-screen max-h-screen overflow-hidden">
        <Suspense>
          <AppSidebar />
        </Suspense>
        <SidebarInset className="overflow-y-auto">
          <Navbar />
          <div className="w-full">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}
