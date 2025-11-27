"use client"
import { useState, useEffect } from "react"
import { Building2, GraduationCap, Users, TrendingUp, MapPin, UserCheck, BarChart3, ChevronLeft, ChevronRight } from "lucide-react"

interface AdminDashboardProps {
    activeState: "overview" | "multi-campus" | "hr" | "analytics"
}

export function AdminDashboard({ activeState }: AdminDashboardProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    // Auto-toggle sidebar for demonstration
    useEffect(() => {
        const interval = setInterval(() => {
            setIsSidebarCollapsed(prev => !prev)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/40 transition-all duration-800">
            {/* Dashboard Container */}
            <div className="flex h-[700px]">
                {/* Sidebar */}
                <div
                    className={`relative border-r border-border bg-sidebar transition-all duration-500 ease-in-out ${isSidebarCollapsed ? "w-20" : "w-64"
                        }`}
                >
                    <div className="flex h-full flex-col py-8">
                        {/* Logo Area */}
                        <div className={`flex items-center gap-3 px-6 mb-8 ${isSidebarCollapsed ? "justify-center" : ""}`}>
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                                <Building2 className="h-5 w-5" />
                            </div>
                            <span className={`font-bold text-lg text-sidebar-foreground transition-opacity duration-300 ${isSidebarCollapsed ? "opacity-0 hidden" : "opacity-100"
                                }`}>
                                EdForge
                            </span>
                        </div>

                        {/* Navigation Items */}
                        <div className="flex flex-col gap-2 px-4">
                            {[
                                { icon: BarChart3, label: "Overview", state: "overview" },
                                { icon: MapPin, label: "Campuses", state: "multi-campus" },
                                { icon: UserCheck, label: "HR & Staff", state: "hr" },
                                { icon: TrendingUp, label: "Analytics", state: "analytics" },
                            ].map((item) => (
                                <div
                                    key={item.state}
                                    className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all cursor-pointer ${activeState === item.state
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                        } ${isSidebarCollapsed ? "justify-center" : ""}`}
                                >
                                    <item.icon className={`h-5 w-5 shrink-0 ${activeState === item.state ? "text-primary" : ""}`} />
                                    <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isSidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                                        }`}>
                                        {item.label}
                                    </span>

                                    {/* Tooltip for collapsed state */}
                                    {isSidebarCollapsed && (
                                        <div className="absolute left-full ml-2 hidden rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md group-hover:block z-50">
                                            {item.label}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Collapse Toggle */}
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className="absolute -right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            {isSidebarCollapsed ? (
                                <ChevronRight className="h-3 w-3" />
                            ) : (
                                <ChevronLeft className="h-3 w-3" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden">
                    {/* Top Navigation */}
                    <div className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
                        <h1 className="text-lg font-semibold text-foreground">District Dashboard</h1>
                        <div className="flex items-center gap-3">
                            <img
                                src="https://api.dicebear.com/9.x/adventurer/svg?seed=AdminUser&backgroundColor=b6e3f4"
                                alt="Admin Avatar"
                                className="h-9 w-9 rounded-full border border-border bg-background"
                            />
                        </div>
                    </div>

                    {/* Content Area with State Transitions */}
                    <div className="h-[calc(100%-4rem)] overflow-hidden bg-background/50 p-6">
                        {/* Overview State */}
                        <div
                            className={`h-full transition-all duration-800 ${activeState === "overview" ? "opacity-100 blur-0" : "pointer-events-none absolute opacity-0 blur-sm"
                                }`}
                        >
                            <div className="grid h-full grid-cols-3 gap-4">
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <GraduationCap className="h-5 w-5 text-primary" />
                                        </div>
                                        <span className="text-xs text-green-500">+12%</span>
                                    </div>
                                    <div className="text-3xl font-bold text-foreground">45,892</div>
                                    <div className="text-sm text-muted-foreground">Total Students</div>
                                </div>
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="rounded-lg bg-accent/10 p-2">
                                            <Users className="h-5 w-5 text-accent" />
                                        </div>
                                        <span className="text-xs text-green-500">+5%</span>
                                    </div>
                                    <div className="text-3xl font-bold text-foreground">2,847</div>
                                    <div className="text-sm text-muted-foreground">Staff Members</div>
                                </div>
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="rounded-lg bg-chart-3/10 p-2">
                                            <Building2 className="h-5 w-5 text-chart-3" />
                                        </div>
                                        <span className="text-xs text-muted-foreground">28 Active</span>
                                    </div>
                                    <div className="text-3xl font-bold text-foreground">32</div>
                                    <div className="text-sm text-muted-foreground">Campuses</div>
                                </div>
                                <div className="col-span-3 rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <h3 className="mb-4 text-sm font-semibold text-foreground">District Performance Overview</h3>
                                    <div className="flex h-32 items-end justify-between gap-2">
                                        {[65, 78, 82, 75, 88, 92, 85, 90, 94, 89, 95, 98].map((height, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 rounded-t bg-gradient-to-t from-primary to-accent"
                                                style={{ height: `${height}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                                        <span>Jan</span>
                                        <span>Dec</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Multi-Campus State */}
                        <div
                            className={`h-full transition-all duration-800 ${activeState === "multi-campus" ? "opacity-100 blur-0" : "pointer-events-none absolute opacity-0 blur-sm"
                                }`}
                        >
                            <h3 className="mb-4 text-lg font-semibold text-foreground">Campus Network Overview</h3>
                            <div className="space-y-3">
                                {[
                                    { name: "Lincoln High School", students: 1847, staff: 124, performance: 94 },
                                    { name: "Washington Middle School", students: 1243, staff: 89, performance: 91 },
                                    { name: "Jefferson Elementary", students: 892, staff: 67, performance: 88 },
                                    { name: "Roosevelt Academy", students: 1456, staff: 102, performance: 96 },
                                    { name: "Madison Prep School", students: 734, staff: 54, performance: 85 },
                                ].map((campus, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl border border-border bg-card p-4 shadow-lg transition-all hover:scale-[1.02]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                                                    <Building2 className="h-6 w-6 text-white" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-foreground">{campus.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {campus.students} students · {campus.staff} staff
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-primary">{campus.performance}%</div>
                                                <div className="text-xs text-muted-foreground">Performance</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* HR State */}
                        <div
                            className={`h-full transition-all duration-800 ${activeState === "hr" ? "opacity-100 blur-0" : "pointer-events-none absolute opacity-0 blur-sm"
                                }`}
                        >
                            <h3 className="mb-4 text-lg font-semibold text-foreground">Human Resources Dashboard</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <UserCheck className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="text-sm font-medium text-foreground">Active Personnel</div>
                                    </div>
                                    <div className="mb-4 text-4xl font-bold text-foreground">2,847</div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Teachers</span>
                                            <span className="font-medium text-foreground">1,892</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Administrators</span>
                                            <span className="font-medium text-foreground">342</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Support Staff</span>
                                            <span className="font-medium text-foreground">613</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="rounded-lg bg-accent/10 p-2">
                                            <TrendingUp className="h-5 w-5 text-accent" />
                                        </div>
                                        <div className="text-sm font-medium text-foreground">Certifications</div>
                                    </div>
                                    <div className="mb-4 text-4xl font-bold text-foreground">98.2%</div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Current</span>
                                            <span className="font-medium text-green-500">2,796</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Expiring Soon</span>
                                            <span className="font-medium text-yellow-500">38</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Expired</span>
                                            <span className="font-medium text-red-500">13</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <h4 className="mb-3 text-sm font-semibold text-foreground">Recent Onboarding</h4>
                                    <div className="space-y-3">
                                        {["Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Kim"].map((name, i) => (
                                            <div key={i} className="flex items-center justify-between rounded-lg bg-background/50 p-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${name}&backgroundColor=ffd5dc`}
                                                        alt={name}
                                                        className="h-10 w-10 rounded-full border border-border bg-background"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-medium text-foreground">{name}</div>
                                                        <div className="text-xs text-muted-foreground">Teacher · Started {i + 1} days ago</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs font-medium text-green-500">Complete</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Analytics State */}
                        <div
                            className={`h-full transition-all duration-800 ${activeState === "analytics" ? "opacity-100 blur-0" : "pointer-events-none absolute opacity-0 blur-sm"
                                }`}
                        >
                            <h3 className="mb-4 text-lg font-semibold text-foreground">Strategic Analytics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <h4 className="mb-4 text-sm font-semibold text-foreground">Enrollment Trends</h4>
                                    <div className="relative h-40">
                                        <svg className="h-full w-full" viewBox="0 0 300 150">
                                            <polyline
                                                fill="none"
                                                stroke="url(#gradient)"
                                                strokeWidth="3"
                                                points="0,120 50,100 100,80 150,70 200,50 250,30 300,20"
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="oklch(0.58 0.24 264)" />
                                                    <stop offset="100%" stopColor="oklch(0.48 0.24 264)" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="mt-2 text-2xl font-bold text-green-500">+15.3%</div>
                                    <div className="text-sm text-muted-foreground">Year over year growth</div>
                                </div>
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <h4 className="mb-4 text-sm font-semibold text-foreground">Budget Utilization</h4>
                                    <div className="mb-4 flex items-center justify-center">
                                        <div className="relative h-32 w-32">
                                            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="40" fill="none" stroke="oklch(0.22 0.02 264)" strokeWidth="12" />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="url(#gradient)"
                                                    strokeWidth="12"
                                                    strokeDasharray="251.2"
                                                    strokeDashoffset="62.8"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground">
                                                75%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">$127.5M of $170M allocated</div>
                                </div>
                                <div className="col-span-2 rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <h4 className="mb-4 text-sm font-semibold text-foreground">AI Insights & Recommendations</h4>
                                    <div className="space-y-3">
                                        {[
                                            {
                                                insight: "Consider redistributing resources to Lincoln High",
                                                impact: "High",
                                                color: "text-red-500",
                                            },
                                            {
                                                insight: "Optimal time to launch teacher training program",
                                                impact: "Medium",
                                                color: "text-yellow-500",
                                            },
                                            {
                                                insight: "Budget surplus available in Q3 for initiatives",
                                                impact: "High",
                                                color: "text-green-500",
                                            },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between rounded-lg bg-background/50 p-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-2 w-2 rounded-full ${item.color.replace("text-", "bg-")}`}></div>
                                                    <span className="text-sm text-foreground">{item.insight}</span>
                                                </div>
                                                <span className={`text-xs font-medium ${item.color}`}>{item.impact}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
