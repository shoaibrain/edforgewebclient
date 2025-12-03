"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, LogIn, LayoutDashboard } from "lucide-react"
import { useSession } from "next-auth/react"

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { data: session, status } = useSession()
    const isAuthenticated = status === "authenticated"

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        // Particle system
        const particles: Array<{
            x: number
            y: number
            vx: number
            vy: number
            radius: number
            glowIntensity: number
        }> = []

        const particleCount = 80
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2 + 1,
                glowIntensity: Math.random(),
            })
        }

        let mouseX = 0
        let mouseY = 0
        let animationTime = 0

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }
        window.addEventListener("mousemove", handleMouseMove)

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            animationTime += 0.016

            // Update and draw particles
            particles.forEach((particle, index) => {
                // Mouse repulsion
                const dx = particle.x - mouseX
                const dy = particle.y - mouseY
                const distance = Math.sqrt(dx * dx + dy * dy)
                if (distance < 150 && distance > 0) {
                    const force = (150 - distance) / 150
                    particle.vx += (dx / distance) * force * 0.5
                    particle.vy += (dy / distance) * force * 0.5
                }

                // Update position
                particle.x += particle.vx
                particle.y += particle.vy

                // Add damping
                particle.vx *= 0.99
                particle.vy *= 0.99

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

                // Keep in bounds
                particle.x = Math.max(0, Math.min(canvas.width, particle.x))
                particle.y = Math.max(0, Math.min(canvas.height, particle.y))

                particle.glowIntensity = (Math.sin(animationTime * 2 + index * 0.5) + 1) / 2

                if (isFinite(particle.x) && isFinite(particle.y) && isFinite(particle.radius)) {
                    const gradient = ctx.createRadialGradient(
                        particle.x,
                        particle.y,
                        0,
                        particle.x,
                        particle.y,
                        particle.radius * 4,
                    )
                    gradient.addColorStop(0, `rgba(231, 111, 81, ${0.8 * particle.glowIntensity})`)
                    gradient.addColorStop(0.5, `rgba(231, 111, 81, ${0.4 * particle.glowIntensity})`)
                    gradient.addColorStop(1, "rgba(231, 111, 81, 0)")

                    ctx.fillStyle = gradient
                    ctx.beginPath()
                    ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2)
                    ctx.fill()

                    // Core particle
                    ctx.fillStyle = "#ffffffff"
                    ctx.beginPath()
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                    ctx.fill()
                }
            })

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 120 && distance > 0) {
                        const alpha = (1 - distance / 120) * 0.6

                        const flowOffset = (animationTime * 50 + i * 10 + j * 10) % distance
                        const pulseIntensity = (Math.sin(animationTime * 3 + i + j) + 1) / 2

                        // Outer glow
                        ctx.strokeStyle = `rgba(244, 162, 97, ${alpha * 0.3 * pulseIntensity})`
                        ctx.lineWidth = 3
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()

                        // Middle layer
                        ctx.strokeStyle = `rgba(233, 196, 106, ${alpha * 0.6 * pulseIntensity})`
                        ctx.lineWidth = 2
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()

                        // Core bright line
                        ctx.strokeStyle = `rgba(233, 196, 106, ${alpha * pulseIntensity})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()

                        const angle = Math.atan2(dy, dx)
                        const pulseX = particles[j].x + Math.cos(angle) * flowOffset
                        const pulseY = particles[j].y + Math.sin(angle) * flowOffset

                        if (isFinite(pulseX) && isFinite(pulseY)) {
                            const pulseGradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 8)
                            pulseGradient.addColorStop(0, `rgba(233, 196, 106, ${alpha * pulseIntensity})`)
                            pulseGradient.addColorStop(0.5, `rgba(244, 162, 97, ${alpha * 0.5 * pulseIntensity})`)
                            pulseGradient.addColorStop(1, "rgba(233, 196, 106, 0)")

                            ctx.fillStyle = pulseGradient
                            ctx.beginPath()
                            ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2)
                            ctx.fill()
                        }
                    }
                }
            }

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1419] via-[#264653] to-[#264653]">
            {/* Particle Canvas Background */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-70" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-20 text-center">
                <div className="animate-[fadeIn_1s_ease-out]">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        <span className="block">Experience education</span>
                        <span className="block">management </span>
                        <span className="block bg-gradient-to-r from-[#2a9d8f] via-[#e9c46a] to-[#f4a261] bg-clip-text text-transparent">
                            without the gravity
                        </span>
                        <span className="block">of legacy systems.</span>
                    </h1>
                </div>

                <p className="text-lg md:text-xl text-[#95bece] mb-10 max-w-3xl mx-auto leading-relaxed animate-[fadeIn_1.2s_ease-out]">
                    EdForge is the event-driven, enterprise-grade EMIS that evolves your school into the agent-first era.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fadeIn_1.4s_ease-out]">
                    {isAuthenticated ? (
                        <Link href="/dashboard">
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full border-[#e76f51] text-[#e76f51] hover:bg-[#e76f51]/10 px-8 h-12 text-base group bg-transparent shadow-lg shadow-[#e76f51]/10"
                            >
                                <LayoutDashboard className="mr-2 w-4 h-4" />
                                Go To Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/auth/signin">
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full border-[#e76f51] text-[#e76f51] hover:bg-[#e76f51]/10 px-8 h-12 text-base group bg-transparent shadow-lg shadow-[#e76f51]/10"
                            >
                                <LogIn className="mr-2 w-4 h-4" />
                                Login
                            </Button>
                        </Link>
                    )}
                    <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full border-[#2a9d8f] text-[#2a9d8f] hover:bg-[#2a9d8f]/10 px-8 h-12 text-base group bg-transparent"
                    >
                        <FileText className="mr-2 w-4 h-4" />
                        Explore Architecture
                    </Button>
                </div>
            </div>
        </section>
    )
}
