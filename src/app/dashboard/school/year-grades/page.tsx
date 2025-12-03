/**
 * EdForge EMIS - Year Grades Page
 * 
 * Comprehensive grade level management with visual insights, enrollment tracking,
 * and professional table view.
 * 
 * This is a Server Component for security and performance.
 */

export const dynamic = 'force-dynamic'

import { getCurrentUser } from "@/lib/auth";
import { AlertCircle } from "lucide-react";
import { YearGradesContent } from "./_components/year-grades-content";
import { getSchoolsAction } from "@/actions/school-actions";

export default async function SchoolYearGradesPage() {
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
		console.error("[YEAR_GRADES] Error fetching schools:", error);
	}

	// Mock year grades data - In production, this would come from API
	// Map grades to actual schools or use defaults
	const yearGrades = [
		// Kindergarten
		{
			id: "grade-001",
			name: "Kindergarten",
			gradeLevel: "K",
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Sunshine Elementary",
			currentEnrollment: 85,
			maxCapacity: 100,
			subjectsCount: 5,
			classroomsCount: 4,
			gradeRange: "K",
			category: "primary" as const,
		},
		{
			id: "grade-002",
			name: "Grade 1",
			gradeLevel: "1",
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Sunshine Elementary",
			currentEnrollment: 92,
			maxCapacity: 100,
			subjectsCount: 6,
			classroomsCount: 4,
			gradeRange: "1",
			category: "primary" as const,
		},
		{
			id: "grade-003",
			name: "Grade 2",
			gradeLevel: "2",
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Sunshine Elementary",
			currentEnrollment: 88,
			maxCapacity: 100,
			subjectsCount: 6,
			classroomsCount: 4,
			gradeRange: "2",
			category: "primary" as const,
		},
		{
			id: "grade-004",
			name: "Grade 3",
			gradeLevel: "3",
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Sunshine Elementary",
			currentEnrollment: 95,
			maxCapacity: 100,
			subjectsCount: 7,
			classroomsCount: 4,
			gradeRange: "3",
			category: "intermediate" as const,
		},
		{
			id: "grade-005",
			name: "Grade 4",
			gradeLevel: "4",
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Sunshine Elementary",
			currentEnrollment: 90,
			maxCapacity: 100,
			subjectsCount: 7,
			classroomsCount: 4,
			gradeRange: "4",
			category: "intermediate" as const,
		},
		{
			id: "grade-006",
			name: "Grade 5",
			gradeLevel: "5",
			schoolId: schools[0]?.schoolId || "school-001",
			schoolName: schools[0]?.schoolName || "Sunshine Elementary",
			currentEnrollment: 87,
			maxCapacity: 100,
			subjectsCount: 8,
			classroomsCount: 4,
			gradeRange: "5",
			category: "intermediate" as const,
		},
		// Middle School (6-8) - if second school exists
		...(schools.length > 1 ? [
			{
				id: "grade-007",
				name: "Grade 6",
				gradeLevel: "6",
				schoolId: schools[1]?.schoolId,
				schoolName: schools[1]?.schoolName,
				currentEnrollment: 120,
				maxCapacity: 150,
				subjectsCount: 9,
				classroomsCount: 5,
				gradeRange: "6",
				category: "middle" as const,
			},
			{
				id: "grade-008",
				name: "Grade 7",
				gradeLevel: "7",
				schoolId: schools[1]?.schoolId,
				schoolName: schools[1]?.schoolName,
				currentEnrollment: 125,
				maxCapacity: 150,
				subjectsCount: 9,
				classroomsCount: 5,
				gradeRange: "7",
				category: "middle" as const,
			},
			{
				id: "grade-009",
				name: "Grade 8",
				gradeLevel: "8",
				schoolId: schools[1]?.schoolId,
				schoolName: schools[1]?.schoolName,
				currentEnrollment: 118,
				maxCapacity: 150,
				subjectsCount: 10,
				classroomsCount: 5,
				gradeRange: "8",
				category: "middle" as const,
			},
		] : []),
		// High School (9-12) - if third school exists or add to second
		...(schools.length > 2 ? [
			{
				id: "grade-010",
				name: "Grade 9 (Freshman)",
				gradeLevel: "9",
				schoolId: schools[2]?.schoolId,
				schoolName: schools[2]?.schoolName,
				currentEnrollment: 180,
				maxCapacity: 200,
				subjectsCount: 12,
				classroomsCount: 8,
				gradeRange: "9",
				category: "high" as const,
			},
			{
				id: "grade-011",
				name: "Grade 10 (Sophomore)",
				gradeLevel: "10",
				schoolId: schools[2]?.schoolId,
				schoolName: schools[2]?.schoolName,
				currentEnrollment: 175,
				maxCapacity: 200,
				subjectsCount: 12,
				classroomsCount: 8,
				gradeRange: "10",
				category: "high" as const,
			},
			{
				id: "grade-012",
				name: "Grade 11 (Junior)",
				gradeLevel: "11",
				schoolId: schools[2]?.schoolId,
				schoolName: schools[2]?.schoolName,
				currentEnrollment: 170,
				maxCapacity: 200,
				subjectsCount: 13,
				classroomsCount: 8,
				gradeRange: "11",
				category: "high" as const,
			},
			{
				id: "grade-013",
				name: "Grade 12 (Senior)",
				gradeLevel: "12",
				schoolId: schools[2]?.schoolId,
				schoolName: schools[2]?.schoolName,
				currentEnrollment: 165,
				maxCapacity: 200,
				subjectsCount: 13,
				classroomsCount: 8,
				gradeRange: "12",
				category: "high" as const,
			},
		] : []),
	];

	return (
		<div className="flex flex-1 flex-col gap-6 p-6 w-full">
			<YearGradesContent grades={yearGrades} schools={schools} />
		</div>
	);
}