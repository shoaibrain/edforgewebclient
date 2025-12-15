"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Building2,
    Plus,
    Users,
    DollarSign,
    MoreHorizontal,
    ArrowUpDown,
    Search,
    Filter,
    Download,
    Eye,
    Edit,
    Trash2,
} from "lucide-react"
import Link from "next/link"

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
    const [sortConfig, setSortConfig] = useState<{ key: keyof Department | 'utilization'; direction: 'asc' | 'desc' } | null>(null)

    // Filter departments
    const filteredDepartments = useMemo(() => {
        let filtered = departments.filter(dept => {
            const matchesSchool = selectedSchool === "all" || dept.schoolId === selectedSchool
            const matchesType = selectedType === "all" || dept.type === selectedType
            const matchesSearch = dept.name.toLowerCase().includes(search.toLowerCase()) ||
                dept.headOfDepartment?.name.toLowerCase().includes(search.toLowerCase())
            return matchesSchool && matchesType && matchesSearch
        })

        if (sortConfig) {
            filtered.sort((a, b) => {
                let aValue: any = a[sortConfig.key as keyof Department]
                let bValue: any = b[sortConfig.key as keyof Department]

                if (sortConfig.key === 'utilization') {
                    aValue = a.budgetUsed / a.budgetAllocated
                    bValue = b.budgetUsed / b.budgetAllocated
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1
                }
                return 0
            })
        }

        return filtered
    }, [departments, selectedSchool, selectedType, search, sortConfig])

    const handleSort = (key: keyof Department | 'utilization') => {
        let direction: 'asc' | 'desc' = 'asc'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    // Calculate statistics
    const totalStaff = filteredDepartments.reduce((sum, d) => sum + d.staffCount, 0)
    const totalBudget = filteredDepartments.reduce((sum, d) => sum + d.budgetAllocated, 0)
    const totalBudgetUsed = filteredDepartments.reduce((sum, d) => sum + d.budgetUsed, 0)
    const budgetUtilization = totalBudget > 0 ? ((totalBudgetUsed / totalBudget) * 100).toFixed(1) : "0"

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
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 shadow-sm">
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

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-card border-border shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Building2 className="h-4 w-4" />
                            <span className="text-xs font-medium">Total Departments</span>
                        </div>
                        <div className="text-2xl font-bold">{filteredDepartments.length}</div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Users className="h-4 w-4" />
                            <span className="text-xs font-medium">Total Staff</span>
                        </div>
                        <div className="text-2xl font-bold">{totalStaff}</div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="text-xs font-medium">Total Budget</span>
                        </div>
                        <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
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
                            <DollarSign className="h-4 w-4" />
                            <span className="text-xs font-medium">Budget Utilization</span>
                        </div>
                        <div className={cn(
                            "text-2xl font-bold",
                            Number(budgetUtilization) >= 90 ? "text-error" :
                                Number(budgetUtilization) >= 75 ? "text-warning" :
                                    "text-success"
                        )}>
                            {budgetUtilization}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border border-border shadow-sm">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search departments..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
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
                    <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Data Table */}
            <Card className="border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="w-[250px]">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent font-semibold" onClick={() => handleSort('name')}>
                                        Department Name
                                        <ArrowUpDown className="ml-2 h-3 w-3" />
                                    </Button>
                                </TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Head of Dept.</TableHead>
                                <TableHead className="text-center">Staff</TableHead>
                                <TableHead className="text-center">Students</TableHead>
                                <TableHead className="text-right">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent font-semibold" onClick={() => handleSort('budgetAllocated')}>
                                        Budget
                                        <ArrowUpDown className="ml-2 h-3 w-3" />
                                    </Button>
                                </TableHead>
                                <TableHead className="text-right">Utilization</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {filteredDepartments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                            No departments found matching your criteria.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredDepartments.map((dept, index) => {
                                        const utilization = (dept.budgetUsed / dept.budgetAllocated * 100)
                                        return (
                                            <motion.tr
                                                key={dept.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                                className="group hover:bg-muted/30 transition-colors border-b border-border last:border-0"
                                            >
                                                <TableCell className="font-medium">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-foreground">{dept.name}</span>
                                                        <span className="text-xs text-muted-foreground">{dept.schoolName}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={cn(
                                                            "text-xs font-medium border",
                                                            DEPT_TYPE_COLORS[dept.type]
                                                        )}
                                                        variant="outline"
                                                    >
                                                        {DEPT_TYPE_LABELS[dept.type]}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {dept.headOfDepartment ? (
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-6 w-6">
                                                                <AvatarFallback className="text-[10px]">
                                                                    {dept.headOfDepartment.name.split(' ').map(n => n[0]).join('')}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-medium">{dept.headOfDepartment.name}</span>
                                                                <span className="text-[10px] text-muted-foreground">{dept.headOfDepartment.email}</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground italic">Unassigned</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="secondary" className="font-normal">
                                                        {dept.staffCount}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="text-sm text-muted-foreground">{dept.studentCount > 0 ? dept.studentCount : '-'}</span>
                                                </TableCell>
                                                <TableCell className="text-right font-medium tabular-nums">
                                                    {formatCurrency(dept.budgetAllocated)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex flex-col items-end gap-1">
                                                        <span className={cn(
                                                            "text-xs font-bold",
                                                            utilization >= 90 ? "text-error" :
                                                                utilization >= 75 ? "text-warning" :
                                                                    "text-success"
                                                        )}>
                                                            {utilization.toFixed(0)}%
                                                        </span>
                                                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                                            <div
                                                                className={cn(
                                                                    "h-full rounded-full",
                                                                    utilization >= 90 ? "bg-error" :
                                                                        utilization >= 75 ? "bg-warning" :
                                                                            "bg-success"
                                                                )}
                                                                style={{ width: `${Math.min(utilization, 100)}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/dashboard/school/departments/${dept.id}`}>
                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                    View Details
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => setEditingDept(dept)}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit Department
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-error focus:text-error">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete Department
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </motion.tr>
                                        )
                                    })
                                )}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </Card>

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
