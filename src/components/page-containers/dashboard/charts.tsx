import { getOrdersAndPaymentsData } from '@/src/app/(app)/(private)/dashboard/action'
import { DashboardCharts } from '../../charts/dashboard-charts'

export const ChartsContainer = async ({ slug }: { slug: string }) => {
  const ordersPaymentsData = await getOrdersAndPaymentsData(slug, '90d')

  return (
    <DashboardCharts
      slug={slug}
      initialOrdersPaymentsData={ordersPaymentsData.success ? ordersPaymentsData.data : []}
    />
  )
}
