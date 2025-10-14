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
import { UserSwitcher } from "@/components/user-switcher";
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
import { useUser } from "@/contexts/user-context";
import { DASHBOARD_NAVIGATION } from "@/config/navigation";
import { getRoleDisplayName } from "@/types/rbac";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user, isLoading } = useUser();

	// Loading state
	if (isLoading) {
		return (
			<Sidebar collapsible="icon" {...props}>
				<SidebarHeader>
					<div className="p-4">
						<div className="h-10 w-full bg-muted animate-pulse rounded-lg" />
					</div>
				</SidebarHeader>
				<SidebarContent>
					<div className="p-4 space-y-2">
						<div className="h-8 w-full bg-muted animate-pulse rounded-lg" />
						<div className="h-8 w-full bg-muted animate-pulse rounded-lg" />
						<div className="h-8 w-full bg-muted animate-pulse rounded-lg" />
					</div>
				</SidebarContent>
				<SidebarRail />
			</Sidebar>
		);
	}

	// No user state
	if (!user) {
		return (
			<Sidebar collapsible="icon" {...props}>
				<SidebarHeader>
					<div className="p-4 text-center text-muted-foreground">
						<p>No user logged in</p>
					</div>
				</SidebarHeader>
				<SidebarRail />
			</Sidebar>
		);
	}

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

				{/* User Switcher for Testing */}
				<div className="px-2 py-2">
					<UserSwitcher />
				</div>
			</SidebarHeader>

			<SidebarContent className="sidebar-scroll">
				{/* Main Navigation - Filtered by RBAC */}
				<NavRBAC items={DASHBOARD_NAVIGATION} label="Menu" />
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
