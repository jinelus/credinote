/* eslint-disable @typescript-eslint/no-empty-object-type */
import { cn } from "@/src/lib/utils"
import React from "react"


export interface InputProps
extends React.InputHTMLAttributes<HTMLInputElement> { }

export interface LabelProps
  extends React.InputHTMLAttributes<HTMLLabelElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    className,
    placeholder,
    type,
    ...props
}, ref) => {

    return (
        <input type={type} placeholder={placeholder} className={
            cn(
                'h-10 px-2 rounded-md bg-transparent border border-slate-400 outline-none focus:ring-2 focus:ring-slate-800 focus:outline-none focus:ring-offset-2 placeholder:text-slate-400',
                className
            )
        } {...props} ref={ref} />
    )
})

Input.displayName = 'Input'

export { Input }
