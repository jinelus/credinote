import type { Route } from 'next'
import Link from 'next/link'
import { SidebarMenuButton } from '../ui/sidebar'

export const SidebarLink = ({
  item,
}: {
  item: { label: string; href: string; icon: React.ReactNode }
}) => {
  return (
    <SidebarMenuButton className="h-10 items-center gap-x-4 px-4" asChild tooltip={item.label}>
      <Link href={item.href as Route}>
        {item.icon}
        <span className="">{item.label}</span>
      </Link>
    </SidebarMenuButton>
  )
}
