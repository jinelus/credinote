'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarMenuButton } from '../ui/sidebar'

export const SidebarLink = ({
  item,
}: {
  item: { label: string; href: string; icon: React.ReactNode }
}) => {
  const pathname = usePathname()

  return (
    <SidebarMenuButton
      className="h-10 items-center gap-x-4 px-4"
      asChild
      tooltip={item.label}
      isActive={pathname.startsWith(item.href)}
    >
      <Link href={item.href as Route}>
        {item.icon}
        <span className="">{item.label}</span>
      </Link>
    </SidebarMenuButton>
  )
}
