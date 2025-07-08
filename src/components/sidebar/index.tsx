'use client'

import { FileText, House, ShoppingCart, Users } from "lucide-react"
import { Sidebar, SidebarGroup, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { SidebarCustomTrigger } from "../navbar/sidebar-trigger"
import { LinkItems } from "./link-items"



export const AppSidebar = ({ slug }: { slug: string }) => {


    const navLinks = [
        {
            label: 'Dashboard',
            href: `/${slug}/`,
            icon: {
                active: <House fill="#000" />,
                inactive: <House />
            }
        },
        {
            label: 'Clientes',
            href: `/${slug}/clientes`,
            icon: {
                active: <Users fill="#000" />,
                inactive: <Users />,
            }
        },
        {
            label: 'Compras',
            href: `/${slug}/compras`,
            icon: {
                active: <ShoppingCart fill="#000" />,
                inactive: <ShoppingCart />,
            }
        },
        {
            label: 'Relatorios',
            href: `/${slug}/relatorios`,
            icon: {
                active: <FileText fill="#000" />,
                inactive: <FileText />,
            }
        }
    ]

    return (
        <Sidebar className='bg-green-800 w-full'>
            <div className='flex justify-start p-4 md:hidden'>
                <SidebarCustomTrigger />
            </div>
            <SidebarGroup className='top-12 w-full p-3 md:top-0'>
                <SidebarMenu className='flex flex-col gap-3'>
                {navLinks.map((item) => {
                    return (
                    <SidebarMenuItem className='' key={item.label + item.href}>
                        <LinkItems item={item} />
                    </SidebarMenuItem>
                    )
                })}
                </SidebarMenu>
            </SidebarGroup>
        </Sidebar>
    )
}