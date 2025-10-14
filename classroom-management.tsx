"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Users,
  Calendar,
  Clock,
  BookOpen,
  Edit,
  Trash2,
  Copy,
  ArrowUpDown,
  ImageIcon,
  Upload,
} from "lucide-react"

interface Classroom {
  id: string
  name: string
  code: string
  grade: string
  gradeLevel: number
  subject: string
  teacher: string
  capacity: number
  enrolled: number
  schedule: string
  room: string
  academicYear: string
  status: "active" | "inactive" | "archived"
}

const mockClassrooms: Classroom[] = [
  {
    id: "CLS-2024-001",
    name: "Advanced Mathematics A",
    code: "MATH-11A",
    grade: "11th Grade",
    gradeLevel: 11,
    subject: "Mathematics",
    teacher: "Dr. Sarah Chen",
    capacity: 30,
    enrolled: 28,
    schedule: "Mon, Wed, Fri 9:00 AM",
    room: "Room 301",
    academicYear: "2024-2025",
    status: "active",
  },
  {
    id: "CLS-2024-002",
    name: "English Literature B",
    code: "ENG-10B",
    grade: "10th Grade",
    gradeLevel: 10,
    subject: "English",
    teacher: "Prof. Michael Torres",
    capacity: 25,
    enrolled: 25,
    schedule: "Tue, Thu 10:30 AM",
    room: "Room 205",
    academicYear: "2024-2025",
    status: "active",
  },
  {
    id: "CLS-2024-003",
    name: "Physics Honors",
    code: "PHY-11H",
    grade: "11th Grade",
    gradeLevel: 11,
    subject: "Science",
    teacher: "Dr. Emily Rodriguez",
    capacity: 24,
    enrolled: 22,
    schedule: "Mon, Wed 1:00 PM",
    room: "Lab 102",
    academicYear: "2024-2025",
    status: "active",
  },
  {
    id: "CLS-2024-004",
    name: "World History",
    code: "HIST-9A",
    grade: "9th Grade",
    gradeLevel: 9,
    subject: "History",
    teacher: "Mr. James Wilson",
    capacity: 28,
    enrolled: 26,
    schedule: "Tue, Thu, Fri 11:00 AM",
    room: "Room 108",
    academicYear: "2024-2025",
    status: "active",
  },
  {
    id: "CLS-2024-005",
    name: "Biology Advanced",
    code: "BIO-10A",
    grade: "10th Grade",
    gradeLevel: 10,
    subject: "Science",
    teacher: "Dr. Lisa Anderson",
    capacity: 26,
    enrolled: 24,
    schedule: "Mon, Wed, Fri 2:00 PM",
    room: "Lab 201",
    academicYear: "2024-2025",
    status: "active",
  },
]

const gradeColors: Record<number, string> = {
  9: "text-[var(--color-grade-blue)]",
  10: "text-[var(--color-grade-green)]",
  11: "text-[var(--color-grade-orange)]",
  12: "text-[var(--color-grade-purple)]",
}

const themeColors = [
  {
    name: "Ocean Blue",
    value: "oklch(0.55 0.15 240)",
    gradient: "linear-gradient(135deg, oklch(0.45 0.15 240) 0%, oklch(0.65 0.15 220) 100%)",
  },
  {
    name: "Forest Green",
    value: "oklch(0.55 0.15 150)",
    gradient: "linear-gradient(135deg, oklch(0.45 0.15 150) 0%, oklch(0.65 0.15 170) 100%)",
  },
  {
    name: "Sunset Orange",
    value: "oklch(0.65 0.15 40)",
    gradient: "linear-gradient(135deg, oklch(0.55 0.15 30) 0%, oklch(0.70 0.15 50) 100%)",
  },
  {
    name: "Royal Purple",
    value: "oklch(0.55 0.15 290)",
    gradient: "linear-gradient(135deg, oklch(0.45 0.15 280) 0%, oklch(0.65 0.15 300) 100%)",
  },
  {
    name: "Crimson Red",
    value: "oklch(0.55 0.15 20)",
    gradient: "linear-gradient(135deg, oklch(0.50 0.15 10) 0%, oklch(0.65 0.15 30) 100%)",
  },
  {
    name: "Teal Wave",
    value: "oklch(0.55 0.15 190)",
    gradient: "linear-gradient(135deg, oklch(0.45 0.15 180) 0%, oklch(0.65 0.15 200) 100%)",
  },
]

