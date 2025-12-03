"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Label } from "@/components/ui/label"
import {
    Building2,
    Plus,
    Users,
    DollarSign,
    BookOpen,
    GraduationCap,
    Eye,
    Edit,
    Trash2,
    TrendingUp,
    BarChart3,
} from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

interface Department {
    id: string
    name: string
    type: "academic" | "administrative" | "support"
    schoolId: string
    schoolName: string
    headOfDepartment: {
        name: string
        email: string
    } | null
    staffCount: number
    studentCount: number
    budgetAllocated: number
    budgetUsed: number
    subjectsOffered: string[]
}

interface School {
    schoolId: string
    schoolName: string
    schoolType: string
}

interface DepartmentsContentProps {
    departments: Department[]
    schools: School[]
}

const DEPT_TYPE_COLORS = {
    academic: "bg-blue-500/10 text-blue-700 border-blue-200",
    administrative: "bg-purple-500/10 text-purple-700 border-purple-200",
    support: "bg-green-500/10 text-green-700 border-green-200",
}

const DEPT_TYPE_LABELS = {
    academic: "Academic",
    administrative: "Administrative",
    support: "Support",
}

export function DepartmentsContent({ departments, schools }: DepartmentsContentProps) {
    const [selectedSchool, setSelectedSchool] = useState<string>("all")
    const [selectedType, setSelectedType] = useState<string>("all")
    const [search, setSearch] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingDept, setEditingDept] = useState<Department | null>(null)

    // Filter departments
    const filteredDepartments = departments.filter(dept => {
        const matchesSchool = selectedSchool === "all" || dept.schoolId === selectedSchool
        const matchesType = selectedType === "all" || dept.type === selectedType
        const matchesSearch = dept.name.toLowerCase().includes(search.toLowerCase())
        return matchesSchool && matchesType && matchesSearch
    })

    // Calculate statistics
    const totalStaff = filteredDepartments.reduce((sum, d) => sum + d.staffCount, 0)
    const totalBudget = filteredDepartments.reduce((sum, d) => sum + d.budgetAllocated, 0)
    const totalBudgetUsed = filteredDepartments.reduce((sum, d) => sum + d.budgetUsed, 0)
    const budgetUtilization = totalBudget > 0 ? ((totalBudgetUsed / totalBudget) * 100).toFixed(1) : "0"

    // Prepare chart data - Budget by Department
    const budgetData = filteredDepartments.slice(0, 8).map(dept => ({
        name: dept.name.length > 15 ? dept.name.substring(0, 15) + '...' : dept.name,
        Allocated: dept.budgetAllocated,
        Used: dept.budgetUsed,
    }))

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage academic and administrative departments across schools.
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Input
                        placeholder="Search departments..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-[200px]"
                    />
                    <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                        <SelectTrigger className="w-[180px]">
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
                    <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="administrative">Administrative</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                        </SelectContent>
                    </Select>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Department
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Department</DialogTitle>
                                <DialogDescription>
                                    Create a new department for your school.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="deptName">Department Name</Label>
                                    <Input id="deptName" placeholder="e.g., Mathematics, English" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="deptType">Department Type</Label>
                                    <Select>
                                        <SelectTrigger id="deptType">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="academic">Academic</SelectItem>
                                            <SelectItem value="administrative">Administrative</SelectItem>
                                            <SelectItem value="support">Support</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                    <Label htmlFor="budget">Budget Allocation</Label>
                                    <Input id="budget" type="number" placeholder="e.g., 50000" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => setIsAddDialogOpen(false)}>Create Department</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-card border-border shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Building2 className="h-4 w-4" />
                            <span className="text-xs font-medium">Total Departments</span>
                        </div>
                        <div className="text-2xl font-bold">{filteredDepartments.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Across all schools</p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Users className="h-4 w-4" />
                            <span className="text-xs font-medium">Total Staff</span>
                        </div>
                        <div className="text-2xl font-bold">{totalStaff}</div>
                        <p className="text-xs text-muted-foreground mt-1">Department members</p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="text-xs font-medium">Total Budget</span>
                        </div>
                        <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Allocated funds</p>
                    </CardContent>
                </Card>

                <Card className={cn(
                    "bg-card border-border shadow-sm",
                    Number(budgetUtilization) >= 90 ? "border-error/50 bg-error/5" :
                        Number(budgetUtilization) >= 75 ? "border-warning/50 bg-warning/5" :
                            "border-success/50 bg-success/5"
                )}>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-xs font-medium">Budget Used</span>
                        </div>
                        <div className={cn(
                            "text-2xl font-bold",
                            Number(budgetUtilization) >= 90 ? "text-error" :
                                Number(budgetUtilization) >= 75 ? "text-warning" :
                                    "text-success"
                        )}>
                            {budgetUtilization}%
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{formatCurrency(totalBudgetUsed)} spent</p>
                    </CardContent>
                </Card>
            </div>

            {/* Budget Chart */}
            {budgetData.length > 0 && (
                <Card className="bg-card border-border shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Budget Allocation by Department
                        </CardTitle>
                        <CardDescription>Budget allocated vs. used across departments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={budgetData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="name" className="text-xs" angle={-45} textAnchor="end" height={80} />
                                <YAxis className="text-xs" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "6px",
                                    }}
                                    formatter={(value) => formatCurrency(Number(value))}
                                />
                                <Legend />
                                <Bar dataKey="Allocated" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Used" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}

            {/* Department Cards Grid */}
            {filteredDepartments.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No departments found</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            {search ? "Try adjusting your search criteria" : "Get started by adding your first department"}
                        </p>
                        {!search && (
                            <Button onClick={() => setIsAddDialogOpen(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Department
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {filteredDepartments.map((dept) => {
                        const budgetUtilization = (dept.budgetUsed / dept.budgetAllocated * 100).toFixed(0)
                        return (
                            <motion.div key={dept.id} variants={item}>
                                <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all group h-full">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    <Building2 className="h-5 w-5 text-primary" />
                                                    {dept.name}
                                                </CardTitle>
                                                <CardDescription className="mt-1">
                                                    {dept.schoolName}
                                                </CardDescription>
                                            </div>
                                            <Badge
                                                className={cn(
                                                    "text-xs font-medium",
                                                    DEPT_TYPE_COLORS[dept.type]
                                                )}
                                            >
                                                {DEPT_TYPE_LABELS[dept.type]}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Department Head */}
                                            {dept.headOfDepartment ? (
                                                <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarFallback className="text-xs">
                                                            {dept.headOfDepartment.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate">
                                                            {dept.headOfDepartment.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">Department Head</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarFallback>
                                                            <GraduationCap className="h-4 w-4" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <p className="text-sm text-muted-foreground">No head assigned</p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Metrics Grid */}
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-muted-foreground">Staff</span>
                                                        <span className="text-sm font-medium">{dept.staffCount}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-muted-foreground">Students</span>
                                                        <span className="text-sm font-medium">{dept.studentCount}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Budget */}
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-muted-foreground">Budget</span>
                                                    <span className="font-medium">
                                                        {formatCurrency(dept.budgetUsed)} / {formatCurrency(dept.budgetAllocated)}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-muted rounded-full h-2">
                                                    <div
                                                        className={cn(
                                                            "h-2 rounded-full transition-all",
                                                            Number(budgetUtilization) >= 90 ? "bg-error" :
                                                                Number(budgetUtilization) >= 75 ? "bg-warning" :
                                                                    "bg-success"
                                                        )}
                                                        style={{ width: `${Math.min(Number(budgetUtilization), 100)}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground">{budgetUtilization}% utilized</p>
                                            </div>

                                            {/* Subjects (for academic departments) */}
                                            {dept.type === "academic" && dept.subjectsOffered.length > 0 && (
                                                <div className="pt-2">
                                                    <p className="text-xs text-muted-foreground mb-2">Subjects Offered</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {dept.subjectsOffered.slice(0, 3).map((subject, idx) => (
                                                            <Badge key={idx} variant="outline" className="text-xs">
                                                                {subject}
                                                            </Badge>
                                                        ))}
                                                        {dept.subjectsOffered.length > 3 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{dept.subjectsOffered.length - 3}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/dashboard/school/departments/${dept.id}`} className="flex-1">
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        <Eye className="h-3 w-3 mr-1" />
                                                        View Details
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setEditingDept(dept)}
                                                >
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-error hover:text-error"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>
            )}

            {/* Edit Dialog */}
            <Dialog open={editingDept !== null} onOpenChange={(open) => !open && setEditingDept(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Department</DialogTitle>
                        <DialogDescription>
                            Update the department information.
                        </DialogDescription>
                    </DialogHeader>
                    {editingDept && (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-deptName">Department Name</Label>
                                <Input id="edit-deptName" defaultValue={editingDept.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-budget">Budget Allocation</Label>
                                <Input id="edit-budget" type="number" defaultValue={editingDept.budgetAllocated} />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingDept(null)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setEditingDept(null)}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
