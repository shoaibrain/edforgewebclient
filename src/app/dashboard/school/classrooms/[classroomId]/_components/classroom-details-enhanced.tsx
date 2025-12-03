"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    MessageSquare,
    BookOpen,
    Users,
    GraduationCap,
    BarChart2,
    ArrowLeft,
    Calendar,
    MapPin,
    MoreHorizontal,
    Settings,
    FileText,
    Link as LinkIcon,
    MoreVertical,
    Search,
    Filter,
    Plus,
    Download,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Send,
    UserPlus,
    Mail,
    Pen,
    Image as ImageIcon,
    UploadCloud,
    Bold,
    Italic,
    Underline,
    List as ListIcon,
    Type,
    Link2,
    Youtube,
    X,
    Palette,
    Layout
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Classroom } from "@/types/classroom"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell
} from "recharts"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface ClassroomDetailsContentProps {
    classroom: Classroom
}

const tabs = [
    { id: "stream", label: "Stream", icon: MessageSquare },
    { id: "classwork", label: "Classwork", icon: BookOpen },
    { id: "people", label: "People", icon: Users },
    { id: "grades", label: "Grades", icon: GraduationCap },
    { id: "progress", label: "Progress", icon: BarChart2 },
]

// --- Mock Data ---

const MOCK_ASSIGNMENTS = [
    {
        id: "topic-1",
        title: "Unit 1: Linear Equations",
        items: [
            { id: "a1", type: "material", title: "Lecture Slides: Introduction to Algebra", posted: "2024-08-15", status: "published" },
            { id: "a2", type: "assignment", title: "Problem Set 1.1", due: "2024-08-20", posted: "2024-08-16", status: "graded", turnedIn: 28, assigned: 30 },
            { id: "a3", type: "quiz", title: "Quiz 1: Solving for X", due: "2024-08-25", posted: "2024-08-22", status: "closed", turnedIn: 30, assigned: 30 },
        ]
    },
    {
        id: "topic-2",
        title: "Unit 2: Quadratic Functions",
        items: [
            { id: "b1", type: "material", title: "Video: Graphing Parabolas", posted: "2024-09-01", status: "published" },
            { id: "b2", type: "assignment", title: "Project: Parabola in Real Life", due: "2024-09-15", posted: "2024-09-05", status: "active", turnedIn: 12, assigned: 30 },
        ]
    }
]

const MOCK_STUDENTS = Array.from({ length: 30 }).map((_, i) => ({
    id: `s${i + 1}`,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@school.edu`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=student${i}`,
    lastActive: "2 hours ago",
    attendance: 90 + Math.floor(Math.random() * 10),
    avgGrade: 75 + Math.floor(Math.random() * 25)
})).sort((a, b) => a.name.localeCompare(b.name))

const MOCK_GRADES = MOCK_STUDENTS.map(student => ({
    studentId: student.id,
    studentName: student.name,
    avatar: student.avatar,
    assignments: {
        "Problem Set 1.1": Math.floor(Math.random() * 20) + 80,
        "Quiz 1": Math.floor(Math.random() * 20) + 80,
        "Project": Math.floor(Math.random() * 30) + 70,
    }
}))

const MOCK_ANALYTICS = {
    gradeDistribution: [
        { range: "90-100", count: 8 },
        { range: "80-89", count: 12 },
        { range: "70-79", count: 6 },
        { range: "60-69", count: 3 },
        { range: "<60", count: 1 },
    ],
    attendanceTrend: [
        { week: "W1", rate: 98 },
        { week: "W2", rate: 96 },
        { week: "W3", rate: 99 },
        { week: "W4", rate: 95 },
        { week: "W5", rate: 97 },
    ],
    assignmentCompletion: [
        { name: "Completed", value: 85 },
        { name: "Late", value: 10 },
        { name: "Missing", value: 5 },
    ]
}

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

