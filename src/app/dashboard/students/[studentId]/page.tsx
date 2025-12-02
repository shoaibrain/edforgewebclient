/**
 * EdForge EMIS - Student Profile Page
 * 
 * Comprehensive student profile with radar chart, academic details,
 * contact information, and performance analytics.
 * 
 * This is a Server Component for security and performance.
 */

import { notFound } from "next/navigation";
import { getCurrentUser, hasPermission } from "@/lib/auth";
import { getStudentById } from "@/data/mock-students";
import { AlertCircle } from "lucide-react";
import { StudentProfileContent } from "./_components/student-profile-content";

interface StudentProfilePageProps {
	params: Promise<{
		studentId: string;
	}>;
}

export default async function StudentProfilePage({ params }: StudentProfilePageProps) {
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

	const { studentId } = await params;
	const student = getStudentById(studentId);

	if (!student) {
		notFound();
	}

	// Check permissions for viewing student details
	const canViewStudentDetails = await hasPermission(user, "VIEW_STUDENT_DETAILS", studentId);
	if (!canViewStudentDetails) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-center">
					<AlertCircle className="h-12 w-12 text-error mx-auto mb-4" />
					<p className="text-muted-foreground">You don't have permission to view this student</p>
				</div>
			</div>
		);
	}

	// Calculate average performance
	const averageScore = Math.round(
		student.performanceData.reduce((sum, item) => sum + item.score, 0) / student.performanceData.length,
	);

	// Get performance level badge
	const getPerformanceLevel = (score: number) => {
		if (score >= 90) return { label: "Excellent", variant: "default" as const };
		if (score >= 80) return { label: "Good", variant: "secondary" as const };
		if (score >= 70) return { label: "Satisfactory", variant: "outline" as const };
		return { label: "Needs Improvement", variant: "destructive" as const };
	};

	const performanceLevel = getPerformanceLevel(averageScore);

	// Get attendance percentage
	const getAttendancePercentage = (attendance: any) => {
		return Math.round((attendance.present / attendance.total) * 100);
	};

	// Comprehensive analytics data for student
	const academicGrowthData = {
		academicGrowthTrends: [
			{ period: "2023-09", gpa: 3.45, averageGrade: 82.5, improvement: 5.2, trend: "up" as const },
			{ period: "2023-10", gpa: 3.48, averageGrade: 83.2, improvement: 6.1, trend: "up" as const },
			{ period: "2023-11", gpa: 3.52, averageGrade: 84.1, improvement: 7.2, trend: "up" as const },
			{ period: "2023-12", gpa: 3.55, averageGrade: 84.8, improvement: 7.8, trend: "up" as const },
			{ period: "2024-01", gpa: 3.58, averageGrade: 85.2, improvement: 8.1, trend: "up" as const },
			{ period: "2024-02", gpa: 3.61, averageGrade: 85.8, improvement: 8.5, trend: "up" as const },
			{ period: "2024-03", gpa: 3.63, averageGrade: 86.3, improvement: 9.0, trend: "up" as const },
			{ period: "2024-04", gpa: 3.65, averageGrade: 86.9, improvement: 9.3, trend: "up" as const },
			{ period: "2024-05", gpa: 3.67, averageGrade: 87.5, improvement: 9.6, trend: "up" as const },
			{ period: "2024-06", gpa: 3.68, averageGrade: 88.1, improvement: 9.8, trend: "up" as const },
			{ period: "2024-07", gpa: 3.69, averageGrade: 88.5, improvement: 10.0, trend: "up" as const },
			{ period: "2024-08", gpa: 3.72, averageGrade: 89.2, improvement: 10.2, trend: "up" as const },
		],
		gradeTrendsBySubject: student.performanceData.map(pd => ({
			subject: pd.category,
			trends: [
				{ period: "2023-09", grade: pd.score - 5 },
				{ period: "2023-12", grade: pd.score - 2 },
				{ period: "2024-03", grade: pd.score },
				{ period: "2024-08", grade: pd.score + (pd.trend === "up" ? 2 : pd.trend === "down" ? -2 : 0) },
			],
		})),
		classPerformanceBreakdown: student.classes.map(cls => ({
			classId: cls.id,
			className: cls.name,
			subject: cls.name.split(" ")[0],
			averageGrade: getAttendancePercentage(cls.attendance) > 90 ? 88.5 : 82.3,
			gradeTrend: [82.1, 84.3, 85.2, 88.5],
			attendanceRate: getAttendancePercentage(cls.attendance),
			studentGrowth: 8.5,
			currentGrade: cls.grade || "B+",
		})),
		attendanceCorrelation: 0.89,
		interventionHistory: [
			{
				date: "2024-06-15",
				type: "Academic Support",
				effectiveness: 85,
				description: "One-on-one tutoring sessions for World History",
			},
			{
				date: "2024-03-20",
				type: "Study Skills Workshop",
				effectiveness: 78,
				description: "Time management and study techniques",
			},
		],
	};

	const comprehensivePerformanceData = {
		overallPerformanceScore: averageScore,
		performanceBreakdown: {
			academics: averageScore,
			behavior: 93,
			attendance: Math.round(student.classes.reduce((sum, cls) => sum + getAttendancePercentage(cls.attendance), 0) / student.classes.length),
			engagement: 88,
		},
		keyMetrics: {
			gpa: student.overallGPA,
			attendance: Math.round(student.classes.reduce((sum, cls) => sum + getAttendancePercentage(cls.attendance), 0) / student.classes.length),
			engagement: 88,
			growthRate: 10.2,
		},
		benchmarking: {
			gradeAverage: 3.45,
			schoolAverage: 3.40,
			districtAverage: 3.35,
			percentile: 85,
		},
		predictiveIndicators: {
			projectedGPA: 3.78,
			graduationReadiness: 92,
			collegeReadiness: 88,
			timeframe: "6 months",
			confidence: "high",
			onTrack: true,
		},
		actionableInsights: {
			strengths: [
				{
					area: "Technology & Computer Science",
					evidence: "95% score, highest in class",
					impact: "Strong analytical and problem-solving skills",
				},
				{
					area: "Science Performance",
					evidence: "92% score with consistent improvement",
					impact: "Excellent understanding of scientific concepts",
				},
			],
			improvementAreas: [
				{
					area: "Social Studies",
					current: 78,
					target: 85,
					recommendation: "Increase reading time and practice essay writing",
					expectedImpact: "+7% improvement in 3 months",
				},
			],
			recommendations: [
				{
					title: "Enhanced Social Studies Support",
					priority: "Medium",
					rationale: "Current score below grade average, needs targeted intervention",
					expectedImpact: "Improve to 85% within one semester",
				},
			],
		},
	};

	const behavioralAnalyticsData = {
		attendanceTrends: [
			{ period: "2023-09", present: 45, absent: 2, tardy: 1, attendanceRate: 94.2 },
			{ period: "2023-10", present: 46, absent: 1, tardy: 1, attendanceRate: 95.8 },
			{ period: "2023-11", present: 47, absent: 1, tardy: 0, attendanceRate: 97.9 },
			{ period: "2023-12", present: 45, absent: 2, tardy: 1, attendanceRate: 94.2 },
			{ period: "2024-01", present: 46, absent: 1, tardy: 1, attendanceRate: 95.8 },
			{ period: "2024-02", present: 47, absent: 1, tardy: 0, attendanceRate: 97.9 },
			{ period: "2024-03", present: 48, absent: 0, tardy: 0, attendanceRate: 100 },
			{ period: "2024-04", present: 47, absent: 1, tardy: 0, attendanceRate: 97.9 },
			{ period: "2024-05", present: 48, absent: 0, tardy: 0, attendanceRate: 100 },
			{ period: "2024-06", present: 47, absent: 1, tardy: 0, attendanceRate: 97.9 },
			{ period: "2024-07", present: 48, absent: 0, tardy: 0, attendanceRate: 100 },
			{ period: "2024-08", present: 48, absent: 0, tardy: 0, attendanceRate: 100 },
		],
		behavioralTrends: [
			{ period: "2023-09", positiveBehaviors: 12, incidents: 0, improvement: 5 },
			{ period: "2023-10", positiveBehaviors: 14, incidents: 0, improvement: 7 },
			{ period: "2023-11", positiveBehaviors: 15, incidents: 0, improvement: 8 },
			{ period: "2023-12", positiveBehaviors: 16, incidents: 0, improvement: 9 },
			{ period: "2024-01", positiveBehaviors: 17, incidents: 0, improvement: 10 },
			{ period: "2024-02", positiveBehaviors: 18, incidents: 0, improvement: 11 },
			{ period: "2024-03", positiveBehaviors: 19, incidents: 0, improvement: 12 },
			{ period: "2024-04", positiveBehaviors: 20, incidents: 0, improvement: 13 },
			{ period: "2024-05", positiveBehaviors: 21, incidents: 0, improvement: 14 },
			{ period: "2024-06", positiveBehaviors: 22, incidents: 0, improvement: 15 },
			{ period: "2024-07", positiveBehaviors: 23, incidents: 0, improvement: 16 },
			{ period: "2024-08", positiveBehaviors: 24, incidents: 0, improvement: 17 },
		],
		riskAssessment: {
			riskLevel: "low" as const,
			factors: [
				{
					factor: "Academic Performance",
					severity: "low" as const,
					description: "GPA above grade average, consistent improvement",
				},
				{
					factor: "Attendance",
					severity: "low" as const,
					description: "Excellent attendance record, minimal absences",
				},
			],
			overallRisk: 15,
		},
		interventionHistory: [
			{
				date: "2024-06-15",
				type: "Academic Support",
				effectiveness: 85,
				description: "One-on-one tutoring sessions for World History",
				outcome: "Improved from 75% to 78% in Social Studies",
			},
			{
				date: "2024-03-20",
				type: "Study Skills Workshop",
				effectiveness: 78,
				description: "Time management and study techniques",
				outcome: "Better organization and time management",
			},
		],
		engagementMetrics: {
			participation: 88,
			collaboration: 91,
			leadership: 84,
			overall: 88,
		},
	};

	const subjectPerformanceData = student.performanceData.map(pd => ({
		subject: pd.category,
		currentScore: pd.score,
		averageScore: pd.score + (pd.trend === "up" ? -5 : pd.trend === "down" ? 5 : 0),
		trend: (pd.trend || "stable") as "up" | "down" | "stable",
	}));

	return (
		<StudentProfileContent
			student={student}
			averageScore={averageScore}
			performanceLevel={performanceLevel}
			academicGrowthData={academicGrowthData}
			comprehensivePerformanceData={comprehensivePerformanceData}
			behavioralAnalyticsData={behavioralAnalyticsData}
			subjectPerformanceData={subjectPerformanceData}
		/>
	);
}
