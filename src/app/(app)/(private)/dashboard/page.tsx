import { Suspense } from 'react'
import {
  DashboardPageContainer,
  DashboardPageContainerSkeleton,
} from '@/src/components/page-containers/dashboard'

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardPageContainerSkeleton />}>
      <DashboardPageContainer />
    </Suspense>
  )
}
