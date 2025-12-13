import { HandCoins, House, ShoppingCart, Users } from 'lucide-react'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'
import { SidebarLink } from './link'

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
                <SidebarLink item={item} />
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