export function ClassroomDetailsContent({ classroom }: ClassroomDetailsContentProps) {
    const [activeTab, setActiveTab] = useState("stream")
    const [isPostInputExpanded, setIsPostInputExpanded] = useState(false)

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="flex flex-1 flex-col min-h-screen bg-background">
            {/* Static Banner - Reverted Animation */}
            <div className="relative">
                <div
                    className="h-64 w-full relative overflow-hidden"
                    style={{
                        background: classroom.themeColor ?
                            `linear-gradient(135deg, ${classroom.themeColor} 0%, ${classroom.themeColor}dd 100%)` :
                            'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                    }}
                >
                    {/* Static Decorative Pattern */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                            backgroundSize: "60px 60px",
                        }}
                    />

                    {/* Navigation Bar */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20 backdrop-blur-sm">
                            <Link href="/dashboard/school/classrooms" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Classrooms
                            </Link>
                        </Button>
                        <div className="flex items-center gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary" size="sm" className="bg-white/90 text-black hover:bg-white/100 shadow-sm backdrop-blur-sm transition-all">
                                        <Pen className="h-3.5 w-3.5 mr-2" />
                                        Customize
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0">
                                    <div className="p-6 pb-0">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl">Customize appearance</DialogTitle>
                                        </DialogHeader>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {/* Banner Preview */}
                                        <div className="relative h-32 w-full rounded-lg overflow-hidden bg-muted">
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: classroom.themeColor ?
                                                        `linear-gradient(135deg, ${classroom.themeColor} 0%, ${classroom.themeColor}dd 100%)` :
                                                        'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                                                }}
                                            >
                                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", backgroundSize: "60px 60px" }} />
                                                <div className="absolute bottom-4 left-4 text-white">
                                                    <h3 className="text-xl font-bold">{classroom.name}</h3>
                                                    <p className="text-sm opacity-90">{classroom.subject}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Image Selection */}
                                        <div className="space-y-3">
                                            <Label>Select stream header image</Label>
                                            <div className="flex gap-3">
                                                <Button variant="secondary" className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
                                                    <ImageIcon className="h-4 w-4 mr-2" />
                                                    Select photo
                                                </Button>
                                                <Button variant="secondary" className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
                                                    <UploadCloud className="h-4 w-4 mr-2" />
                                                    Upload photo
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Theme Color Selection */}
                                        <div className="space-y-3">
                                            <Label>Select theme color</Label>
                                            <div className="flex gap-4">
                                                {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'].map((color) => (
                                                    <button
                                                        key={color}
                                                        className={cn(
                                                            "h-10 w-10 rounded-full flex items-center justify-center transition-all hover:scale-110",
                                                            classroom.themeColor === color ? "ring-2 ring-offset-2 ring-offset-background ring-black/50" : ""
                                                        )}
                                                        style={{ backgroundColor: color }}
                                                    >
                                                        {classroom.themeColor === color && <CheckCircle2 className="h-5 w-5 text-white" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <DialogFooter className="p-4 bg-muted/20 border-t">
                                        <Button variant="ghost" onClick={() => { }}>Cancel</Button>
                                        <Button onClick={() => { }}>Save</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Badge
                                variant="secondary"
                                className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                            >
                                {classroom.status}
                            </Badge>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 backdrop-blur-sm">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Classroom Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/50 to-transparent">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-4xl font-bold text-white mb-2">{classroom.name}</h1>
                            <p className="text-white/90 text-lg flex items-center gap-3">
                                <span className="font-medium">{classroom.code}</span>
                                <span>•</span>
                                <span>{classroom.subject}</span>
                                <span>•</span>
                                <span>{classroom.grade}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="bg-card border-b">
                    <div className="max-w-7xl mx-auto px-6 py-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-6 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>{classroom.enrolled} Students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Mon, Wed, Fri 09:30</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{classroom.room.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 border border-border">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${classroom.primaryTeacher.teacherName}`} />
                                    <AvatarFallback>{classroom.primaryTeacher.teacherName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{classroom.primaryTeacher.teacherName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Tab Navigation */}
            <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex space-x-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            const isActive = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "relative py-4 px-6 font-medium text-sm transition-colors duration-200 flex items-center gap-2",
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-t-lg"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                    {isActive && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            layoutId="activeTab"
                                        />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-muted/10">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <AnimatePresence mode="wait">

                        {/* STREAM TAB */}
                        {activeTab === "stream" && (
                            <motion.div
                                key="stream"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="grid gap-6 lg:grid-cols-4"
                            >
                                {/* Left Sidebar */}
                                <div className="hidden lg:block space-y-6">
                                    <motion.div variants={itemVariants}>
                                        <Card>
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-sm font-medium text-muted-foreground">Class Code</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md border border-border">
                                                    <code className="text-lg font-bold text-primary">{classroom.code}</code>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Card>
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium">Problem Set 1.1</p>
                                                    <p className="text-xs text-muted-foreground">Due Tomorrow, 11:59 PM</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium">Quiz 1: Solving for X</p>
                                                    <p className="text-xs text-muted-foreground">Due Friday</p>
                                                </div>
                                                <Button variant="link" className="px-0 text-xs h-auto">View all</Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </div>

                                {/* Main Stream Feed */}
                                <div className="lg:col-span-3 space-y-4">
                                    {/* Post Input */}
                                    <motion.div variants={itemVariants}>
                                        <Card className={cn("transition-all duration-200", isPostInputExpanded ? "shadow-md" : "shadow-sm")}>
                                            <CardContent className="p-4">
                                                {isPostInputExpanded ? (
                                                    <div className="space-y-4">
                                                        <textarea
                                                            className="w-full min-h-[120px] p-3 text-sm bg-muted/20 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                                            placeholder="Announce something to your class..."
                                                            autoFocus
                                                        />
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex gap-2">
                                                                <Button variant="outline" size="sm">
                                                                    <FileText className="h-4 w-4 mr-2" />
                                                                    File
                                                                </Button>
                                                                <Button variant="outline" size="sm">
                                                                    <LinkIcon className="h-4 w-4 mr-2" />
                                                                    Link
                                                                </Button>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button variant="ghost" size="sm" onClick={() => setIsPostInputExpanded(false)}>Cancel</Button>
                                                                <Button size="sm">Post</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="flex items-center gap-4 cursor-pointer"
                                                        onClick={() => setIsPostInputExpanded(true)}
                                                    >
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${classroom.primaryTeacher.teacherName}`} />
                                                            <AvatarFallback>T</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 p-3 rounded-full bg-muted/30 text-sm text-muted-foreground hover:bg-muted/50 transition-colors">
                                                            Announce something to your class...
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>

                                    {/* Stream Posts */}
                                    {[1, 2, 3].map((i) => (
                                        <motion.div key={i} variants={itemVariants}>
                                            <Card className="shadow-sm hover:shadow-md transition-shadow">
                                                <CardHeader className="p-4 pb-0">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-10 w-10">
                                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i === 1 ? classroom.primaryTeacher.teacherName : `user${i}`}`} />
                                                                <AvatarFallback>U</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <h3 className="text-sm font-semibold">{i === 1 ? classroom.primaryTeacher.teacherName : "Dr. Sarah Chen"}</h3>
                                                                <p className="text-xs text-muted-foreground">Posted {i} day{i > 1 ? 's' : ''} ago</p>
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="p-4">
                                                    <p className="text-sm leading-relaxed mb-4">
                                                        {i === 1 ? "Welcome to Advanced Mathematics A! Please review the syllabus attached below. I'm looking forward to a great semester with all of you." :
                                                            i === 2 ? "Just a reminder that the Problem Set 1.1 is due tomorrow. Please make sure to show all your work." :
                                                                "I've uploaded the lecture slides from today's class. Let me know if you have any questions about the quadratic formula."}
                                                    </p>
                                                    {i !== 2 && (
                                                        <div className="flex items-center gap-3 p-3 rounded-md border border-border bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer w-fit max-w-full">
                                                            <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                                                                <FileText className="h-5 w-5" />
                                                            </div>
                                                            <div className="overflow-hidden">
                                                                <p className="text-sm font-medium truncate">{i === 1 ? "Syllabus_Fall2024.pdf" : "Lecture_Slides_Week1.pdf"}</p>
                                                                <p className="text-xs text-muted-foreground">PDF Document</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </CardContent>
                                                <div className="px-4 py-3 border-t border-border bg-muted/5 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground">
                                                            <MessageSquare className="h-4 w-4 mr-2" />
                                                            {i * 2 + 1} class comments
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* CLASSWORK TAB */}
                        {activeTab === "classwork" && (
                            <motion.div
                                key="classwork"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="max-w-4xl mx-auto space-y-8"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <Button className="gap-2">
                                        <Plus className="h-4 w-4" />
                                        Create
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Filter className="h-4 w-4 mr-2" />
                                            Filter
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {MOCK_ASSIGNMENTS.map((topic) => (
                                    <motion.div key={topic.id} variants={itemVariants} className="space-y-4">
                                        <div className="flex items-center justify-between border-b border-border pb-2">
                                            <h2 className="text-2xl font-semibold text-primary">{topic.title}</h2>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="space-y-3">
                                            {topic.items.map((item) => (
                                                <Card key={item.id} className="hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary">
                                                    <CardContent className="p-4 flex items-center gap-4">
                                                        <div className={cn(
                                                            "p-3 rounded-full",
                                                            item.type === "material" ? "bg-blue-100 text-blue-600" :
                                                                item.type === "assignment" ? "bg-green-100 text-green-600" :
                                                                    "bg-orange-100 text-orange-600"
                                                        )}>
                                                            {item.type === "material" ? <BookOpen className="h-5 w-5" /> :
                                                                item.type === "assignment" ? <FileText className="h-5 w-5" /> :
                                                                    <AlertCircle className="h-5 w-5" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                                                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                                                <span>Posted {item.posted}</span>
                                                                {item.due && (
                                                                    <>
                                                                        <span>•</span>
                                                                        <span className="text-orange-600 font-medium">Due {item.due}</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {item.type !== "material" && (
                                                            <div className="text-right hidden sm:block">
                                                                <div className="text-2xl font-bold text-foreground">{item.turnedIn}</div>
                                                                <div className="text-xs text-muted-foreground">Turned in</div>
                                                            </div>
                                                        )}
                                                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* PEOPLE TAB */}
                        {activeTab === "people" && (
                            <motion.div
                                key="people"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="max-w-4xl mx-auto space-y-8"
                            >
                                {/* Teachers Section */}
                                <motion.div variants={itemVariants} className="space-y-4">
                                    <div className="flex items-center justify-between border-b-2 border-primary pb-2">
                                        <h2 className="text-2xl font-semibold text-primary">Teachers</h2>
                                        <Button variant="ghost" size="icon">
                                            <UserPlus className="h-5 w-5 text-primary" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 hover:bg-muted/30 rounded-lg transition-colors">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${classroom.primaryTeacher.teacherName}`} />
                                                <AvatarFallback>T</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{classroom.primaryTeacher.teacherName}</span>
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Mail className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </motion.div>

                                {/* Students Section */}
                                <motion.div variants={itemVariants} className="space-y-4">
                                    <div className="flex items-center justify-between border-b-2 border-primary pb-2">
                                        <div className="flex items-center gap-4">
                                            <h2 className="text-2xl font-semibold text-primary">Students</h2>
                                            <Badge variant="secondary" className="text-primary bg-primary/10">{classroom.enrolled} students</Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon">
                                                <UserPlus className="h-5 w-5 text-primary" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-border">
                                        {MOCK_STUDENTS.map((student) => (
                                            <div key={student.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group">
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src={student.avatar} />
                                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-sm">{student.name}</p>
                                                        <p className="text-xs text-muted-foreground">{student.email}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="hidden md:block text-right">
                                                        <p className="text-xs text-muted-foreground">Last active</p>
                                                        <p className="text-xs font-medium">{student.lastActive}</p>
                                                    </div>
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Mail className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* GRADES TAB */}
                        {activeTab === "grades" && (
                            <motion.div
                                key="grades"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="overflow-x-auto"
                            >
                                <div className="min-w-[800px] border rounded-lg bg-card">
                                    <div className="grid grid-cols-[200px_1fr] border-b">
                                        <div className="p-4 font-semibold border-r bg-muted/30 flex items-center">Student Name</div>
                                        <div className="grid grid-cols-4 divide-x">
                                            <div className="p-4 font-semibold text-center bg-muted/10">
                                                <div className="text-xs text-muted-foreground mb-1">Aug 20</div>
                                                Problem Set 1.1
                                                <div className="text-xs font-normal text-muted-foreground mt-1">100 pts</div>
                                            </div>
                                            <div className="p-4 font-semibold text-center bg-muted/10">
                                                <div className="text-xs text-muted-foreground mb-1">Aug 25</div>
                                                Quiz 1
                                                <div className="text-xs font-normal text-muted-foreground mt-1">100 pts</div>
                                            </div>
                                            <div className="p-4 font-semibold text-center bg-muted/10">
                                                <div className="text-xs text-muted-foreground mb-1">Sep 15</div>
                                                Project
                                                <div className="text-xs font-normal text-muted-foreground mt-1">100 pts</div>
                                            </div>
                                            <div className="p-4 font-semibold text-center bg-muted/30 text-primary">
                                                Overall Grade
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divide-y">
                                        {MOCK_GRADES.map((student) => {
                                            const avg = Math.round(Object.values(student.assignments).reduce((a, b) => a + b, 0) / 3);
                                            return (
                                                <div key={student.studentId} className="grid grid-cols-[200px_1fr] hover:bg-muted/20 transition-colors group">
                                                    <div className="p-3 border-r flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={student.avatar} />
                                                            <AvatarFallback>{student.studentName.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-sm font-medium">{student.studentName}</span>
                                                    </div>
                                                    <div className="grid grid-cols-4 divide-x">
                                                        {Object.entries(student.assignments).map(([key, score]) => (
                                                            <div key={key} className="p-3 flex items-center justify-center">
                                                                <div className="group/input relative w-full flex justify-center">
                                                                    <span className="text-sm">{score}</span>
                                                                    <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover/input:opacity-100">
                                                                        <MoreVertical className="h-3 w-3" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="p-3 flex items-center justify-center font-bold text-primary bg-primary/5">
                                                            {avg}%
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* PROGRESS TAB */}
                        {activeTab === "progress" && (
                            <motion.div
                                key="progress"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="space-y-6"
                            >
                                {/* Summary Cards */}
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between space-y-0 pb-2">
                                                <p className="text-sm font-medium text-muted-foreground">Class Average</p>
                                                <GraduationCap className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="text-2xl font-bold">87.5%</div>
                                            <p className="text-xs text-muted-foreground mt-1">+2.1% from last month</p>
                                            <Progress value={87.5} className="mt-3 h-2" />
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between space-y-0 pb-2">
                                                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            </div>
                                            <div className="text-2xl font-bold">96.2%</div>
                                            <p className="text-xs text-muted-foreground mt-1">High engagement</p>
                                            <Progress value={96.2} className="mt-3 h-2 [&>div]:bg-green-500" />
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between space-y-0 pb-2">
                                                <p className="text-sm font-medium text-muted-foreground">Assignments Turned In</p>
                                                <FileText className="h-4 w-4 text-blue-500" />
                                            </div>
                                            <div className="text-2xl font-bold">92%</div>
                                            <p className="text-xs text-muted-foreground mt-1">28/30 students on average</p>
                                            <Progress value={92} className="mt-3 h-2 [&>div]:bg-blue-500" />
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Charts Section */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    <Card className="col-span-1">
                                        <CardHeader>
                                            <CardTitle>Grade Distribution</CardTitle>
                                            <CardDescription>Number of students by grade range</CardDescription>
                                        </CardHeader>
                                        <CardContent className="h-[300px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={MOCK_ANALYTICS.gradeDistribution}>
                                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                                    <XAxis dataKey="range" className="text-xs" />
                                                    <YAxis className="text-xs" />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                                    />
                                                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </CardContent>
                                    </Card>

                                    <Card className="col-span-1">
                                        <CardHeader>
                                            <CardTitle>Attendance Trend</CardTitle>
                                            <CardDescription>Weekly attendance percentage</CardDescription>
                                        </CardHeader>
                                        <CardContent className="h-[300px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={MOCK_ANALYTICS.attendanceTrend}>
                                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                                    <XAxis dataKey="week" className="text-xs" />
                                                    <YAxis domain={[90, 100]} className="text-xs" />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                                    />
                                                    <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </CardContent>
                                    </Card>

                                    <Card className="col-span-1 md:col-span-2">
                                        <CardHeader>
                                            <CardTitle>Assignment Completion Status</CardTitle>
                                            <CardDescription>Overall breakdown of assignment submissions</CardDescription>
                                        </CardHeader>
                                        <CardContent className="h-[250px] flex items-center justify-center">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={MOCK_ANALYTICS.assignmentCompletion}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={80}
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                    >
                                                        {MOCK_ANALYTICS.assignmentCompletion.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                            <div className="flex flex-col gap-2 ml-8">
                                                {MOCK_ANALYTICS.assignmentCompletion.map((entry, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                                        <span className="text-sm font-medium">{entry.name}: {entry.value}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
