"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { BarChart3, Share2, ShieldCheck, Users, Activity, Lock } from "lucide-react"

type FeatureStep = {
    id: number
    title: string
    description: string
    badge: string
    icon: React.ElementType
    visualContent: React.ReactNode
}

const features: FeatureStep[] = [
    {
        id: 0,
        title: "Data-Driven Decision Making",
        badge: "Analytics Service",
        icon: BarChart3,
        description:
            "Move beyond simple data collection. Our CQRS architecture separates reads from writes, powering real-time dashboards for principals to identify 'at-risk' students instantly.",
        visualContent: (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-slate-100 font-semibold">Attendance Analytics</h3>
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">Live</span>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="w-8 h-24 bg-slate-700 rounded-t-lg mx-1 relative group">
                            <div className="absolute bottom-0 w-full h-[80%] bg-blue-500 rounded-t-lg transition-all duration-500"></div>
                        </div>
                        <div className="w-8 h-24 bg-slate-700 rounded-t-lg mx-1 relative">
                            <div className="absolute bottom-0 w-full h-[40%] bg-blue-500 rounded-t-lg transition-all duration-500"></div>
                        </div>
                        <div className="w-8 h-24 bg-slate-700 rounded-t-lg mx-1 relative">
                            <div className="absolute bottom-0 w-full h-[90%] bg-blue-500 rounded-t-lg transition-all duration-500"></div>
                        </div>
                        <div className="w-8 h-24 bg-slate-700 rounded-t-lg mx-1 relative">
                            <div className="absolute bottom-0 w-full h-[60%] bg-blue-500 rounded-t-lg transition-all duration-500"></div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-800 flex justify-between text-sm text-slate-400">
                        <span>Daily Trend</span>
                        <span className="text-white font-mono">94.3% Rate</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 1,
        title: "Seamless Interoperability",
        badge: "Event-Driven Architecture",
        icon: Share2,
        description:
            "Break down silos. When a student enrolls, the EventBridge bus automatically notifies Finance, Curriculum, and Transport services instantly—no manual entry required.",
        visualContent: (
            <div className="relative w-full max-w-md h-64 flex items-center justify-center">
                {/* Central Node */}
                <div className="absolute z-10 bg-white p-4 rounded-full shadow-xl border-4 border-blue-100 animate-pulse">
                    <Activity className="w-8 h-8 text-blue-600" />
                </div>

                {/* Satellites */}
                <div className="absolute top-0 left-10 bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center gap-2 transform -translate-y-1/2 transition-transform duration-700">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-white">Enrollment</span>
                </div>
                <div className="absolute bottom-0 right-10 bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center gap-2 transform translate-y-1/2 transition-transform duration-700">
                    <BarChart3 className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-white">Finance</span>
                </div>

                {/* Connecting Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                        x1="50%"
                        y1="50%"
                        x2="25%"
                        y2="20%"
                        stroke="#CBD5E1"
                        strokeWidth="2"
                        strokeDasharray="4"
                        className="animate-[dash_1s_linear_infinite]"
                    />
                    <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4" />
                </svg>
            </div>
        ),
    },
    {
        id: 2,
        title: "Enterprise-Grade Security",
        badge: "Tenant Isolation",
        icon: ShieldCheck,
        description:
            "FERPA compliant by design. Multi-tenant isolation via DynamoDB partition keys ensures data never leaks between schools. Authenticated via AWS Cognito.",
        visualContent: (
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
                    <Lock className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl text-white font-bold mb-2">Sprouts School</h3>
                <p className="text-slate-400 text-sm mb-6">
                    Tenant ID: <span className="font-mono text-slate-300">sch_882_x99</span>
                </p>

                <div className="flex items-center justify-center gap-2 bg-green-900/20 border border-green-900/50 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                    <span className="text-green-400 text-xs font-semibold tracking-wide">ENCRYPTION ACTIVE</span>
                </div>
            </div>
        ),
    },
]

export default function ScrollytellingFeatures() {
    const [activeStep, setActiveStep] = useState(0)
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"))
                        setActiveStep(index)
                    }
                })
            },
            {
                root: null,
                rootMargin: "-40% 0px -40% 0px",
                threshold: 0.2,
            },
        )

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref)
            })
        }
    }, [])

    return (
        <section className="relative w-full bg-background py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Intro Header */}
                <div className="mb-24 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                        Architected for the future
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        EdForge replaces heavy legacy monoliths with light, event-driven microservices.
                    </p>
                </div>

                <div className="relative flex flex-col md:flex-row gap-8 lg:gap-20">
                    {/* LEFT COLUMN: Scrollable Text */}
                    <div className="w-full md:w-1/2 flex flex-col gap-[50vh] py-[20vh]">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                ref={(el) => { sectionRefs.current[index] = el }}
                                data-index={index}
                                className={`transition-all duration-500 ${activeStep === index ? "opacity-100" : "opacity-30 blur-sm"}`}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                                    <feature.icon className="w-4 h-4" />
                                    {feature.badge}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{feature.title}</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: Sticky Visuals */}
                    <div className="hidden md:flex w-1/2 sticky top-0 h-screen items-center justify-center overflow-hidden">
                        {/* Background Decor */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent z-0 pointer-events-none" />

                        <div className="relative z-10 w-full flex justify-center">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    className={`absolute transition-all duration-700 ease-in-out transform ${activeStep === index
                                        ? "opacity-100 translate-y-0 scale-100"
                                        : activeStep > index
                                            ? "opacity-0 -translate-y-10 scale-95"
                                            : "opacity-0 translate-y-10 scale-95"
                                        }`}
                                >
                                    {feature.visualContent}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
