'use client'

import { LabelList, RadialBar, RadialBarChart } from 'recharts'
import {
    CardContent,
} from '../../ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart'

export const description = 'A radial chart with a label'

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
                <h2 className='font-semibold text-lg'>Clientes que mais comprou esse mês</h2>
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

