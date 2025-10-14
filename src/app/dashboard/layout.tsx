/**
 * EdForge EMIS - Dashboard Layout
 * 
 * This layout wraps all dashboard pages with:
 * - User context for RBAC
 * - Sidebar navigation
 * - Persistent top navigation
 * - Main content area
 */

import { UserProvider } from "@/contexts/user-context";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<UserProvider>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<DashboardHeader />
					{children}
				</SidebarInset>
			</SidebarProvider>
		</UserProvider>
	);
}

