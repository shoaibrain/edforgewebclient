"use client"

import { Card } from "@/components/ui/card"
import {
    GraduationCap,
    Users,
    BookOpen,
    MessageSquare,
    TrendingUp,
    Calendar,
    Award,
    Bell,
    Search,
    Settings,
    Home,
    BarChart3,
    FileText,
    Clock,
} from "lucide-react"

type DashboardState = "analytics" | "students" | "resources" | "feedback"

interface EdForgeDashboardProps {
    activeState: DashboardState
}

export function EdForgeDashboard({ activeState }: EdForgeDashboardProps) {
    return (
        <div className="relative rounded-3xl border border-border bg-card shadow-2xl shadow-primary/5 transition-all duration-800">
            {/* Dashboard Container with glassmorphic effect */}
            <div className="overflow-hidden rounded-3xl backdrop-blur-sm">
                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between border-b border-border bg-card/80 px-6 py-4 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            <GraduationCap className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-card-foreground">EdForge</div>
                            <div className="text-xs text-muted-foreground">EMIS Platform</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                            <Search className="h-4 w-4" />
                        </button>
                        <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                            <Bell className="h-4 w-4" />
                            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
                        </button>
                        <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                            <Settings className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-16 border-r border-border bg-card/50 py-6 backdrop-blur-sm">
                        <nav className="flex flex-col items-center gap-4">
                            <button
                                className={`rounded-xl p-3 transition-all ${activeState === "analytics"
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                            >
                                <Home className="h-5 w-5" />
                            </button>
                            <button
                                className={`rounded-xl p-3 transition-all ${activeState === "students"
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                            >
                                <Users className="h-5 w-5" />
                            </button>
                            <button
                                className={`rounded-xl p-3 transition-all ${activeState === "resources"
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                            >
                                <BookOpen className="h-5 w-5" />
                            </button>
                            <button
                                className={`rounded-xl p-3 transition-all ${activeState === "feedback"
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                            >
                                <MessageSquare className="h-5 w-5" />
                            </button>
                        </nav>
                    </div>

                    {/* Content Area with State-based Views */}
                    <div className="relative flex-1 bg-background/50 p-6">
                        {/* Dimming Overlay for inactive states */}
                        <div
                            className="pointer-events-none absolute inset-0 bg-background/60 backdrop-blur-[2px] transition-opacity duration-800"
                            style={{ opacity: 0 }}
                        />

                        {/* Analytics View */}
                        <div
                            className="transition-all duration-800"
                            style={{
                                opacity: activeState === "analytics" ? 1 : 0.4,
                                filter: activeState === "analytics" ? "blur(0px)" : "blur(2px)",
                                transform: activeState === "analytics" ? "scale(1)" : "scale(0.98)",
                            }}
                        >
                            {activeState === "analytics" && (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="mb-1 text-lg font-semibold text-card-foreground">Dashboard Overview</h3>
                                        <p className="text-sm text-muted-foreground">Real-time institutional metrics</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <Card className="border-primary/20 bg-primary/5 p-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-xs font-medium text-muted-foreground">Total Students</span>
                                                <TrendingUp className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="text-2xl font-bold text-card-foreground">2,847</div>
                                            <div className="mt-1 text-xs text-primary">+12.5% this term</div>
                                        </Card>
                                        <Card className="border-chart-2/20 bg-chart-2/5 p-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-xs font-medium text-muted-foreground">Avg Attendance</span>
                                                <Calendar className="h-4 w-4 text-chart-2" />
                                            </div>
                                            <div className="text-2xl font-bold text-card-foreground">94.3%</div>
                                            <div className="mt-1 text-xs text-chart-2">+2.1% vs last month</div>
                                        </Card>
                                        <Card className="border-chart-3/20 bg-chart-3/5 p-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-xs font-medium text-muted-foreground">Performance</span>
                                                <Award className="h-4 w-4 text-chart-3" />
                                            </div>
                                            <div className="text-2xl font-bold text-card-foreground">87.6%</div>
                                            <div className="mt-1 text-xs text-chart-3">Excellent grade</div>
                                        </Card>
                                    </div>

                                    <Card className="p-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h4 className="font-semibold text-card-foreground">Student Performance Trends</h4>
                                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { label: "Mathematics", value: 89, color: "bg-primary" },
                                                { label: "Science", value: 92, color: "bg-chart-2" },
                                                { label: "Languages", value: 85, color: "bg-chart-3" },
                                                { label: "Arts", value: 94, color: "bg-chart-4" },
                                            ].map((item) => (
                                                <div key={item.label} className="space-y-1">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">{item.label}</span>
                                                        <span className="font-medium text-card-foreground">{item.value}%</span>
                                                    </div>
                                                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                        <div
                                                            className={`h-full ${item.color} transition-all duration-500`}
                                                            style={{ width: `${item.value}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </div>

                        {/* Students View */}
                        <div
                            className="transition-all duration-800"
                            style={{
                                opacity: activeState === "students" ? 1 : 0.4,
                                filter: activeState === "students" ? "blur(0px)" : "blur(2px)",
                                transform: activeState === "students" ? "scale(1)" : "scale(0.98)",
                            }}
                        >
                            {activeState === "students" && (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="mb-1 text-lg font-semibold text-card-foreground">Student Management</h3>
                                        <p className="text-sm text-muted-foreground">Comprehensive student profiles and tracking</p>
                                    </div>

                                    <div className="grid gap-3">
                                        {[
                                            { name: "Emma Johnson", id: "ST-2024-001", grade: "Grade 10A", status: "Active", attendance: 96 },
                                            { name: "Michael Chen", id: "ST-2024-002", grade: "Grade 10B", status: "Active", attendance: 92 },
                                            {
                                                name: "Sarah Williams",
                                                id: "ST-2024-003",
                                                grade: "Grade 10A",
                                                status: "Active",
                                                attendance: 98,
                                            },
                                            { name: "James Smith", id: "ST-2024-004", grade: "Grade 10C", status: "Active", attendance: 88 },
                                        ].map((student) => (
                                            <Card key={student.id} className="p-4 transition-all hover:border-primary/30 hover:shadow-md">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                            {student.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-card-foreground">{student.name}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {student.id} • {student.grade}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <div className="text-xs text-muted-foreground">Attendance</div>
                                                            <div className="font-semibold text-card-foreground">{student.attendance}%</div>
                                                        </div>
                                                        <div className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                            {student.status}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Resources View */}
                        <div
                            className="transition-all duration-800"
                            style={{
                                opacity: activeState === "resources" ? 1 : 0.4,
                                filter: activeState === "resources" ? "blur(0px)" : "blur(2px)",
                                transform: activeState === "resources" ? "scale(1)" : "scale(0.98)",
                            }}
                        >
                            {activeState === "resources" && (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="mb-1 text-lg font-semibold text-card-foreground">Resource Library</h3>
                                        <p className="text-sm text-muted-foreground">Manage curriculum and learning materials</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            {
                                                title: "Mathematics Curriculum",
                                                type: "PDF",
                                                size: "2.4 MB",
                                                updated: "2 days ago",
                                                icon: FileText,
                                                color: "text-primary",
                                            },
                                            {
                                                title: "Science Lab Manual",
                                                type: "PDF",
                                                size: "5.8 MB",
                                                updated: "5 days ago",
                                                icon: FileText,
                                                color: "text-chart-2",
                                            },
                                            {
                                                title: "History Textbook",
                                                type: "PDF",
                                                size: "12.3 MB",
                                                updated: "1 week ago",
                                                icon: BookOpen,
                                                color: "text-chart-3",
                                            },
                                            {
                                                title: "Language Arts Guide",
                                                type: "PDF",
                                                size: "3.1 MB",
                                                updated: "3 days ago",
                                                icon: FileText,
                                                color: "text-chart-4",
                                            },
                                        ].map((resource) => (
                                            <Card key={resource.title} className="p-4 transition-all hover:border-primary/30 hover:shadow-md">
                                                <div className="mb-3 flex items-start justify-between">
                                                    <div className={`rounded-lg bg-muted p-2 ${resource.color}`}>
                                                        <resource.icon className="h-5 w-5" />
                                                    </div>
                                                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                                        {resource.type}
                                                    </span>
                                                </div>
                                                <div className="font-semibold text-card-foreground">{resource.title}</div>
                                                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>{resource.size}</span>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{resource.updated}</span>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>

                                    <Card className="p-4">
                                        <h4 className="mb-3 font-semibold text-card-foreground">Resource Usage Analytics</h4>
                                        <div className="space-y-2">
                                            {[
                                                { category: "Most Accessed", value: "Mathematics Curriculum", count: "1,247 views" },
                                                { category: "Recently Added", value: "Science Lab Manual", count: "3 days ago" },
                                                { category: "Popular Category", value: "STEM Resources", count: "487 items" },
                                            ].map((stat) => (
                                                <div
                                                    key={stat.category}
                                                    className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                                                >
                                                    <div>
                                                        <div className="text-xs text-muted-foreground">{stat.category}</div>
                                                        <div className="font-medium text-card-foreground">{stat.value}</div>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">{stat.count}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </div>

                        {/* Feedback View */}
                        <div
                            className="transition-all duration-800"
                            style={{
                                opacity: activeState === "feedback" ? 1 : 0.4,
                                filter: activeState === "feedback" ? "blur(0px)" : "blur(2px)",
                                transform: activeState === "feedback" ? "scale(1)" : "scale(0.98)",
                            }}
                        >
                            {activeState === "feedback" && (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="mb-1 text-lg font-semibold text-card-foreground">Feedback Center</h3>
                                        <p className="text-sm text-muted-foreground">Community insights and responses</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <Card className="border-primary/20 bg-primary/5 p-4">
                                            <div className="mb-2 text-xs font-medium text-muted-foreground">Positive</div>
                                            <div className="text-2xl font-bold text-card-foreground">847</div>
                                            <div className="mt-1 text-xs text-primary">↑ 15.3%</div>
                                        </Card>
                                        <Card className="border-chart-4/20 bg-chart-4/5 p-4">
                                            <div className="mb-2 text-xs font-medium text-muted-foreground">Neutral</div>
                                            <div className="text-2xl font-bold text-card-foreground">142</div>
                                            <div className="mt-1 text-xs text-chart-4">→ 2.1%</div>
                                        </Card>
                                        <Card className="border-destructive/20 bg-destructive/5 p-4">
                                            <div className="mb-2 text-xs font-medium text-muted-foreground">Needs Action</div>
                                            <div className="text-2xl font-bold text-card-foreground">23</div>
                                            <div className="mt-1 text-xs text-destructive">↓ 8.7%</div>
                                        </Card>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            {
                                                author: "Parent - Jessica Miller",
                                                message:
                                                    "The new digital learning resources have been incredibly helpful for my daughter's progress.",
                                                time: "2 hours ago",
                                                sentiment: "positive",
                                            },
                                            {
                                                author: "Teacher - Robert Johnson",
                                                message:
                                                    "Would love to see more integration with third-party educational tools in the platform.",
                                                time: "5 hours ago",
                                                sentiment: "neutral",
                                            },
                                            {
                                                author: "Student - Alex Kumar",
                                                message: "The assignment submission interface is very intuitive and easy to use!",
                                                time: "1 day ago",
                                                sentiment: "positive",
                                            },
                                        ].map((feedback, idx) => (
                                            <Card key={idx} className="p-4 transition-all hover:border-primary/30 hover:shadow-md">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className={`h-2 w-2 rounded-full ${feedback.sentiment === "positive"
                                                                    ? "bg-primary"
                                                                    : feedback.sentiment === "neutral"
                                                                        ? "bg-chart-4"
                                                                        : "bg-destructive"
                                                                }`}
                                                        />
                                                        <span className="text-sm font-medium text-card-foreground">{feedback.author}</span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">{feedback.time}</span>
                                                </div>
                                                <p className="text-sm leading-relaxed text-muted-foreground">{feedback.message}</p>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
