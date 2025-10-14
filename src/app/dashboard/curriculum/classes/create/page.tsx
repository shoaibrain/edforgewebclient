"use client";

/**
 * EdForge EMIS - Create Classroom Page
 * 
 * Modern classroom creation interface inspired by Google Classroom.
 * Provides comprehensive classroom setup with theme customization.
 */

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import { 
	Classroom, 
	ClassroomStatus, 
	DayOfWeek, 
	SessionType, 
	RoomType,
	TeacherRole,
	ClassroomPermission,
	hasClassroomPermission
} from "@/types/classroom";
import { mockClassrooms } from "@/data/mock-classrooms";
import {
	Plus,
	ImageIcon,
	Upload,
	ArrowLeft,
	Save,
	Eye,
	EyeOff,
	Calendar,
	Clock,
	MapPin,
	Users,
	Settings,
	Bell,
	BookOpen,
	GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Dialog components not needed for this page - using regular page layout
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Switch
} from "@/components/ui/switch";

const themeColors = [
	{
		name: "Ocean Blue",
		value: "#3B82F6",
		gradient: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
	},
	{
		name: "Forest Green",
		value: "#10B981",
		gradient: "linear-gradient(135deg, #047857 0%, #10B981 100%)",
	},
	{
		name: "Sunset Orange",
		value: "#F59E0B",
		gradient: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
	},
	{
		name: "Royal Purple",
		value: "#8B5CF6",
		gradient: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
	},
	{
		name: "Crimson Red",
		value: "#EF4444",
		gradient: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
	},
	{
		name: "Teal Wave",
		value: "#14B8A6",
		gradient: "linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)",
	},
];

