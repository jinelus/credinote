'use client'

import { HandCoins, House, ShoppingCart, Users } from "lucide-react"
import { Sidebar, SidebarGroup, SidebarMenu, SidebarMenuItem } from "../ui/sidebar"
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
            label: 'Pedidos',
            href: `/${slug}/pedidos`,
            icon: {
                active: <ShoppingCart fill="#000" />,
                inactive: <ShoppingCart />,
            }
        },
        {
            label: 'Pagamentos',
            href: `/${slug}/pagamentos`,
            icon: {
                active: <HandCoins fill="#000" />,
                inactive: <HandCoins />,
            }
        }
    ]

    return (
        <Sidebar collapsible='icon' variant='inset' className='bg-sidebar flex-1 top-24'>
            <div className='flex justify-start p-4 md:hidden'>
                <SidebarCustomTrigger />
            </div>

            <SidebarGroup className='top-12 w-full md:top-0'>
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