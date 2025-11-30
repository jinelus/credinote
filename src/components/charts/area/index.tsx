'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { CardContent, CardDescription, CardTitle } from '../../ui/card'
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '../../ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

export const description = 'An interactive area chart'

const chartConfig = {
    orders: {
        label: 'Pedidos',
        color: 'var(--chart-1)',
    },
    payments: {
        label: 'Pagamentos',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig

interface ChartData {
    date: string
    orders: number
    payments: number
}

interface ChartAreaInteractiveProps {
    data: ChartData[]
    onTimeRangeChange?: (timeRange: '7d' | '30d' | '90d') => void
}

export function ChartAreaInteractive({ data, onTimeRangeChange }: ChartAreaInteractiveProps) {
    const [timeRange, setTimeRange] = React.useState<'7d' | '30d' | '90d'>('90d')

    const handleTimeRangeChange = (value: string) => {
        const newRange = value as '7d' | '30d' | '90d'
        setTimeRange(newRange)
        onTimeRangeChange?.(newRange)
    }

    const getTimeRangeLabel = () => {
        switch (timeRange) {
            case '7d':
                return 'últimos 7 dias'
            case '30d':
                return 'últimos 30 dias'
            default:
                return 'últimos 3 meses'
        }
    }

    return (
        <div className='flex-1 pt-0'>
            <div className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>
                        Pedidos e Pagamentos
                    </CardTitle>
                    <CardDescription>
                        Mostrando pedidos e pagamentos para os {getTimeRangeLabel()}
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Ultimos 3 meses
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Ultimos 30 dias
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Ultimos 7 dias
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <CardContent className="pt-4 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-orders)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-orders)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillPayments" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-payments)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-payments)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString('pt-BR', {
                                    month: 'short',
                                    day: 'numeric',
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString('pt-BR', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })
                                    }}
                                    indicator="dashed"
                                />
                            }
                        />
                        <Area
                            dataKey="payments"
                            type="natural"
                            fill="url(#fillPayments)"
                            stroke="var(--color-payments)"
                            stackId="a"
                        />
                        <Area
                            dataKey="orders"
                            type="natural"
                            fill="url(#fillOrders)"
                            stroke="var(--color-orders)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </div>
    )
}

