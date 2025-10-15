/**
 * EdForge EMIS - Institution Settings Page
 * 
 * Main settings page for institution administrators to configure
 * various aspects of the school management system.
 * 
 * This is a Server Component for security and performance.
 */

import { getCurrentUser, hasPermission } from "@/lib/auth";
import { UserRole, Permission } from "@/types/rbac";
import { InstitutionSettingsContent } from "@/app/dashboard/admin/settings/_components/institution-settings-content";
import { Suspense } from "react";
import { AlertCircle, Lock } from "lucide-react";

export default async function InstitutionSettingsPage() {
	// Get user from server-side authentication
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

	// Check if user has permission to access settings
	const canAccessSettings = await hasPermission(user, "VIEW_SETTINGS");
	if (!canAccessSettings) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-center">
					<Lock className="h-12 w-12 text-error mx-auto mb-4" />
					<p className="text-muted-foreground">You don't have permission to access settings</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-1 flex-col gap-6 p-6 w-full">
			<Suspense fallback={
				<div className="animate-pulse space-y-4">
					<div className="h-8 bg-muted rounded w-1/4"></div>
					<div className="h-4 bg-muted rounded w-1/2"></div>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="h-64 bg-muted rounded"></div>
						<div className="h-64 bg-muted rounded"></div>
					</div>
				</div>
			}>
				<InstitutionSettingsContent user={user} />
			</Suspense>
		</div>
	);
}
