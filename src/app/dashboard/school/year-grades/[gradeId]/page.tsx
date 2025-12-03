/**
 * EdForge EMIS - Grade Details Page
 * 
 * Comprehensive grade-level analytics with student/teacher data, ratios,
 * academic insights, and administrative charts for data-driven decisions.
 * 
 * This is a Server Component for security and performance.
 */

export const dynamic = 'force-dynamic'

import { getCurrentUser } from "@/lib/auth";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { GradeDetailsContent } from "./_components/grade-details-content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface GradeDetailsPageProps {
    params: Promise<{
        gradeId: string;
    }>;
}

export default async function GradeDetailsPage({ params }: GradeDetailsPageProps) {
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

    const { gradeId } = await params;

    // In production, fetch grade data from API
    // For now, using mock data
    const gradeData = {
        id: gradeId,
        name: "Grade 1",
        gradeLevel: "1",
        schoolName: "landfill School",
        schoolId: "school-001",
        category: "primary" as const,
        currentEnrollment: 92,
        maxCapacity: 100,

        // Teacher data
        teachers: [
            { id: "t1", name: "Sarah Johnson", subject: "Mathematics", email: "sarah.j@school.edu", students: 23 },
            { id: "t2", name: "Michael Chen", subject: "English", email: "michael.c@school.edu", students: 24 },
            { id: "t3", name: "Emily Davis", subject: "Science", email: "emily.d@school.edu", students: 22 },
            { id: "t4", name: "Robert Wilson", subject: "Social Studies", email: "robert.w@school.edu", students: 23 },
        ],

        // Student performance data
        academicPerformance: {
            averageGrade: 85.2,
            passingRate: 94,
            attendanceRate: 96.5,
            subjectPerformance: [
                { subject: "Mathematics", average: 87, passing: 95 },
                { subject: "English", average: 86, passing: 96 },
                { subject: "Science", average: 84, passing: 92 },
                { subject: "Social Studies", average: 83, passing: 90 },
                { subject: "Physical Education", average: 90, passing: 100 },
                { subject: "Arts", average: 88, passing: 98 },
            ],
        },

        // Enrollment trend data
        enrollmentTrend: [
            { month: "Sep", enrollment: 88 },
            { month: "Oct", enrollment: 89 },
            { month: "Nov", enrollment: 90 },
            { month: "Dec", enrollment: 91 },
            { month: "Jan", enrollment: 92 },
            { month: "Feb", enrollment: 92 },
        ],

        // Attendance data
        attendanceData: [
            { month: "Sep", rate: 95.5 },
            { month: "Oct", rate: 96.2 },
            { month: "Nov", rate: 94.8 },
            { month: "Dec", rate: 97.1 },
            { month: "Jan", rate: 96.5 },
            { month: "Feb", rate: 96.8 },
        ],

        // Demographics
        demographics: {
            gender: { male: 48, female: 44 },
            specialNeeds: 8,
            giftedTalented: 12,
        },
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-6 w-full">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/school/year-grades">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{gradeData.name} Details</h1>
                    <p className="text-muted-foreground mt-1">{gradeData.schoolName}</p>
                </div>
            </div>

            <GradeDetailsContent gradeData={gradeData} />
        </div>
    );
}
