"use client"

import { useEffect, useRef, useState } from "react"
import { TeacherParentDashboard } from "./teacher-parent-dashboard"
import { SkeletonCard } from "./skeleton-card"

type DashboardState = "classroom" | "communication" | "progress" | "collaboration"

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
        state: "classroom",
        headline: "Actionable Formative Assessment",
        body: "Get quick and continual snapshots of student progress. Embedded assessments provide just-in-time feedback, allowing you to personalize learning pathways and strategically adjust instruction to meet every student's needs.",
        badge: "Real-Time Insight",
    },
    {
        id: 2,
        state: "communication",
        headline: "Real-Time Family Connection",
        body: "Bridge the home-school gap with daily progress updates and easy communication tools. Empower parents to become active, informed advocates for their children, reinforcing that learning happens everywhere, not just in school.",
        badge: "Family Engagement",
    },
    {
        id: 3,
        state: "progress",
        headline: "Inclusive Support Network",
        body: "Ensure success for every student, including those with learning disabilities or diverse backgrounds. Provide resources in home languages and help families navigate the school system, creating a truly inclusive community.",
        badge: "Access for All",
    },
    {
        id: 4,
        state: "collaboration",
        headline: "Collaborative Learning Ecosystem",
        body: "Foster partnership between educators and families through shared goals. Connect school learning to practical home activities, ensuring a supportive environment where every student can thrive academically and emotionally.",
        badge: "Work Together",
    },
]

export default function TeacherParentScrollytelling() {
    const [activeSection, setActiveSection] = useState<number>(0)
    const [dashboardState, setDashboardState] = useState<DashboardState>("classroom")
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
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm text-accent backdrop-blur-sm">
                    For Teachers & Parents
                </div>
                <h2 className="mb-4 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    Empower Learning Through Partnership
                </h2>
                <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
                    Tools designed for educators and families to collaborate, communicate, and celebrate student success together
                </p>
            </div>

            {/* Scrollytelling Content - Text LEFT, Dashboard RIGHT */}
            <div className="flex flex-col lg:flex-row">
                {/* Left Column - Text Content */}
                <div className="w-full lg:w-5/12 lg:pr-8">
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

                {/* Right Column - Sticky Dashboard */}
                <div className="relative w-full lg:w-7/12">
                    <div className="sticky top-0 flex min-h-screen items-center justify-center px-6 py-20">
                        <div className="w-full max-w-5xl">
                            <TeacherParentDashboard activeState={dashboardState} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
