/**
 * EdForge EMIS - Departments Page
 * 
 * Comprehensive department management with budget tracking, staff assignments,
 * and departmental analytics across schools.
 * 
 * This is a Server Component for security and performance.
 */

export const dynamic = 'force-dynamic'

import { getCurrentUser } from "@/lib/auth";
import { AlertCircle } from "lucide-react";
import { DepartmentsContent } from "./_components/departments-content";
import { getSchoolsAction } from "@/actions/school-actions";

export default async function SchoolDepartmentsPage() {
	// Server-side authentication and authorization
	const user = await getCurrentUser();

	if (!user) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-center">
					<AlertCircle className="h-12 w-12 text-error mx-auto mb-4" />
					<p className="text-muted-foreground">Authentication required</p>
				</div>
			</div>
		);
	}

	// Fetch actual tenant schools
	let schools: any[] = [];
	try {
		schools = await getSchoolsAction();
	} catch (error) {
		console.error("[DEPARTMENTS] Error fetching schools:", error);
	}

	// Mock departments data - In production, this would come from API
	const departments = [
		// Academic Departments
		{
			id: "dept-001",
			name: "Mathematics",
			type: "academic" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Dr. Robert Johnson",
				email: "robert.johnson@school.edu"
			},
			staffCount: 12,
			studentCount: 450,
			budgetAllocated: 120000,
			budgetUsed: 95000,
			subjectsOffered: ["Algebra", "Geometry", "Calculus", "Statistics"]
		},
		{
			id: "dept-002",
			name: "English & Language Arts",
			type: "academic" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Ms. Sarah Williams",
				email: "sarah.williams@school.edu"
			},
			staffCount: 10,
			studentCount: 500,
			budgetAllocated: 95000,
			budgetUsed: 78000,
			subjectsOffered: ["Literature", "Composition", "Creative Writing", "Grammar"]
		},
		{
			id: "dept-003",
			name: "Science",
			type: "academic" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Dr. Michael Chen",
				email: "michael.chen@school.edu"
			},
			staffCount: 15,
			studentCount: 480,
			budgetAllocated: 150000,
			budgetUsed: 125000,
			subjectsOffered: ["Biology", "Chemistry", "Physics", "Earth Science"]
		},
		{
			id: "dept-004",
			name: "Social Studies",
			type: "academic" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Mr. James Martinez",
				email: "james.martinez@school.edu"
			},
			staffCount: 8,
			studentCount: 420,
			budgetAllocated: 75000,
			budgetUsed: 65000,
			subjectsOffered: ["History", "Geography", "Economics", "Civics"]
		},
		{
			id: "dept-005",
			name: "World Languages",
			type: "academic" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Ms. Maria Garcia",
				email: "maria.garcia@school.edu"
			},
			staffCount: 6,
			studentCount: 300,
			budgetAllocated: 65000,
			budgetUsed: 52000,
			subjectsOffered: ["Spanish", "French", "Mandarin", "German"]
		},
		{
			id: "dept-006",
			name: "Arts",
			type: "academic" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Mr. David Thompson",
				email: "david.thompson@school.edu"
			},
			staffCount: 5,
			studentCount: 350,
			budgetAllocated: 80000,
			budgetUsed: 70000,
			subjectsOffered: ["Visual Arts", "Music", "Drama", "Dance"]
		},
		{
			id: "dept-007",
			name: "Physical Education",
			type: "academic" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Coach Jennifer Lee",
				email: "jennifer.lee@school.edu"
			},
			staffCount: 4,
			studentCount: 500,
			budgetAllocated: 60000,
			budgetUsed: 48000,
			subjectsOffered: ["Physical Education", "Health", "Sports"]
		},
		// Administrative Departments
		{
			id: "dept-008",
			name: "Admissions & Enrollment",
			type: "administrative" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Ms. Patricia Anderson",
				email: "patricia.anderson@school.edu"
			},
			staffCount: 3,
			studentCount: 0,
			budgetAllocated: 45000,
			budgetUsed: 38000,
			subjectsOffered: []
		},
		{
			id: "dept-009",
			name: "Student Services",
			type: "administrative" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Dr. Linda Brown",
				email: "linda.brown@school.edu"
			},
			staffCount: 6,
			studentCount: 500,
			budgetAllocated: 85000,
			budgetUsed: 72000,
			subjectsOffered: []
		},
		{
			id: "dept-010",
			name: "Counseling",
			type: "administrative" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Ms. Emily Davis",
				email: "emily.davis@school.edu"
			},
			staffCount: 4,
			studentCount: 500,
			budgetAllocated: 70000,
			budgetUsed: 65000,
			subjectsOffered: []
		},
		// Support Departments
		{
			id: "dept-011",
			name: "Information Technology",
			type: "support" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Mr. Thomas Wilson",
				email: "thomas.wilson@school.edu"
			},
			staffCount: 5,
			studentCount: 0,
			budgetAllocated: 180000,
			budgetUsed: 150000,
			subjectsOffered: []
		},
		{
			id: "dept-012",
			name: "Library & Media Services",
			type: "support" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Ms. Rebecca Moore",
				email: "rebecca.moore@school.edu"
			},
			staffCount: 3,
			studentCount: 500,
			budgetAllocated: 55000,
			budgetUsed: 45000,
			subjectsOffered: []
		},
		{
			id: "dept-013",
			name: "Facilities Management",
			type: "support" as const,
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Landfill School",
			headOfDepartment: {
				name: "Mr. John Taylor",
				email: "john.taylor@school.edu"
			},
			staffCount: 8,
			studentCount: 0,
			budgetAllocated: 120000,
			budgetUsed: 95000,
			subjectsOffered: []
		},
		// Add departments for second school if exists
		...(schools.length > 1 ? [
			{
				id: "dept-014",
				name: "Mathematics",
				type: "academic" as const,
				schoolId: schools[1]?.schoolId,
				schoolName: schools[1]?.schoolName,
				headOfDepartment: {
					name: "Dr. Amanda Clark",
					email: "amanda.clark@school.edu"
				},
				staffCount: 8,
				studentCount: 280,
				budgetAllocated: 90000,
				budgetUsed: 72000,
				subjectsOffered: ["Algebra", "Geometry", "Pre-Calculus"]
			},
		] : []),
	];

	return (
		<div className="flex flex-1 flex-col gap-6 p-6 w-full">
			<DepartmentsContent departments={departments} schools={schools} />
		</div>
	);
}