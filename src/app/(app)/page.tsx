import { getSession } from "@/src/lib/get-session"
import { redirect } from "next/navigation"

export default async function Home() {

    const session = await getSession()

    if(!session) {
        redirect('/signin')
    }

    if(session.organization) {
        redirect(`/${session.organization.slug}`)
    }

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}