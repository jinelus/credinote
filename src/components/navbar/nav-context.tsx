'use client'

import { createContext, useContext, useState } from "react";

type NavContextType = { open: boolean, handleOpen: () => void }

export const NavContext = createContext<NavContextType | null>(null)

export const NavContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen((state) => !state)

    return (
        <NavContext.Provider value={{ open, handleOpen }}>
            {children}
        </NavContext.Provider>
    )
}

export const useNav = () => {
    const data = useContext(NavContext)

    if(!data) throw new Error('useNav must be used within a NavContextProvider')

    return data
}