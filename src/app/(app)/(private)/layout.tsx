import { Navbar } from "@/src/components/navbar";
import { NavContextProvider } from "@/src/components/navbar/nav-context";
import { Sidebar } from "@/src/components/sidebar";

export default function PrivateRootLayout({ children }: { children: React.ReactNode }){

    return (
        <main className="h-dvh max-h-dvh w-full flex">
            <NavContextProvider>
                <Sidebar />
                <div className="flex-[5]">
                    <Navbar />
                    {children}
                </div>
            </NavContextProvider>
        </main>
    )
}