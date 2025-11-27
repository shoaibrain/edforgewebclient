"use client"

import { useEffect, useRef, useState } from "react"
import { EdForgeDashboard } from "./edforge-dashboard"

type DashboardState = "analytics" | "students" | "resources" | "feedback"

interface ScrollSection {
    id: number
    state: DashboardState
    headline: string
    body: string
}

const sections: ScrollSection[] = [
    {
        id: 1,
        state: "analytics",
        headline: "AI-Powered Analytics Core",
        body: "Get real-time insights into student performance, attendance patterns, and institutional metrics. Our intelligent dashboard adapts to your role, surfacing the most relevant data at the right time.",
    },
    {
        id: 2,
        state: "students",
        headline: "Unified Student Experience",
        body: "Track student progress, manage enrollments, and access comprehensive profiles all in one place. Intuitive interfaces make complex data accessible for educators and administrators alike.",
    },
    {
        id: 3,
        state: "resources",
        headline: "Resource Management",
        body: "Efficiently allocate and monitor educational resources, from curriculum materials to facility scheduling. Smart recommendations help optimize resource utilization across your institution.",
    },
    {
        id: 4,
        state: "feedback",
        headline: "Integrated Feedback Loop",
        body: "Seamlessly collect, analyze, and act on feedback from students, parents, and staff. Our AI-driven sentiment analysis helps you understand what matters most to your community.",
    },
]

export default function EdForgeScrollytelling() {
    const [activeSection, setActiveSection] = useState<number>(0)
    const [dashboardState, setDashboardState] = useState<DashboardState>("analytics")
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current
            if (!container) return

            const containerRect = container.getBoundingClientRect()
            const viewportCenter = window.innerHeight / 2

            // Find which section is closest to center
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
        handleScroll() // Initial check

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div ref={containerRef} className="relative min-h-screen bg-background">
            {/* Hero Section */}
            <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                    </span>
                    Next-Gen Education Platform
                </div>
                <h1 className="mb-6 max-w-4xl text-balance font-sans text-5xl font-bold tracking-tight text-foreground md:text-7xl">
                    Transform Education with <span className="text-primary">EdForge</span>
                </h1>
                <p className="mb-12 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
                    An intelligent EMIS platform that empowers educators, engages students, and elevates institutional excellence
                    through AI-driven insights.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <button className="rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
                        Get Started
                    </button>
                    <button className="rounded-full border border-border bg-card px-8 py-3 font-medium text-card-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                        Watch Demo
                    </button>
                </div>
            </div>

            {/* Scrollytelling Section */}
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
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl font-bold text-primary">
                                        {section.id}
                                    </div>
                                    <h2 className="mb-4 text-balance font-sans text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                        {section.headline}
                                    </h2>
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
                            <EdForgeDashboard activeState={dashboardState} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Closing CTA Section */}
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-32 text-center">
                <h2 className="mb-6 max-w-3xl text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    Ready to revolutionize your institution?
                </h2>
                <p className="mb-10 max-w-xl text-pretty text-lg text-muted-foreground">
                    Join hundreds of forward-thinking educational institutions using EdForge to create better outcomes for
                    students and educators.
                </p>
                <button className="rounded-full bg-primary px-10 py-4 text-lg font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
                    Start Your Journey
                </button>
            </div>
        </div>
    )
}
