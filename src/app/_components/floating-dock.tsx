"use client"

import { Users, Database, ShieldCheck, CreditCard, BookOpen, Activity, Zap, Cloud } from "lucide-react"

const services = [
    { icon: Users, label: "Enrollment", color: "#2a9d8f", desc: "Student Lifecycle Management" },
    { icon: Database, label: "Analytics", color: "#e9c46a", desc: "CQRS Read/Write Optimization" },
    { icon: ShieldCheck, label: "Security", color: "#264653", desc: "Multi-tenant Isolation" },
    { icon: CreditCard, label: "Finance", color: "#f4a261", desc: "Billing & Payments" },
    { icon: BookOpen, label: "Curriculum", color: "#e76f51", desc: "Course Planning" },
    { icon: Activity, label: "EventBridge", color: "#2a9d8f", desc: "Event Orchestration" },
    { icon: Zap, label: "Serverless", color: "#e9c46a", desc: "AWS Fargate Auto-scaling" },
    { icon: Cloud, label: "Cloud Native", color: "#264653", desc: "Infrastructure as Code" },
]

export default function FloatingDock() {
    return (
        <section className="relative w-full py-40 overflow-hidden bg-gradient-to-b from-[oklch(0.18_0.02_240)] to-[oklch(0.15_0.02_240)]">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 mb-24 text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[oklch(0.35_0.08_195)]/15 text-[oklch(0.7_0.11_195)] text-sm font-semibold mb-10 border border-[oklch(0.35_0.08_195)]/20 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-[oklch(0.7_0.11_195)] animate-pulse" />
                    Microservices Architecture
                </div>
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Decoupled by design</h2>
                <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                    Independent services floating together in perfect harmony, scaling independently while working as one unified
                    system.
                </p>
            </div>

            {/* Horizontal Floating Services */}
            <div className="relative h-56 flex items-center justify-center overflow-visible">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-12 items-center">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group cursor-pointer flex-shrink-0"
                                style={{
                                    animation: `gentleFloat ${5 + index * 0.3}s ease-in-out infinite`,
                                    animationDelay: `${index * 0.15}s`,
                                }}
                            >
                                <div className="relative">
                                    {/* Outer Glow - appears on hover */}
                                    <div
                                        className="absolute -inset-8 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 blur-3xl"
                                        style={{ backgroundColor: service.color }}
                                    />

                                    {/* Pulsing Ring */}
                                    <div
                                        className="absolute -inset-3 rounded-full opacity-20"
                                        style={{
                                            border: `2px solid ${service.color}`,
                                            animation: `gentleRingPulse 3s ease-in-out infinite`,
                                            animationDelay: `${index * 0.2}s`,
                                        }}
                                    />

                                    {/* Main Circle */}
                                    <div
                                        className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 group-hover:scale-110 backdrop-blur-md"
                                        style={{
                                            background: `radial-gradient(circle at 35% 35%, ${service.color}35, ${service.color}08)`,
                                            border: `2.5px solid ${service.color}70`,
                                            boxShadow: `0 10px 40px ${service.color}30, inset 0 2px 4px rgba(255,255,255,0.05)`,
                                        }}
                                    >
                                        <service.icon
                                            className="w-10 h-10 mb-2 transition-transform duration-500 group-hover:scale-110"
                                            style={{ color: service.color }}
                                        />
                                        <span className="text-white text-sm font-semibold tracking-wide">{service.label}</span>
                                    </div>

                                    {/* Description Tooltip */}
                                    <div
                                        className="absolute top-full mt-8 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full text-sm font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none shadow-lg"
                                        style={{
                                            backgroundColor: service.color,
                                            boxShadow: `0 8px 24px ${service.color}50`,
                                        }}
                                    >
                                        {service.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gentleRingPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.05;
          }
        }
      `}</style>
        </section>
    )
}
