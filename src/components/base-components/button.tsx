import { tv, VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'transition-colors duration-300 ease-linear disabled:cursor-not-allowed',
  variants: {
    variant: {
      solid:
        'dark:disabled:hover-none hover:bg-slate-950 rounded-md bg-slate-800 text-white disabled:bg-slate-300 disabled:font-bold disabled:text-slate-950',
      ghost:
        'bg-trasparent rounded-md border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white disabled:border-slate-300 disabled:text-slate-300 disabled:hover:bg-transparent',

      link: 'hover:text-slate-950 flex items-center justify-center gap-1 text-slate-800',
    },
    size: {
      sm: 'h-12 w-32 lg:h-10',
      md: 'h-12 w-56 lg:h-10',
      lg: 'h-12 w-80 lg:h-10',
      fullMobile: 'h-10 w-full lg:w-56',
    },
  },

  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

type ButtonVariants = VariantProps<typeof buttonStyles>

interface ButtonProps
  extends ButtonVariants,
  React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return <button className={buttonStyles({ className, ...props })} {...props} />
}

export default Button