export default function CreateClassroomPage() {
	const { user } = useUser();
	const router = useRouter();
	
	const [isCreating, setIsCreating] = useState(false);
	const [selectedTheme, setSelectedTheme] = useState(themeColors[0]);
	const [classDescription, setClassDescription] = useState("");
	const [showPreview, setShowPreview] = useState(false);

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
		semester: "Fall",
	});

	// Check if user can create classrooms
	const canCreateClassroom = user && hasClassroomPermission(user.role, ClassroomPermission.EDIT_CLASSROOM);

	if (!canCreateClassroom) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center p-6">
				<div className="text-center">
					<BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
					<h2 className="text-xl font-semibold mb-2">Access Denied</h2>
					<p className="text-muted-foreground mb-4">You don't have permission to create classrooms.</p>
					<Button asChild>
						<Link href="/dashboard/curriculum/classes">Back to Classes</Link>
					</Button>
				</div>
			</div>
		);
	}

	const handleCreateClassroom = async () => {
		setIsCreating(true);
		
		try {
			// In a real app, this would make an API call
			const newClassroom: Classroom = {
				id: `CLS-2024-${String(mockClassrooms.length + 1).padStart(3, "0")}`,
				name: formData.name,
				code: formData.code,
				description: classDescription,
				subject: formData.subject,
				grade: formData.grade,
				gradeLevel: Number.parseInt(formData.grade.split("th")[0]),
				academicYear: formData.academicYear,
				semester: formData.semester,
				capacity: Number.parseInt(formData.capacity),
				enrolled: 0,
				primaryTeacher: {
					id: "TCH-001",
					teacherId: user?.id || "TCH-001",
					teacherName: user?.name || "Current User",
					teacherEmail: user?.email || "user@example.com",
					role: TeacherRole.PRIMARY,
					assignedAt: new Date().toISOString(),
					isActive: true
				},
				schedule: {
					days: [DayOfWeek.MONDAY, DayOfWeek.WEDNESDAY, DayOfWeek.FRIDAY],
					startTime: "09:00",
					endTime: "10:30",
					timezone: "America/New_York",
					sessionType: SessionType.REGULAR
				},
				room: {
					id: "RM-001",
					name: formData.room || "Room 101",
					building: "Main Building",
					floor: 1,
					capacity: Number.parseInt(formData.capacity) + 5,
					type: RoomType.CLASSROOM,
					equipment: ["Smart Board", "Projector", "Whiteboard"]
				},
				status: ClassroomStatus.ACTIVE,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				createdBy: user?.id || "USER-001",
				tenantId: user?.tenantId || "TENANT-001",
				themeColor: selectedTheme.value,
				settings: {
					allowStudentEnrollment: true,
					requireApprovalForEnrollment: false,
					allowLateEnrollment: true,
					allowGuestAccess: false,
					enableDiscussions: true,
					enableAnnouncements: true,
					enableGradebook: true,
					enableAttendance: true,
					enableMessaging: true,
					enableFileSharing: true,
					enableVideoConferencing: true,
					enableParentAccess: true,
					notifications: {
						emailNotifications: true,
						pushNotifications: true,
						announcementAlerts: true,
						assignmentReminders: true,
						gradeUpdates: true,
						attendanceAlerts: true
					}
				}
			};

			// Simulate API call delay
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Redirect to the new classroom details page
			router.push(`/dashboard/curriculum/classes/${newClassroom.id}`);
		} catch (error) {
			console.error("Error creating classroom:", error);
		} finally {
			setIsCreating(false);
		}
	};

	const isFormValid = formData.name && formData.code && formData.grade && formData.subject && formData.capacity;

	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			{/* Simplified Header - Only Navigation and Actions */}
			<div className="flex items-center justify-between">
				{/* <Button variant="ghost" size="sm" asChild>
					<Link href="/dashboard/curriculum/classes" className="flex items-center gap-2">
						<ArrowLeft className="h-4 w-4" />
						Back to Classes
					</Link>
				</Button> */}
				<Button
					variant="outline"
					onClick={() => setShowPreview(!showPreview)}
				>
					{showPreview ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
					{showPreview ? "Hide Preview" : "Preview"}
				</Button>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				{/* Main Form */}
				<div className="lg:col-span-2 space-y-6">
					{/* Banner Preview */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<ImageIcon className="h-5 w-5" />
								Classroom Preview
							</CardTitle>
							<CardDescription>
								Customize the appearance of your classroom banner
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="relative h-48 rounded-lg overflow-hidden mb-4" style={{ background: selectedTheme.gradient }}>
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
									<h2 className="text-2xl font-semibold text-white">
										{formData.name || "Classroom Title"}
									</h2>
									<p className="text-sm text-white/80 mt-1">
										{formData.code || "CLASS-CODE"} • {formData.grade || "Grade Level"}
									</p>
								</div>
							</div>

							{/* Theme Color Selection */}
							<div className="space-y-3">
								<Label className="text-sm font-medium">Theme Color</Label>
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
							<div className="flex gap-2 mt-4">
								<Button variant="outline" size="sm" className="text-xs">
									<ImageIcon className="mr-2 h-3 w-3" />
									Select Photo
								</Button>
								<Button variant="outline" size="sm" className="text-xs">
									<Upload className="mr-2 h-3 w-3" />
									Upload Photo
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* Basic Information */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<BookOpen className="h-5 w-5" />
								Basic Information
							</CardTitle>
							<CardDescription>
								Set up your classroom with all necessary information
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="name">
										Classroom Name <span className="text-destructive">*</span>
									</Label>
									<Input
										id="name"
										placeholder="e.g., Advanced Mathematics A"
										value={formData.name}
										onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="code">
										Class Code <span className="text-destructive">*</span>
									</Label>
									<Input
										id="code"
										placeholder="e.g., MATH-11A"
										value={formData.code}
										onChange={(e) => setFormData({ ...formData, code: e.target.value })}
									/>
								</div>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="grade">
										Grade Level <span className="text-destructive">*</span>
									</Label>
									<Select value={formData.grade} onValueChange={(value: string) => setFormData({ ...formData, grade: value })}>
										<SelectTrigger>
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
									<Label htmlFor="subject">
										Subject <span className="text-destructive">*</span>
									</Label>
									<Select value={formData.subject} onValueChange={(value: string) => setFormData({ ...formData, subject: value })}>
										<SelectTrigger>
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
								<Label htmlFor="description">Class Introduction</Label>
								<Textarea
									id="description"
									placeholder="Provide a brief introduction or syllabus overview for this classroom..."
									value={classDescription}
									onChange={(e) => setClassDescription(e.target.value)}
									className="min-h-[100px] resize-none"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Schedule & Location */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Calendar className="h-5 w-5" />
								Schedule & Location
							</CardTitle>
							<CardDescription>
								Set up the classroom schedule and physical location
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="capacity">
										Maximum Capacity <span className="text-destructive">*</span>
									</Label>
									<Input
										id="capacity"
										type="number"
										placeholder="e.g., 30"
										value={formData.capacity}
										onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="room">Room Assignment</Label>
									<Input
										id="room"
										placeholder="e.g., Room 301"
										value={formData.room}
										onChange={(e) => setFormData({ ...formData, room: e.target.value })}
									/>
								</div>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="academicYear">Academic Year</Label>
									<Select value={formData.academicYear} onValueChange={(value: string) => setFormData({ ...formData, academicYear: value })}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="2024-2025">2024-2025</SelectItem>
											<SelectItem value="2025-2026">2025-2026</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="semester">Semester</Label>
									<Select value={formData.semester} onValueChange={(value: string) => setFormData({ ...formData, semester: value })}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Fall">Fall</SelectItem>
											<SelectItem value="Spring">Spring</SelectItem>
											<SelectItem value="Summer">Summer</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Classroom Settings */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Settings className="h-5 w-5" />
								Classroom Settings
							</CardTitle>
							<CardDescription>
								Configure classroom behavior and permissions
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label className="text-sm font-medium">Student Enrollment</Label>
										<p className="text-xs text-muted-foreground">Allow students to join automatically</p>
									</div>
									<Switch defaultChecked />
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label className="text-sm font-medium">Gradebook</Label>
										<p className="text-xs text-muted-foreground">Enable grade tracking</p>
									</div>
									<Switch defaultChecked />
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label className="text-sm font-medium">Discussions</Label>
										<p className="text-xs text-muted-foreground">Allow student discussions</p>
									</div>
									<Switch defaultChecked />
								</div>
								<div className="flex items-center justify-between">
									<div className="space-y-0.5">
										<Label className="text-sm font-medium">Parent Access</Label>
										<p className="text-xs text-muted-foreground">Allow parent monitoring</p>
									</div>
									<Switch defaultChecked />
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Quick Actions */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Bell className="h-5 w-5" />
								Notifications
							</CardTitle>
							<CardDescription>
								Set up notification preferences
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex items-center justify-between">
								<Label className="text-sm">Email Notifications</Label>
								<Switch defaultChecked />
							</div>
							<div className="flex items-center justify-between">
								<Label className="text-sm">Assignment Reminders</Label>
								<Switch defaultChecked />
							</div>
							<div className="flex items-center justify-between">
								<Label className="text-sm">Grade Updates</Label>
								<Switch defaultChecked />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Actions */}
			<div className="flex items-center justify-end gap-4 pt-6 border-t">
				<Button variant="outline" asChild>
					<Link href="/dashboard/curriculum/classes">Cancel</Link>
				</Button>
				<Button 
					onClick={handleCreateClassroom}
					disabled={!isFormValid || isCreating}
				>
					{isCreating ? (
						<>
							<div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
							Creating...
						</>
					) : (
						<>
							<Save className="mr-2 h-4 w-4" />
							Create Classroom
						</>
					)}
				</Button>
			</div>
		</div>
	);
}
