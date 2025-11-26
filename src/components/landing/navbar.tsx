import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

const navItems = [
    { name: "Product", href: "#features" },
    { name: "Solutions", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Pricing", href: "#" },
];

export const Navbar = () => {
    return (
        <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
            <nav className="flex items-center justify-between p-2 pl-6 pr-2 bg-background/60 backdrop-blur-xl border border-border/40 rounded-full shadow-sm w-full max-w-4xl transition-all duration-300 hover:shadow-md hover:border-border/60">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm overflow-hidden">
                            <Logo className="w-full h-full" />
                        </div>
                        <span>EdForge</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex rounded-full px-4 text-muted-foreground hover:text-foreground">
                        Log in
                    </Button>
                    <Button size="sm" className="rounded-full px-5 shadow-sm bg-foreground text-background hover:bg-foreground/90">
                        Sign up
                    </Button>
                </div>
            </nav>
        </div>
    );
};
