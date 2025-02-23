import { cn } from "@/src/lib/utils";

type ContainerProps = {
    children: React.ReactNode
    className: string
}
export const Container = (props: ContainerProps) => {

    return (
        <section className={cn("w-full px-5 md:px-20 max-w-7xl py-10 lg:py-12", props.className)}>
            {props.children}
        </section>
    )
}