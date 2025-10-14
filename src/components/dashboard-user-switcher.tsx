"use client";

/**
 * EdForge EMIS - Dashboard User Switcher
 * 
 * User switcher component for the dashboard header.
 * Displays user avatar, name, role, and provides dropdown menu.
 */

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types/rbac";
import { UserRole, getRoleDisplayName, getRoleColor } from "@/types/rbac";
import { ChevronsUpDown, User as UserIcon, Settings, LogOut } from "lucide-react";

// Mock users for switching (in real app, this would come from API)
const mockUsers = [
	{
		id: "1",
		name: "Sarah Johnson",
		email: "sarah.johnson@edforge.io",
		role: UserRole.TENANT_ADMIN,
		avatar: "SJ",
		tenantId: "springfield-high",
		tenantName: "Springfield High School",
	},
	{
		id: "2",
		name: "Dr. Sarah Chen",
		email: "sarah.chen@springfield.edu",
		role: UserRole.TEACHER,
		avatar: "SC",
		tenantId: "springfield-high",
		tenantName: "Springfield High School",
	},
	{
		id: "3",
		name: "Alex Thompson",
		email: "alex.thompson@springfield.edu",
		role: UserRole.STUDENT,
		avatar: "AT",
		tenantId: "springfield-high",
		tenantName: "Springfield High School",
	},
];

interface DashboardUserSwitcherProps {
	user: User;
}

export function DashboardUserSwitcher({ user }: DashboardUserSwitcherProps) {
	const [selectedUser, setSelectedUser] = useState(user);
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="flex items-center gap-1 px-2 py-1 h-auto hover:bg-muted/30 transition-colors opacity-70 hover:opacity-100"
				>
					<Avatar className="h-6 w-6 flex-shrink-0">
						<AvatarFallback className="text-xs bg-muted-foreground/20 text-muted-foreground font-medium">
							{selectedUser.avatar}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-start min-w-0">
						<span className="text-xs font-medium truncate max-w-[100px] text-muted-foreground">
							{selectedUser.name}
						</span>
						<span className="text-xs truncate max-w-[100px] text-muted-foreground/70">
							{getRoleDisplayName(selectedUser.role)}
						</span>
					</div>
					<ChevronsUpDown className="h-3 w-3 opacity-40 flex-shrink-0" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{selectedUser.name}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{selectedUser.email}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{selectedUser.tenantName}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				
				{/* User Switching Section */}
				<DropdownMenuLabel className="text-xs text-muted-foreground font-medium">
					Switch User
				</DropdownMenuLabel>
				{mockUsers
					.filter(mockUser => mockUser.id !== selectedUser.id)
					.map((mockUser) => (
						<DropdownMenuItem
							key={mockUser.id}
							onClick={() => setSelectedUser(mockUser)}
							className="flex items-center gap-2"
						>
							<Avatar className="h-6 w-6">
								<AvatarFallback className="text-xs bg-primary text-primary-foreground">
									{mockUser.avatar}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<span className="text-sm">{mockUser.name}</span>
								<span className={`text-xs ${getRoleColor(mockUser.role)}`}>
									{getRoleDisplayName(mockUser.role)}
								</span>
							</div>
						</DropdownMenuItem>
					))}
				
				<DropdownMenuSeparator />
				
				{/* User Actions */}
				<DropdownMenuItem className="flex items-center gap-2">
					<UserIcon className="h-4 w-4" />
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center gap-2">
					<Settings className="h-4 w-4" />
					Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
					<LogOut className="h-4 w-4" />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
