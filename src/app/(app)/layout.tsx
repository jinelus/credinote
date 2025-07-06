import { Toaster } from "sonner";

export default async function AppLayout({ children }: { children: React.ReactNode }) {

  return (
    <main>
      <Toaster richColors />
      {children}
    </main>
  )
}