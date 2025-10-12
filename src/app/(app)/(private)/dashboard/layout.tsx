import { SidebarInset, SidebarProvider } from "../../../../components/ui/sidebar";
import { Navbar } from "@/src/components/navbar";
import { AppSidebar } from "@/src/components/sidebar";

export default async function PrivateRootLayout({ children }: { children: React.ReactNode }){
    return (
        <SidebarProvider defaultOpen={false}>
            <main className='bg-background flex h-screen w-full flex-col overflow-hidden'>
                <Navbar />
                <section className='relative flex flex-1 overflow-hidden'>
                    <AppSidebar />
                    <SidebarInset className='flex-1 overflow-y-auto'>
                        <div className='w-full'>
                            {children}
                        </div>
                    </SidebarInset>
                </section>
            </main>
        </SidebarProvider>
    )
}