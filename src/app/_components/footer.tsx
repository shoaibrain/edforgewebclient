import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react"

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden border-t border-border bg-background pt-24 pb-12">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                {/* CTA Section */}
                <div className="mb-32 flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <h2 className="mb-6 text-5xl font-bold tracking-tighter text-foreground md:text-6xl lg:text-7xl">
                            Ready to lift the weight?
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Join forward-thinking schools that are transforming education management with EdForge.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                            size="lg"
                            className="group h-14 rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                        >
                            Start Your Journey
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-14 rounded-full border-2 border-primary/20 bg-transparent px-8 text-lg font-semibold text-foreground hover:bg-primary/5 hover:border-primary/40"
                        >
                            Contact Sales
                        </Button>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="mb-24 grid grid-cols-2 gap-12 md:grid-cols-4 lg:gap-24">
                    <div className="flex flex-col gap-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Product</h3>
                        <ul className="flex flex-col gap-4">
                            {["Features", "Architecture", "Security", "Roadmap", "Changelog"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-lg font-medium text-foreground transition-colors hover:text-primary">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Solutions</h3>
                        <ul className="flex flex-col gap-4">
                            {["K-12 Districts", "Higher Education", "Private Schools", "International", "Government"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-lg font-medium text-foreground transition-colors hover:text-primary">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Resources</h3>
                        <ul className="flex flex-col gap-4">
                            {["Documentation", "API Reference", "Community", "Blog", "Help Center"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-lg font-medium text-foreground transition-colors hover:text-primary">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Company</h3>
                        <ul className="flex flex-col gap-4">
                            {["About", "Careers", "Legal", "Privacy", "Contact"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-lg font-medium text-foreground transition-colors hover:text-primary">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Massive Typography */}
                <div className="relative mb-12 flex w-full justify-center overflow-hidden">
                    <h1 className="select-none text-[22vw] font-black leading-none tracking-tighter text-foreground/10 transition-colors hover:text-foreground/20">
                        EdForge
                    </h1>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
                    <p className="text-sm font-medium text-muted-foreground">
                        © 2025 EdForge Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {[
                            { icon: Twitter, href: "#" },
                            { icon: Github, href: "#" },
                            { icon: Linkedin, href: "#" },
                            { icon: Mail, href: "#" },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                <social.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
