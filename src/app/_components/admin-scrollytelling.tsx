"use client"

import { useEffect, useRef, useState } from "react"
import { AdminDashboard } from "./admin-dashboard"
import { SkeletonCard } from "./skeleton-card"

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
        body: "Leverage open state and federal datasets to manage finances and identify skills needed for the future economy. Use labor statistics to guide curriculum planning and ensure students are prepared for high-growth job markets.",
        badge: "Future Planning",
    },
    {
        id: 2,
        state: "multi-campus",
        headline: "Unified District Operations",
        body: "Seamlessly coordinate operations across dozens of locations. Monitor performance metrics, standardize best practices, and ensure consistency while preserving each campus's unique identity and culture.",
        badge: "Scale with Ease",
    },
    {
        id: 3,
        state: "hr",
        headline: "Future-Ready Workforce",
        body: "Empower counselors with tools to increase support reach. Implement 'jobs available at graduation' tools and college-to-career maps that help students plan for success in their future education and career paths.",
        badge: "Career Pathways",
    },
    {
        id: 4,
        state: "analytics",
        headline: "Data-Driven Decision Intelligence",
        body: "Move beyond educated guesses. Utilize simulations, heat maps, and ranking tools to understand student learning deeply. Get just-in-time feedback to strategically adjust instruction and meet the needs of diverse learners.",
        badge: "Smart Analytics",
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
                                className="min-h-[80vh] px-6 py-12 transition-all duration-700 ease-out lg:px-12 flex items-center"
                                style={{
                                    opacity: activeSection === index ? 1 : 0.3,
                                    filter: activeSection === index ? "blur(0px)" : "blur(1px)",
                                    transform: activeSection === index ? "scale(1)" : "scale(0.98)",
                                }}
                            >
                                <SkeletonCard
                                    badge={section.badge}
                                    title={section.headline}
                                    description={section.body}
                                    className="w-full max-w-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
