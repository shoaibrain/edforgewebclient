"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Users,
    GraduationCap,
    TrendingUp,
    BadgeCheck,
    Calendar,
    BookOpen,
    UserCheck,
    Trophy,
    Heart,
    BarChart3,
    PieChart,
    LineChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Line, LineChart as RechartsLineChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, PieChart as RechartsPieChart, Cell } from "recharts"

interface Teacher {
    id: string
    name: string
    subject: string
    email: string
    students: number
}

interface GradeData {
    id: string
    name: string
    gradeLevel: string
    schoolName: string
    schoolId: string
    category: "primary" | "intermediate" | "middle" | "high"
    currentEnrollment: number
    maxCapacity: number
    teachers: Teacher[]
    academicPerformance: {
        averageGrade: number
        passingRate: number
        attendanceRate: number
        subjectPerformance: Array<{
            subject: string
            average: number
            passing: number
        }>
    }
    enrollmentTrend: Array<{
        month: string
        enrollment: number
    }>
    attendanceData: Array<{
        month: string
        rate: number
    }>
    demographics: {
        gender: { male: number; female: number }
        specialNeeds: number
        giftedTalented: number
    }
}

interface GradeDetailsContentProps {
    gradeData: GradeData
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6']

export function GradeDetailsContent({ gradeData }: GradeDetailsContentProps) {
    const totalTeachers = gradeData.teachers.length
    const studentTeacherRatio = (gradeData.currentEnrollment / totalTeachers).toFixed(1)
    const utilization = ((gradeData.currentEnrollment / gradeData.maxCapacity) * 100).toFixed(0)

    // Prepare gender distribution data pie chart
    const genderData = [
        { name: "Male", value: gradeData.demographics.gender.male },
        { name: "Female", value: gradeData.demographics.gender.female },
    ]

    return (
        <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-card border-border shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Users className="h-4 w-4" />
                            <span className="text-xs font-medium">Total Students</span>
                        </div>
                        <div className="text-2xl font-bold">{gradeData.currentEnrollment}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            of {gradeData.maxCapacity} capacity ({utilization}%)
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <GraduationCap className="h-4 w-4" />
                            <span className="text-xs font-medium">Teachers</span>
                        </div>
                        <div className="text-2xl font-bold">{totalTeachers}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Ratio: {studentTeacherRatio}:1
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-sm border-success/50 bg-success/5">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <BadgeCheck className="h-4 w-4" />
                            <span className="text-xs font-medium">Passing Rate</span>
                        </div>
                        <div className="text-2xl font-bold text-success">{gradeData.academicPerformance.passingRate}%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Avg Grade: {gradeData.academicPerformance.averageGrade}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-sm border-blue-500/50 bg-blue-500/5">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="h-4 w-4" />
                            <span className="text-xs font-medium">Attendance</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{gradeData.academicPerformance.attendanceRate}%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Average daily rate
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Enrollment Trend */}
                <Card className="bg-card border-border shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <LineChart className="h-4 w-4" />
                            Enrollment Trend
                        </CardTitle>
                        <CardDescription>Student count over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <RechartsLineChart data={gradeData.enrollmentTrend}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="month" className="text-xs" />
                                <YAxis className="text-xs" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "6px",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="enrollment"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ fill: "#3b82f6", r: 4 }}
                                />
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Attendance Trend */}
                <Card className="bg-card border-border shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            Attendance Rate
                        </CardTitle>
                        <CardDescription>Monthly attendance percentage</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <RechartsLineChart data={gradeData.attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="month" className="text-xs" />
                                <YAxis className="text-xs" domain={[90, 100]} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "6px",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="rate"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={{ fill: "#10b981", r: 4 }}
                                />
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Subject Performance */}
                <Card className="bg-card border-border shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Subject Performance
                        </CardTitle>
                        <CardDescription>Average grades by subject</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={gradeData.academicPerformance.subjectPerformance}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="subject" className="text-xs" angle={-45} textAnchor="end" height={80} />
                                <YAxis className="text-xs" domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "6px",
                                    }}
                                />
                                <Bar dataKey="average" radius={[4, 4, 0, 0]}>
                                    {gradeData.academicPerformance.subjectPerformance.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Demographics */}
                <Card className="bg-card border-border shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <PieChart className="h-4 w-4" />
                            Student Demographics
                        </CardTitle>
                        <CardDescription>Gender distribution and special categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-6">
                            <ResponsiveContainer width="50%" height={200}>
                                <RechartsPieChart>
                                    <Pie
                                        data={genderData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${value}`}
                                        outerRadius={60}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {genderData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#ec4899'} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Heart className="h-4 w-4 text-error" />
                                        <span className="text-sm">Special Needs</span>
                                    </div>
                                    <Badge variant="outline">{gradeData.demographics.specialNeeds}</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Trophy className="h-4 w-4 text-warning" />
                                        <span className="text-sm">Gifted/Talented</span>
                                    </div>
                                    <Badge variant="outline">{gradeData.demographics.giftedTalented}</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Teachers Table */}
            <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                    <CardTitle>Assigned Teachers</CardTitle>
                    <CardDescription>
                        {totalTeachers} teachers managing {gradeData.currentEnrollment} students
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Teacher</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Students</TableHead>
                                <TableHead className="text-right">Ratio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {gradeData.teachers.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="text-xs">
                                                    {teacher.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            {teacher.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{teacher.subject}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{teacher.email}</TableCell>
                                    <TableCell className="text-right font-medium">{teacher.students}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            className={cn(
                                                Number((teacher.students / totalTeachers).toFixed(0)) > 25
                                                    ? "bg-error/10 text-error border-error/50"
                                                    : "bg-success/10 text-success border-success/50"
                                            )}
                                            variant="outline"
                                        >
                                            {(teacher.students / 1).toFixed(0)}:1
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Subject Performance Detailed Table */}
            <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                    <CardTitle>Academic Performance by Subject</CardTitle>
                    <CardDescription>
                        Detailed breakdown of student performance across subjects
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead className="text-right">Average Grade</TableHead>
                                <TableHead className="text-right">Passing Rate</TableHead>
                                <TableHead className="text-right">Performance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {gradeData.academicPerformance.subjectPerformance.map((subject, index) => (
                                <TableRow key={subject.subject}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                                            {subject.subject}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                subject.average >= 85
                                                    ? "bg-success/10 text-success border-success/50"
                                                    : subject.average >= 75
                                                        ? "bg-warning/10 text-warning border-warning/50"
                                                        : "bg-error/10 text-error border-error/50"
                                            )}
                                        >
                                            {subject.average}%
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                subject.passing >= 90
                                                    ? "bg-success/10 text-success border-success/50"
                                                    : "bg-warning/10 text-warning border-warning/50"
                                            )}
                                        >
                                            {subject.passing}%
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full",
                                                        subject.average >= 85 ? "bg-success" :
                                                            subject.average >= 75 ? "bg-warning" : "bg-error"
                                                    )}
                                                    style={{ width: `${subject.average}%` }}
                                                />
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Administrative Insights */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-card border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Key Insights</CardTitle>
                        <CardDescription>Data-driven observations for decision making</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-success/5 border border-success/20 rounded-lg">
                            <BadgeCheck className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium">Strong Academic Performance</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {gradeData.academicPerformance.passingRate}% passing rate exceeds the district average. Math and English showing exceptional results.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium">Enrollment Growth Trend</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Steady 5% enrollment increase over the past semester. Currently at {utilization}% capacity utilization.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
                            <Users className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium">Teacher-Student Ratio</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Current ratio of {studentTeacherRatio}:1 is within optimal range. Consider additional support for Science classes.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Recommendations</CardTitle>
                        <CardDescription>Action items for continuous improvement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-primary">1</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Strengthen Science Support</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Science showing the lowest average (84%). Consider peer tutoring program or additional lab sessions.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-primary">2</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Expand Gifted Program</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {gradeData.demographics.giftedTalented} students identified as gifted/talented. Consider enrichment activities and advanced coursework.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-primary">3</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Monitor Capacity Planning</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    At {utilization}% capacity with growing enrollment. Plan for additional classroom space for next academic year.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
