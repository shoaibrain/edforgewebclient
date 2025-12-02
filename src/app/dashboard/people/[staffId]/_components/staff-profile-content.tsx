"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    BookOpen,
    BarChart2,
    User,
    Users,
    GraduationCap,
    Calendar,
    Award,
    TrendingUp,
    MapPin,
    Phone,
    Mail,
    Briefcase,
    FileText,
    CheckCircle2,
    Clock,
    Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface StaffProfileContentProps {
    staff: any; // Using any to match the mock data structure
}

type TabSection = "overview" | "classes" | "performance" | "profile";

const tabs = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "classes" as const, label: "Classes", icon: BookOpen },
    { id: "performance" as const, label: "Performance", icon: BarChart2 },
    { id: "profile" as const, label: "Profile", icon: User },
];

export function StaffProfileContent({ staff }: StaffProfileContentProps) {
    const [activeTab, setActiveTab] = useState<TabSection>("overview");
    const [direction, setDirection] = useState(0);

    const handleTabChange = (tabId: TabSection) => {
        const newIndex = tabs.findIndex(t => t.id === tabId);
        const oldIndex = tabs.findIndex(t => t.id === activeTab);
        setDirection(newIndex > oldIndex ? 1 : -1);
        setActiveTab(tabId);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 20 : -20,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 20 : -20,
            opacity: 0,
        }),
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-6 w-full max-w-[1600px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar className="h-20 w-20 ring-4 ring-primary/10 shadow-xl">
                            <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.firstName}-${staff.lastName}`}
                                alt={`${staff.firstName} ${staff.lastName}`}
                            />
                            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                                {staff.firstName[0]}{staff.lastName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className={cn(
                            "absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-4 border-background shadow-sm",
                            staff.status === "active" ? "bg-success" : "bg-muted"
                        )}></div>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            {staff.firstName} {staff.lastName}
                        </h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Badge variant="outline" className="font-mono text-xs">
                                {staff.employeeNumber}
                            </Badge>
                            <span>•</span>
                            <span>{staff.primaryRole}</span>
                            <span>•</span>
                            <span>{staff.department}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-6 mr-6 px-6 py-2 bg-muted/30 rounded-full border border-border/50">
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Effectiveness</p>
                            <p className="text-lg font-bold text-primary">{staff.effectivenessScore}%</p>
                        </div>
                        <div className="w-px h-8 bg-border/50" />
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Students</p>
                            <p className="text-lg font-bold text-foreground">{staff.studentCount}</p>
                        </div>
                        <div className="w-px h-8 bg-border/50" />
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Attendance</p>
                            <p className="text-lg font-bold text-success">{staff.attendanceRate}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-border">
                <nav className="flex gap-8" aria-label="Staff profile sections">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={cn(
                                    "relative flex items-center gap-2 pb-4 text-sm font-medium transition-colors",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[600px] relative">
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.div
                        key={activeTab}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="w-full"
                    >
                        {activeTab === "overview" && (
                            <div className="space-y-6">
                                {/* Key Metrics Cards */}
                                <div className="grid gap-4 md:grid-cols-4">
                                    <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground">Effectiveness Score</p>
                                                <div className="flex items-baseline gap-2 mt-1">
                                                    <span className="text-2xl font-bold text-primary">{staff.effectivenessScore}</span>
                                                    <span className="text-xs text-success flex items-center">
                                                        <TrendingUp className="h-3 w-3 mr-0.5" /> Top 10%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Award className="h-5 w-5 text-primary" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground">Total Students</p>
                                                <div className="flex items-baseline gap-2 mt-1">
                                                    <span className="text-2xl font-bold text-foreground">{staff.studentCount}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        Avg {Math.round(staff.studentCount / staff.classesAssigned)} per class
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                                <Users className="h-5 w-5 text-blue-600" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground">Classes Assigned</p>
                                                <div className="flex items-baseline gap-2 mt-1">
                                                    <span className="text-2xl font-bold text-foreground">{staff.classesAssigned}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        Active courses
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                                                <BookOpen className="h-5 w-5 text-orange-600" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground">Years of Service</p>
                                                <div className="flex items-baseline gap-2 mt-1">
                                                    <span className="text-2xl font-bold text-foreground">{staff.yearsOfService}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        Since {new Date(staff.hireDate).getFullYear()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                                <Briefcase className="h-5 w-5 text-green-600" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>


                                {/* Performance Overview Cards */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    <Card className="bg-card border-border shadow-sm">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <BarChart2 className="h-5 w-5 text-primary" />
                                                Teaching Effectiveness
                                            </CardTitle>
                                            <CardDescription>
                                                Breakdown of key performance indicators
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">Student Outcomes</span>
                                                    <span className="text-sm font-bold">{staff.performanceMetrics.effectivenessBreakdown.studentOutcomes}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary" style={{ width: `${staff.performanceMetrics.effectivenessBreakdown.studentOutcomes}%` }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">Engagement</span>
                                                    <span className="text-sm font-bold">{staff.performanceMetrics.effectivenessBreakdown.engagement}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500" style={{ width: `${staff.performanceMetrics.effectivenessBreakdown.engagement}%` }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">Growth</span>
                                                    <span className="text-sm font-bold">{staff.performanceMetrics.effectivenessBreakdown.growth}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500" style={{ width: `${staff.performanceMetrics.effectivenessBreakdown.growth}%` }}></div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-card border-border shadow-sm">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <TrendingUp className="h-5 w-5 text-primary" />
                                                Key Achievements
                                            </CardTitle>
                                            <CardDescription>
                                                Notable accomplishments and milestones
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {staff.performanceMetrics.actionableInsights.strengths.slice(0, 3).map((strength: any, idx: number) => (
                                                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                                                    <Star className="h-5 w-5 text-success shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-medium text-foreground">{strength.area}</p>
                                                        <p className="text-xs text-muted-foreground mt-1">{strength.impact}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}

                        {activeTab === "classes" && (
                            <div className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {staff.assignments.map((assignment: any) => (
                                        <Card key={assignment.classId} className="bg-card border-border shadow-sm hover:shadow-md transition-all overflow-hidden">
                                            <div className="h-2 w-full" style={{ backgroundColor: assignment.themeColor }}></div>
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-lg font-semibold">{assignment.className}</CardTitle>
                                                        <CardDescription>{assignment.grade}th Grade • {assignment.subject}</CardDescription>
                                                    </div>
                                                    <Badge variant="outline" className="text-xs">
                                                        {assignment.studentCount}/{assignment.capacity}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{assignment.room}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Clock className="h-4 w-4" />
                                                        <span className="truncate">{assignment.schedule.split(' ')[0]}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 pt-2 border-t border-border/50">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">Average Grade</span>
                                                        <span className="font-semibold">{assignment.averageGrade}%</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">Pass Rate</span>
                                                        <span className="font-semibold text-success">{assignment.passRate}%</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">Attendance</span>
                                                        <span className="font-semibold">{assignment.attendanceRate}%</span>
                                                    </div>
                                                </div>

                                                <div className="pt-2">
                                                    <p className="text-xs text-muted-foreground italic">{assignment.recentActivity}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "performance" && (
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="bg-card border-border shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <BarChart2 className="h-5 w-5 text-primary" />
                                            Performance Metrics
                                        </CardTitle>
                                        <CardDescription>
                                            Detailed breakdown of teaching effectiveness
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">Student Outcomes</span>
                                                    <span className="text-sm font-bold">{staff.performanceMetrics.effectivenessBreakdown.studentOutcomes}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary" style={{ width: `${staff.performanceMetrics.effectivenessBreakdown.studentOutcomes}%` }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">Student Engagement</span>
                                                    <span className="text-sm font-bold">{staff.performanceMetrics.effectivenessBreakdown.engagement}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500" style={{ width: `${staff.performanceMetrics.effectivenessBreakdown.engagement}%` }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">Student Growth</span>
                                                    <span className="text-sm font-bold">{staff.performanceMetrics.effectivenessBreakdown.growth}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-500" style={{ width: `${staff.performanceMetrics.effectivenessBreakdown.growth}%` }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">Retention</span>
                                                    <span className="text-sm font-bold">{staff.performanceMetrics.effectivenessBreakdown.retention}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-orange-500" style={{ width: `${staff.performanceMetrics.effectivenessBreakdown.retention}%` }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-border">
                                            <h4 className="text-sm font-semibold mb-3">Actionable Insights</h4>
                                            <div className="space-y-3">
                                                {staff.performanceMetrics.actionableInsights.strengths.slice(0, 2).map((strength: any, idx: number) => (
                                                    <div key={idx} className="flex gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                                                        <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                                                        <div>
                                                            <p className="text-sm font-medium text-foreground">{strength.area}</p>
                                                            <p className="text-xs text-muted-foreground">{strength.impact}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card border-border shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Award className="h-5 w-5 text-primary" />
                                            Professional Development
                                        </CardTitle>
                                        <CardDescription>
                                            Recent certifications and workshops
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            {staff.professionalDevelopment.map((pd: any, idx: number) => (
                                                <div key={idx} className="flex items-start gap-4 p-3 rounded-lg border border-border/50 bg-muted/20">
                                                    <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border">
                                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <h4 className="text-sm font-semibold">{pd.title}</h4>
                                                            <Badge variant={pd.status === "completed" ? "default" : "secondary"} className="text-xs">
                                                                {pd.status}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground mt-1">{pd.provider} • {pd.hours} hours</p>
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {pd.skillsGained.map((skill: string, i: number) => (
                                                                <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === "profile" && (
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="bg-card border-border shadow-sm h-full">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <User className="h-5 w-5 text-primary" />
                                            Personal Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Full Name</p>
                                                <p className="text-sm font-medium">{staff.firstName} {staff.middleName} {staff.lastName}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Employee ID</p>
                                                <p className="text-sm font-medium">{staff.employeeNumber}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Email</p>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-3 w-3 text-muted-foreground" />
                                                    <p className="text-sm font-medium">{staff.email}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Phone</p>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-3 w-3 text-muted-foreground" />
                                                    <p className="text-sm font-medium">{staff.phone}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Hire Date</p>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-3 w-3 text-muted-foreground" />
                                                    <p className="text-sm font-medium">{new Date(staff.hireDate).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">Status</p>
                                                <Badge variant={staff.status === "active" ? "default" : "secondary"}>
                                                    {staff.status.toUpperCase()}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-6">
                                    <Card className="bg-card border-border shadow-sm">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <GraduationCap className="h-5 w-5 text-primary" />
                                                Education & Qualifications
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {staff.qualifications.education.map((edu: any, idx: number) => (
                                                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                        <GraduationCap className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">{edu.degree}</p>
                                                        <p className="text-xs text-muted-foreground">{edu.institution}, {edu.year}</p>
                                                        {edu.honors && (
                                                            <p className="text-xs text-muted-foreground mt-1 italic">{edu.honors.join(", ")}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-card border-border shadow-sm">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <Award className="h-5 w-5 text-primary" />
                                                Licenses & Certifications
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {staff.qualifications.licenses.map((license: any, idx: number) => (
                                                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium">{license.name}</p>
                                                        <p className="text-xs text-muted-foreground">Expires: {new Date(license.expirationDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <Badge variant="outline" className="text-xs">
                                                        {license.status}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
