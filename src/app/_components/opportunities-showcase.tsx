"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Heart, Sparkles, Target, GraduationCap, Brain } from "lucide-react"

const opportunities = [
    {
        id: 1,
        title: "Improving Mastery of Academic Skills",
        badge: "Academic Excellence",
        description:
            "Move beyond traditional textbooks with interactive simulations and formative assessments that pinpoint knowledge gaps. Build projects that encourage deeper exploration through meaningful, research-based learning experiences.",
        icon: Sparkles,
        color: "#2a9d8f",
        stats: [
            { label: "Math Proficiency", value: 87, change: "+12%", trend: [65, 68, 72, 75, 79, 83, 85, 87] },
            { label: "Science Engagement", value: 92, change: "+18%", trend: [70, 74, 78, 82, 85, 88, 90, 92] },
            { label: "Language Arts", value: 84, change: "+9%", trend: [72, 74, 76, 78, 80, 81, 83, 84] },
        ],
    },
    {
        id: 2,
        title: "Developing Skills for Lifelong Learning",
        badge: "Growth Mindset",
        description:
            "Foster perseverance, grit, and resilience through strategic challenges. Frame mistakes as opportunities and reward students who persist. Develop toolkits of strategies students apply when facing new challenges.",
        icon: Brain,
        color: "#e9c46a",
        stats: [
            { label: "Problem Solving", value: 78, change: "+15%", trend: [58, 62, 66, 70, 72, 74, 76, 78] },
            { label: "Persistence Rate", value: 91, change: "+22%", trend: [65, 70, 75, 79, 83, 86, 89, 91] },
            { label: "Growth Mindset Index", value: 89, change: "+14%", trend: [70, 73, 77, 80, 83, 85, 87, 89] },
        ],
    },
    {
        id: 3,
        title: "Increasing Family Engagement",
        badge: "Parent Partnership",
        description:
            "Bridge the gap between school and home with real-time progress updates in multiple languages. Empower parents with at-home activities, easy communication tools, and resources to become active advocates for their children.",
        icon: Heart,
        color: "#f4a261",
        stats: [
            { label: "Parent Portal Usage", value: 94, change: "+28%", trend: [60, 66, 72, 78, 84, 88, 91, 94] },
            { label: "Communication Rate", value: 88, change: "+31%", trend: [52, 60, 67, 73, 78, 82, 86, 88] },
            { label: "Home Activities", value: 82, change: "+19%", trend: [61, 65, 69, 73, 76, 78, 80, 82] },
        ],
    },
    {
        id: 4,
        title: "Planning for Future Education",
        badge: "Career Pathways",
        description:
            "Navigate college and career planning with financial aid tools, course planners, and college-to-career maps. Connect students with alumni and provide real-time labor market data to make informed decisions.",
        icon: GraduationCap,
        color: "#e76f51",
        stats: [
            { label: "College Readiness", value: 86, change: "+17%", trend: [64, 68, 72, 76, 79, 82, 84, 86] },
            { label: "Financial Aid Apps", value: 79, change: "+24%", trend: [55, 60, 65, 69, 73, 76, 78, 79] },
            { label: "Career Planning", value: 91, change: "+20%", trend: [67, 72, 76, 80, 84, 87, 89, 91] },
        ],
    },
    {
        id: 5,
        title: "Designing Effective Assessments",
        badge: "Smart Evaluation",
        description:
            "Seamless formative assessments that provide immediate feedback and identify competencies. Design evaluations that are embedded in learning materials to guide instruction and track progress effectively.",
        icon: Target,
        color: "#264653",
        stats: [
            { label: "Assessment Accuracy", value: 93, change: "+11%", trend: [78, 81, 84, 86, 88, 90, 92, 93] },
            { label: "Immediate Feedback", value: 96, change: "+13%", trend: [80, 83, 86, 89, 91, 93, 95, 96] },
            { label: "Learning Insights", value: 88, change: "+16%", trend: [68, 72, 76, 79, 82, 85, 87, 88] },
        ],
    },
]

