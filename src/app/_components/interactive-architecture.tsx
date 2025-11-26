"use client"

import { useEffect, useRef, useState } from "react"
import { Activity, Database, Lock, Share2, Zap } from "lucide-react"

export default function InteractiveArchitecture() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [hoveredNode, setHoveredNode] = useState<number | null>(null)

    const nodes = [
        { id: 1, x: 50, y: 25, icon: Activity, label: "Event Bridge", color: "#e76f51" },
        { id: 2, x: 20, y: 55, icon: Database, label: "Analytics CQRS", color: "#2a9d8f" },
        { id: 3, x: 80, y: 55, icon: Lock, label: "Security & Auth", color: "#e9c46a" },
        { id: 4, x: 35, y: 80, icon: Share2, label: "Integration Hub", color: "#f4a261" },
        { id: 5, x: 65, y: 80, icon: Zap, label: "Serverless Compute", color: "#264653" },
    ]

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        let animationFrame: number
        let offset = 0

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            offset += 0.3 // Slower animation speed for subtlety

            const connections = [
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4],
                [1, 3],
                [2, 4],
                [3, 4],
            ]

            connections.forEach(([from, to]) => {
                const fromNode = nodes[from]
                const toNode = nodes[to]

                const x1 = (fromNode.x / 100) * canvas.width
                const y1 = (fromNode.y / 100) * canvas.height
                const x2 = (toNode.x / 100) * canvas.width
                const y2 = (toNode.y / 100) * canvas.height

                const isActive = hoveredNode === from || hoveredNode === to

                ctx.strokeStyle = isActive ? "#e76f51" : "#475569"
                ctx.lineWidth = isActive ? 2 : 1
                ctx.setLineDash([8, 12]) // Longer dashes for elegance
                ctx.lineDashOffset = -offset

                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.stroke()

                if (isActive) {
                    ctx.strokeStyle = "#e76f5140"
                    ctx.lineWidth = 6
                    ctx.stroke()
                }
            })

            animationFrame = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationFrame)
        }
    }, [hoveredNode])

    return (
        <section className="relative w-full py-40 bg-gradient-to-b from-[oklch(0.15_0.02_240)] to-[oklch(0.18_0.02_240)]">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.85_0.11_19)]/20 text-[oklch(0.85_0.11_19)] text-sm font-semibold mb-8 border border-[oklch(0.85_0.11_19)]/30">
                        <div className="w-2 h-2 rounded-full bg-[oklch(0.85_0.11_19)] animate-pulse" />
                        Event-Driven Architecture
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Watch the system breathe</h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Real-time event flow visualization showing how EdForge microservices communicate seamlessly.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="relative h-[700px] bg-gradient-to-br from-[oklch(0.22_0.03_240)] to-[oklch(0.19_0.03_240)] border border-slate-700/30 rounded-3xl p-16 overflow-hidden shadow-2xl">
                        {/* Canvas for connections */}
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

                        {/* Interactive Nodes */}
                        {nodes.map((node, index) => (
                            <div
                                key={node.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                                style={{
                                    left: `${node.x}%`,
                                    top: `${node.y}%`,
                                }}
                                onMouseEnter={() => setHoveredNode(index)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                <div className="relative">
                                    <div
                                        className="absolute -inset-4 rounded-full opacity-40"
                                        style={{
                                            backgroundColor: node.color,
                                            animation: `gentlePulse 4s ease-in-out infinite`,
                                            animationDelay: `${index * 0.6}s`,
                                        }}
                                    />

                                    {/* Outer decorative ring */}
                                    <div
                                        className="absolute -inset-2 rounded-full border opacity-20 group-hover:opacity-40 transition-all duration-700"
                                        style={{ borderColor: node.color }}
                                    />

                                    {/* Main Node Circle */}
                                    <div
                                        className="relative w-24 h-24 rounded-full flex items-center justify-center border-2 transition-all duration-700 group-hover:scale-110 backdrop-blur-sm"
                                        style={{
                                            background: `radial-gradient(circle at 30% 30%, ${node.color}40, ${node.color}15)`,
                                            borderColor: node.color,
                                            boxShadow: `0 8px 40px ${node.color}50, inset 0 1px 0 rgba(255,255,255,0.1)`,
                                        }}
                                    >
                                        <node.icon
                                            className="w-9 h-9 transition-transform duration-700 group-hover:scale-110"
                                            style={{ color: node.color }}
                                        />
                                    </div>

                                    {/* Label */}
                                    <div
                                        className="absolute top-full mt-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"
                                        style={{ backgroundColor: node.color }}
                                    >
                                        {node.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes gentlePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.1;
          }
        }
      `}</style>
        </section>
    )
}
