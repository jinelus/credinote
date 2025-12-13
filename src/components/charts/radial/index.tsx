'use client'

import dynamic from 'next/dynamic'
import { LabelList, RadialBar, RadialBarChart } from 'recharts'
import { CardContent } from '../../ui/card'
import { type ChartConfig, ChartTooltip, ChartTooltipContent } from '../../ui/chart'
import { Skeleton } from '../../ui/skeleton'

export const description = 'A radial chart with a label'

const ChartContainer = dynamic(
  () => import('@/src/components/ui/chart').then((mod) => mod.ChartContainer),
  { ssr: false },
)

interface ClientData {
  clientName: string
  orderCount: number
  totalAmount: number
  fill: string
}

interface ChartRadialLabelProps {
  data: ClientData[]
}

export function ChartRadialLabel({ data }: ChartRadialLabelProps) {
  // Create dynamic chart config based on client data
  const chartConfig: ChartConfig = {
    orderCount: {
      label: 'Pedidos',
    },
    ...data.reduce((acc, client, index) => {
      const key = `client${index}`
      acc[key] = {
        label: client.clientName,
        color: `var(--chart-${index + 1})`,
      }
      return acc
    }, {} as ChartConfig),
  }

  // Transform data for the chart
  const chartData = data.map((client, _index) => ({
    name: client.clientName,
    orderCount: client.orderCount,
    totalAmount: client.totalAmount,
    fill: client.fill,
  }))

  return (
    <div className="flex flex-col">
      <div className="items-center pb-0">
        <h2 className="font-semibold text-lg">Clientes que mais comprou esse mês</h2>
      </div>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="name"
                  formatter={(value, name, props) => {
                    if (name === 'orderCount') {
                      return (
                        <>
                          <div className="flex items-center gap-2">
                            <span>Pedidos: {value}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Total: R$ {props.payload.totalAmount.toFixed(2)}</span>
                          </div>
                        </>
                      )
                    }
                    return value
                  }}
                />
              }
            />
            <RadialBar dataKey="orderCount" background>
              <LabelList
                position="insideStart"
                dataKey="name"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </div>
  )
}

export const ChartRadialLabelSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="items-center pb-0">
        <Skeleton className="h-6 w-64" />
      </div>
      <div className="flex flex-1 items-center justify-center pb-0">
        <div className="relative mx-auto aspect-square max-h-[250px] w-full max-w-[250px]">
          <Skeleton className="h-full w-full rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="h-[60px] w-[60px] rounded-full bg-background" />
          </div>
        </div>
      </div>
    </div>
  )
}
