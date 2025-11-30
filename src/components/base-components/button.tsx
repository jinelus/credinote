import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'transition-colors duration-300 ease-linear disabled:cursor-not-allowed',
  variants: {
    variant: {
      solid:
        'dark:disabled:hover-none rounded-md bg-primary text-white hover:bg-primary/90 disabled:bg-slate-200 disabled:font-bold disabled:text-slate-400',
      ghost:
        'rounded-md border border-border bg-trasparent hover:bg-primary hover:text-white disabled:border-border disabled:text-border disabled:hover:bg-transparent',

      link: 'flex items-center justify-center gap-1 text-slate-800 hover:text-slate-950',
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

interface ButtonProps extends ButtonVariants, React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return <button className={buttonStyles({ className, ...props })} {...props} />
}

export default Button
