'use server'

import { headers } from "next/headers"
import { auth } from "./auth"
import { getUserWithOrganization } from "../app/actions/organization"
import { redirect } from "next/navigation"

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user) {
        redirect('/signin')
    }

    const userWithOrganization = await getUserWithOrganization(session.user.email)

    if(!userWithOrganization?.organization) {
        redirect('/signin')
    }

    return {
        user: session.user,
        organization: userWithOrganization.organization
    }
}