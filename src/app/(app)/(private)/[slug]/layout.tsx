import { getOrganizationBySlug } from "@/src/app/actions/organization";
import { Container } from "@/src/components/base-components/container";
import { Navbar } from "@/src/components/navbar";
import { NavContextProvider } from "@/src/components/navbar/nav-context";
import { Sidebar } from "@/src/components/sidebar";
import { redirect } from "next/navigation";

export default async function PrivateRootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string }> }){

    const slug = (await params).slug

    const organization = await getOrganizationBySlug(slug)

    if (!organization) {
        redirect('/signin')
    }

    return (
        <main className="h-dvh max-h-dvh overflow-hidden w-full flex flex-col">
            <NavContextProvider>
                <Navbar />
                <div className="flex flex-1">
                    <Sidebar slug={slug} />
                    <Container className="flex justify-center overflow-y-auto">
                        {children}
                    </Container>
                </div>
            </NavContextProvider>
        </main>
    )
}