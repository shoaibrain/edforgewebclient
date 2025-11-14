/**
 * Common Types
 *
 * Shared base types used across all services
 */
export interface BaseEntity {
    tenantId: string;
    entityKey: string;
    entityType: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    version: number;
}
export interface RequestContext {
    userId: string;
    jwtToken: string;
    tenantId: string;
    userName?: string;
    userRole?: string;
    userAvatar?: string;
}
//# sourceMappingURL=common.d.ts.map