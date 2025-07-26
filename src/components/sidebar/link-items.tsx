'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, useMemo } from 'react'
import { SidebarMenuButton, useSidebar } from '../ui/sidebar'


export const LinkItems: FC<{
  item: {
    label: string
    href: string
    icon: { active: ReactNode; inactive: ReactNode }
  }
}> = ({ item }) => {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  const isActive = useMemo(() => {
    return pathname === item.href
  }, [item.href, pathname])

  return (
    <SidebarMenuButton asChild>
      <Link
        href={item.href}
        className={`text-lg w-full`}
        onClick={() => setOpenMobile(false)}
      >
        {isActive ? item.icon.active : item.icon.inactive}
        <span className=''>{item.label}</span>
      </Link>
    </SidebarMenuButton>
  )
}
