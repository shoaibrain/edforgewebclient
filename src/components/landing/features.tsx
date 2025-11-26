import React from "react";
import { MultiTenantIcon, CloudIcon, DataIcon, SecurityIcon, GlobalIcon, DotPattern } from "./svgs";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Multi-Tenant Architecture",
        description: "Isolated environments for every school. Scale securely across your entire organization.",
        icon: MultiTenantIcon,
        className: "md:col-span-2",
        gradient: "from-primary/20 via-primary/5 to-transparent",
    },
    {
        title: "Cloud Native",
        description: "99.9% uptime with auto-scaling infrastructure.",
        icon: CloudIcon,
        className: "md:col-span-1",
        gradient: "from-secondary/20 via-secondary/5 to-transparent",
    },
    {
        title: "Real-time Analytics",
        description: "Instant insights into attendance, performance, and finance.",
        icon: DataIcon,
        className: "md:col-span-1",
        gradient: "from-accent/20 via-accent/5 to-transparent",
    },
    {
        title: "Enterprise Security",
        description: "Role-based access control and encrypted data at rest.",
        icon: SecurityIcon,
        className: "md:col-span-2",
        gradient: "from-warning/20 via-warning/5 to-transparent",
    },
];

export const Features = () => {
    return (
        <section id="features" className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <DotPattern className="text-muted-foreground/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight">
                        Built for the <span className="text-primary">Future of Education</span>
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Everything you need to manage your institution, re-imagined for the modern web.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl border border-border/50 bg-background/40 backdrop-blur-sm p-8 hover:border-border/80 transition-all duration-300 hover:shadow-lg",
                                feature.className
                            )}
                        >
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", feature.gradient)} />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-background border border-border/50 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-6 h-6 text-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
