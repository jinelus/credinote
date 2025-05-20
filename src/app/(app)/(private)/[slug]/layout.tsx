import { Navbar } from "@/src/components/navbar";
import { NavContextProvider } from "@/src/components/navbar/nav-context";
import { Sidebar } from "@/src/components/sidebar";

export default async function PrivateRootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string }> }){

    const slug = (await params).slug

    return (
        <main className="h-dvh max-h-dvh w-full flex">
            <NavContextProvider>
                <Sidebar slug={slug} />
                <div className="flex-[5]">
                    <Navbar />
                    {children}
                </div>
            </NavContextProvider>
        </main>
    )
}