'use client'

import { useState } from 'react'
import { ChartAreaInteractive } from '@/src/components/charts/area'
import { ChartRadialLabel } from '@/src/components/charts/radial'
import { getOrdersAndPaymentsData } from './action'

interface DashboardChartsProps {
    slug: string
    initialOrdersPaymentsData: Array<{ date: string; orders: number; payments: number }>
    topClientsData: Array<{
        clientName: string
        orderCount: number
        totalAmount: number
        fill: string
    }>
}

export function DashboardCharts({
    slug,
    initialOrdersPaymentsData,
    topClientsData,
}: DashboardChartsProps) {
    const [ordersPaymentsData, setOrdersPaymentsData] = useState(initialOrdersPaymentsData)
    const [_isLoading, setIsLoading] = useState(false)

    const handleTimeRangeChange = async (timeRange: '7d' | '30d' | '90d') => {
        setIsLoading(true)
        try {
            const result = await getOrdersAndPaymentsData(slug, timeRange)
            if (result.success && result.data) {
                setOrdersPaymentsData(result.data)
            }
        } catch (error) {
            console.error('Error fetching chart data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex w-full flex-col items-center gap-6 lg:flex-row'>
            <ChartAreaInteractive data={ordersPaymentsData} onTimeRangeChange={handleTimeRangeChange} />
            <ChartRadialLabel data={topClientsData} />
        </div>
    )
}
