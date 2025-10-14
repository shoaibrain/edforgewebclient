"use client";

/**
 * EdForge EMIS - Application Sidebar with RBAC
 * 
 * This sidebar component dynamically renders navigation items based on the 
 * current user's role and permissions. Different users see different menu items.
 */

import * as React from "react";
import { GraduationCap } from "lucide-react";
import { NavRBAC } from "@/components/nav-rbac";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import type { User } from "@/types/rbac";
import { DASHBOARD_NAVIGATION } from "@/config/navigation";
import { getRoleDisplayName } from "@/types/rbac";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	user: User;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {

	// No loading state needed since user is passed as prop

	// User is guaranteed to be provided as prop

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				{/* Institution Branding */}
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton 
							size="lg" 
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground sidebar-transition"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground sidebar-transition">
								<GraduationCap className="size-4" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold sidebar-transition">
									{user.tenantName}
								</span>
								<span className="truncate text-xs text-muted-foreground sidebar-transition">
									{getRoleDisplayName(user.role)}
								</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent className="sidebar-scroll">
				{/* Main Navigation - Filtered by RBAC */}
				<NavRBAC items={DASHBOARD_NAVIGATION} user={user} label="Menu" />
			</SidebarContent>

			<SidebarFooter>
				{/* User Menu */}
				<NavUser
					user={{
						name: user.name,
						email: user.email,
						avatar: user.avatar || "",
					}}
				/>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
