/**
 * School Service Entity Types
 *
 * These interfaces represent the entities returned by API responses.
 * Extracted from:
 * server/application/microservices/school/src/schools/entities/school.entity.enhanced.ts
 *
 * Note: Only entities that are exposed via API responses are included here.
 * Internal-only types (e.g., SchoolConfiguration, DepartmentBudget) are excluded.
 */
import type { BaseEntity } from '../common';
export type { BaseEntity } from '../common';
/**
 * School - Core school entity
 */
export interface School extends BaseEntity {
    schoolId: string;
    schoolName: string;
    schoolCode: string;
    schoolType: 'elementary' | 'middle' | 'high' | 'k12' | 'alternative' | 'special';
    contactInfo: {
        primaryEmail: string;
        primaryPhone: string;
        secondaryPhone?: string;
        website?: string;
        fax?: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        latitude?: number;
        longitude?: number;
        timezone: string;
    };
    principalUserId?: string;
    vicePrincipalUserIds?: string[];
    administrativeStaffCount?: number;
    maxStudentCapacity: number;
    currentEnrollment?: number;
    gradeRange: {
        lowestGrade: string;
        highestGrade: string;
    };
    status: 'active' | 'inactive' | 'suspended' | 'closed' | 'planned';
    statusReason?: string;
    accreditationInfo?: {
        accreditedBy: string[];
        accreditationExpiry?: string;
    };
    foundedDate?: string;
    description?: string;
    motto?: string;
    logoUrl?: string;
}
/**
 * Academic Year - Temporal boundary entity
 */
export interface AcademicYear extends BaseEntity {
    schoolId: string;
    academicYearId: string;
    yearName: string;
    yearCode: string;
    startDate: string;
    endDate: string;
    status: 'planned' | 'active' | 'completed' | 'archived';
    isCurrent: boolean;
    structure: {
        semesterCount: number;
        gradingPeriodCount: number;
        instructionalDays: number;
        schoolDays: number;
    };
    tuitionRates?: {
        [gradeLevel: string]: {
            amount: number;
            currency: string;
            frequency: 'annual' | 'semester' | 'monthly';
        };
    };
    enrollmentTargets?: {
        total: number;
        byGrade: {
            [grade: string]: number;
        };
    };
}
/**
 * Grading Period - Sub-divisions of academic year
 */
export interface GradingPeriod extends BaseEntity {
    schoolId: string;
    academicYearId: string;
    gradingPeriodId: string;
    periodName: string;
    periodCode: string;
    periodNumber: number;
    startDate: string;
    endDate: string;
    status: 'planned' | 'active' | 'completed';
    isCurrent: boolean;
    gradeEntryDeadline?: string;
    reportCardDate?: string;
    instructionalDays?: number;
}
/**
 * Holiday - Academic calendar holidays
 */
export interface Holiday extends BaseEntity {
    schoolId: string;
    academicYearId: string;
    holidayId: string;
    holidayName: string;
    holidayType: 'national' | 'regional' | 'school' | 'religious' | 'cultural';
    startDate: string;
    endDate: string;
    isRecurring: boolean;
    recurrencePattern?: string;
    appliesToGradeLevels?: string[];
}
/**
 * Department - Organizational unit within school
 */
export interface Department extends BaseEntity {
    schoolId: string;
    departmentId: string;
    departmentName: string;
    departmentCode: string;
    category: 'academic' | 'administrative' | 'support' | 'athletic';
    headOfDepartmentUserId?: string;
    assistantHeadUserId?: string;
    academicScope: {
        gradeLevels: string[];
        subjects: string[];
        curriculumStandards: string[];
    };
    staffing: {
        allocatedPositions: number;
        filledPositions: number;
        vacantPositions: number;
    };
    resources?: {
        facilities: Array<{
            type: 'lab' | 'office' | 'classroom' | 'storage';
            roomId: string;
        }>;
        equipment: Array<{
            category: string;
            quantity: number;
            description: string;
        }>;
    };
    status: 'active' | 'inactive' | 'dissolved';
}
/**
 * Response Types for List Operations
 */
export interface SchoolListResponse {
    items: School[];
    pagination?: {
        limit: number;
        hasMore: boolean;
        itemCount: number;
    };
    schools?: School[];
    total?: number;
}
export interface DepartmentListResponse {
    items: Department[];
    pagination?: {
        limit: number;
        hasMore: boolean;
        itemCount: number;
    };
    departments?: Department[];
    total?: number;
}
export interface AcademicYearListResponse {
    items: AcademicYear[];
    pagination?: {
        limit: number;
        hasMore: boolean;
        itemCount: number;
    };
    academicYears?: AcademicYear[];
    total?: number;
}
export interface GradingPeriodListResponse {
    items: GradingPeriod[];
    pagination?: {
        limit: number;
        hasMore: boolean;
        itemCount: number;
    };
    gradingPeriods?: GradingPeriod[];
    total?: number;
}
export interface HolidayListResponse {
    items: Holiday[];
    pagination?: {
        limit: number;
        hasMore: boolean;
        itemCount: number;
    };
    holidays?: Holiday[];
    total?: number;
}
//# sourceMappingURL=entity.d.ts.map