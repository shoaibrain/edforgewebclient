"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Building2,
    Users,
    GraduationCap,
    UserCircle,
    BookOpen,
    Video,
    LifeBuoy,
    ChevronDown,
    Menu,
    X,
    ArrowRight,
    Activity,
    School,
    BarChart3,
    PieChart,
    Wallet,
    Globe,
    Zap,
    Code2
} from "lucide-react"

// --- Types & Data ---

type NavItemType = "link" | "mega_menu"

interface MegaMenuItem {
    icon: React.ElementType
    iconColor: string
    title: string
    description: string
    href: string
    visual?: React.ReactNode // For rich content
}

interface MegaMenuConfig {
    layout?: "grid" | "featured"
    header?: {
        title: string
        description: string
    }
    items: MegaMenuItem[]
    footerItems?: { title: string; href: string; icon: React.ElementType }[]
}

interface NavItem {
    label: string
    type: NavItemType
    href?: string
    dropdown?: MegaMenuConfig
}

const NAV_ITEMS: NavItem[] = [
    {
        label: "Product",
        type: "mega_menu",
        dropdown: {
            layout: "featured",
            items: [
                {
                    icon: Activity,
                    iconColor: "#e76f51",
                    title: "EdForge Core",
                    description: "Central nervous system for school ops.",
                    href: "#core",
                    visual: (
                        <div className="w-full h-24 mt-3 rounded-md bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/10 flex items-center justify-center overflow-hidden relative group-hover:border-orange-500/20 transition-all">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                            <div className="w-3/4 h-3/4 bg-[#0f172a] rounded border border-white/5 flex flex-col p-2 gap-2 shadow-2xl">
                                <div className="w-full h-1.5 bg-orange-500/40 rounded-full"></div>
                                <div className="w-2/3 h-1.5 bg-orange-500/20 rounded-full"></div>
                                <div className="w-full h-1.5 bg-orange-500/10 rounded-full mt-auto"></div>
                            </div>
                        </div>
                    )
                },
                {
                    icon: BarChart3,
                    iconColor: "#2a9d8f",
                    title: "Analytics",
                    description: "Real-time student performance insights.",
                    href: "#analytics",
                    visual: (
                        <div className="w-full h-24 mt-3 rounded-md bg-gradient-to-br from-teal-500/10 to-teal-500/5 border border-teal-500/10 flex items-center justify-center overflow-hidden relative group-hover:border-teal-500/20 transition-all">
                            <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end justify-around px-4 pb-2 gap-1">
                                <div className="w-3 h-6 bg-teal-500/40 rounded-t-[2px]"></div>
                                <div className="w-3 h-10 bg-teal-500/60 rounded-t-[2px]"></div>
                                <div className="w-3 h-4 bg-teal-500/30 rounded-t-[2px]"></div>
                                <div className="w-3 h-8 bg-teal-500/50 rounded-t-[2px]"></div>
                            </div>
                        </div>
                    )
                },
                {
                    icon: Wallet,
                    iconColor: "#e9c46a",
                    title: "Finance",
                    description: "Automated payroll and fee management.",
                    href: "#finance",
                    visual: (
                        <div className="w-full h-24 mt-3 rounded-md bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/10 flex items-center justify-center overflow-hidden relative group-hover:border-yellow-500/20 transition-all">
                            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                                <span className="text-yellow-500 font-bold">$</span>
                            </div>
                        </div>
                    )
                }
            ],
            footerItems: [
                { title: "API Reference", href: "#api", icon: Code2 },
                { title: "Integrations", href: "#integrations", icon: Zap },
                { title: "Partner Program", href: "#partners", icon: Globe },
            ]
        },
    },
    {
        label: "Solutions",
        type: "mega_menu",
        dropdown: {
            layout: "grid",
            header: {
                title: "Tailored for every stakeholder",
                description: "Tools designed for the entire education ecosystem",
            },
            items: [
                {
                    icon: School,
                    iconColor: "#e76f51", // burnt_peach
                    title: "For Schools",
                    description: "Enterprise-grade EMIS for K-12",
                    href: "#schools",
                },
                {
                    icon: Building2,
                    iconColor: "#2a9d8f", // verdigris
                    title: "For Districts",
                    description: "Multi-school management at scale",
                    href: "#districts",
                },
                {
                    icon: GraduationCap,
                    iconColor: "#e9c46a", // tuscan_sun
                    title: "For Teachers",
                    description: "Streamline classroom operations",
                    href: "#teachers",
                },
                {
                    icon: UserCircle,
                    iconColor: "#f4a261", // sandy_brown
                    title: "For Parents",
                    description: "Stay connected with student progress",
                    href: "#parents",
                },
            ],
        },
    },
    {
        label: "Pricing",
        type: "link",
        href: "#pricing",
    },
    {
        label: "Resources",
        type: "mega_menu",
        dropdown: {
            layout: "grid",
            header: {
                title: "Learn & Explore",
                description: "Resources to help you get the most out of EdForge",
            },
            items: [
                {
                    icon: BookOpen,
                    iconColor: "#2a9d8f", // verdigris
                    title: "Documentation",
                    description: "Complete guides and docs",
                    href: "#docs",
                },
                {
                    icon: Video,
                    iconColor: "#e76f51", // burnt_peach
                    title: "Video Tutorials",
                    description: "Step-by-step walkthroughs",
                    href: "#videos",
                },
                {
                    icon: Users,
                    iconColor: "#e9c46a", // tuscan_sun
                    title: "Community",
                    description: "Connect with educators",
                    href: "#community",
                },
                {
                    icon: LifeBuoy,
                    iconColor: "#f4a261", // sandy_brown
                    title: "Support Center",
                    description: "Get 24/7 expert help",
                    href: "#support",
                },
            ],
        },
    },
]

