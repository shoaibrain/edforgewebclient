"use client";

/**
 * EdForge EMIS - Student Profile Page
 * 
 * Comprehensive student profile with radar chart, academic details,
 * contact information, and performance analytics.
 */

import * as React from "react";
import { notFound } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import { getStudentById } from "@/data/mock-students";
import type { StudentProfile } from "@/types/student";
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
	Legend,
	Tooltip,
} from "recharts";
import {
	ArrowLeft,
	Mail,
	Phone,
	MapPin,
	Calendar,
	GraduationCap,
	Award,
	Users,
	BookOpen,
	Activity,
	TrendingUp,
	TrendingDown,
	Minus,
	Edit,
	Download,
	Share,
	MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentProfilePageProps {
	params: Promise<{
		studentId: string;
	}>;
}

export default async function StudentProfilePage({ params }: StudentProfilePageProps) {
	const { user } = useUser();
	const { studentId } = await params;
	const student = getStudentById(studentId);

	if (!student) {
		notFound();
	}

	// Calculate average performance
	const averageScore = Math.round(
		student.performanceData.reduce((sum, item) => sum + item.score, 0) / student.performanceData.length,
	);

	// Get trend icon
	const getTrendIcon = (trend?: "up" | "down" | "stable") => {
		switch (trend) {
			case "up":
				return <TrendingUp className="h-3 w-3 text-success" />;
			case "down":
				return <TrendingDown className="h-3 w-3 text-error" />;
			default:
				return <Minus className="h-3 w-3 text-muted-foreground" />;
		}
	};

	// Get performance level badge
	const getPerformanceLevel = (score: number) => {
		if (score >= 90) return { label: "Excellent", variant: "default" as const };
		if (score >= 80) return { label: "Good", variant: "secondary" as const };
		if (score >= 70) return { label: "Satisfactory", variant: "outline" as const };
		return { label: "Needs Improvement", variant: "destructive" as const };
	};

	const performanceLevel = getPerformanceLevel(averageScore);

	// Custom tooltip for radar chart
	const CustomTooltip = ({ active, payload }: any) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl backdrop-blur-sm">
					<p className="font-semibold text-sm text-slate-100 mb-1">{data.category}</p>
					<p className="text-xs text-slate-300 mb-2">{data.description}</p>
					<div className="flex items-center gap-2">
						<p className="text-lg font-bold text-blue-400">{data.score}%</p>
						{getTrendIcon(data.trend)}
					</div>
				</div>
			);
		}
		return null;
	};

	// Get attendance percentage
	const getAttendancePercentage = (attendance: any) => {
		return Math.round((attendance.present / attendance.total) * 100);
	};

	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-4">
						{/* Student Avatar */}
						<div className="relative">
							<Avatar className="h-16 w-16 ring-4 ring-primary/20">
								<AvatarImage 
									src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.firstName}-${student.lastName}`} 
									alt={`${student.firstName} ${student.lastName}`}
								/>
								<AvatarFallback className="text-lg font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
									{student.firstName[0]}{student.lastName[0]}
								</AvatarFallback>
							</Avatar>
							<div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-success border-2 border-background"></div>
						</div>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">
								{student.firstName} {student.lastName}
							</h1>
							<p className="text-muted-foreground">
								Student ID: {student.studentId} • {student.grade} • {student.academicYear}
							</p>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Badge className={`${performanceLevel.variant} text-sm px-3 py-1`}>
						{performanceLevel.label}
					</Badge>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Edit className="h-4 w-4 mr-2" />
								Edit Profile
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Download className="h-4 w-4 mr-2" />
								Export Report
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Share className="h-4 w-4 mr-2" />
								Share Profile
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* Professional Compact Student Overview Cards */}
			<div className="grid gap-2 md:grid-cols-4">
				<Card className="bg-card border-border hover:bg-muted/50 transition-colors">
					<CardContent className="p-3">
						<div className="flex items-center justify-between">
							<div className="min-w-0 flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-0.5">Overall GPA</p>
								<p className="text-lg font-semibold text-primary">
									{student.overallGPA.toFixed(2)}
								</p>
								<p className="text-xs text-muted-foreground/70">{student.grade} Student</p>
							</div>
							<GraduationCap className="h-4 w-4 text-muted-foreground/60 flex-shrink-0" />
						</div>
					</CardContent>
				</Card>
				<Card className="bg-card border-border hover:bg-muted/50 transition-colors">
					<CardContent className="p-3">
						<div className="flex items-center justify-between">
							<div className="min-w-0 flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-0.5">Average Score</p>
								<p className="text-lg font-semibold text-foreground">{averageScore}%</p>
								<p className="text-xs text-muted-foreground/70">{student.performanceData.length} categories</p>
							</div>
							<Activity className="h-4 w-4 text-muted-foreground/60 flex-shrink-0" />
						</div>
					</CardContent>
				</Card>
				<Card className="bg-card border-border hover:bg-muted/50 transition-colors">
					<CardContent className="p-3">
						<div className="flex items-center justify-between">
							<div className="min-w-0 flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-0.5">Classes Enrolled</p>
								<p className="text-lg font-semibold text-foreground">{student.classes.length}</p>
								<p className="text-xs text-muted-foreground/70">{student.classes.reduce((sum, cls) => sum + cls.credits, 0)} credits</p>
							</div>
							<BookOpen className="h-4 w-4 text-muted-foreground/60 flex-shrink-0" />
						</div>
					</CardContent>
				</Card>
				<Card className="bg-card border-border hover:bg-muted/50 transition-colors">
					<CardContent className="p-3">
						<div className="flex items-center justify-between">
							<div className="min-w-0 flex-1">
								<p className="text-xs font-medium text-muted-foreground mb-0.5">Attendance Rate</p>
								<p className="text-lg font-semibold text-foreground">
									{Math.round(
										student.classes.reduce((sum, cls) => sum + getAttendancePercentage(cls.attendance), 0) /
											student.classes.length,
									)}%
								</p>
								<p className="text-xs text-muted-foreground/70">Overall attendance</p>
							</div>
							<Calendar className="h-4 w-4 text-muted-foreground/60 flex-shrink-0" />
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				{/* Enhanced Performance Analysis with Integrated Overview */}
				<div className="md:col-span-2">
					<Card className="bg-card border-border shadow-lg">
						<CardHeader className="pb-4">
							<CardTitle className="flex items-center gap-3 text-2xl">
								<div className="h-2 w-2 rounded-full bg-primary"></div>
								Performance Analysis
							</CardTitle>
							<CardDescription className="text-base">
								Comprehensive assessment across academic and behavioral categories
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								{/* Radar Chart - Takes 2/3 of the space */}
								<div className="lg:col-span-2">
									<ResponsiveContainer width="100%" height={400}>
										<RadarChart data={student.performanceData}>
											<PolarGrid 
												stroke="#64748b" 
												strokeWidth={1}
												strokeOpacity={0.4}
											/>
											<PolarAngleAxis
												dataKey="category"
												tick={{ 
													fill: "#f8fafc", 
													fontSize: 11, 
													fontWeight: 600 
												}}
												tickLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
											/>
											<PolarRadiusAxis
												angle={90}
												domain={[0, 100]}
												tick={{ 
													fill: "#cbd5e1", 
													fontSize: 10,
													fontWeight: 500
												}}
												tickLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
												tickCount={6}
											/>
											<Radar
												name="Performance Score"
												dataKey="score"
												stroke="#3b82f6"
												fill="#3b82f6"
												fillOpacity={0.3}
												strokeWidth={3}
												strokeOpacity={1}
											/>
											<Tooltip content={<CustomTooltip />} />
											<Legend
												wrapperStyle={{
													paddingTop: "20px",
													fontSize: "12px",
													color: "#f8fafc",
													fontWeight: 600
												}}
											/>
										</RadarChart>
									</ResponsiveContainer>
								</div>

								{/* Integrated Performance Overview - Takes 1/3 of the space */}
								<div className="lg:col-span-1 space-y-4">
									{/* Top Performers */}
									<div className="bg-gradient-to-br from-success/5 to-success/10 border border-success/20 rounded-lg p-4">
										<h4 className="text-sm font-semibold text-success flex items-center gap-2 mb-3">
											<div className="h-2 w-2 rounded-full bg-success"></div>
											<TrendingUp className="h-4 w-4" />
											Top Performers
										</h4>
										<div className="space-y-2">
											{student.performanceData
												.sort((a, b) => b.score - a.score)
												.slice(0, 4)
												.map((item, index) => (
													<div
														key={index}
														className="flex items-center justify-between p-2 rounded-md bg-success/10 border border-success/20"
													>
														<div className="flex items-center gap-2">
															<div className="h-1.5 w-1.5 rounded-full bg-success"></div>
															<span className="text-xs font-medium truncate">{item.category}</span>
														</div>
														<span className="text-xs font-bold text-success">{item.score}%</span>
													</div>
												))}
										</div>
									</div>

									{/* Focus Areas */}
									<div className="bg-gradient-to-br from-warning/5 to-warning/10 border border-warning/20 rounded-lg p-4">
										<h4 className="text-sm font-semibold text-warning flex items-center gap-2 mb-3">
											<div className="h-2 w-2 rounded-full bg-warning"></div>
											<TrendingDown className="h-4 w-4" />
											Focus Areas
										</h4>
										<div className="space-y-2">
											{student.performanceData
												.sort((a, b) => a.score - b.score)
												.slice(0, 4)
												.map((item, index) => (
													<div
														key={index}
														className="flex items-center justify-between p-2 rounded-md bg-warning/10 border border-warning/20"
													>
														<div className="flex items-center gap-2">
															<div className="h-1.5 w-1.5 rounded-full bg-warning"></div>
															<span className="text-xs font-medium truncate">{item.category}</span>
														</div>
														<span className="text-xs font-bold text-warning">{item.score}%</span>
													</div>
												))}
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Academic Classes - Now in the right column */}
				<div className="space-y-4">
					<Card className="bg-card border-border shadow-lg">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-xl">
								<div className="h-2 w-2 rounded-full bg-secondary"></div>
								Academic Classes
							</CardTitle>
							<CardDescription>
								Current enrollment and performance in each subject
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{student.classes.map((cls) => (
									<div
										key={cls.id}
										className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-200 hover:shadow-md"
									>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<h4 className="font-semibold text-sm">{cls.name}</h4>
												<Badge variant="outline" className="text-xs">
													{cls.credits} credit{cls.credits !== 1 ? "s" : ""}
												</Badge>
											</div>
											<p className="text-xs text-muted-foreground">
												{cls.teacher} • {cls.room}
											</p>
											<p className="text-xs text-muted-foreground">{cls.schedule}</p>
										</div>
										<div className="text-right space-y-2">
											{cls.grade && (
												<Badge 
													variant={
														cls.grade.startsWith("A") ? "default" : 
														cls.grade.startsWith("B") ? "secondary" : 
														cls.grade.startsWith("C") ? "outline" : "destructive"
													}
													className="text-sm font-semibold"
												>
													{cls.grade}
												</Badge>
											)}
											<div className="flex items-center gap-1">
												<Calendar className="h-3 w-3 text-muted-foreground" />
												<span className="text-xs text-muted-foreground">
													{getAttendancePercentage(cls.attendance)}%
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Contact & Medical Information - Compact Side-by-Side Cards */}
			<div className="grid gap-6 md:grid-cols-2">
				{/* Contact Information Card */}
				<Card className="bg-card border-border shadow-lg">
					<CardHeader className="pb-4">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Users className="h-5 w-5 text-primary" />
							Contact Information
						</CardTitle>
						<CardDescription>
							Primary contacts and address details
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Student Address */}
						<div className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-muted/30">
							<MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
							<div>
								<p className="text-sm font-semibold text-foreground">Address</p>
								<p className="text-sm text-muted-foreground mt-1">
									{student.address.street}<br />
									{student.address.city}, {student.address.state} {student.address.zipCode}
								</p>
							</div>
						</div>

						{/* Primary Contacts */}
						{student.contacts.map((contact, index) => (
							<div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-muted/30">
								<Users className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
								<div className="space-y-2 flex-1">
									<div>
										<p className="text-sm font-semibold text-foreground">{contact.name}</p>
										<p className="text-sm text-muted-foreground">{contact.relationship}</p>
									</div>
									<div className="space-y-1">
										<div className="flex items-center gap-2">
											<Phone className="h-3 w-3 text-muted-foreground" />
											<span className="text-xs text-muted-foreground">{contact.phone}</span>
										</div>
										{contact.email && (
											<div className="flex items-center gap-2">
												<Mail className="h-3 w-3 text-muted-foreground" />
												<span className="text-xs text-muted-foreground">{contact.email}</span>
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Medical Information Card */}
				<Card className="bg-card border-border shadow-lg">
					<CardHeader className="pb-4">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Activity className="h-5 w-5 text-primary" />
							Medical Information
						</CardTitle>
						<CardDescription>
							Health details and emergency contacts
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Blood Type */}
						{student.medical.bloodType && (
							<div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/30">
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 rounded-full bg-primary"></div>
									<span className="text-sm font-medium text-foreground">Blood Type</span>
								</div>
								<Badge variant="outline" className="text-xs font-semibold">
									{student.medical.bloodType}
								</Badge>
							</div>
						)}

						{/* Allergies */}
						{student.medical.allergies && student.medical.allergies.length > 0 && (
							<div className="p-3 rounded-lg border border-border/50 bg-muted/30">
								<div className="flex items-center gap-2 mb-2">
									<div className="h-2 w-2 rounded-full bg-warning"></div>
									<span className="text-sm font-medium text-foreground">Allergies</span>
								</div>
								<div className="flex flex-wrap gap-1">
									{student.medical.allergies.map((allergy, idx) => (
										<Badge key={idx} variant="destructive" className="text-xs">
											{allergy}
										</Badge>
									))}
								</div>
							</div>
						)}

						{/* Medical Conditions */}
						{student.medical.conditions && student.medical.conditions.length > 0 && (
							<div className="p-3 rounded-lg border border-border/50 bg-muted/30">
								<div className="flex items-center gap-2 mb-2">
									<div className="h-2 w-2 rounded-full bg-secondary"></div>
									<span className="text-sm font-medium text-foreground">Medical Conditions</span>
								</div>
								<div className="flex flex-wrap gap-1">
									{student.medical.conditions.map((condition, idx) => (
										<Badge key={idx} variant="secondary" className="text-xs">
											{condition}
										</Badge>
									))}
								</div>
							</div>
						)}

						{/* Emergency Contact */}
						<div className="p-3 rounded-lg border border-border/50 bg-muted/30">
							<div className="flex items-center gap-2 mb-2">
								<div className="h-2 w-2 rounded-full bg-error"></div>
								<span className="text-sm font-medium text-foreground">Emergency Contact</span>
							</div>
							<p className="text-sm text-muted-foreground">{student.medical.emergencyContact}</p>
						</div>

						{/* Insurance Provider */}
						{student.medical.insuranceProvider && (
							<div className="p-3 rounded-lg border border-border/50 bg-muted/30">
								<div className="flex items-center gap-2 mb-2">
									<div className="h-2 w-2 rounded-full bg-success"></div>
									<span className="text-sm font-medium text-foreground">Insurance Provider</span>
								</div>
								<p className="text-sm text-muted-foreground">{student.medical.insuranceProvider}</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Extracurricular Activities & Awards - Compact Design */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card className="bg-card border-border hover:bg-muted/50 transition-colors">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Activity className="h-5 w-5 text-primary" />
							Extracurricular Activities
						</CardTitle>
						<CardDescription className="text-sm">
							Student involvement beyond academics
						</CardDescription>
					</CardHeader>
					<CardContent className="pt-0">
						{student.extracurriculars && student.extracurriculars.length > 0 ? (
							<div className="flex flex-wrap gap-2">
								{student.extracurriculars.map((activity, index) => (
									<Badge key={index} variant="secondary" className="text-xs">
										{activity}
									</Badge>
								))}
							</div>
						) : (
							<div className="text-center py-4">
								<Activity className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
								<p className="text-xs text-muted-foreground">No activities recorded</p>
							</div>
						)}
					</CardContent>
				</Card>

				<Card className="bg-card border-border hover:bg-muted/50 transition-colors">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Award className="h-5 w-5 text-primary" />
							Awards & Achievements
						</CardTitle>
						<CardDescription className="text-sm">
							Recognition and accomplishments
						</CardDescription>
					</CardHeader>
					<CardContent className="pt-0">
						{student.awards && student.awards.length > 0 ? (
							<div className="space-y-2">
								{student.awards.map((award, index) => (
									<div key={index} className="flex items-center gap-2 p-2 rounded-md bg-muted/30 border border-border/50">
										<Award className="h-3 w-3 text-muted-foreground flex-shrink-0" />
										<span className="text-xs font-medium text-foreground">{award}</span>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-4">
								<Award className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
								<p className="text-xs text-muted-foreground">No awards recorded</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
