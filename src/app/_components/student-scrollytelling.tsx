"use client"

import { useEffect, useRef, useState } from "react"
import { StudentDashboard } from "./student-dashboard"
import { SkeletonCard } from "./skeleton-card"

type DashboardState = "learning" | "engagement" | "achievements" | "personalized"

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
        state: "learning",
        headline: "Interactive Skill Mastery",
        body: "Go beyond textbooks with interactive simulations and virtual models. Explore ancient cities or conduct safe chemistry experiments. Build and create projects that encourage deeper exploration and mastery of academic concepts.",
        badge: "Deep Learning",
    },
    {
        id: 2,
        state: "engagement",
        headline: "Growth Mindset & Grit",
        body: "Frame mistakes as opportunities to learn. Develop a toolkit of strategies to apply when faced with challenges. We reward persistence and tenacity, helping you build the resilience needed to solve difficult problems.",
        badge: "Build Character",
    },
    {
        id: 3,
        state: "achievements",
        headline: "Lifelong Learning Toolkit",
        body: "Develop non-cognitive skills that are critical for long-term success. Track your growth in creativity, collaboration, and critical thinking alongside your academic achievements. Believe in your ability to improve and succeed.",
        badge: "Skills for Life",
    },
    {
        id: 4,
        state: "personalized",
        headline: "Future Pathways",
        body: "Plan your future with college-to-career maps and interactive course planning. Connect with alumni in fields that interest you to gain perspective and advice. Visualize your path to graduation and beyond.",
        badge: "Your Future",
    },
]

export default function StudentScrollytelling() {
    const [activeSection, setActiveSection] = useState<number>(0)
    const [dashboardState, setDashboardState] = useState<DashboardState>("learning")
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
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-chart-3/20 bg-chart-3/10 px-4 py-1.5 text-sm text-chart-3 backdrop-blur-sm">
                    For Students
                </div>
                <h2 className="mb-4 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    Learn, Grow, and Achieve Your Dreams
                </h2>
                <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
                    A learning platform that makes education fun, engaging, and perfectly tailored to help you succeed
                </p>
            </div>

            {/* Scrollytelling Content - Dashboard LEFT, Text RIGHT */}
            <div className="flex flex-col lg:flex-row">
                {/* Left Column - Sticky Dashboard */}
                <div className="relative w-full lg:w-7/12">
                    <div className="sticky top-0 flex min-h-screen items-center justify-center px-6 py-20">
                        <div className="w-full max-w-5xl">
                            <StudentDashboard activeState={dashboardState} />
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
