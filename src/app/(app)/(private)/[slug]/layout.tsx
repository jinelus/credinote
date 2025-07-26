import { SidebarInset, SidebarProvider } from "../../../../components/ui/sidebar";
import { getOrganizationBySlug } from "@/src/app/actions/organization";
import { Navbar } from "@/src/components/navbar";
import { AppSidebar } from "@/src/components/sidebar";
import { redirect } from "next/navigation";

export default async function PrivateRootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string }> }){

    const slug = (await params).slug

    const organization = await getOrganizationBySlug(slug)

    if (!organization) {
        redirect('/signin')
    }

    return (
        <SidebarProvider defaultOpen={false}>
            <main className='bg-background flex h-screen w-full flex-col overflow-hidden'>
                <Navbar />
                <section className='relative flex flex-1 overflow-hidden'>
                    <AppSidebar slug={slug} />
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