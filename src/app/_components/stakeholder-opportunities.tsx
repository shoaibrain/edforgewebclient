"use client"

import { GraduationCap, School, Heart, BookOpen, Target, Globe } from "lucide-react"

const stakeholders = [
    {
        name: "Schools & Districts",
        icon: School,
        color: "#2a9d8f",
        gradient: "from-[#2a9d8f] to-[#21867a]",
        opportunities: [
            {
                title: "Real-time Analytics Dashboard",
                desc: "CQRS architecture enables instant insights into student performance, attendance patterns, and resource allocation for data-driven decision making.",
            },
            {
                title: "Cost Efficiency at Scale",
                desc: "Serverless AWS infrastructure with auto-scaling reduces operational costs by 60% while handling peak loads during enrollment periods.",
            },
            {
                title: "Built-in FERPA Compliance",
                desc: "Multi-tenant isolation via DynamoDB partition keys ensures student data never leaks between schools, maintaining regulatory compliance.",
            },
        ],
    },
    {
        name: "Teachers & Educators",
        icon: BookOpen,
        color: "#e9c46a",
        gradient: "from-[#e9c46a] to-[#d4ae51]",
        opportunities: [
            {
                title: "Seamless Formative Assessments",
                desc: "Embedded probes of understanding automatically identify knowledge gaps, enabling personalized instruction and targeted interventions.",
            },
            {
                title: "Intelligent Curriculum Planning",
                desc: "AI-powered recommendations align lessons with learning objectives while tracking student progress toward academic standards.",
            },
            {
                title: "Reduced Administrative Burden",
                desc: "Automated grading, attendance tracking, and progress reporting free up 12+ hours per week for meaningful student interaction.",
            },
        ],
    },
    {
        name: "Students & Learners",
        icon: GraduationCap,
        color: "#e76f51",
        gradient: "from-[#e76f51] to-[#d15a3c]",
        opportunities: [
            {
                title: "Growth Mindset Development",
                desc: "Mistakes are framed as learning opportunities with immediate feedback loops that encourage persistence and strategic problem-solving.",
            },
            {
                title: "Interactive Learning Experiences",
                desc: "Virtual simulations, project-based activities, and gamified challenges make complex concepts accessible and engaging.",
            },
            {
                title: "Personalized Career Pathways",
                desc: "College-to-career mapping with real labor market data helps students make informed decisions about their future education and careers.",
            },
        ],
    },
    {
        name: "Parents & Families",
        icon: Heart,
        color: "#f4a261",
        gradient: "from-[#f4a261] to-[#db8b4e]",
        opportunities: [
            {
                title: "Real-time Progress Notifications",
                desc: "Instant updates on grades, attendance, and assignments delivered in your preferred language, keeping families informed and engaged.",
            },
            {
                title: "At-home Learning Activities",
                desc: "Curated activities that connect classroom learning to practical home experiences, reinforcing concepts through everyday interactions.",
            },
            {
                title: "Direct Teacher Communication",
                desc: "Streamlined messaging and scheduling tools make it easy to connect with educators, even for families with demanding work schedules.",
            },
        ],
    },
]

export default function StakeholderOpportunities() {
    return (
        <section className="relative w-full py-40 bg-gradient-to-b from-[oklch(0.18_0.02_240)] via-[oklch(0.16_0.02_240)] to-[oklch(0.15_0.02_240)]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
                        backgroundSize: "80px 80px",
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="text-center mb-32">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[oklch(0.35_0.08_195)]/15 text-[oklch(0.7_0.11_195)] text-sm font-semibold mb-10 border border-[oklch(0.35_0.08_195)]/20 backdrop-blur-sm">
                        <Target className="w-4 h-4" />
                        <span className="tracking-wide">Built for Everyone</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        Empowering every stakeholder
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        EdForge delivers measurable value across the entire education ecosystem, from district administrators to
                        students and families.
                    </p>
                </div>

                {/* Stakeholder Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {stakeholders.map((stakeholder, index) => (
                        <div
                            key={index}
                            className="group relative bg-gradient-to-br from-[oklch(0.23_0.03_240)] to-[oklch(0.19_0.03_240)] border border-slate-700/30 rounded-[2rem] p-10 hover:border-slate-600/40 transition-all duration-700 hover:shadow-2xl"
                            style={{
                                animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                            }}
                        >
                            {/* Glow Effect on Hover */}
                            <div
                                className="absolute -inset-0.5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, ${stakeholder.color}25, transparent 70%)`,
                                }}
                            />

                            {/* Header */}
                            <div className="flex items-center gap-5 mb-8">
                                <div
                                    className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700 group-hover:scale-110"
                                    style={{
                                        background: `radial-gradient(circle at 35% 35%, ${stakeholder.color}40, ${stakeholder.color}12)`,
                                        border: `2.5px solid ${stakeholder.color}70`,
                                        boxShadow: `0 12px 40px ${stakeholder.color}30, inset 0 2px 4px rgba(255,255,255,0.05)`,
                                    }}
                                >
                                    <stakeholder.icon className="w-10 h-10" style={{ color: stakeholder.color }} />

                                    {/* Subtle pulse ring */}
                                    <div
                                        className="absolute -inset-2 rounded-full opacity-30"
                                        style={{
                                            border: `2px solid ${stakeholder.color}`,
                                            animation: "gentleRingPulse 3s ease-in-out infinite",
                                        }}
                                    />
                                </div>
                                <h3 className="text-3xl font-bold text-white tracking-tight">{stakeholder.name}</h3>
                            </div>

                            {/* Opportunities */}
                            <div className="space-y-6">
                                {stakeholder.opportunities.map((opportunity, idx) => (
                                    <div key={idx} className="flex gap-4 group/item">
                                        <div
                                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-500 group-hover/item:scale-150"
                                            style={{
                                                backgroundColor: stakeholder.color,
                                                boxShadow: `0 0 12px ${stakeholder.color}60`,
                                            }}
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-white text-lg font-bold mb-2 tracking-tight group-hover/item:text-opacity-90 transition-all">
                                                {opportunity.title}
                                            </h4>
                                            <p className="text-slate-400 text-base leading-relaxed">{opportunity.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 text-center">
                    <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                        See how EdForge transforms education management for your organization
                    </p>
                    <a
                        href="#demo"
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[oklch(0.74_0.16_19)] to-[oklch(0.70_0.16_19)] text-white text-lg font-bold hover:shadow-[0_0_50px_rgba(231,111,81,0.6)] transition-all duration-500 hover:scale-105"
                    >
                        <Globe className="w-6 h-6" />
                        Explore All 10 Opportunities
                    </a>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gentleRingPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.05;
          }
        }
      `}</style>
        </section>
    )
}
