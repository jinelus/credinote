'use server'

import { headers } from "next/headers"
import { auth } from "./auth"
import { getUserWithOrganization } from "../app/actions/organization"

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user) {
        return null
    }

    const userWithOrganization = await getUserWithOrganization(session.user.email)

    if(!userWithOrganization) {
        return null
    }

    return {
        user: session.user,
        organization: userWithOrganization.organization
    }
}