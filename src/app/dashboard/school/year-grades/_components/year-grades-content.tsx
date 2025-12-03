"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import {
    GraduationCap,
    Plus,
    Edit,
    Trash2,
    Users,
    BookOpen,
    Building2,
    Search,
    Filter,
    TrendingUp,
    BarChart3,
    Eye,
} from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import Link from "next/link"

interface YearGrade {
    id: string
    name: string
    gradeLevel: string
    schoolId: string
    schoolName: string
    currentEnrollment: number
    maxCapacity: number
    subjectsCount: number
    classroomsCount: number
    gradeRange: string
    category: "primary" | "intermediate" | "middle" | "high"
}

interface School {
    schoolId: string
    schoolName: string
    schoolType: string
}

interface YearGradesContentProps {
    grades: YearGrade[]
    schools: School[]
}

const CATEGORY_COLORS = {
    primary: "#3b82f6",
    intermediate: "#10b981",
    middle: "#f59e0b",
    high: "#8b5cf6",
}

export function YearGradesContent({ grades, schools }: YearGradesContentProps) {
    const [selectedSchool, setSelectedSchool] = useState<string>("all")
    const [search, setSearch] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingGrade, setEditingGrade] = useState<YearGrade | null>(null)

    // Filter grades
    const filteredGrades = grades.filter(grade => {
        const matchesSchool = selectedSchool === "all" || grade.schoolId === selectedSchool
        const matchesSearch = grade.name.toLowerCase().includes(search.toLowerCase()) ||
            grade.gradeLevel.toLowerCase().includes(search.toLowerCase())
        return matchesSchool && matchesSearch
    })

    // Calculate statistics
    const totalEnrollment = filteredGrades.reduce((sum, g) => sum + g.currentEnrollment, 0)
    const totalCapacity = filteredGrades.reduce((sum, g) => sum + g.maxCapacity, 0)
    const utilizationRate = totalCapacity > 0 ? (totalEnrollment / totalCapacity * 100).toFixed(1) : "0"

    // Prepare chart data - Enrollment by Grade Category
    const categoryData = Object.entries(
        filteredGrades.reduce((acc, grade) => {
            if (!acc[grade.category]) {
                acc[grade.category] = { enrollment: 0, capacity: 0 }
            }
            acc[grade.category].enrollment += grade.currentEnrollment
            acc[grade.category].capacity += grade.maxCapacity
            return acc
        }, {} as Record<string, { enrollment: number; capacity: number }>)
    ).map(([category, data]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        Enrollment: data.enrollment,
        Capacity: data.capacity,
        fill: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS],
    }))

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Year Grades</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage grade levels and enrollment across schools.
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Input
                        placeholder="Search grades..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-[200px]"
                    />
                    <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="All Schools" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Schools</SelectItem>
                            {schools.map((school) => (
                                <SelectItem key={school.schoolId} value={school.schoolId}>
                                    {school.schoolName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Grade Level
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Grade Level</DialogTitle>
                                <DialogDescription>
                                    Create a new grade level for a school in your system.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="gradeName">Grade Name</Label>
                                    <Input id="gradeName" placeholder="e.g., Kindergarten, Grade 1" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="gradeLevel">Grade Level</Label>
                                    <Input id="gradeLevel" placeholder="e.g., K, 1, 2, 3" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="school">School</Label>
                                    <Select>
                                        <SelectTrigger id="school">
                                            <SelectValue placeholder="Select school" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {schools.map((school) => (
                                                <SelectItem key={school.schoolId} value={school.schoolId}>
                                                    {school.schoolName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="capacity">Max Capacity</Label>
                                    <Input id="capacity" type="number" placeholder="e.g., 150" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => setIsAddDialogOpen(false)}>Create Grade</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Insights Section */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Statistics Cards */}
                <div className="grid gap-4 grid-cols-2">
                    <Card className="bg-card border-border shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <GraduationCap className="h-4 w-4" />
                                <span className="text-xs font-medium">Total Grades</span>
                            </div>
                            <div className="text-2xl font-bold">{filteredGrades.length}</div>
                            <p className="text-xs text-muted-foreground mt-1">Grade levels</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <Users className="h-4 w-4" />
                                <span className="text-xs font-medium">Enrollment</span>
                            </div>
                            <div className="text-2xl font-bold">{totalEnrollment.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Students enrolled</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <Building2 className="h-4 w-4" />
                                <span className="text-xs font-medium">Capacity</span>
                            </div>
                            <div className="text-2xl font-bold">{totalCapacity.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Maximum students</p>
                        </CardContent>
                    </Card>

                    <Card className={cn(
                        "bg-card border-border shadow-sm",
                        Number(utilizationRate) >= 90 ? "border-error/50 bg-error/5" :
                            Number(utilizationRate) >= 75 ? "border-warning/50 bg-warning/5" :
                                "border-success/50 bg-success/5"
                    )}>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <TrendingUp className="h-4 w-4" />
                                <span className="text-xs font-medium">Utilization</span>
                            </div>
                            <div className={cn(
                                "text-2xl font-bold",
                                Number(utilizationRate) >= 90 ? "text-error" :
                                    Number(utilizationRate) >= 75 ? "text-warning" :
                                        "text-success"
                            )}>
                                {utilizationRate}%
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Of capacity</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Enrollment Chart */}
                <Card className="bg-card border-border shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Enrollment by Category
                        </CardTitle>
                        <CardDescription>Current enrollment vs. capacity</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="category" className="text-xs" />
                                <YAxis className="text-xs" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "6px",
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="Enrollment" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Capacity" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Grades Table */}
            <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                    <CardTitle>Grade Levels</CardTitle>
                    <CardDescription>
                        {filteredGrades.length} grade{filteredGrades.length !== 1 ? 's' : ''} across {selectedSchool === "all" ? "all schools" : "selected school"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Grade</TableHead>
                                <TableHead>School</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">Enrollment</TableHead>
                                <TableHead className="text-right">Capacity</TableHead>
                                <TableHead className="text-right">Utilization</TableHead>
                                <TableHead className="text-center">Subjects</TableHead>
                                <TableHead className="text-center">Classrooms</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredGrades.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                                        {search ? "No grades match your search criteria" : "No grade levels found. Add your first grade level to get started."}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredGrades.map((grade) => {
                                    const utilization = (grade.currentEnrollment / grade.maxCapacity * 100).toFixed(0)
                                    return (
                                        <TableRow key={grade.id} className="group">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <div className="font-medium">{grade.name}</div>
                                                        <div className="text-xs text-muted-foreground">Level {grade.gradeLevel}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">{grade.schoolName}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    style={{
                                                        backgroundColor: `${CATEGORY_COLORS[grade.category]}15`,
                                                        borderColor: `${CATEGORY_COLORS[grade.category]}50`,
                                                        color: CATEGORY_COLORS[grade.category],
                                                    }}
                                                    className="text-xs"
                                                >
                                                    {grade.category.charAt(0).toUpperCase() + grade.category.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-medium">{grade.currentEnrollment}</TableCell>
                                            <TableCell className="text-right text-muted-foreground">{grade.maxCapacity}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className={cn(
                                                                "h-full transition-all",
                                                                Number(utilization) >= 90 ? "bg-error" :
                                                                    Number(utilization) >= 75 ? "bg-warning" :
                                                                        "bg-success"
                                                            )}
                                                            style={{ width: `${Math.min(Number(utilization), 100)}%` }}
                                                        />
                                                    </div>
                                                    <span className={cn(
                                                        "text-sm font-medium w-12 text-right",
                                                        Number(utilization) >= 90 ? "text-error" :
                                                            Number(utilization) >= 75 ? "text-warning" :
                                                                "text-success"
                                                    )}>
                                                        {utilization}%
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center text-sm">{grade.subjectsCount}</TableCell>
                                            <TableCell className="text-center text-sm">{grade.classroomsCount}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href={`/dashboard/school/year-grades/${grade.id}`}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            title="View Details"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => setEditingGrade(grade)}
                                                    >
                                                        <Edit className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-error hover:text-error"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={editingGrade !== null} onOpenChange={(open) => !open && setEditingGrade(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Grade Level</DialogTitle>
                        <DialogDescription>
                            Update the grade level information.
                        </DialogDescription>
                    </DialogHeader>
                    {editingGrade && (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-gradeName">Grade Name</Label>
                                <Input id="edit-gradeName" defaultValue={editingGrade.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-gradeLevel">Grade Level</Label>
                                <Input id="edit-gradeLevel" defaultValue={editingGrade.gradeLevel} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-capacity">Max Capacity</Label>
                                <Input id="edit-capacity" type="number" defaultValue={editingGrade.maxCapacity} />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingGrade(null)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setEditingGrade(null)}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
