/**
 * EdForge EMIS - Dashboard Page
 * 
 * This is the main dashboard page that shows role-specific content and metrics.
 * Different users see different dashboards based on their role.
 * 
 * This is a Server Component for security and performance.
 */

import { getCurrentUser } from "@/lib/auth";
import { UserRole } from "@/types/rbac";
import { DashboardContent } from "@/components/dashboard-content";
import { Suspense } from "react";
import {
	AlertCircle,
} from "lucide-react";

export default async function DashboardPage() {
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

	return (
		<Suspense fallback={<div>Loading dashboard...</div>}>
			<DashboardContent user={user} />
		</Suspense>
	);
}

