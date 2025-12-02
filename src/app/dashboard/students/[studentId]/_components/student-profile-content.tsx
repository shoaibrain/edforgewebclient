"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    BookOpen,
    CalendarCheck,
    User,
    GraduationCap,
    Activity,
    Calendar,
    MapPin,
    Phone,
    Mail,
    Award,
    Users,
    ArrowUpRight,
    Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StudentProfileActions } from "@/components/student-profile-actions";
import { cn } from "@/lib/utils";
import { AcademicGrowthAnalytics } from "./academic-growth-analytics";
import { ComprehensiveStudentPerformance } from "./comprehensive-student-performance";
import { BehavioralAnalytics } from "./behavioral-analytics";
import { SubjectPerformanceComparisonChart } from "./charts/subject-performance-comparison-chart";

// Define interface for the component props
interface StudentProfileContentProps {
    student: any; // Using any for now to match the mock data structure, ideally should be typed
    averageScore: number;
    performanceLevel: {
        label: string;
        variant: "default" | "secondary" | "destructive" | "outline" | null | undefined;
    };
    academicGrowthData: any;
    comprehensivePerformanceData: any;
    behavioralAnalyticsData: any;
    subjectPerformanceData: any;
}

type TabSection = "overview" | "academics" | "attendance" | "profile";

const tabs = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "academics" as const, label: "Academics", icon: BookOpen },
    { id: "attendance" as const, label: "Attendance & Behavior", icon: CalendarCheck },
    { id: "profile" as const, label: "Profile", icon: User },
];

