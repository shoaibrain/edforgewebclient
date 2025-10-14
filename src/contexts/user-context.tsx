"use client";

/**
 * EdForge EMIS - User Context Provider
 * 
 * This context manages the current authenticated user state across the application.
 * In production, this would integrate with a real authentication system (e.g., NextAuth.js).
 */

import * as React from "react";
import type { User } from "@/types/rbac";
import { getDefaultUser } from "@/data/mock-users";

interface UserContextValue {
	user: User | null;
	setUser: (user: User | null) => void;
	isLoading: boolean;
}

const UserContext = React.createContext<UserContextValue | undefined>(
	undefined,
);

interface UserProviderProps {
	children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
	const [user, setUserState] = React.useState<User | null>(null);
	const [isLoading, setIsLoading] = React.useState(true);

	// Simulate initial user load
	React.useEffect(() => {
		// In production, this would fetch the current user from your auth system
		const loadUser = async () => {
			try {
				// Simulate API delay
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Check if user is stored in localStorage (for demo persistence)
				const storedUser = localStorage.getItem("edforge-current-user");
				if (storedUser) {
					setUserState(JSON.parse(storedUser));
				} else {
					// Default to first mock user
					const defaultUser = getDefaultUser();
					setUserState(defaultUser);
					localStorage.setItem(
						"edforge-current-user",
						JSON.stringify(defaultUser),
					);
				}
			} catch (error) {
				console.error("Failed to load user:", error);
				setUserState(null);
			} finally {
				setIsLoading(false);
			}
		};

		loadUser();
	}, []);

	const setUser = React.useCallback((newUser: User | null) => {
		setUserState(newUser);
		if (newUser) {
			localStorage.setItem("edforge-current-user", JSON.stringify(newUser));
		} else {
			localStorage.removeItem("edforge-current-user");
		}
	}, []);

	const value = React.useMemo(
		() => ({
			user,
			setUser,
			isLoading,
		}),
		[user, setUser, isLoading],
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

/**
 * Hook to access the current user context
 */
export function useUser() {
	const context = React.useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
}

/**
 * Hook to get current user (throws if not authenticated)
 */
export function useRequireUser() {
	const { user, isLoading } = useUser();
	if (!isLoading && !user) {
		throw new Error("User must be authenticated");
	}
	return { user, isLoading };
}

