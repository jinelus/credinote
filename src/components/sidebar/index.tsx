'use client'

import { FileText, House, ShoppingCart, UserPlus, Users, X } from "lucide-react"
import Link from "next/link"
import { useNav } from "../navbar/nav-context"


export const Sidebar = () => {

    const navLinks = [
        {
            label: 'Dashboard',
            href: '/',
            icon: <House />
        },
        {

            label: 'Novo compra',
            href: '/novo-compra',
            icon: <ShoppingCart />
        },
        {
            label: 'Novo cliente',
            href: '/novo-cliente',
            icon: <UserPlus />
        },
        {
            label: 'Clientes',
            href: '/clientes',
            icon: <Users />
        },
        {
            label: 'Compras',
            href: '/compras',
            icon: <ShoppingCart />
        },
        {
            label: 'Relatorios',
            href: '/relatorios',
            icon: <FileText />
        }
    ]

    const { open, handleOpen} = useNav()

    return (
        <div className={`${open ? 'flex' : 'hidden md:flex'} absolute md:relative top-0 left-0 z-10 w-full md:w-auto md:flex-1 h-full bg-black/50 md:bg-transparent`}>
            <div className="flex gap-16 flex-col items-center h-full border-r border-slate-200 w-1/2 sm:w-2/5 md:w-full bg-white md:bg-transparent">
                <div className="text-2xl font-bold text-slate-800 py-5 w-full flex items-center justify-center">
                    JCB Mercado
                    <X className="absolute top-2 right-2 cursor-pointer md:hidden" onClick={handleOpen} />
                </div>
                <ul className="w-full flex flex-col items-center">
                    {navLinks.map((link, i) => (
                        <li key={link.label + i} className="w-full">
                            <Link href={link.href} className="w-full flex items-center gap-2.5 py-4 px-10 text-slate-800 font-semibold hover:bg-slate-200">
                                {link.icon}
                                <span className="hidden sm:flex">{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}