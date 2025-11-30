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
        headline: "Strategic Resource Allocation",
        body: "Transform financial data into actionable insights. Monitor real-time budget utilization across all departments, identify cost-saving opportunities, and ensure every dollar directly contributes to student success. Our predictive models help you plan for future fiscal years with confidence.",
        badge: "Financial Intelligence",
    },
    {
        id: 2,
        state: "multi-campus",
        headline: "Unified District Operations",
        body: "Orchestrate operations across your entire district from a single pane of glass. Standardize best practices, monitor campus health metrics in real-time, and ensure equitable resource distribution while respecting the unique culture of each school community.",
        badge: "District-Wide Control",
    },
    {
        id: 3,
        state: "hr",
        headline: "High-Performance Workforce",
        body: "Build and retain a world-class educational team. Track certification compliance, analyze teacher retention trends, and identify professional development needs. Empower your HR team to make data-backed hiring decisions that elevate educational outcomes.",
        badge: "Talent Management",
    },
    {
        id: 4,
        state: "analytics",
        headline: "Predictive Decision Intelligence",
        body: "Move from reactive to proactive management. Leverage AI-driven analytics to forecast enrollment trends, predict student performance outcomes, and intervene early. Turn complex data sets into clear, strategic narratives for stakeholders and board meetings.",
        badge: "Future-Ready Insights",
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
            <div className="px-6 py-24 text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                    For District Leaders
                </div>
                <h2 className="mb-6 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                    Command Your District with <span className="text-primary">Confidence</span>
                </h2>
                <p className="mx-auto max-w-3xl text-pretty text-lg text-muted-foreground md:text-xl">
                    A comprehensive command center designed for superintendents and administrators to drive operational excellence and educational equity.
                </p>
            </div>

            {/* Scrollytelling Content - Dashboard LEFT, Text RIGHT */}
            <div className="flex flex-col lg:flex-row">
                {/* Left Column - Sticky Dashboard */}
                <div className="relative w-full lg:w-7/12">
                    {/* Adjusted sticky positioning to account for navbar and prevent cutoff */}
                    <div className="sticky top-24 flex h-[calc(100vh-6rem)] items-center justify-center px-6 py-12 lg:py-0">
                        <div className="w-full max-w-[900px]">
                            <AdminDashboard activeState={dashboardState} />
                        </div>
                    </div>
                </div>

                {/* Right Column - Text Content */}
                <div className="w-full lg:w-5/12 lg:pl-8">
                    <div className="space-y-0 pb-24">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                ref={(el) => {
                                    sectionRefs.current[index] = el
                                }}
                                className="flex min-h-[80vh] items-center px-6 py-12 transition-all duration-700 ease-out lg:px-12"
                                style={{
                                    opacity: activeSection === index ? 1 : 0.3,
                                    filter: activeSection === index ? "blur(0px)" : "blur(2px)",
                                    transform: activeSection === index ? "translateY(0)" : "translateY(10px)",
                                }}
                            >
                                <div className="w-full max-w-lg">
                                    <div className="mb-4 inline-flex items-center rounded-md border border-border bg-background/50 px-2.5 py-0.5 text-xs font-semibold text-foreground backdrop-blur-md">
                                        {section.badge}
                                    </div>
                                    <h3 className="mb-4 text-3xl font-bold leading-tight text-foreground">
                                        {section.headline}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                        {section.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
