'use client'

import { HandCoins, House, ShoppingCart, Users } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'

const navLinks = [
  {
    label: 'Dashboard',
    href: `/dashboard`,
    icon: <House />,
  },
  {
    label: 'Clientes',
    href: `/dashboard/clientes`,
    icon: <Users />,
  },
  {
    label: 'Pedidos',
    href: `/dashboard/pedidos`,
    icon: <ShoppingCart />,
  },
  {
    label: 'Pagamentos',
    href: `/dashboard/pagamentos`,
    icon: <HandCoins />,
  },
]

export const AppSidebar = () => {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="mt-5 h-10 gap-x-4 px-4">
              <Link href="/dashboard">
                <span className="font-bold text-2xl">JCB Mercado</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="mt-14 px-2">
        <SidebarMenu>
          {navLinks.map((item) => {
            return (
              <SidebarMenuItem key={item.label + item.href}>
                <SidebarMenuButton
                  className="h-10 items-center gap-x-4 px-4"
                  asChild
                  tooltip={item.label}
                  isActive={pathname === item.href}
                >
                  <Link href={item.href as Route}>
                    {item.icon}
                    <span className="">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
