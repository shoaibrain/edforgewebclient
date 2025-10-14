"use client";

/**
 * EdForge EMIS - Students List Page
 * 
 * Comprehensive students listing with search, filtering, and sorting capabilities.
 * Displays student information in an elegant table format with RBAC considerations.
 */

import * as React from "react";
import Link from "next/link";
import { useUser } from "@/contexts/user-context";
import { getAllStudents, filterStudents } from "@/data/mock-students";
import type { StudentProfile, StudentFilters } from "@/types/student";
import {
	Users,
	Search,
	Filter,
	ArrowUpDown,
	Eye,
	MoreHorizontal,
	GraduationCap,
	Calendar,
	Award,
	Mail,
	Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentsPage() {
	const { user } = useUser();
	const [students, setStudents] = React.useState<StudentProfile[]>(getAllStudents());
	const [searchTerm, setSearchTerm] = React.useState("");
	const [selectedGrade, setSelectedGrade] = React.useState<string>("");
	const [selectedStatus, setSelectedStatus] = React.useState<string>("");
	const [sortBy, setSortBy] = React.useState<"name" | "gpa" | "grade" | "enrollmentDate">("name");
	const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

	// Filter and sort students
	React.useEffect(() => {
		let filteredStudents = filterStudents({
			grade: selectedGrade || undefined,
			status: selectedStatus || undefined,
			search: searchTerm || undefined,
		});

		// Sort students
		filteredStudents.sort((a, b) => {
			let aValue: string | number;
			let bValue: string | number;

			switch (sortBy) {
				case "name":
					aValue = `${a.firstName} ${a.lastName}`;
					bValue = `${b.firstName} ${b.lastName}`;
					break;
				case "gpa":
					aValue = a.overallGPA;
					bValue = b.overallGPA;
					break;
				case "grade":
					aValue = a.grade;
					bValue = b.grade;
					break;
				case "enrollmentDate":
					aValue = new Date(a.enrollmentDate).getTime();
					bValue = new Date(b.enrollmentDate).getTime();
					break;
				default:
					aValue = `${a.firstName} ${a.lastName}`;
					bValue = `${b.firstName} ${b.lastName}`;
			}

			if (sortOrder === "asc") {
				return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
			} else {
				return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
			}
		});

		setStudents(filteredStudents);
	}, [searchTerm, selectedGrade, selectedStatus, sortBy, sortOrder]);

	const handleSort = (column: typeof sortBy) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortBy(column);
			setSortOrder("asc");
		}
	};

	const getGradeColor = (grade: string) => {
		if (grade.includes("9th")) return "text-blue-600";
		if (grade.includes("10th")) return "text-green-600";
		if (grade.includes("11th")) return "text-orange-600";
		if (grade.includes("12th")) return "text-purple-600";
		return "text-muted-foreground";
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-success text-success-foreground";
			case "graduated":
				return "bg-secondary text-secondary-foreground";
			case "transferred":
				return "bg-warning text-warning-foreground";
			case "suspended":
				return "bg-error text-error-foreground";
			default:
				return "bg-muted text-muted-foreground";
		}
	};

	const getGPAColor = (gpa: number) => {
		if (gpa >= 3.7) return "text-success font-semibold";
		if (gpa >= 3.0) return "text-primary font-semibold";
		if (gpa >= 2.0) return "text-warning font-semibold";
		return "text-error font-semibold";
	};

	// Get unique grades for filter
	const grades = Array.from(new Set(getAllStudents().map((s) => s.grade))).sort();

	// Get unique statuses for filter
	const statuses = Array.from(new Set(getAllStudents().map((s) => s.status))).sort();

	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Students</h1>
					<p className="text-muted-foreground">
						Manage and view student information, academic records, and performance metrics.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Users className="h-5 w-5 text-muted-foreground" />
					<span className="text-sm text-muted-foreground">
						{students.length} student{students.length !== 1 ? "s" : ""}
					</span>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Students</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{getAllStudents().length}</div>
						<p className="text-xs text-muted-foreground">
							+12% from last semester
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Students</CardTitle>
						<GraduationCap className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{getAllStudents().filter((s) => s.status === "active").length}
						</div>
						<p className="text-xs text-muted-foreground">
							Currently enrolled
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Average GPA</CardTitle>
						<Award className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{(
								getAllStudents()
									.filter((s) => s.status === "active")
									.reduce((sum, s) => sum + s.overallGPA, 0) /
								getAllStudents().filter((s) => s.status === "active").length
							).toFixed(2)}
						</div>
						<p className="text-xs text-muted-foreground">
							School average
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Graduation Rate</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">94%</div>
						<p className="text-xs text-muted-foreground">
							Class of 2024
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Filters and Search */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Filter className="h-5 w-5" />
						Filters & Search
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4 md:flex-row">
						<div className="flex-1">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search students by name or ID..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
						</div>
						<div className="flex gap-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm">
										Grade: {selectedGrade || "All"}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>Filter by Grade</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => setSelectedGrade("")}>
										All Grades
									</DropdownMenuItem>
									{grades.map((grade) => (
										<DropdownMenuItem
											key={grade}
											onClick={() => setSelectedGrade(grade)}
										>
											{grade}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm">
										Status: {selectedStatus || "All"}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => setSelectedStatus("")}>
										All Statuses
									</DropdownMenuItem>
									{statuses.map((status) => (
										<DropdownMenuItem
											key={status}
											onClick={() => setSelectedStatus(status)}
										>
											{status.charAt(0).toUpperCase() + status.slice(1)}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Students Table */}
			<Card>
				<CardHeader>
					<CardTitle>Student Directory</CardTitle>
					<CardDescription>
						Comprehensive list of all students with academic and contact information.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => handleSort("name")}
											className="h-auto p-0 font-semibold"
										>
											Student
											<ArrowUpDown className="ml-2 h-4 w-4" />
										</Button>
									</TableHead>
									<TableHead>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => handleSort("grade")}
											className="h-auto p-0 font-semibold"
										>
											Grade
											<ArrowUpDown className="ml-2 h-4 w-4" />
										</Button>
									</TableHead>
									<TableHead>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => handleSort("gpa")}
											className="h-auto p-0 font-semibold"
										>
											GPA
											<ArrowUpDown className="ml-2 h-4 w-4" />
										</Button>
									</TableHead>
									<TableHead>Contact</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => handleSort("enrollmentDate")}
											className="h-auto p-0 font-semibold"
										>
											Enrolled
											<ArrowUpDown className="ml-2 h-4 w-4" />
										</Button>
									</TableHead>
									<TableHead className="w-[50px]">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{students.map((student) => (
									<TableRow key={student.studentId}>
										<TableCell>
											<div className="space-y-1">
												<div className="font-medium">
													{student.firstName} {student.lastName}
												</div>
												<div className="text-sm text-muted-foreground font-mono">
													{student.studentId}
												</div>
											</div>
										</TableCell>
										<TableCell>
											<span className={`font-medium ${getGradeColor(student.grade)}`}>
												{student.grade}
											</span>
											{student.section && (
												<span className="text-muted-foreground"> • {student.section}</span>
											)}
										</TableCell>
										<TableCell>
											<span className={getGPAColor(student.overallGPA)}>
												{student.overallGPA.toFixed(2)}
											</span>
										</TableCell>
										<TableCell>
											<div className="space-y-1">
												<div className="flex items-center gap-2 text-sm">
													<Mail className="h-3 w-3 text-muted-foreground" />
													<span className="text-muted-foreground">
														{student.contacts[0]?.email || "No email"}
													</span>
												</div>
												<div className="flex items-center gap-2 text-sm">
													<Phone className="h-3 w-3 text-muted-foreground" />
													<span className="text-muted-foreground">
														{student.contacts[0]?.phone || "No phone"}
													</span>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<Badge className={getStatusColor(student.status)}>
												{student.status.charAt(0).toUpperCase() + student.status.slice(1)}
											</Badge>
										</TableCell>
										<TableCell>
											<div className="text-sm">
												{new Date(student.enrollmentDate).toLocaleDateString()}
											</div>
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="sm">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem asChild>
														<Link
															href={`/dashboard/students/${student.studentId}`}
															className="flex items-center gap-2"
														>
															<Eye className="h-4 w-4" />
															View Profile
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem>
														<Mail className="h-4 w-4 mr-2" />
														Send Message
													</DropdownMenuItem>
													<DropdownMenuItem>
														<Calendar className="h-4 w-4 mr-2" />
														Schedule Meeting
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					{students.length === 0 && (
						<div className="text-center py-8">
							<Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
							<h3 className="text-lg font-semibold mb-2">No students found</h3>
							<p className="text-muted-foreground">
								Try adjusting your search criteria or filters.
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