export default function OpportunitiesShowcase() {
    const [activeOpportunity, setActiveOpportunity] = useState(0)
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"))
                        setActiveOpportunity(index)
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
        <section className="relative w-full bg-[oklch(0.18_0.02_240)] py-40">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="mb-32 text-center max-w-4xl mx-auto">
                    <div className="inline-block px-5 py-2.5 rounded-full bg-[oklch(0.74_0.11_62)]/15 text-[oklch(0.74_0.11_62)] text-sm font-semibold mb-10 border border-[oklch(0.74_0.11_62)]/20 backdrop-blur-sm">
                        Innovate, Don't Digitize
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                        Ten opportunities EdForge addresses
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                        Next-generation cloud-based EMIS that supports effective approaches to teaching and learning based on sound
                        research.
                    </p>
                </div>

                <div className="relative flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* LEFT: Scrollable Opportunities */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-[70vh] py-[35vh]">
                        {opportunities.map((opportunity, index) => (
                            <div
                                key={opportunity.id}
                                ref={(el) => {
                                    sectionRefs.current[index] = el
                                }}
                                data-index={index}
                                className={`transition-all duration-700 ${activeOpportunity === index ? "opacity-100 scale-100" : "opacity-30 blur-sm scale-95"
                                    }`}
                            >
                                <div
                                    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full mb-8 border-2 backdrop-blur-sm"
                                    style={{
                                        backgroundColor: `${opportunity.color}15`,
                                        borderColor: `${opportunity.color}40`,
                                        color: opportunity.color,
                                    }}
                                >
                                    <opportunity.icon className="w-5 h-5" />
                                    <span className="font-semibold text-sm tracking-wide">{opportunity.badge}</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                                    {opportunity.title}
                                </h3>
                                <p className="text-lg md:text-xl text-slate-300 leading-relaxed">{opportunity.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: Sticky Dashboard Visualizations */}
                    <div className="hidden lg:flex w-1/2 sticky top-24 h-screen items-center justify-center">
                        <div className="relative w-full max-w-xl">
                            {opportunities.map((opportunity, index) => (
                                <div
                                    key={opportunity.id}
                                    className={`absolute inset-0 transition-all duration-700 ease-out ${activeOpportunity === index
                                        ? "opacity-100 translate-y-0 scale-100"
                                        : activeOpportunity > index
                                            ? "opacity-0 -translate-y-16 scale-90"
                                            : "opacity-0 translate-y-16 scale-90"
                                        }`}
                                >
                                    <DashboardCard opportunity={opportunity} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function DashboardCard({ opportunity }: { opportunity: (typeof opportunities)[0] }) {
    const [animatedValues, setAnimatedValues] = useState(opportunity.stats.map(() => 0))

    useEffect(() => {
        const timers = opportunity.stats.map((stat, index) => {
            let currentValue = 0
            const increment = stat.value / 60
            const interval = setInterval(() => {
                currentValue += increment
                if (currentValue >= stat.value) {
                    currentValue = stat.value
                    clearInterval(interval)
                }
                setAnimatedValues((prev) => {
                    const newValues = [...prev]
                    newValues[index] = Math.round(currentValue)
                    return newValues
                })
            }, 25)
            return interval
        })

        return () => timers.forEach(clearInterval)
    }, [opportunity])

    return (
        <div className="bg-gradient-to-br from-[oklch(0.23_0.03_240)] to-[oklch(0.19_0.03_240)] border border-slate-700/40 rounded-[2rem] p-10 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
                        style={{
                            background: `radial-gradient(circle at 30% 30%, ${opportunity.color}40, ${opportunity.color}15)`,
                            border: `2px solid ${opportunity.color}60`,
                            boxShadow: `0 8px 32px ${opportunity.color}30`,
                        }}
                    >
                        <opportunity.icon className="w-7 h-7" style={{ color: opportunity.color }} />
                    </div>
                    <div>
                        <div className="text-xs text-slate-400 font-medium tracking-wide mb-1">Performance Dashboard</div>
                        <div className="text-base text-white font-bold">Opportunity {opportunity.id}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/25">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-400 font-bold tracking-wide">LIVE</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-8">
                {opportunity.stats.map((stat, index) => (
                    <div key={stat.label} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-300">{stat.label}</span>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-white tabular-nums tracking-tight">
                                    {animatedValues[index]}%
                                </span>
                                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 min-w-[60px]">
                                    <TrendingUp className="w-4 h-4" />
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                        <div className="relative h-3.5 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                            <div
                                className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                                style={{
                                    width: `${animatedValues[index]}%`,
                                    background: `linear-gradient(90deg, ${opportunity.color}, ${opportunity.color}cc)`,
                                    boxShadow: `0 0 24px ${opportunity.color}60, inset 0 1px 2px rgba(255,255,255,0.1)`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Trend Chart */}
            <div className="mt-10 pt-8 border-t border-slate-700/40">
                <div className="flex items-end justify-between h-20 gap-2">
                    {opportunity.stats.map((stat, i) => (
                        <div
                            key={i}
                            className="flex-1 rounded-t-lg transition-all duration-700 hover:opacity-70 cursor-pointer"
                            style={{
                                height: `${(stat.trend[i] / 100) * 100}%`,
                                background: `linear-gradient(180deg, ${opportunity.color}, ${opportunity.color}80)`,
                                opacity: 0.4 + i * 0.075,
                                animationDelay: `${i * 80}ms`,
                                boxShadow: `0 -4px 12px ${opportunity.color}30`,
                            }}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                    <span>8 Week Performance Trend</span>
                    <span className="text-slate-300 font-mono font-semibold">Q4 2024</span>
                </div>
            </div>
        </div>
    )
}
