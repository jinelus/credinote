import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
        <SidebarProvider>
            <main className="flex h-screen w-full overflow-hidden">
                <AppSidebar slug={slug} />
                <section className="flex flex-1 flex-col overflow-hidden">
                    <Navbar />
                    <SidebarInset className="overflow-y-auto">
                        {children}
                    </SidebarInset>
                </section>
            </main>
        </SidebarProvider>
    )
}