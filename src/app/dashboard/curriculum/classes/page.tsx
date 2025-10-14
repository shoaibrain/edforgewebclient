"use client";

/**
 * EdForge EMIS - Classroom Management Page
 * 
 * Enterprise-grade classroom listing and management interface with RBAC integration.
 * Provides comprehensive classroom overview, filtering, and management capabilities.
 */

import * as React from "react";
import { useState, useMemo } from "react";
import { useUser } from "@/contexts/user-context";
import { mockClassrooms, searchClassrooms } from "@/data/mock-classrooms";
import { 
	Classroom, 
	ClassroomStatus, 
	getClassroomStatusColor, 
	getEnrollmentPercentage,
	formatSchedule,
	hasClassroomPermission, 
	ClassroomPermission
} from "@/types/classroom";
import { UserRole, Permission } from "@/types/rbac";
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
	Eye,
	Settings,
	BarChart3,
	UserPlus,
	Archive,
	AlertCircle,
	CheckCircle,
	Pause,
	Play,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function ClassroomManagementPage() {
	const { user } = useUser();
	const [classrooms, setClassrooms] = useState<Classroom[]>(mockClassrooms);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterGrade, setFilterGrade] = useState<string>("all");
	const [filterStatus, setFilterStatus] = useState<string>("all");
	const [filterSubject, setFilterSubject] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("name");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	// Check user permissions
	const canCreateClassroom = user && hasClassroomPermission(user.role, ClassroomPermission.EDIT_CLASSROOM);
	const canManageClassrooms = user && hasClassroomPermission(user.role, ClassroomPermission.MANAGE_STUDENTS);
	const canViewAnalytics = user && hasClassroomPermission(user.role, ClassroomPermission.VIEW_ANALYTICS);

	// Filter and sort classrooms
	const filteredAndSortedClassrooms = useMemo(() => {
		let filtered = classrooms.filter((classroom) => {
			// Search filter
			const matchesSearch = searchQuery === "" || 
				classroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				classroom.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
				classroom.primaryTeacher.teacherName.toLowerCase().includes(searchQuery.toLowerCase());

			// Grade filter
			const matchesGrade = filterGrade === "all" || classroom.grade === filterGrade;

			// Status filter
			const matchesStatus = filterStatus === "all" || classroom.status === filterStatus;

			// Subject filter
			const matchesSubject = filterSubject === "all" || classroom.subject === filterSubject;

			return matchesSearch && matchesGrade && matchesStatus && matchesSubject;
		});

		// Sort classrooms
		filtered.sort((a, b) => {
			let comparison = 0;
			
			switch (sortBy) {
				case "name":
					comparison = a.name.localeCompare(b.name);
					break;
				case "code":
					comparison = a.code.localeCompare(b.code);
					break;
				case "grade":
					comparison = a.gradeLevel - b.gradeLevel;
					break;
				case "enrollment":
					comparison = a.enrolled - b.enrolled;
					break;
				case "capacity":
					comparison = a.capacity - b.capacity;
					break;
				case "status":
					comparison = a.status.localeCompare(b.status);
					break;
				default:
					comparison = 0;
			}

			return sortOrder === "asc" ? comparison : -comparison;
		});

		return filtered;
	}, [classrooms, searchQuery, filterGrade, filterStatus, filterSubject, sortBy, sortOrder]);

	// Calculate statistics
	const stats = useMemo(() => {
		const totalClassrooms = classrooms.length;
		const totalStudents = classrooms.reduce((sum, c) => sum + c.enrolled, 0);
		const totalCapacity = classrooms.reduce((sum, c) => sum + c.capacity, 0);
		const averageUtilization = totalCapacity > 0 ? Math.round((totalStudents / totalCapacity) * 100) : 0;
		const activeTeachers = new Set(classrooms.map(c => c.primaryTeacher.teacherId)).size;
		const activeClassrooms = classrooms.filter(c => c.status === ClassroomStatus.ACTIVE).length;

		return {
			totalClassrooms,
			totalStudents,
			averageUtilization,
			activeTeachers,
			activeClassrooms
		};
	}, [classrooms]);

	const handleSort = (column: string) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortBy(column);
			setSortOrder("asc");
		}
	};

	const getSortIcon = (column: string) => {
		if (sortBy !== column) return <ArrowUpDown className="h-3 w-3 opacity-50" />;
		return sortOrder === "asc" ? 
			<ArrowUpDown className="h-3 w-3 text-primary" /> : 
			<ArrowUpDown className="h-3 w-3 text-primary rotate-180" />;
	};

	const getStatusIcon = (status: ClassroomStatus) => {
		switch (status) {
			case ClassroomStatus.ACTIVE:
				return <CheckCircle className="h-4 w-4 text-green-600" />;
			case ClassroomStatus.INACTIVE:
				return <Pause className="h-4 w-4 text-gray-600" />;
			case ClassroomStatus.ARCHIVED:
				return <Archive className="h-4 w-4 text-orange-600" />;
			case ClassroomStatus.DRAFT:
				return <AlertCircle className="h-4 w-4 text-blue-600" />;
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			{/* Header Section - Simplified */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					{canCreateClassroom && (
						<Button asChild size="sm">
							<Link href="/dashboard/curriculum/classes/create">
								<Plus className="mr-2 h-4 w-4" />
								Create Classroom
							</Link>
						</Button>
					)}
				</div>
			</div>

			{/* Professional Compact Statistics Cards */}
			<div className="grid gap-2 md:grid-cols-4">
				<Card className="bg-card border-border hover:bg-muted/50 transition-colors">
					<CardContent className="p-3">
						<div className="flex items-center justify-between">
							<div className="min-w-0 flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-0.5">Total Classrooms</p>
								<p className="text-lg font-semibold text-foreground">{stats.totalClassrooms}</p>
								<p className="text-xs text-muted-foreground/70">{stats.activeClassrooms} active</p>
							</div>
							<BookOpen className="h-4 w-4 text-muted-foreground/60 flex-shrink-0" />
						</div>
					</CardContent>
				</Card>
				<Card className="bg-card border-border hover:bg-muted/50 transition-colors">
					<CardContent className="p-3">
						<div className="flex items-center justify-between">
							<div className="min-w-0 flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-0.5">Total Students</p>
								<p className="text-lg font-semibold text-foreground">{stats.totalStudents}</p>
								<p className="text-xs text-muted-foreground/70">Currently enrolled</p>
							</div>
							<Users className="h-4 w-4 text-muted-foreground/60 flex-shrink-0" />
						</div>
					</CardContent>
				</Card>
				<Card className="bg-card border-border hover:bg-muted/50 transition-colors">
					<CardContent className="p-3">
						<div className="flex items-center justify-between">
							<div className="min-w-0 flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-0.5">Avg. Capacity</p>
								<p className="text-lg font-semibold text-primary">{stats.averageUtilization}%</p>
								<p className="text-xs text-muted-foreground/70">Utilization rate</p>
							</div>
							<BarChart3 className="h-4 w-4 text-muted-foreground/60 flex-shrink-0" />
						</div>
					</CardContent>
				</Card>
				<Card className="bg-card border-border hover:bg-muted/50 transition-colors">
					<CardContent className="p-3">
						<div className="flex items-center justify-between">
							<div className="min-w-0 flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-0.5">Active Teachers</p>
								<p className="text-lg font-semibold text-foreground">{stats.activeTeachers}</p>
								<p className="text-xs text-muted-foreground/70">Teaching this year</p>
							</div>
							<Users className="h-4 w-4 text-muted-foreground/60 flex-shrink-0" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Filters & Search */}
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Filter className="h-4 w-4" />
						<span className="font-medium">Filters & Search</span>
					</div>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search classrooms by name, code, or teacher..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>
						<div className="flex gap-2">
							<Select value={filterGrade} onValueChange={setFilterGrade}>
								<SelectTrigger className="w-[140px]">
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
							<Select value={filterSubject} onValueChange={setFilterSubject}>
								<SelectTrigger className="w-[140px]">
									<SelectValue placeholder="Subject: All" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Subject: All</SelectItem>
									<SelectItem value="Mathematics">Mathematics</SelectItem>
									<SelectItem value="English">English</SelectItem>
									<SelectItem value="Science">Science</SelectItem>
									<SelectItem value="History">History</SelectItem>
									<SelectItem value="Arts">Arts</SelectItem>
									<SelectItem value="Physical Education">Physical Education</SelectItem>
								</SelectContent>
							</Select>
							<Select value={filterStatus} onValueChange={setFilterStatus}>
								<SelectTrigger className="w-[140px]">
									<SelectValue placeholder="Status: All" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">Status: All</SelectItem>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="inactive">Inactive</SelectItem>
									<SelectItem value="archived">Archived</SelectItem>
									<SelectItem value="draft">Draft</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Classroom Directory Table */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-lg">Classroom Directory</CardTitle>
							<CardDescription>
								Comprehensive list of all classrooms with enrollment and scheduling information.
							</CardDescription>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<span>{filteredAndSortedClassrooms.length} classrooms</span>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead 
										className="cursor-pointer hover:bg-muted/50"
										onClick={() => handleSort("name")}
									>
										<div className="flex items-center gap-2">
											Classroom
											{getSortIcon("name")}
										</div>
									</TableHead>
									<TableHead 
										className="cursor-pointer hover:bg-muted/50"
										onClick={() => handleSort("grade")}
									>
										<div className="flex items-center gap-2">
											Grade
											{getSortIcon("grade")}
										</div>
									</TableHead>
									<TableHead>Subject</TableHead>
									<TableHead>Teacher</TableHead>
									<TableHead 
										className="cursor-pointer hover:bg-muted/50"
										onClick={() => handleSort("enrollment")}
									>
										<div className="flex items-center gap-2">
											Enrollment
											{getSortIcon("enrollment")}
										</div>
									</TableHead>
									<TableHead>Schedule</TableHead>
									<TableHead 
										className="cursor-pointer hover:bg-muted/50"
										onClick={() => handleSort("status")}
									>
										<div className="flex items-center gap-2">
											Status
											{getSortIcon("status")}
										</div>
									</TableHead>
									<TableHead className="w-[50px]">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredAndSortedClassrooms.map((classroom) => (
									<TableRow key={classroom.id} className="hover:bg-muted/50">
										<TableCell>
											<div className="space-y-1">
												<div className="flex items-center gap-2">
													<div 
														className="h-3 w-3 rounded-full"
														style={{ backgroundColor: classroom.themeColor }}
													/>
													<Link 
														href={`/dashboard/curriculum/classes/${classroom.id}`}
														className="font-medium hover:text-primary transition-colors"
													>
														{classroom.name}
													</Link>
												</div>
												<p className="text-sm text-muted-foreground">{classroom.code}</p>
											</div>
										</TableCell>
										<TableCell>
											<Badge variant="outline" className="text-xs">
												{classroom.grade}
											</Badge>
										</TableCell>
										<TableCell>
											<span className="text-sm">{classroom.subject}</span>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Avatar className="h-6 w-6">
													<AvatarFallback className="text-xs">
														{classroom.primaryTeacher.teacherName.split(' ').map(n => n[0]).join('')}
													</AvatarFallback>
												</Avatar>
												<span className="text-sm">{classroom.primaryTeacher.teacherName}</span>
											</div>
										</TableCell>
										<TableCell>
											<div className="space-y-1">
												<div className="flex items-center gap-2">
													<span className="text-sm font-medium text-primary">
														{classroom.enrolled}/{classroom.capacity}
													</span>
													<span className="text-xs text-muted-foreground">
														({getEnrollmentPercentage(classroom.enrolled, classroom.capacity)}%)
													</span>
												</div>
												<div className="h-1.5 w-16 rounded-full bg-secondary overflow-hidden">
													<div
														className="h-full bg-primary transition-all duration-300"
														style={{
															width: `${getEnrollmentPercentage(classroom.enrolled, classroom.capacity)}%`,
														}}
													/>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<div className="space-y-1">
												<div className="flex items-center gap-1 text-sm text-muted-foreground">
													<Clock className="h-3 w-3" />
													<span>{formatSchedule(classroom.schedule)}</span>
												</div>
												<div className="text-xs text-muted-foreground">
													{classroom.room.name}
												</div>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												{getStatusIcon(classroom.status)}
												<Badge 
													variant="outline" 
													className={getClassroomStatusColor(classroom.status)}
												>
													{classroom.status}
												</Badge>
											</div>
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon" className="h-8 w-8">
														<MoreVertical className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem asChild>
														<Link href={`/dashboard/curriculum/classes/${classroom.id}`}>
															<Eye className="mr-2 h-4 w-4" />
															View Details
														</Link>
													</DropdownMenuItem>
													{canManageClassrooms && (
														<>
															<DropdownMenuItem asChild>
																<Link href={`/dashboard/curriculum/classes/${classroom.id}/edit`}>
																	<Edit className="mr-2 h-4 w-4" />
																	Edit Classroom
																</Link>
															</DropdownMenuItem>
															<DropdownMenuItem>
																<Users className="mr-2 h-4 w-4" />
																Manage Students
															</DropdownMenuItem>
														</>
													)}
													<DropdownMenuItem>
														<Calendar className="mr-2 h-4 w-4" />
														View Schedule
													</DropdownMenuItem>
													{canViewAnalytics && (
														<DropdownMenuItem>
															<BarChart3 className="mr-2 h-4 w-4" />
															View Analytics
														</DropdownMenuItem>
													)}
													{canManageClassrooms && (
														<>
															<DropdownMenuItem>
																<Copy className="mr-2 h-4 w-4" />
																Duplicate
															</DropdownMenuItem>
															<DropdownMenuSeparator />
															<DropdownMenuItem className="text-destructive">
																<Archive className="mr-2 h-4 w-4" />
																Archive
															</DropdownMenuItem>
														</>
													)}
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					
					{filteredAndSortedClassrooms.length === 0 && (
						<div className="text-center py-8">
							<BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
							<p className="text-sm text-muted-foreground">No classrooms found matching your criteria.</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
