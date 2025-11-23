'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserWithOrganization } from '../app/actions/organization'
import { auth } from './auth'

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect('/signin')
  }

  const userWithOrganization = await getUserWithOrganization(session.user.email)

  if (!userWithOrganization?.organization) {
    redirect('/signin')
  }

  return {
    user: session.user,
    organization: userWithOrganization.organization,
  }
}
