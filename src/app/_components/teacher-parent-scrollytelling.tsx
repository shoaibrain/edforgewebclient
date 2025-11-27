"use client"

import { useEffect, useRef, useState } from "react"
import { TeacherParentDashboard } from "./teacher-parent-dashboard"

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
        headline: "Intelligent Classroom Management",
        body: "Effortlessly organize lessons, assignments, and assessments with AI-powered tools. Spend less time on administrative tasks and more time inspiring students with personalized learning experiences tailored to each child's needs.",
        badge: "For Teachers",
    },
    {
        id: 2,
        state: "communication",
        headline: "Seamless Parent-Teacher Connection",
        body: "Bridge the home-school gap with real-time updates, instant messaging, and comprehensive progress reports. Parents stay informed and engaged while teachers maintain meaningful relationships with every family.",
        badge: "Stay Connected",
    },
    {
        id: 3,
        state: "progress",
        headline: "Real-Time Progress Tracking",
        body: "Monitor student growth with visual dashboards that make data meaningful. Identify learning gaps early, celebrate achievements, and provide timely interventions with actionable insights delivered to both teachers and parents.",
        badge: "Track Success",
    },
    {
        id: 4,
        state: "collaboration",
        headline: "Collaborative Learning Ecosystem",
        body: "Foster partnership between educators and families through shared goals, co-created action plans, and transparent communication. Together, create a support network that empowers every student to thrive academically and emotionally.",
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
                                className="min-h-[80vh] px-6 py-12 transition-all duration-700 ease-out lg:px-12"
                                style={{
                                    opacity: activeSection === index ? 1 : 0.3,
                                    filter: activeSection === index ? "blur(0px)" : "blur(1px)",
                                    transform: activeSection === index ? "scale(1)" : "scale(0.98)",
                                }}
                            >
                                <div className="max-w-lg">
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
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
