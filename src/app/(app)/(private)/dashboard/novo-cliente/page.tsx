import { Suspense } from 'react'
import { NewClientPageContainer } from '@/src/components/page-containers/clients/new'

export default function ClientPage() {
  return (
    <Suspense>
      <NewClientPageContainer />
    </Suspense>
  )
}
