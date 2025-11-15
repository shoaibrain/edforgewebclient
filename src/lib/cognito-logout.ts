/**
 * EdForge EMIS - Cognito Logout Utilities
 * 
 * Shared utilities for handling Cognito logout flow.
 * Ensures proper session invalidation and cleanup.
 */

/**
 * Get Cognito logout URL from well-known OIDC configuration
 * 
 * Extracts the Hosted UI domain from authorization_endpoint and constructs
 * the correct logout URL that Cognito expects.
 * 
 * @returns Cognito logout URL
 */
export async function getCognitoLogoutUrl(): Promise<string> {
	const wellKnownUrl = process.env.NEXT_PUBLIC_WELL_KNOWN_ENDPOINT_URL!;
	const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
	const logoutUri = encodeURIComponent(window.location.origin);

	if (!wellKnownUrl) {
		throw new Error('NEXT_PUBLIC_WELL_KNOWN_ENDPOINT_URL not configured');
	}

	if (!clientId) {
		throw new Error('NEXT_PUBLIC_CLIENT_ID not configured');
	}

	try {
		const response = await fetch(wellKnownUrl, {
			method: "GET",
			headers: {
				"Accept": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch well-known configuration: ${response.status}`);
		}

		const config = await response.json();

		if (!config.authorization_endpoint) {
			throw new Error("authorization_endpoint not found in well-known configuration");
		}

		// Extract Hosted UI domain from authorization endpoint
		// e.g., https://{domain}.auth.us-east-1.amazonaws.com/oauth2/authorize
		// becomes: https://{domain}.auth.us-east-1.amazonaws.com
		const authEndpoint = config.authorization_endpoint;
		const cognitoDomain = authEndpoint.replace('/oauth2/authorize', '');

		// Construct logout URL using Hosted UI domain
		const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;

		if (process.env.NODE_ENV === 'development') {
			console.log('[AUTH] Cognito logout URL:', logoutUrl);
		}

		return logoutUrl;
	} catch (error) {
		console.error('[AUTH] Failed to get logout URL:', error);
		throw error;
	}
}

/**
 * Clear all browser storage and cookies
 */
export function clearBrowserStorage(): void {
	if (typeof window === 'undefined') {
		return;
	}

	try {
		sessionStorage.clear();
		localStorage.clear();
		
		// Clear all localStorage keys individually (defensive)
		try {
			const keys = Object.keys(localStorage);
			keys.forEach(key => localStorage.removeItem(key));
		} catch (e) {
			// Ignore errors during cleanup
		}
		
		// Clear all sessionStorage keys individually (defensive)
		try {
			const sessionKeys = Object.keys(sessionStorage);
			sessionKeys.forEach(key => sessionStorage.removeItem(key));
		} catch (e) {
			// Ignore errors during cleanup
		}

		// Clear all NextAuth cookies
		document.cookie.split(";").forEach((c) => {
			const eqPos = c.indexOf("=");
			const name = eqPos > -1 ? c.substring(0, eqPos).trim() : c.trim();
			if (name.startsWith('next-auth.') || name.startsWith('__Secure-next-auth.')) {
				document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
			}
		});

		if (process.env.NODE_ENV === 'development') {
			console.log('[AUTH] Cleared browser storage and cookies');
		}
	} catch (error) {
		console.error('[AUTH] Error clearing browser storage:', error);
	}
}

