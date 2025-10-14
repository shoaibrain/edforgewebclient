import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";

/**
 * EdForge EMIS Typography System
 * 
 * Uses system fonts for better performance and EdForge design consistency.
 * No external font dependencies for enterprise reliability.
 */

export const metadata: Metadata = {
	title: {
		default: "EdForge - Enterprise Education Management System",
		template: "%s | EdForge EMIS",
	},
	description:
		"Modern, enterprise-grade Education Management Information System (EMIS) for multi-tenant SaaS. Manage students, staff, curriculum, and institutional operations with world-class UI/UX.",
	keywords: [
		"Education Management",
		"EMIS",
		"School Management System",
		"Student Information System",
		"SaaS",
		"Multi-tenant",
		"Enterprise Software",
	],
	authors: [{ name: "EdForge Team" }],
	creator: "EdForge",
	publisher: "EdForge",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://edforge.io",
		title: "EdForge - Enterprise Education Management System",
		description:
			"Modern, enterprise-grade EMIS for educational institutions",
		siteName: "EdForge",
	},
	twitter: {
		card: "summary_large_image",
		title: "EdForge - Enterprise Education Management System",
		description:
			"Modern, enterprise-grade EMIS for educational institutions",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="dark">
			<head>
				<ThemeScript />
			</head>
			<body className="font-sans antialiased bg-background text-foreground">
				<ThemeProvider defaultTheme="system" storageKey="edforge-ui-theme">
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