export function StudentProfileContent({
    student,
    averageScore,
    performanceLevel,
    academicGrowthData,
    comprehensivePerformanceData,
    behavioralAnalyticsData,
    subjectPerformanceData
}: StudentProfileContentProps) {
    const [activeTab, setActiveTab] = useState<TabSection>("overview");
    const [direction, setDirection] = useState(0);

    const handleTabChange = (tabId: TabSection) => {
        const newIndex = tabs.findIndex(t => t.id === tabId);
        const oldIndex = tabs.findIndex(t => t.id === activeTab);
        setDirection(newIndex > oldIndex ? 1 : -1);
        setActiveTab(tabId);
    };

    // Helper for attendance percentage
    const getAttendancePercentage = (attendance: any) => {
        return Math.round((attendance.present / attendance.total) * 100);
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
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.firstName}-${student.lastName}`}
                                alt={`${student.firstName} ${student.lastName}`}
                            />
                            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                                {student.firstName[0]}{student.lastName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-success border-4 border-background shadow-sm"></div>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            {student.firstName} {student.lastName}
                        </h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Badge variant="outline" className="font-mono text-xs">
                                {student.studentId}
                            </Badge>
                            <span>•</span>
                            <span>{student.grade}</span>
                            <span>•</span>
                            <span>{student.academicYear}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-6 mr-6 px-6 py-2 bg-muted/30 rounded-full border border-border/50">
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">GPA</p>
                            <p className="text-lg font-bold text-primary">{student.overallGPA.toFixed(2)}</p>
                        </div>
                        <div className="w-px h-8 bg-border/50" />
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Avg Score</p>
                            <p className="text-lg font-bold text-foreground">{averageScore}%</p>
                        </div>
                        <div className="w-px h-8 bg-border/50" />
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Attendance</p>
                            <p className="text-lg font-bold text-success">
                                {Math.round(
                                    student.classes.reduce((sum: number, cls: any) => sum + getAttendancePercentage(cls.attendance), 0) /
                                    student.classes.length,
                                )}%
                            </p>
                        </div>
                    </div>


                    <StudentProfileActions studentId={student.studentId} />
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-border">
                <nav className="flex gap-8" aria-label="Student profile sections">
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
                                                <p className="text-xs font-medium text-muted-foreground">Overall GPA</p>
                                                <div className="flex items-baseline gap-2 mt-1">
                                                    <span className="text-2xl font-bold text-primary">{student.overallGPA.toFixed(2)}</span>
                                                    <span className="text-xs text-success flex items-center">
                                                        <ArrowUpRight className="h-3 w-3 mr-0.5" /> +0.2
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <GraduationCap className="h-5 w-5 text-primary" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground">Average Score</p>
                                                <div className="flex items-baseline gap-2 mt-1">
                                                    <span className="text-2xl font-bold text-foreground">{averageScore}%</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {student.performanceData.length} subjects
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                                <Activity className="h-5 w-5 text-blue-600" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground">Classes Enrolled</p>
                                                <div className="flex items-baseline gap-2 mt-1">
                                                    <span className="text-2xl font-bold text-foreground">{student.classes.length}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {student.classes.reduce((sum: number, cls: any) => sum + cls.credits, 0)} credits
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
                                                <p className="text-xs font-medium text-muted-foreground">Attendance Rate</p>
                                                <div className="flex items-baseline gap-2 mt-1">
                                                    <span className="text-2xl font-bold text-foreground">
                                                        {Math.round(
                                                            student.classes.reduce((sum: number, cls: any) => sum + getAttendancePercentage(cls.attendance), 0) /
                                                            student.classes.length,
                                                        )}%
                                                    </span>
                                                    <span className="text-xs text-success flex items-center">
                                                        <ArrowUpRight className="h-3 w-3 mr-0.5" /> +1.5%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                                <Calendar className="h-5 w-5 text-green-600" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="grid gap-6 lg:grid-cols-2">
                                    <AcademicGrowthAnalytics data={academicGrowthData} />
                                    <ComprehensiveStudentPerformance data={comprehensivePerformanceData} />
                                </div>
                            </div>
                        )}

                        {activeTab === "academics" && (
                            <div className="space-y-6">
                                <SubjectPerformanceComparisonChart data={subjectPerformanceData} />

                                <Card className="bg-card border-border shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <BookOpen className="h-5 w-5 text-primary" />
                                            Current Enrollments
                                        </CardTitle>
                                        <CardDescription>
                                            Detailed performance and attendance by subject
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {student.classes.map((cls: any) => (
                                                <div
                                                    key={cls.id}
                                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-200 hover:shadow-md gap-4"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                                                            <BookOpen className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-semibold text-base">{cls.name}</h4>
                                                                <Badge variant="outline" className="text-xs">
                                                                    {cls.credits} credit{cls.credits !== 1 ? "s" : ""}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                                <span className="flex items-center gap-1">
                                                                    <User className="h-3 w-3" /> {cls.teacher}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <MapPin className="h-3 w-3" /> {cls.room}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="h-3 w-3" /> {cls.schedule}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-6 sm:text-right">
                                                        <div>
                                                            <p className="text-xs text-muted-foreground mb-1">Current Grade</p>
                                                            {cls.grade && (
                                                                <Badge
                                                                    variant={
                                                                        cls.grade.startsWith("A") ? "default" :
                                                                            cls.grade.startsWith("B") ? "secondary" :
                                                                                cls.grade.startsWith("C") ? "outline" : "destructive"
                                                                    }
                                                                    className="text-base px-3 py-1"
                                                                >
                                                                    {cls.grade}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-muted-foreground mb-1">Attendance</p>
                                                            <div className="flex items-center gap-1 font-semibold">
                                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                                <span>{getAttendancePercentage(cls.attendance)}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === "attendance" && (
                            <div className="space-y-6">
                                <BehavioralAnalytics data={behavioralAnalyticsData} />
                            </div>
                        )}

                        {activeTab === "profile" && (
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Contact Information */}
                                <Card className="bg-card border-border shadow-sm h-full">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Users className="h-5 w-5 text-primary" />
                                            Contact Information
                                        </CardTitle>
                                        <CardDescription>
                                            Primary contacts and address details
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-muted/20">
                                            <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center shrink-0 border border-border">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground mb-1">Address</p>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {student.address.street}<br />
                                                    {student.address.city}, {student.address.state} {student.address.zipCode}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Guardians</h4>
                                            {student.contacts.map((contact: any, index: number) => (
                                                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-muted/20">
                                                    <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center shrink-0 border border-border">
                                                        <Users className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <div className="space-y-2 flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <p className="text-sm font-semibold text-foreground">{contact.name}</p>
                                                                <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Phone className="h-3 w-3" />
                                                                <span>{contact.phone}</span>
                                                            </div>
                                                            {contact.email && (
                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                    <Mail className="h-3 w-3" />
                                                                    <span className="truncate">{contact.email}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-6">
                                    {/* Medical Information */}
                                    <Card className="bg-card border-border shadow-sm">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <Activity className="h-5 w-5 text-primary" />
                                                Medical Information
                                            </CardTitle>
                                            <CardDescription>
                                                Health details and emergency contacts
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                {student.medical.bloodType && (
                                                    <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
                                                        <p className="text-xs text-muted-foreground mb-1">Blood Type</p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                                            <span className="font-semibold">{student.medical.bloodType}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {student.medical.insuranceProvider && (
                                                    <div className="p-3 rounded-lg border border-border/50 bg-muted/20">
                                                        <p className="text-xs text-muted-foreground mb-1">Insurance</p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                            <span className="font-medium truncate">{student.medical.insuranceProvider}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {(student.medical.allergies?.length > 0 || student.medical.conditions?.length > 0) && (
                                                <div className="space-y-3 pt-2">
                                                    {student.medical.allergies?.length > 0 && (
                                                        <div>
                                                            <p className="text-xs font-medium text-muted-foreground mb-2">Allergies</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {student.medical.allergies.map((allergy: string, idx: number) => (
                                                                    <Badge key={idx} variant="destructive" className="text-xs">
                                                                        {allergy}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {student.medical.conditions?.length > 0 && (
                                                        <div>
                                                            <p className="text-xs font-medium text-muted-foreground mb-2">Conditions</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {student.medical.conditions.map((condition: string, idx: number) => (
                                                                    <Badge key={idx} variant="secondary" className="text-xs">
                                                                        {condition}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30 mt-2">
                                                <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Emergency Contact</p>
                                                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                                                    {student.medical.emergencyContact}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Extracurriculars & Awards */}
                                    <Card className="bg-card border-border shadow-sm">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <Award className="h-5 w-5 text-primary" />
                                                Activities & Awards
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground mb-2">Extracurriculars</p>
                                                {student.extracurriculars && student.extracurriculars.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {student.extracurriculars.map((activity: string, index: number) => (
                                                            <Badge key={index} variant="outline" className="text-xs bg-background">
                                                                {activity}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-muted-foreground italic">No activities recorded</p>
                                                )}
                                            </div>

                                            <div className="pt-2">
                                                <p className="text-xs font-medium text-muted-foreground mb-2">Awards</p>
                                                {student.awards && student.awards.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {student.awards.map((award: string, index: number) => (
                                                            <div key={index} className="flex items-center gap-2 text-sm">
                                                                <Award className="h-3 w-3 text-yellow-500" />
                                                                <span>{award}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-muted-foreground italic">No awards recorded</p>
                                                )}
                                            </div>
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
