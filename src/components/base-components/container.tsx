import { cn } from '@/src/lib/utils'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}
export const Container = (props: ContainerProps) => {
  return (
    <section
      className={cn('mx-auto w-full max-w-7xl px-5 py-10 md:px-20 lg:py-12', props.className)}
    >
      {props.children}
    </section>
  )
}
