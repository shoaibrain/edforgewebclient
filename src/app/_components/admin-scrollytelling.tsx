"use client"

import { useEffect, useRef, useState } from "react"
import { AdminDashboard } from "./admin-dashboard"

type DashboardState = "overview" | "multi-campus" | "hr" | "analytics"

interface ScrollSection {
    id: number
    state: DashboardState
    headline: string
    body: string
    badge: string
}

const sections: ScrollSection[] = [
    {
        id: 1,
        state: "overview",
        headline: "Enterprise-Grade District Management",
        body: "Manage multiple schools, campuses, and departments from a single unified platform. Real-time visibility into every aspect of your educational ecosystem, from enrollment trends to resource allocation across your entire organization.",
        badge: "Central Command",
    },
    {
        id: 2,
        state: "multi-campus",
        headline: "Multi-Campus Orchestration",
        body: "Seamlessly coordinate operations across dozens or hundreds of locations. Monitor performance metrics, standardize best practices, and ensure consistency while preserving each campus's unique identity and culture.",
        badge: "Scale with Ease",
    },
    {
        id: 3,
        state: "hr",
        headline: "Integrated HR & Personnel",
        body: "Streamline workforce management with automated onboarding, certification tracking, performance reviews, and professional development. Keep your most valuable asset—your people—engaged, compliant, and thriving.",
        badge: "People First",
    },
    {
        id: 4,
        state: "analytics",
        headline: "Strategic Decision Intelligence",
        body: "Transform data into actionable insights with predictive analytics, custom reporting, and AI-powered recommendations. Make confident decisions backed by comprehensive data visualization and forecasting models.",
        badge: "Data-Driven",
    },
]

export default function AdminScrollytelling() {
    const [activeSection, setActiveSection] = useState<number>(0)
    const [dashboardState, setDashboardState] = useState<DashboardState>("overview")
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current
            if (!container) return

            const viewportCenter = window.innerHeight / 2
            let closestSection = 0
            let closestDistance = Number.POSITIVE_INFINITY

            sectionRefs.current.forEach((ref, index) => {
                if (!ref) return
                const rect = ref.getBoundingClientRect()
                const sectionCenter = rect.top + rect.height / 2
                const distance = Math.abs(sectionCenter - viewportCenter)

                if (distance < closestDistance) {
                    closestDistance = distance
                    closestSection = index
                }
            })

            setActiveSection(closestSection)
            setDashboardState(sections[closestSection].state)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div ref={containerRef} className="relative border-t border-border bg-transparent-gradient">
            {/* Section Header */}
            <div className="px-6 py-20 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
                    For School Administrators
                </div>
                <h2 className="mb-4 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    Command Your District with Confidence
                </h2>
                <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
                    Purpose-built tools for superintendents, principals, and district leaders managing complex educational
                    organizations
                </p>
            </div>

            {/* Scrollytelling Content - Dashboard LEFT, Text RIGHT */}
            <div className="flex flex-col lg:flex-row">
                {/* Left Column - Sticky Dashboard */}
                <div className="relative w-full lg:w-7/12">
                    <div className="sticky top-0 flex min-h-screen items-center justify-center px-6 py-20">
                        <div className="w-full max-w-5xl">
                            <AdminDashboard activeState={dashboardState} />
                        </div>
                    </div>
                </div>

                {/* Right Column - Text Content */}
                <div className="w-full lg:w-5/12 lg:pl-8">
                    <div className="space-y-4 py-20">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                ref={(el) => {
                                    sectionRefs.current[index] = el
                                }}
                                className="min-h-[80vh] px-6 py-12 transition-all duration-700 ease-out lg:px-12"
                                style={{
                                    opacity: activeSection === index ? 1 : 0.3,
                                    filter: activeSection === index ? "blur(0px)" : "blur(1px)",
                                    transform: activeSection === index ? "scale(1)" : "scale(0.98)",
                                }}
                            >
                                <div className="max-w-lg">
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                        {section.badge}
                                    </div>
                                    <h3 className="mb-4 text-balance font-sans text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                        {section.headline}
                                    </h3>
                                    <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{section.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
