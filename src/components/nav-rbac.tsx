"use client";

/**
 * EdForge EMIS - RBAC-Aware Navigation Component
 * 
 * This component renders navigation items based on the current user's role and permissions.
 */

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { usePathname } from "next/navigation";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { useUser } from "@/contexts/user-context";
import { filterNavItemsByPermissions } from "@/types/rbac";
import type { NavItem } from "@/types/rbac";

interface NavRBACProps {
	items: NavItem[];
	label?: string;
}

export function NavRBAC({ items, label = "Navigation" }: NavRBACProps) {
	const { user } = useUser();
	const pathname = usePathname();

	if (!user) {
		return null;
	}

	// Filter navigation items based on user permissions
	const filteredItems = filterNavItemsByPermissions(items, user);

	if (filteredItems.length === 0) {
		return null;
	}

	return (
		<SidebarGroup>
			<SidebarGroupLabel>{label}</SidebarGroupLabel>
			<SidebarMenu>
				{filteredItems.map((item) => {
					const Icon = item.icon
						? (LucideIcons[
								item.icon as keyof typeof LucideIcons
							] as React.ComponentType<{ className?: string }>)
						: null;
					const isActive = pathname === item.url || pathname?.startsWith(`${item.url}/`);

					// Item with sub-items
					if (item.items && item.items.length > 0) {
						return (
							<Collapsible
								key={item.title}
								asChild
								defaultOpen={isActive}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton
											tooltip={item.title}
											isActive={isActive}
										>
											{Icon && <Icon className="h-4 w-4" />}
											<span>{item.title}</span>
											{item.badge && (
												<SidebarMenuBadge>
													{item.badge}
												</SidebarMenuBadge>
											)}
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items.map((subItem) => {
												const subIsActive = pathname === subItem.url;
												return (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton
															asChild
															isActive={subIsActive}
														>
															<Link href={subItem.url}>
																<span>{subItem.title}</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												);
											})}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						);
					}

					// Simple item without sub-items
					return (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								tooltip={item.title}
								isActive={isActive}
							>
								<Link href={item.url}>
									{Icon && <Icon className="h-4 w-4" />}
									<span>{item.title}</span>
									{item.badge && (
										<SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
									)}
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}

