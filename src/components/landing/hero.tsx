import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { GridPattern } from "./svgs";

export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0">
                <GridPattern className="text-border/40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-3 py-1 text-sm text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    Introducing EdForge 2.0
                    <ChevronRight className="ml-1 h-4 w-4 opacity-50" />
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                    The Operating System for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
                        Modern Education
                    </span>
                </h1>

                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    EdForge brings enterprise-grade efficiency to your institution.
                    Manage students, finance, and operations in one unified, intelligent cloud platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                    <Button size="lg" className="h-12 px-8 rounded-full text-base bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-primary/10 transition-all hover:scale-105" asChild>
                        <Link href="/dashboard">
                            Start for free <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted transition-all hover:scale-105" asChild>
                        <Link href="#features">
                            View Demo
                        </Link>
                    </Button>
                </div>

                {/* Abstract Interface Preview */}
                <div className="mt-20 relative max-w-5xl mx-auto animate-in fade-in zoom-in duration-1000 delay-500">
                    <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-xl shadow-2xl p-2">
                        <div className="rounded-lg border border-border/50 bg-card overflow-hidden aspect-[16/9] relative">
                            {/* Mock UI Header */}
                            <div className="h-12 border-b border-border/50 flex items-center px-4 gap-2 bg-muted/30">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                </div>
                                <div className="ml-4 h-6 w-64 rounded-md bg-muted/50"></div>
                            </div>
                            {/* Mock UI Body */}
                            <div className="p-6 grid grid-cols-12 gap-6 h-full bg-gradient-to-b from-background to-muted/20">
                                <div className="col-span-3 space-y-4">
                                    <div className="h-8 w-full rounded-md bg-muted/50"></div>
                                    <div className="h-4 w-3/4 rounded-md bg-muted/30"></div>
                                    <div className="h-4 w-1/2 rounded-md bg-muted/30"></div>
                                    <div className="h-32 w-full rounded-md bg-primary/5 border border-primary/10"></div>
                                </div>
                                <div className="col-span-9 space-y-6">
                                    <div className="flex gap-4">
                                        <div className="h-24 w-1/3 rounded-lg bg-card border border-border/50 shadow-sm"></div>
                                        <div className="h-24 w-1/3 rounded-lg bg-card border border-border/50 shadow-sm"></div>
                                        <div className="h-24 w-1/3 rounded-lg bg-card border border-border/50 shadow-sm"></div>
                                    </div>
                                    <div className="h-64 w-full rounded-lg bg-card border border-border/50 shadow-sm flex items-end p-4 gap-4">
                                        {[40, 60, 45, 70, 50, 80, 65, 85].map((h, i) => (
                                            <div key={i} className="flex-1 bg-primary/10 rounded-t-sm relative group">
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 bg-primary/80 rounded-t-sm transition-all duration-500 group-hover:bg-primary"
                                                    style={{ height: `${h}%` }}
                                                ></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 opacity-50 rounded-[3rem]"></div>
                </div>
            </div>
        </section>
    );
};
