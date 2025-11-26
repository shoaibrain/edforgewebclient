import { Bell, Zap, Cloud, TrendingUp, Users, Database } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const cards = [
    {
        title: "Parents as Partners",
        content: "Real-time notifications for grades and attendance foster true accountability.",
        icon: Bell,
        color: "text-blue-600",
    },
    {
        title: "Serverless Efficiency",
        content: "Built on AWS Fargate. Scales up during morning attendance, scales down at night.",
        icon: Zap,
        color: "text-orange-600",
    },
    {
        title: "Cloud Native",
        content: "Next.js + Tailwind frontend backed by a robust Event-Driven Architecture.",
        icon: Cloud,
        color: "text-purple-600",
    },
    {
        title: "Real-Time Insights",
        content: "Dashboards update instantly as events flow through the system.",
        icon: TrendingUp,
        color: "text-green-600",
    },
    {
        title: "Multi-Tenant Ready",
        content: "Serve multiple schools from a single deployment with guaranteed isolation.",
        icon: Users,
        color: "text-pink-600",
    },
    {
        title: "Event Sourcing",
        content: "Complete audit trail of every action taken in the system.",
        icon: Database,
        color: "text-cyan-600",
    },
]

export default function BentoGrid() {
    return (
        <section className="relative w-full py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                        Built for modern schools
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Every feature designed with scalability, security, and user experience in mind.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur"
                        >
                            <CardHeader>
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4 group-hover:scale-110 transition-transform">
                                    <card.icon className={`w-6 h-6 ${card.color}`} />
                                </div>
                                <CardTitle className="text-xl">{card.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">{card.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