export function ClassroomManagement() {
  const [classrooms, setClassrooms] = useState<Classroom[]>(mockClassrooms)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterGrade, setFilterGrade] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [selectedTheme, setSelectedTheme] = useState(themeColors[0])
  const [classDescription, setClassDescription] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    grade: "",
    subject: "",
    teacher: "",
    capacity: "",
    schedule: "",
    room: "",
    academicYear: "2024-2025",
  })

  const filteredClassrooms = classrooms.filter((classroom) => {
    const matchesSearch =
      classroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classroom.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classroom.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGrade = filterGrade === "all" || classroom.grade === filterGrade
    const matchesStatus = filterStatus === "all" || classroom.status === filterStatus
    return matchesSearch && matchesGrade && matchesStatus
  })

  const handleCreateClassroom = () => {
    // In a real app, this would make an API call
    const newClassroom: Classroom = {
      id: `CLS-2024-${String(classrooms.length + 1).padStart(3, "0")}`,
      name: formData.name,
      code: formData.code,
      grade: formData.grade,
      gradeLevel: Number.parseInt(formData.grade.split("th")[0]),
      subject: formData.subject,
      teacher: formData.teacher,
      capacity: Number.parseInt(formData.capacity),
      enrolled: 0,
      schedule: formData.schedule,
      room: formData.room,
      academicYear: formData.academicYear,
      status: "active",
    }
    setClassrooms([...classrooms, newClassroom])
    setIsCreateDialogOpen(false)
    setFormData({
      name: "",
      code: "",
      grade: "",
      subject: "",
      teacher: "",
      capacity: "",
      schedule: "",
      room: "",
      academicYear: "2024-2025",
    })
    setClassDescription("")
    setSelectedTheme(themeColors[0])
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">Classroom Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create, manage, and organize classrooms across all grade levels and subjects.
            </p>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Classroom
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Classrooms</p>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-foreground">{classrooms.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">Active this semester</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Students</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-foreground">
              {classrooms.reduce((acc, c) => acc + c.enrolled, 0)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Currently enrolled</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Avg. Capacity</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-[var(--color-info-cyan)]">
              {Math.round(
                (classrooms.reduce((acc, c) => acc + c.enrolled, 0) /
                  classrooms.reduce((acc, c) => acc + c.capacity, 0)) *
                  100,
              )}
              %
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Utilization rate</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Active Teachers</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-3xl font-semibold text-foreground">
              {new Set(classrooms.map((c) => c.teacher)).size}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Teaching this year</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters & Search</span>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search classrooms by name, code, or teacher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterGrade} onValueChange={setFilterGrade}>
                <SelectTrigger className="w-[180px] bg-input border-border">
                  <SelectValue placeholder="Grade: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Grade: All</SelectItem>
                  <SelectItem value="9th Grade">9th Grade</SelectItem>
                  <SelectItem value="10th Grade">10th Grade</SelectItem>
                  <SelectItem value="11th Grade">11th Grade</SelectItem>
                  <SelectItem value="12th Grade">12th Grade</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px] bg-input border-border">
                  <SelectValue placeholder="Status: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Status: All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Classroom Directory Table */}
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border p-4">
            <h2 className="text-lg font-semibold text-foreground">Classroom Directory</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Comprehensive list of all classrooms with enrollment and scheduling information.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="p-4 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Classroom
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Grade
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Subject</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Teacher</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Enrollment
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Schedule</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClassrooms.map((classroom) => (
                  <tr
                    key={classroom.id}
                    className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-foreground">{classroom.name}</p>
                        <p className="text-sm text-muted-foreground">{classroom.code}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`font-medium ${gradeColors[classroom.gradeLevel]}`}>{classroom.grade}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-foreground">{classroom.subject}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-foreground">{classroom.teacher}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[var(--color-info-cyan)]">
                          {classroom.enrolled}/{classroom.capacity}
                        </span>
                        <div className="h-1.5 w-16 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-[var(--color-status-active)]"
                            style={{
                              width: `${(classroom.enrolled / classroom.capacity) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{classroom.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <span>{classroom.room}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={classroom.status === "active" ? "default" : "secondary"}
                        className={
                          classroom.status === "active"
                            ? "bg-[var(--color-status-active)] text-white hover:bg-[var(--color-status-active)]/90"
                            : ""
                        }
                      >
                        {classroom.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Classroom
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            Manage Students
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            View Schedule
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Classroom Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-5xl bg-card border-border max-h-[90vh] overflow-y-auto">
          {/* Banner Section - Google Classroom Style */}
          <div className="relative -m-6 mb-6">
            {/* Banner Preview */}
            <div className="relative h-48 rounded-t-lg overflow-hidden" style={{ background: selectedTheme.gradient }}>
              {/* Decorative Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Classroom Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-2xl font-semibold text-white">{formData.name || "Classroom Title"}</h2>
                <p className="text-sm text-white/80 mt-1">
                  {formData.code || "CLASS-CODE"} • {formData.grade || "Grade Level"}
                </p>
              </div>
            </div>

            {/* Customization Controls */}
            <div className="bg-card border-b border-border p-4 space-y-4">
              <div>
                <Label className="text-sm font-medium text-foreground mb-3 block">Customize Appearance</Label>

                {/* Theme Color Selection */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Select theme color</p>
                  <div className="flex gap-2">
                    {themeColors.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => setSelectedTheme(theme)}
                        className="group relative"
                        title={theme.name}
                      >
                        <div
                          className="w-12 h-12 rounded-full transition-all duration-200 hover:scale-110"
                          style={{ background: theme.gradient }}
                        />
                        {selectedTheme.name === theme.name && (
                          <div className="absolute inset-0 rounded-full border-3 border-white shadow-lg" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Banner Option */}
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    <ImageIcon className="mr-2 h-3 w-3" />
                    Select Photo
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    <Upload className="mr-2 h-3 w-3" />
                    Upload Photo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-6 pb-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Classroom Details</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Set up your classroom with all necessary information and settings.
              </p>
            </div>

            {/* Basic Information - Two Column Layout */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2">Basic Information</h4>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Classroom Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Advanced Mathematics A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-input border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">This will be the main title of your classroom</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-foreground">
                    Class Code <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="code"
                    placeholder="e.g., MATH-11A"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="bg-input border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Unique identifier for this classroom</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-foreground">
                    Grade Level <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9th Grade">9th Grade</SelectItem>
                      <SelectItem value="10th Grade">10th Grade</SelectItem>
                      <SelectItem value="11th Grade">11th Grade</SelectItem>
                      <SelectItem value="12th Grade">12th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-foreground">
                    Subject <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select subject area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                      <SelectItem value="Physical Education">Physical Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">
                  Class Introduction
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide a brief introduction or syllabus overview for this classroom. Describe what students will learn, course objectives, and any important information..."
                  value={classDescription}
                  onChange={(e) => setClassDescription(e.target.value)}
                  className="bg-input border-border text-foreground min-h-[100px] resize-none"
                />
                <p className="text-xs text-muted-foreground">This will be visible to students and parents</p>
              </div>
            </div>

            {/* Teacher & Capacity */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2">Teacher & Capacity</h4>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="teacher" className="text-foreground">
                    Primary Teacher <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.teacher}
                    onValueChange={(value) => setFormData({ ...formData, teacher: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select primary teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Sarah Chen">Dr. Sarah Chen</SelectItem>
                      <SelectItem value="Prof. Michael Torres">Prof. Michael Torres</SelectItem>
                      <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</SelectItem>
                      <SelectItem value="Mr. James Wilson">Mr. James Wilson</SelectItem>
                      <SelectItem value="Dr. Lisa Anderson">Dr. Lisa Anderson</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Main instructor for this classroom</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity" className="text-foreground">
                    Maximum Capacity <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="e.g., 30"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="bg-input border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Maximum number of students allowed</p>
                </div>
              </div>
            </div>

            {/* Schedule & Location */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2">Schedule & Location</h4>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="schedule" className="text-foreground">
                    Class Schedule <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="schedule"
                    placeholder="e.g., Mon, Wed, Fri 9:00 AM"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    className="bg-input border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Meeting days and times</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room" className="text-foreground">
                    Room Assignment <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="room"
                    placeholder="e.g., Room 301"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="bg-input border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Physical classroom location</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="academicYear" className="text-foreground">
                    Academic Year
                  </Label>
                  <Select
                    value={formData.academicYear}
                    onValueChange={(value) => setFormData({ ...formData, academicYear: value })}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2025-2026">2025-2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section" className="text-foreground">
                    Section
                  </Label>
                  <Input
                    id="section"
                    placeholder="e.g., Section A"
                    className="bg-input border-border text-foreground"
                  />
                  <p className="text-xs text-muted-foreground">Optional: For multiple sections of same course</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 pb-6 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-border">
              Cancel
            </Button>
            <Button onClick={handleCreateClassroom} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Classroom
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
