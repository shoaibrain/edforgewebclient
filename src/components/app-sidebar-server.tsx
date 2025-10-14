/**
 * EdForge EMIS - App Sidebar Server Wrapper
 * 
 * Server component that fetches user data and passes it to the client sidebar component.
 * This ensures proper server-side authentication while keeping the sidebar interactive.
 */

import { getCurrentUser } from "@/lib/auth";
import { AppSidebar } from "@/components/app-sidebar";

export async function AppSidebarServer() {
	const user = await getCurrentUser();
	
	if (!user) {
		return null;
	}
	
	return <AppSidebar user={user} />;
}
