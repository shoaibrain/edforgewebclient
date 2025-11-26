import { Button } from "@/components/ui/button"
import { FileText, Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
    return (
        <footer className="relative w-full py-32 bg-gradient-to-b from-[oklch(0.15_0.02_240)] to-[oklch(0.12_0.02_240)] border-t border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* CTA Section */}
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
                        Ready to lift the weight?
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Join forward-thinking schools that are transforming education management with EdForge.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Button
                            size="lg"
                            className="rounded-full bg-gradient-to-r from-[oklch(0.74_0.16_19)] to-[oklch(0.70_0.16_19)] text-white hover:shadow-[0_0_50px_rgba(231,111,81,0.6)] px-10 h-14 text-lg font-bold transition-all duration-500 hover:scale-105"
                        >
                            Start Your Journey
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full px-10 h-14 text-lg bg-transparent border-slate-600 text-white hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-500"
                        >
                            <FileText className="mr-2 w-5 h-5" />
                            Download Technical Paper
                        </Button>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <h3 className="font-bold text-white mb-6 text-lg">Product</h3>
                        <ul className="space-y-3 text-slate-400">
                            <li>
                                <a href="#" className="hover:text-[#2a9d8f] transition-colors duration-300">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#2a9d8f] transition-colors duration-300">
                                    Architecture
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#2a9d8f] transition-colors duration-300">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#2a9d8f] transition-colors duration-300">
                                    Case Studies
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-6 text-lg">Solutions</h3>
                        <ul className="space-y-3 text-slate-400">
                            <li>
                                <a href="#" className="hover:text-[#e9c46a] transition-colors duration-300">
                                    K-12 Schools
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e9c46a] transition-colors duration-300">
                                    Districts
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e9c46a] transition-colors duration-300">
                                    Higher Ed
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e9c46a] transition-colors duration-300">
                                    Private Schools
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-6 text-lg">Resources</h3>
                        <ul className="space-y-3 text-slate-400">
                            <li>
                                <a href="#" className="hover:text-[#f4a261] transition-colors duration-300">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#f4a261] transition-colors duration-300">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#f4a261] transition-colors duration-300">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#f4a261] transition-colors duration-300">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-6 text-lg">Company</h3>
                        <ul className="space-y-3 text-slate-400">
                            <li>
                                <a href="#" className="hover:text-[#e76f51] transition-colors duration-300">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e76f51] transition-colors duration-300">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e76f51] transition-colors duration-300">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e76f51] transition-colors duration-300">
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                            <img src="/logo-white.svg" alt="EdForge Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">EdForge</span>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-[#2a9d8f] hover:border-[#2a9d8f] transition-all duration-300"
                        >
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-[#e9c46a] hover:border-[#e9c46a] transition-all duration-300"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-[#f4a261] hover:border-[#f4a261] transition-all duration-300"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-[#e76f51] hover:border-[#e76f51] transition-all duration-300"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>

                    <p className="text-sm text-slate-500">© 2025 EdForge. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
