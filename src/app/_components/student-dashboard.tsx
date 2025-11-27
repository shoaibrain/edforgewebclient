"use client"

import { BookOpen, Trophy, Star, Target, Zap, Award, TrendingUp, Clock } from "lucide-react"

interface StudentDashboardProps {
    activeState: "learning" | "engagement" | "achievements" | "personalized"
}

export function StudentDashboard({ activeState }: StudentDashboardProps) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/40 transition-all duration-800">
            {/* Dashboard Container */}
            <div className="flex h-[700px]">
                {/* Sidebar */}
                <div className="w-20 border-r border-border bg-sidebar">
                    <div className="flex h-full flex-col items-center gap-6 py-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-chart-3 to-chart-2 text-white shadow-lg">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${activeState === "learning" ? "bg-chart-3/20 text-chart-3" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${activeState === "engagement" ? "bg-chart-3/20 text-chart-3" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            <Zap className="h-5 w-5" />
                        </div>
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${activeState === "achievements" ? "bg-chart-3/20 text-chart-3" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            <Trophy className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden">
                    {/* Top Navigation */}
                    <div className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
                        <h1 className="text-lg font-semibold text-foreground">My Learning Dashboard</h1>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 rounded-full border border-chart-3/20 bg-chart-3/10 px-3 py-1">
                                <Star className="h-4 w-4 text-chart-3" />
                                <span className="text-sm font-semibold text-chart-3">Level 12</span>
                            </div>
                            <img
                                src="https://api.dicebear.com/9.x/adventurer/svg?seed=StudentUser&backgroundColor=c0aede"
                                alt="Student Avatar"
                                className="h-8 w-8 rounded-full border border-border bg-background"
                            />
                        </div>
                    </div>

                    {/* Content Area with State Transitions */}
                    <div className="h-[calc(100%-4rem)] overflow-hidden bg-background/50 p-6">
                        {/* Learning State */}
                        <div
                            className={`h-full transition-all duration-800 ${activeState === "learning" ? "opacity-100 blur-0" : "pointer-events-none absolute opacity-0 blur-sm"
                                }`}
                        >
                            <h3 className="mb-4 text-lg font-semibold text-foreground">Continue Learning</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    {
                                        subject: "Mathematics",
                                        progress: 78,
                                        lesson: "Algebra: Solving Equations",
                                        color: "from-blue-500 to-blue-600",
                                    },
                                    {
                                        subject: "Science",
                                        progress: 65,
                                        lesson: "Chemistry: Periodic Table",
                                        color: "from-green-500 to-green-600",
                                    },
                                    { subject: "History", progress: 92, lesson: "World War II", color: "from-orange-500 to-orange-600" },
                                    {
                                        subject: "English",
                                        progress: 54,
                                        lesson: "Shakespeare: Macbeth",
                                        color: "from-purple-500 to-purple-600",
                                    },
                                ].map((course, i) => (
                                    <div
                                        key={i}
                                        className="rounded-2xl border border-border bg-card p-5 shadow-lg transition-all hover:scale-[1.02]"
                                    >
                                        <div className="mb-3 flex items-center gap-3">
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${course.color} shadow-lg`}
                                            >
                                                <BookOpen className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-semibold text-foreground">{course.subject}</div>
                                                <div className="text-xs text-muted-foreground">{course.lesson}</div>
                                            </div>
                                        </div>
                                        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-background/50">
                                            <div
                                                className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">{course.progress}% Complete</span>
                                            <button className="font-medium text-chart-3 hover:underline">Continue →</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Engagement State */}
                        <div
                            className={`h-full transition-all duration-800 ${activeState === "engagement" ? "opacity-100 blur-0" : "pointer-events-none absolute opacity-0 blur-sm"
                                }`}
                        >
                            <div className="grid h-full grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="rounded-lg bg-chart-3/10 p-2">
                                            <Trophy className="h-6 w-6 text-chart-3" />
                                        </div>
                                        <div className="text-sm font-medium text-foreground">Your Achievements</div>
                                    </div>
                                    <div className="mb-4 text-5xl font-bold text-chart-3">247</div>
                                    <div className="mb-4 text-sm text-muted-foreground">Total Points This Month</div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Weekly Rank</span>
                                            <span className="font-semibold text-foreground">#3 in Class</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Streak</span>
                                            <span className="font-semibold text-orange-500">12 Days 🔥</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <h4 className="mb-4 text-sm font-semibold text-foreground">Recent Badges</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { icon: "🏆", name: "Math Master", color: "from-yellow-500 to-orange-500" },
                                            { icon: "⚡", name: "Speed Reader", color: "from-blue-500 to-purple-500" },
                                            { icon: "🌟", name: "Perfect Score", color: "from-pink-500 to-red-500" },
                                            { icon: "🎯", name: "On Target", color: "from-green-500 to-teal-500" },
                                        ].map((badge, i) => (
                                            <div
                                                key={i}
                                                className="rounded-xl bg-background/50 p-3 text-center transition-all hover:scale-105"
                                            >
                                                <div
                                                    className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${badge.color} text-2xl shadow-lg`}
                                                >
                                                    {badge.icon}
                                                </div>
                                                <div className="text-xs font-medium text-foreground">{badge.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-2 rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <h4 className="mb-4 text-sm font-semibold text-foreground">Class Leaderboard</h4>
                                    <div className="space-y-3">
                                        {[
                                            { name: "You", points: 247, rank: 3, avatar: "from-chart-3 to-chart-2" },
                                            { name: "Emma T.", points: 289, rank: 1, avatar: "from-yellow-500 to-orange-500" },
                                            { name: "Liam C.", points: 265, rank: 2, avatar: "from-blue-500 to-purple-500" },
                                            { name: "Sofia M.", points: 234, rank: 4, avatar: "from-pink-500 to-red-500" },
                                        ]
                                            .sort((a, b) => a.rank - b.rank)
                                            .map((student, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex items-center justify-between rounded-lg p-3 ${student.name === "You" ? "bg-chart-3/10 ring-2 ring-chart-3" : "bg-background/50"}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border border-border bg-background ${i === 0 ? "ring-2 ring-yellow-500" : ""}`}
                                                        >
                                                            <img
                                                                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${student.name}&backgroundColor=${student.avatar === "from-chart-3 to-chart-2" ? "c0aede" : "ffd5dc"}`}
                                                                alt={student.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <span
                                                            className={`font-medium ${student.name === "You" ? "text-chart-3" : "text-foreground"}`}
                                                        >
                                                            {student.name}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Star className="h-4 w-4 text-chart-3" />
                                                        <span className="font-semibold text-foreground">{student.points}</span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Achievements State */}
                        <div
                            className={`h-full transition-all duration-800 ${activeState === "achievements" ? "opacity-100 blur-0" : "pointer-events-none absolute opacity-0 blur-sm"
                                }`}
                        >
                            <h3 className="mb-4 text-lg font-semibold text-foreground">Your Progress Journey</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <h4 className="mb-4 text-sm font-semibold text-foreground">Overall Grade</h4>
                                    <div className="mb-4 flex items-center justify-center">
                                        <div className="relative h-32 w-32">
                                            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="40" fill="none" stroke="oklch(0.22 0.02 264)" strokeWidth="8" />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="url(#studentGradient)"
                                                    strokeWidth="8"
                                                    strokeDasharray="251.2"
                                                    strokeDashoffset="62.8"
                                                    strokeLinecap="round"
                                                />
                                                <defs>
                                                    <linearGradient id="studentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="oklch(0.65 0.18 310)" />
                                                        <stop offset="100%" stopColor="oklch(0.7 0.2 290)" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <div className="text-3xl font-bold text-foreground">A-</div>
                                                <div className="text-xs text-muted-foreground">88.5%</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center text-sm text-muted-foreground">Keep up the great work!</div>
                                </div>
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <h4 className="mb-4 text-sm font-semibold text-foreground">Subject Breakdown</h4>
                                    <div className="space-y-3">
                                        {[
                                            { subject: "Math", grade: "A", color: "text-blue-500" },
                                            { subject: "Science", grade: "A-", color: "text-green-500" },
                                            { subject: "English", grade: "B+", color: "text-purple-500" },
                                            { subject: "History", grade: "A", color: "text-orange-500" },
                                        ].map((subj, i) => (
                                            <div key={i} className="flex items-center justify-between rounded-lg bg-background/50 p-2">
                                                <span className="text-sm text-foreground">{subj.subject}</span>
                                                <span className={`text-lg font-bold ${subj.color}`}>{subj.grade}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-2 rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <h4 className="mb-4 text-sm font-semibold text-foreground">Recent Achievements</h4>
                                    <div className="space-y-3">
                                        {[
                                            { title: "Perfect Quiz Score", subject: "Mathematics", date: "Today", icon: "🎯" },
                                            { title: "Essay Excellence", subject: "English", date: "Yesterday", icon: "📝" },
                                            { title: "Science Project A+", subject: "Science", date: "2 days ago", icon: "🔬" },
                                        ].map((achievement, i) => (
                                            <div key={i} className="flex items-center gap-3 rounded-lg bg-background/50 p-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-chart-3 to-chart-2 text-2xl shadow-lg">
                                                    {achievement.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-foreground">{achievement.title}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {achievement.subject} · {achievement.date}
                                                    </div>
                                                </div>
                                                <Award className="h-5 w-5 text-chart-3" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personalized State */}
                        <div
                            className={`h-full transition-all duration-800 ${activeState === "personalized" ? "opacity-100 blur-0" : "pointer-events-none absolute opacity-0 blur-sm"
                                }`}
                        >
                            <h3 className="mb-4 text-lg font-semibold text-foreground">Recommended For You</h3>
                            <div className="space-y-4">
                                <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="rounded-lg bg-chart-3/10 p-2">
                                            <Target className="h-5 w-5 text-chart-3" />
                                        </div>
                                        <div className="text-sm font-medium text-foreground">Today's Focus Areas</div>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            {
                                                topic: "Practice algebra word problems",
                                                reason: "You're close to mastering this!",
                                                priority: "high",
                                            },
                                            {
                                                topic: "Review periodic table elements",
                                                reason: "Quiz coming up on Friday",
                                                priority: "medium",
                                            },
                                            {
                                                topic: "Read Chapter 7 of Macbeth",
                                                reason: "Stay ahead for class discussion",
                                                priority: "low",
                                            },
                                        ].map((focus, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-3 rounded-lg bg-background/50 p-3 transition-all hover:scale-[1.02]"
                                            >
                                                <div
                                                    className={`mt-1 h-3 w-3 rounded-full ${focus.priority === "high" ? "bg-red-500" : focus.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}`}
                                                ></div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-foreground">{focus.topic}</div>
                                                    <div className="text-xs text-muted-foreground">{focus.reason}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                        <div className="mb-3 flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-chart-3" />
                                            <div className="text-sm font-medium text-foreground">Study Time</div>
                                        </div>
                                        <div className="mb-2 text-3xl font-bold text-foreground">3.5h</div>
                                        <div className="text-xs text-muted-foreground">This week</div>
                                        <div className="mt-3 text-xs text-green-500">+45 min from last week</div>
                                    </div>
                                    <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
                                        <div className="mb-3 flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5 text-chart-3" />
                                            <div className="text-sm font-medium text-foreground">Growth Rate</div>
                                        </div>
                                        <div className="mb-2 text-3xl font-bold text-foreground">+12%</div>
                                        <div className="text-xs text-muted-foreground">vs last month</div>
                                        <div className="mt-3 text-xs text-green-500">Above average!</div>
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