// Identify which items are mega menus for the carousel logic
const MEGA_MENU_LABELS = NAV_ITEMS.filter(i => i.type === "mega_menu").map(i => i.label)

// --- Components ---

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Refs
    const navRef = useRef<HTMLDivElement>(null)
    const itemsRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setActiveDropdown(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Handle Hover Indicator
    useEffect(() => {
        if (hoveredItem && itemsRef.current[hoveredItem]) {
            const element = itemsRef.current[hoveredItem]
            if (element) {
                setIndicatorStyle({
                    left: element.offsetLeft,
                    width: element.offsetWidth,
                    opacity: 1
                })
            }
        } else {
            setIndicatorStyle(prev => ({ ...prev, opacity: 0 }))
        }
    }, [hoveredItem])

    // Calculate carousel transform
    const activeIndex = activeDropdown ? MEGA_MENU_LABELS.indexOf(activeDropdown) : -1
    const showDropdown = activeIndex !== -1

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "h-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
                : "h-24 bg-transparent border-b border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8 h-full flex items-center justify-between">
                {/* 1. Logo */}
                <Link href="/" className="flex items-center gap-3 group z-50">
                    <div className="relative w-10 h-10 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                        <img src="/logo-white.svg" alt="EdForge Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">EdForge</span>
                </Link>

                {/* 2. Desktop Navigation */}
                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                    <div className="relative flex items-center gap-1">

                        {/* Sliding Hover Indicator */}
                        <div
                            className="absolute top-1 bottom-1 rounded-full bg-white/10 transition-all duration-300 ease-out"
                            style={{
                                left: indicatorStyle.left,
                                width: indicatorStyle.width,
                                opacity: indicatorStyle.opacity
                            }}
                        />

                        {NAV_ITEMS.map((item) => (
                            <div
                                key={item.label}
                                ref={el => { itemsRef.current[item.label] = el }}
                                className="relative z-10"
                                onMouseEnter={() => {
                                    setHoveredItem(item.label)
                                    if (item.type === "mega_menu") setActiveDropdown(item.label)
                                    else setActiveDropdown(null)
                                }}
                                onMouseLeave={() => {
                                    // Don't clear immediately
                                }}
                            >
                                <Link
                                    href={item.href || "#"}
                                    className={`px-4 py-2 flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${activeDropdown === item.label || hoveredItem === item.label
                                        ? "text-white"
                                        : "text-slate-400 hover:text-white"
                                        }`}
                                >
                                    {item.label}
                                    {item.type === "mega_menu" && (
                                        <ChevronDown
                                            className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180" : ""
                                                }`}
                                        />
                                    )}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Unified Dropdown Container */}
                    <div
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-6 perspective-[2000px]"
                        onMouseEnter={() => {
                            // Keep active if hovering the dropdown
                        }}
                        onMouseLeave={() => {
                            setActiveDropdown(null)
                            setHoveredItem(null)
                        }}
                    >
                        <div
                            className={`relative bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-out origin-top ${showDropdown
                                ? "opacity-100 translate-y-0 scale-100 visible"
                                : "opacity-0 -translate-y-4 scale-95 invisible"
                                }`}
                            style={{
                                width: "900px",
                                height: "420px"
                            }}
                        >
                            {/* Carousel Wrapper */}
                            <div
                                className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                style={{
                                    width: `${MEGA_MENU_LABELS.length * 900}px`,
                                    transform: `translateX(-${activeIndex * 900}px)`
                                }}
                            >
                                {NAV_ITEMS.filter(item => item.type === "mega_menu").map((item) => (
                                    <div
                                        key={item.label}
                                        className="w-[900px] h-full flex-shrink-0"
                                    >
                                        {item.dropdown?.layout === "featured" ? (
                                            <div className="flex flex-col h-full">
                                                <div className="grid grid-cols-3 gap-4 p-6 flex-1">
                                                    {item.dropdown.items.map((subItem, idx) => (
                                                        <Link
                                                            key={idx}
                                                            href={subItem.href}
                                                            className="group flex flex-col p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-200"
                                                        >
                                                            <div className="flex items-center gap-3 mb-3">
                                                                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all">
                                                                    <subItem.icon className="w-5 h-5" style={{ color: subItem.iconColor }} />
                                                                </div>
                                                                <span className="font-semibold text-white">{subItem.title}</span>
                                                            </div>
                                                            <p className="text-sm text-slate-400 leading-snug mb-2">
                                                                {subItem.description}
                                                            </p>
                                                            {subItem.visual}
                                                        </Link>
                                                    ))}
                                                </div>
                                                {/* Footer */}
                                                {item.dropdown.footerItems && (
                                                    <div className="bg-white/5 border-t border-white/5 p-4 grid grid-cols-3 gap-4">
                                                        {item.dropdown.footerItems.map((footerItem, idx) => (
                                                            <Link key={idx} href={footerItem.href} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                                                                <div className="p-1.5 bg-white/5 rounded-md border border-white/5 text-slate-400 group-hover:text-white transition-colors">
                                                                    <footerItem.icon className="w-4 h-4" />
                                                                </div>
                                                                <span className="text-sm font-medium text-slate-400 group-hover:text-white">{footerItem.title}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col h-full">
                                                {item.dropdown?.header && (
                                                    <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                                                        <h3 className="text-xl font-bold text-white">
                                                            {item.dropdown.header.title}
                                                        </h3>
                                                        <p className="text-base text-slate-400 mt-2">
                                                            {item.dropdown.header.description}
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="grid grid-cols-2 gap-4 p-6 flex-1">
                                                    {item.dropdown?.items.map((subItem, idx) => (
                                                        <Link
                                                            key={idx}
                                                            href={subItem.href}
                                                            className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-200"
                                                        >
                                                            <div
                                                                className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-white/5 border border-white/5 group-hover:border-white/10 transition-all duration-300 group-hover:scale-110"
                                                            >
                                                                <subItem.icon
                                                                    className="w-6 h-6 transition-transform duration-300"
                                                                    style={{ color: subItem.iconColor }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-white flex items-center gap-2 text-base">
                                                                    {subItem.title}
                                                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white/50" />
                                                                </div>
                                                                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                                                                    {subItem.description}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Right Section */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <Button className="rounded-full bg-white text-black hover:bg-slate-200 px-6 font-medium shadow-lg shadow-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
                style={{ top: "80px" }}
            >
                <div className="p-6 flex flex-col gap-6 h-[calc(100vh-80px)] overflow-y-auto">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="border-b border-white/10 pb-4 last:border-0">
                            {item.type === "link" ? (
                                <Link
                                    href={item.href || "#"}
                                    className="text-lg font-semibold text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <div className="space-y-4">
                                    <div className="text-lg font-semibold text-white/50">
                                        {item.label}
                                    </div>
                                    <div className="grid gap-4 pl-4">
                                        {item.dropdown?.items.map((subItem, idx) => (
                                            <Link
                                                key={idx}
                                                href={subItem.href}
                                                className="flex items-center gap-3"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <subItem.icon
                                                    className="w-5 h-5"
                                                    style={{ color: subItem.iconColor }}
                                                />
                                                <span className="text-slate-300 font-medium">
                                                    {subItem.title}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="mt-auto pb-8">
                        <Button className="w-full rounded-full bg-white text-black py-6 text-lg font-bold">
                            Get Started Now
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
