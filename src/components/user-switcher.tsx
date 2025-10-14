"use client";

/**
 * EdForge EMIS - User Switcher Component
 * 
 * This component allows switching between different users to test the RBAC system.
 * In production, this would be removed or restricted to development environments.
 */

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { MOCK_USERS } from "@/data/mock-users";
import { useUser } from "@/contexts/user-context";
import { getRoleDisplayName, getRoleColor } from "@/types/rbac";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";

export function UserSwitcher() {
	const { user, setUser } = useUser();
	const { state } = useSidebar();

	if (!user) return null;

	const isCollapsed = state === "collapsed";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className={`w-full justify-between gap-2 px-3 hover:bg-muted/50 transition-colors ${
						isCollapsed ? "justify-center" : ""
					}`}
				>
					<div className="flex items-center gap-2 min-w-0">
						<Avatar className="h-8 w-8 flex-shrink-0">
							<AvatarFallback className="text-xs bg-primary text-primary-foreground font-semibold">
								{user.avatar}
							</AvatarFallback>
						</Avatar>
						{!isCollapsed && (
							<div className="flex flex-col items-start min-w-0">
								<span className="text-sm font-medium truncate max-w-[150px]">
									{user.name}
								</span>
								<span
									className={`text-xs truncate max-w-[150px] ${getRoleColor(user.role)}`}
								>
									{getRoleDisplayName(user.role)}
								</span>
							</div>
						)}
					</div>
					{!isCollapsed && <ChevronsUpDown className="h-4 w-4 opacity-50 flex-shrink-0" />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[280px]" align="start">
				<DropdownMenuLabel>Switch User (Testing)</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{MOCK_USERS.map((mockUser) => (
					<DropdownMenuItem
						key={mockUser.id}
						onClick={() => setUser(mockUser)}
						className="gap-2 cursor-pointer hover:bg-muted/50 transition-colors"
					>
						<Avatar className="h-8 w-8 flex-shrink-0">
							<AvatarFallback className="text-xs bg-primary text-primary-foreground font-semibold">
								{mockUser.avatar}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col flex-1 min-w-0">
							<div className="flex items-center justify-between gap-2">
								<span className="text-sm font-medium truncate">
									{mockUser.name}
								</span>
								{mockUser.id === user.id && (
									<Check className="h-4 w-4 flex-shrink-0 text-primary" />
								)}
							</div>
							<span
								className={`text-xs truncate ${getRoleColor(mockUser.role)}`}
							>
								{getRoleDisplayName(mockUser.role)}
							</span>
						</div>
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem className="text-xs text-muted-foreground" disabled>
					⚠️ Demo Mode: Switch users to test RBAC
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

