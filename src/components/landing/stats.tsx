import React from "react";

export const Stats = () => {
    return (
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "Schools", value: "500+" },
                        { label: "Students", value: "1M+" },
                        { label: "Uptime", value: "99.9%" },
                        { label: "Countries", value: "25+" },
                    ].map((stat, index) => (
                        <div key={index} className="p-4">
                            <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                            <div className="text-primary-foreground/80 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const Footer = () => {
    return (
        <footer className="bg-background border-t border-border py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">E</div>
                            <span className="text-xl font-bold">EdForge</span>
                        </div>
                        <p className="text-muted-foreground max-w-xs">
                            The next generation Enterprise grade Education Management Information System in Cloud.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">Features</a></li>
                            <li><a href="#" className="hover:text-primary">Pricing</a></li>
                            <li><a href="#" className="hover:text-primary">Security</a></li>
                            <li><a href="#" className="hover:text-primary">Roadmap</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">About Us</a></li>
                            <li><a href="#" className="hover:text-primary">Careers</a></li>
                            <li><a href="#" className="hover:text-primary">Contact</a></li>
                            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} EdForge Inc. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/* Social icons placeholders */}
                        <div className="w-5 h-5 bg-muted rounded-full"></div>
                        <div className="w-5 h-5 bg-muted rounded-full"></div>
                        <div className="w-5 h-5 bg-muted rounded-full"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
