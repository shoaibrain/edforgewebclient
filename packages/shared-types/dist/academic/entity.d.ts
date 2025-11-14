/**
 * Academic Service Entity Types
 *
 * Entity interfaces for the Academic microservice
 * These types represent the data structure stored in DynamoDB
 */
import type { BaseEntity } from '../common';
export type { BaseEntity, RequestContext } from '../common';
export interface Classroom extends BaseEntity {
    entityType: 'CLASSROOM';
    classroomId: string;
    schoolId: string;
    academicYearId: string;
    name: string;
    code: string;
    subject: string;
    grade: string;
    section?: string;
    teacherId: string;
    coTeacherIds?: string[];
    room?: string;
    capacity?: number;
    schedule: ClassSchedule[];
    enrolledStudentIds: string[];
    enrollmentCount: number;
    status: 'active' | 'inactive' | 'archived';
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk: string;
    gsi2sk: string;
}
export interface ClassSchedule {
    dayOfWeek: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
    startTime: string;
    endTime: string;
    periodNumber?: number;
}
export interface Assignment extends BaseEntity {
    entityType: 'ASSIGNMENT';
    assignmentId: string;
    schoolId: string;
    academicYearId: string;
    classroomId: string;
    title: string;
    description?: string;
    instructions?: string;
    type: 'homework' | 'project' | 'quiz' | 'test' | 'lab' | 'presentation' | 'other';
    category?: string;
    assignedDate: string;
    dueDate: string;
    availableFrom?: string;
    availableUntil?: string;
    maxPoints: number;
    weight?: number;
    passingScore?: number;
    allowLateSubmission: boolean;
    lateSubmissionPenalty?: number;
    attachments?: AssignmentAttachment[];
    status: 'draft' | 'published' | 'archived';
    publishedAt?: string;
    createdByTeacherId: string;
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk: string;
    gsi2sk: string;
}
export interface AssignmentAttachment {
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    uploadedAt: string;
}
export interface GradingSystem extends BaseEntity {
    entityType: 'GRADING_SYSTEM';
    systemId: string;
    schoolId: string;
    name: string;
    type: 'letter' | 'percentage' | 'numeric' | 'pass_fail' | 'custom';
    scale: {
        min: number;
        max: number;
        passingGrade: number;
        gradeLabels: Record<string, string>;
    };
    isDefault: boolean;
    isActive: boolean;
    gsi1pk: string;
    gsi1sk: string;
}
export interface GradeCategory extends BaseEntity {
    entityType: 'GRADE_CATEGORY';
    categoryId: string;
    classroomId: string;
    academicYearId: string;
    schoolId: string;
    name: string;
    weight: number;
    color: string;
    isActive: boolean;
    sortOrder: number;
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk: string;
    gsi2sk: string;
}
export interface AcademicTerm extends BaseEntity {
    entityType: 'ACADEMIC_TERM';
    termId: string;
    schoolId: string;
    academicYearId: string;
    name: string;
    type: 'semester' | 'quarter' | 'trimester' | 'custom';
    startDate: string;
    endDate: string;
    isActive: boolean;
    weight: number;
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk: string;
    gsi2sk: string;
}
export interface Grade extends BaseEntity {
    entityType: 'GRADE';
    gradeId: string;
    schoolId: string;
    academicYearId: string;
    classroomId: string;
    assignmentId?: string;
    studentId: string;
    termId?: string;
    score: number;
    maxPoints: number;
    percentage: number;
    letterGrade?: string;
    gradePoints?: number;
    categoryId: string;
    categoryName: string;
    categoryWeight: number;
    submittedAt?: string;
    gradedAt: string;
    gradedByTeacherId: string;
    isLate: boolean;
    daysLate?: number;
    penaltyApplied?: number;
    feedback?: string;
    rubricScores?: RubricScore[];
    status: 'draft' | 'published' | 'revised';
    publishedAt?: string;
    gradeTrend: 'improving' | 'declining' | 'stable';
    percentile: number;
    classAverage: number;
    standardDeviation: number;
    lastModifiedBy: string;
    lastModifiedAt: string;
    isExcused: boolean;
    isFinal: boolean;
    canRetake: boolean;
    retakeCount: number;
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk: string;
    gsi2sk: string;
    gsi3pk?: string;
    gsi3sk?: string;
    gsi4pk?: string;
    gsi4sk?: string;
    gsi5pk?: string;
    gsi5sk?: string;
    gsi6pk?: string;
    gsi6sk?: string;
}
export interface RubricScore {
    criteriaName: string;
    maxPoints: number;
    pointsEarned: number;
    feedback?: string;
}
export interface GradingScale {
    scaleId: string;
    scaleName: string;
    type: 'letter' | 'percentage' | 'points' | 'passfail';
    scaleType?: 'letter' | 'percentage' | 'points' | 'competency' | 'ib' | 'custom';
    description?: string;
    gpaScale?: number;
    passingGrade?: string;
    ranges: GradeRange[];
}
export interface GradeRange {
    minPercentage: number;
    maxPercentage: number;
    letterGrade: string;
    gradePoints: number;
    passingGrade?: boolean;
    description?: string;
    color?: string;
}
export interface GradeAnalytics extends BaseEntity {
    entityType: 'GRADE_ANALYTICS';
    analyticsId: string;
    studentId?: string;
    classroomId?: string;
    schoolId: string;
    academicYearId: string;
    termId?: string;
    currentAverage: number;
    gradeTrend: 'improving' | 'declining' | 'stable';
    assignmentCompletion: number;
    classRank: number;
    percentile: number;
    gradeDistribution: {
        A: number;
        B: number;
        C: number;
        D: number;
        F: number;
    };
    predictedFinalGrade: string;
    riskLevel: 'low' | 'medium' | 'high';
    interventionNeeded: boolean;
    categoryAverages: Array<{
        categoryId: string;
        categoryName: string;
        average: number;
        weight: number;
        contribution: number;
    }>;
    gradeHistory: Array<{
        date: string;
        grade: number;
        assignment: string;
        category: string;
    }>;
    improvementAreas: string[];
    strengths: string[];
    recommendations: string[];
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk?: string;
    gsi2sk?: string;
    gsi3pk: string;
    gsi3sk: string;
}
export interface TeacherAnalytics extends BaseEntity {
    entityType: 'TEACHER_ANALYTICS';
    analyticsId: string;
    teacherId: string;
    classroomId: string;
    schoolId: string;
    academicYearId: string;
    totalStudents: number;
    averageGrade: number;
    gradeDistribution: {
        A: number;
        B: number;
        C: number;
        D: number;
        F: number;
    };
    strugglingStudents: Array<{
        studentId: string;
        studentName: string;
        currentAverage: number;
        riskLevel: 'low' | 'medium' | 'high';
        lastIntervention: string;
    }>;
    excellingStudents: Array<{
        studentId: string;
        studentName: string;
        currentAverage: number;
        strengths: string[];
    }>;
    atRiskStudents: Array<{
        studentId: string;
        studentName: string;
        currentAverage: number;
        riskFactors: string[];
        recommendedActions: string[];
    }>;
    assignmentAverages: Array<{
        assignmentId: string;
        assignmentName: string;
        average: number;
        difficulty: 'easy' | 'medium' | 'hard';
        completionRate: number;
    }>;
    gradeTrends: Array<{
        period: string;
        average: number;
        trend: 'up' | 'down' | 'stable';
    }>;
    improvementSuggestions: string[];
    teachingEffectiveness: number;
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk: string;
    gsi2sk: string;
    gsi3pk: string;
    gsi3sk: string;
}
export interface AttendanceSystem extends BaseEntity {
    entityType: 'ATTENDANCE_SYSTEM';
    systemId: string;
    schoolId: string;
    name: string;
    type: 'daily' | 'period' | 'block' | 'custom';
    periods: AttendancePeriod[];
    isDefault: boolean;
    isActive: boolean;
    gsi1pk: string;
    gsi1sk: string;
}
export interface AttendancePeriod {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    sortOrder: number;
}
export interface AttendanceRecord extends BaseEntity {
    entityType: 'ATTENDANCE';
    attendanceId: string;
    schoolId: string;
    academicYearId: string;
    classroomId: string;
    studentId: string;
    date: string;
    status: 'present' | 'absent' | 'tardy' | 'excused' | 'late' | 'early_departure';
    checkInTime?: string;
    checkOutTime?: string;
    minutesLate?: number;
    duration: number;
    expectedDuration: number;
    periodId?: string;
    periodNumber?: number;
    recordedByTeacherId: string;
    recordedAt: string;
    notes?: string;
    excuseReason?: string;
    parentNotified?: boolean;
    documentationRequired?: boolean;
    excuseDocumentation?: string;
    attendanceTrend: 'improving' | 'declining' | 'stable';
    isChronicAbsentee: boolean;
    riskLevel: 'low' | 'medium' | 'high';
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk: string;
    gsi2sk: string;
    gsi3pk: string;
    gsi3sk: string;
    gsi4pk: string;
    gsi4sk: string;
    gsi5pk: string;
    gsi5sk: string;
}
export interface AttendanceSummary {
    studentId: string;
    academicYearId: string;
    totalDays: number;
    presentDays: number;
    absentDays: number;
    lateDays: number;
    excusedDays: number;
    unexcusedAbsentDays: number;
    attendanceRate: number;
    latenessRate: number;
    trend: 'improving' | 'declining' | 'stable';
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    isChronicAbsentee: boolean;
    daysAbsentThisMonth: number;
    daysAbsentThisYear: number;
    recommendations: string[];
    interventionRequired: boolean;
    parentNotificationRequired: boolean;
    patternDescription: string;
}
export interface AttendanceAnalytics extends BaseEntity {
    entityType: 'ATTENDANCE_ANALYTICS';
    analyticsId: string;
    studentId?: string;
    classroomId?: string;
    schoolId: string;
    academicYearId: string;
    termId?: string;
    totalDays: number;
    presentDays: number;
    absentDays: number;
    lateDays: number;
    excusedAbsences: number;
    unexcusedAbsences: number;
    attendanceRate: number;
    punctualityRate: number;
    attendanceTrend: 'improving' | 'declining' | 'stable';
    frequentAbsenceDays: string[];
    frequentAbsenceReasons: string[];
    riskLevel: 'low' | 'medium' | 'high';
    interventionNeeded: boolean;
    chronicAbsenteeism: boolean;
    monthlyAttendance: Array<{
        month: string;
        attendanceRate: number;
        absentDays: number;
        lateDays: number;
    }>;
    attendanceHistory: Array<{
        date: string;
        status: string;
        reason?: string;
        markedBy: string;
    }>;
    improvementAreas: string[];
    strengths: string[];
    recommendations: string[];
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk?: string;
    gsi2sk?: string;
    gsi3pk: string;
    gsi3sk: string;
}
export interface TeacherAttendanceAnalytics extends BaseEntity {
    entityType: 'TEACHER_ATTENDANCE_ANALYTICS';
    analyticsId: string;
    teacherId: string;
    classroomId: string;
    schoolId: string;
    academicYearId: string;
    totalStudents: number;
    averageAttendanceRate: number;
    excellentAttendance: Array<{
        studentId: string;
        studentName: string;
        attendanceRate: number;
        lastAbsence: string;
    }>;
    goodAttendance: Array<{
        studentId: string;
        studentName: string;
        attendanceRate: number;
        lastAbsence: string;
    }>;
    concerningAttendance: Array<{
        studentId: string;
        studentName: string;
        attendanceRate: number;
        lastAbsence: string;
        riskFactors: string[];
    }>;
    criticalAttendance: Array<{
        studentId: string;
        studentName: string;
        attendanceRate: number;
        lastAbsence: string;
        riskFactors: string[];
        recommendedActions: string[];
    }>;
    dailyAttendanceTrends: Array<{
        date: string;
        attendanceRate: number;
        absentStudents: number;
        lateStudents: number;
    }>;
    monthlyAttendanceTrends: Array<{
        month: string;
        averageAttendanceRate: number;
        totalAbsences: number;
        totalLates: number;
    }>;
    seasonalPatterns: Array<{
        season: string;
        attendanceRate: number;
        commonReasons: string[];
    }>;
    studentsNeedingAttention: Array<{
        studentId: string;
        studentName: string;
        attendanceRate: number;
        lastIntervention: string;
        nextAction: string;
    }>;
    chronicAbsenteeism: Array<{
        studentId: string;
        studentName: string;
        attendanceRate: number;
        consecutiveAbsences: number;
        lastPresent: string;
    }>;
    unexplainedAbsences: Array<{
        studentId: string;
        studentName: string;
        date: string;
        status: string;
        markedBy: string;
    }>;
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk: string;
    gsi2sk: string;
    gsi3pk: string;
    gsi3sk: string;
}
export interface StreamPost extends BaseEntity {
    entityType: 'STREAM_POST';
    postId: string;
    schoolId: string;
    academicYearId: string;
    classroomId: string;
    authorId: string;
    authorName: string;
    authorRole: 'teacher' | 'student' | 'admin';
    authorAvatar?: string;
    content: string;
    postType: 'announcement' | 'question' | 'material' | 'assignment_created' | 'grade_posted' | 'general';
    isPinned: boolean;
    isAnnouncement: boolean;
    allowComments: boolean;
    attachments?: PostAttachment[];
    commentCount: number;
    likeCount: number;
    relatedAssignmentId?: string;
    relatedGradeId?: string;
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk: string;
    gsi2sk: string;
    gsi3pk: string;
    gsi3sk: string;
}
export interface PostAttachment {
    attachmentId: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    uploadedAt: string;
    uploadedBy: string;
}
export interface PostComment extends BaseEntity {
    entityType: 'POST_COMMENT';
    commentId: string;
    postId: string;
    schoolId: string;
    academicYearId: string;
    classroomId: string;
    authorId: string;
    authorName: string;
    authorRole: 'teacher' | 'student' | 'admin';
    authorAvatar?: string;
    content: string;
    parentCommentId?: string;
    likeCount: number;
    gsi1pk: string;
    gsi1sk: string;
    gsi2pk: string;
    gsi2sk: string;
}
//# sourceMappingURL=entity.d.ts.map