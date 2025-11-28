import React from "react"
import { cn } from "@/lib/utils"

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
    badge?: string
    title: string
    description: string
    alignment?: "left" | "right"
}

export function SkeletonCard({ badge, title, description, alignment = "left", className, ...props }: SkeletonCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-white/10 bg-background/20 backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:bg-background/30",
                className
            )}
            {...props}
        >
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>

            {/* Corner Accents */}
            <div className="absolute -left-[1px] -top-[1px] h-3 w-3 border-l-2 border-t-2 border-primary/50 transition-all duration-500 group-hover:w-6 group-hover:border-primary"></div>
            <div className="absolute -right-[1px] -top-[1px] h-3 w-3 border-r-2 border-t-2 border-primary/50 transition-all duration-500 group-hover:w-6 group-hover:border-primary"></div>
            <div className="absolute -bottom-[1px] -left-[1px] h-3 w-3 border-b-2 border-l-2 border-primary/50 transition-all duration-500 group-hover:w-6 group-hover:border-primary"></div>
            <div className="absolute -bottom-[1px] -right-[1px] h-3 w-3 border-b-2 border-r-2 border-primary/50 transition-all duration-500 group-hover:w-6 group-hover:border-primary"></div>

            {/* Content */}
            <div className="relative z-10 p-8">
                {badge && (
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary font-mono tracking-wider uppercase">
                        {badge}
                    </div>
                )}
                <h3 className="mb-4 text-balance font-sans text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {title}
                </h3>
                <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                    {description}
                </p>

                {/* Technical Decorative Lines */}
                <div className="mt-6 flex items-center gap-2 opacity-30">
                    <div className="h-[1px] w-12 bg-primary"></div>
                    <div className="h-1 w-1 rounded-full bg-primary"></div>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                </div>
            </div>
        </div>
    )
}
