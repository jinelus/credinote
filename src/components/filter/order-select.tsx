'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { useQueryState } from "nuqs"

const selectElements = [
    {
        label: 'Data (mais recente)',
        orderBy: 'createdAt',
        order: 'desc',
    },
    {
        label: 'Data (mais antiga)',
        orderBy: 'createdAt',
        order: 'asc',
    },
    {
        label: 'Valor maior',
        orderBy: 'amount',
        order: 'desc',
    },
    {
        label: 'Valor menor',
        orderBy: 'amount',
        order: 'asc',
    }
]

export const OrderSelect = () => {

    const [orderBy, setOrderBy] = useQueryState('orderBy', {
        shallow: false
    })

    const [order, setOrder] = useQueryState('order', {
        shallow: false
    })
    
    const handleQuery = (orderBy: string, order: 'asc' | 'desc') => {
        setOrder(order)
        setOrderBy(orderBy)
    }

    const handleValueChange = (value: string) => {
        const selectedElement = selectElements.find(element => 
            `${element.orderBy}-${element.order}` === value
        )
        if (selectedElement) {
            handleQuery(selectedElement.orderBy, selectedElement.order as 'asc' | 'desc')
        }
    }

    
    const currentValue = orderBy && order ? `${orderBy}-${order}` : undefined

    return (
        <Select 
            value={currentValue}
            onValueChange={handleValueChange}
        >
            <SelectTrigger className="h-10">
                <SelectValue placeholder="Selecionar ordenação" />
            </SelectTrigger>
            <SelectContent className="w-40" position='popper' side='bottom' align='start'>
                {selectElements.map((element, index) => (
                    <SelectItem 
                        key={index} 
                        value={`${element.orderBy}-${element.order}`}
                        className="text-sm truncate px-2 hover:bg-slate-50 hover:outline-none text-center"
                    >
                        {element.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}