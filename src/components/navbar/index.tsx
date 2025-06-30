'use client'

import { CircleUserRound, MapPinHouse, Menu } from "lucide-react"
import { useNav } from "./nav-context"

export const Navbar = () => {

    const { handleOpen } = useNav()

    return (
        <nav className="w-full flex items-center justify-between md:justify-between py-5 px-20 gap-6 border-b border-slate-200">
            <div className="flex items-center gap-6">
                <span className="cursor-pointer text-lg md:hidden" onClick={handleOpen}>
                    <Menu />
                </span>
                <div className="text-2xl font-bold text-slate-800">
                    JCB Mercado
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 font-semibold border rounded-lg border-slate-200 py-2 px-3 text-sm">
                    <MapPinHouse size={20} />
                    <span>
                        Erechim
                    </span>
                </div>
                <div className="cursor-pointer text-lg">
                    <CircleUserRound size={28} />
                </div>
            </div>

        </nav>
    )
}