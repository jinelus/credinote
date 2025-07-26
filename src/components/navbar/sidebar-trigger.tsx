'use client'


import { useSidebar } from '../ui/sidebar'
import { AnimatedHamburgerButton } from './hamburger'

export function SidebarCustomTrigger() {
  const { toggleSidebar, open } = useSidebar()

  return (
    <button
      aria-label='Open Sidebar menu'
      className='group flex h-full w-fit items-center justify-center'
      onClick={toggleSidebar}
    >
      <AnimatedHamburgerButton open={open} />
    </button>
  )
}
