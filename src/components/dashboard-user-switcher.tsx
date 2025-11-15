"use client";

/**
 * EdForge EMIS - Dashboard User Switcher
 * 
 * Displays current authenticated user in header with sign-out option.
 * Includes theme switcher and proper Cognito logout flow.
 */

import * as React from "react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { getCognitoLogoutUrl, clearBrowserStorage } from "@/lib/cognito-logout";
import type { User } from "@/types/rbac";

interface DashboardUserSwitcherProps {
	user: User;
}

export function DashboardUserSwitcher({ user }: DashboardUserSwitcherProps) {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	// Generate stock profile image URL based on user email
	const profileImageUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.email || user.name)}`;

	const handleSignOut = async () => {
		try {
			if (process.env.NODE_ENV === 'development') {
				console.log('[AUTH] Starting logout process');
			}

			// Step 1: Clear all browser storage
			clearBrowserStorage();
			
			// Step 2: Sign out from NextAuth
			await signOut({ 
				redirect: false,
			});
			
			if (process.env.NODE_ENV === 'development') {
				console.log('[AUTH] NextAuth signout completed');
			}
			
			// Step 3: Get Cognito logout URL and redirect
			const logoutUrl = await getCognitoLogoutUrl();
			
			if (process.env.NODE_ENV === 'development') {
				console.log('[AUTH] Redirecting to Cognito logout');
			}
			
			// Step 4: Redirect to Cognito logout
			window.location.href = logoutUrl;
		} catch (error) {
			console.error('[AUTH] Logout error:', error);
			// Force clear everything and reload on error
			clearBrowserStorage();
			window.location.href = '/auth/signin';
		}
	};
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="flex items-center gap-2 h-auto">
					<Avatar className="h-8 w-8">
						<AvatarImage src={profileImageUrl} alt={user.name} />
						<AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
					</Avatar>
					<span className="text-sm font-medium hidden md:inline">{user.name}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium">{user.name}</p>
						<p className="text-xs text-muted-foreground">{user.email}</p>
						<p className="text-xs text-muted-foreground">{user.tenantName}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{/* Theme Switcher */}
				{mounted && (
					<>
						<DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2 py-1.5">
							Theme
						</DropdownMenuLabel>
						<div className="px-2 py-1.5">
							<div className="flex items-center gap-1 rounded-md border border-border bg-muted/50 p-1">
								<button
									type="button"
									onClick={() => setTheme("light")}
									className={`flex items-center justify-center h-7 w-7 rounded-sm transition-colors ${
										theme === "light"
											? "bg-background text-foreground shadow-sm"
											: "text-muted-foreground hover:text-foreground"
									}`}
									title="Light mode"
								>
									<Sun className="h-3.5 w-3.5" />
								</button>
								<button
									type="button"
									onClick={() => setTheme("system")}
									className={`flex items-center justify-center h-7 w-7 rounded-sm transition-colors ${
										theme === "system"
											? "bg-background text-foreground shadow-sm"
											: "text-muted-foreground hover:text-foreground"
									}`}
									title="System theme"
								>
									<Monitor className="h-3.5 w-3.5" />
								</button>
								<button
									type="button"
									onClick={() => setTheme("dark")}
									className={`flex items-center justify-center h-7 w-7 rounded-sm transition-colors ${
										theme === "dark"
											? "bg-background text-foreground shadow-sm"
											: "text-muted-foreground hover:text-foreground"
									}`}
									title="Dark mode"
								>
									<Moon className="h-3.5 w-3.5" />
								</button>
							</div>
						</div>
						<DropdownMenuSeparator />
					</>
				)}
				<DropdownMenuItem onClick={handleSignOut}>
					<LogOut className="mr-2 h-4 w-4" />
					Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}