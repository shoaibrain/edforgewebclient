/**
 * EdForge EMIS - Dashboard Layout
 * 
 * This layout wraps all dashboard pages with:
 * - User context for RBAC
 * - Sidebar navigation
 * - Main content area
 */

import { UserProvider } from "@/contexts/user-context";
import { AppSidebar } from "@/components/app-sidebar";
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
				<SidebarInset>{children}</SidebarInset>
			</SidebarProvider>
		</UserProvider>
	);
}

