/* eslint-disable @typescript-eslint/no-empty-object-type */

import React from 'react'
import { cn } from '@/src/lib/utils'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface LabelProps
	extends React.InputHTMLAttributes<HTMLLabelElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, placeholder, type, ...props }, ref) => {
		return (
			<input
				type={type}
				placeholder={placeholder}
				className={cn(
					'h-10 rounded-md border border-slate-400 bg-transparent px-2 outline-none placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2',
					className,
				)}
				{...props}
				ref={ref}
			/>
		)
	},
)

Input.displayName = 'Input'

export { Input }
