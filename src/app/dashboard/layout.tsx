/**
 * EdForge EMIS - Dashboard Layout
 * 
 * This layout wraps all dashboard pages with:
 * - Server-side authentication and RBAC
 * - Sidebar navigation
 * - Persistent top navigation
 * - Main content area
 * 
 * This is a Server Component for maximum security and performance.
 */

import { AppSidebarServer } from "@/components/app-sidebar-server";
import { DashboardHeaderServer } from "@/components/dashboard-header-server";
import { DashboardClientWrapper } from "@/components/dashboard-client-wrapper";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<DashboardClientWrapper
			sidebar={<AppSidebarServer />}
			header={<DashboardHeaderServer />}
			content={children}
		/>
	);
}

