/**
 * Academic Service DTOs
 *
 * Request/Response DTOs for the Academic microservice
 * These types are shared between server and client
 */
export interface ClassScheduleDto {
    dayOfWeek: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
    startTime: string;
    endTime: string;
    periodNumber?: number;
}
export interface CreateClassroomDto {
    name: string;
    code: string;
    subject: string;
    grade: string;
    section?: string;
    teacherId: string;
    coTeacherIds?: string[];
    room?: string;
    capacity?: number;
    schedule: ClassScheduleDto[];
    status?: 'active' | 'inactive';
}
export interface UpdateClassroomDto {
    name?: string;
    code?: string;
    subject?: string;
    grade?: string;
    section?: string;
    teacherId?: string;
    coTeacherIds?: string[];
    room?: string;
    capacity?: number;
    schedule?: ClassScheduleDto[];
    status?: 'active' | 'inactive' | 'archived';
    version?: number;
}
export interface EnrollStudentDto {
    studentId: string;
}
export interface AssignmentAttachmentDto {
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
}
export interface CreateAssignmentDto {
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
    allowLateSubmission?: boolean;
    lateSubmissionPenalty?: number;
    attachments?: AssignmentAttachmentDto[];
    status?: 'draft' | 'published';
}
export interface UpdateAssignmentDto {
    title?: string;
    description?: string;
    instructions?: string;
    type?: 'homework' | 'project' | 'quiz' | 'test' | 'lab' | 'presentation' | 'other';
    category?: string;
    assignedDate?: string;
    dueDate?: string;
    availableFrom?: string;
    availableUntil?: string;
    maxPoints?: number;
    weight?: number;
    passingScore?: number;
    allowLateSubmission?: boolean;
    lateSubmissionPenalty?: number;
    attachments?: AssignmentAttachmentDto[];
    status?: 'draft' | 'published' | 'archived';
    version?: number;
}
export interface RubricScoreDto {
    criteriaName: string;
    maxPoints: number;
    pointsEarned: number;
    feedback?: string;
}
export interface UpdateGradeDto {
    score?: number;
    maxPoints?: number;
    feedback?: string;
    rubricScores?: RubricScoreDto[];
    status?: 'draft' | 'published' | 'revised';
    version?: number;
}
export interface GradeRangeDto {
    minPercentage: number;
    maxPercentage: number;
    letterGrade: string;
    gradePoints: number;
    passingGrade?: boolean;
    description?: string;
    color?: string;
}
export interface CreateGradingScaleDto {
    name: string;
    type: 'letter' | 'percentage' | 'points' | 'passfail';
    ranges: GradeRangeDto[];
}
export interface CreateGradeDto {
    assignmentId?: string;
    studentId: string;
    termId?: string;
    score: number;
    maxPoints: number;
    categoryId: string;
    feedback?: string;
    rubricScores?: RubricScoreDto[];
    isLate?: boolean;
    penaltyApplied?: number;
    isExcused?: boolean;
    isFinal?: boolean;
    canRetake?: boolean;
    status?: 'draft' | 'published';
}
export interface GradingScaleDto {
    min: number;
    max: number;
    letter: string;
    gpa?: number;
}
export interface CreateGradingSystemDto {
    name: string;
    type: 'letter' | 'percentage' | 'numeric' | 'pass_fail' | 'custom';
    scale: {
        min: number;
        max: number;
        passingGrade: number;
        gradeLabels: Record<string, string>;
    };
    isDefault?: boolean;
}
export interface CreateGradeCategoryDto {
    name: string;
    weight: number;
    color: string;
    sortOrder?: number;
}
export interface UpdateGradeCategoryDto {
    name?: string;
    weight?: number;
    color?: string;
    sortOrder?: number;
    isActive?: boolean;
}
export interface CreateAcademicTermDto {
    name: string;
    type: 'semester' | 'quarter' | 'trimester' | 'custom';
    startDate: string;
    endDate: string;
    weight?: number;
}
export interface UpdateAcademicTermDto {
    name?: string;
    startDate?: string;
    endDate?: string;
    weight?: number;
    isActive?: boolean;
}
export interface BulkGradeDto {
    grades: CreateGradeDto[];
}
export interface GradeFilterDto {
    studentId?: string;
    assignmentId?: string;
    categoryId?: string;
    termId?: string;
    status?: 'draft' | 'published' | 'revised';
    startDate?: string;
    endDate?: string;
    limit?: number;
    lastEvaluatedKey?: string;
}
export interface GradeAnalyticsFilterDto {
    studentId?: string;
    classroomId?: string;
    termId?: string;
    startDate?: string;
    endDate?: string;
}
export interface TeacherAnalyticsFilterDto {
    classroomId?: string;
    termId?: string;
    startDate?: string;
    endDate?: string;
}
export interface CreateAttendanceDto {
    studentId: string;
    date: string;
    status: 'present' | 'absent' | 'tardy' | 'excused' | 'late' | 'early_departure';
    checkInTime?: string;
    checkOutTime?: string;
    minutesLate?: number;
    duration?: number;
    expectedDuration?: number;
    periodId?: string;
    periodNumber?: number;
    notes?: string;
    excuseReason?: string;
    parentNotified?: boolean;
    documentationRequired?: boolean;
    excuseDocumentation?: string;
}
export interface UpdateAttendanceDto {
    status?: 'present' | 'absent' | 'tardy' | 'excused' | 'late';
    checkInTime?: string;
    checkOutTime?: string;
    minutesLate?: number;
    notes?: string;
    excuseReason?: string;
    parentNotified?: boolean;
    version?: number;
}
export interface BulkAttendanceDto {
    date: string;
    records: Array<{
        studentId: string;
        status: 'present' | 'absent' | 'tardy' | 'excused' | 'late';
        notes?: string;
    }>;
}
export interface PostAttachmentDto {
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
}
export interface CreateStreamPostDto {
    content: string;
    postType?: 'announcement' | 'question' | 'material' | 'assignment_created' | 'grade_posted' | 'general';
    isPinned?: boolean;
    isAnnouncement?: boolean;
    allowComments?: boolean;
    attachments?: PostAttachmentDto[];
    relatedAssignmentId?: string;
    relatedGradeId?: string;
}
export interface UpdateStreamPostDto {
    content?: string;
    postType?: 'announcement' | 'question' | 'material' | 'assignment_created' | 'grade_posted' | 'general';
    isPinned?: boolean;
    isAnnouncement?: boolean;
    allowComments?: boolean;
    attachments?: PostAttachmentDto[];
    version?: number;
}
export interface CreatePostCommentDto {
    content: string;
    parentCommentId?: string;
}
export interface UpdatePostCommentDto {
    content?: string;
    version?: number;
}
export interface StreamPostFiltersDto {
    postType?: string;
    authorId?: string;
    isPinned?: boolean;
    isAnnouncement?: boolean;
    startDate?: string;
    endDate?: string;
    limit?: number;
    lastEvaluatedKey?: string;
}
//# sourceMappingURL=dto.d.ts.map