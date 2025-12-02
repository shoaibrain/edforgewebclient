"use client";

/**
 * EdForge EMIS - Institution/School Settings Content
 * 
 * Client component for institution settings with interactive features.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Calendar, CalendarDays, GraduationCap, ClipboardCheck, Award } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { GeneralSettings } from "./general-settings";
import { SchoolYearSettings } from "./school-year-settings";
import { TermsSettings } from "./terms-settings";
import { AcademicCalendar } from "./academic-calendar";
import { GradingSettings } from "./grading-settings";
import { AttendanceSettings } from "./attendance-settings";
import { cn } from "@/lib/utils";
import type { User } from "@/types/rbac";
import type { School, AcademicYear } from "@edforge/shared-types";

type SettingsSection = "general" | "school-years" | "terms" | "calendar" | "grading" | "attendance";

const settingsTabs = [
	{ id: "general" as const, label: "General", icon: Building2, description: "Basic institution information and preferences" },
	{ id: "school-years" as const, label: "School Years", icon: Calendar, description: "Manage academic years and periods" },
	{ id: "terms" as const, label: "Terms", icon: CalendarDays, description: "Configure academic terms and semesters" },
	{ id: "calendar" as const, label: "Calendar", icon: GraduationCap, description: "Academic calendar and important dates" },
	{ id: "grading" as const, label: "Grading", icon: Award, description: "Grading scales and assessment criteria" },
	{ id: "attendance" as const, label: "Attendance", icon: ClipboardCheck, description: "Attendance policies and tracking settings" },
];

interface InstitutionSettingsContentProps {
	user: User;
	school: School;
	academicYears: AcademicYear[];
	initialActiveTab?: string;
}

// Map URL-friendly tab names to internal section IDs
const tabIdMap: Record<string, SettingsSection> = {
	"general": "general",
	"school-years": "school-years",
	"terms": "terms",
	"calendar": "calendar",
	"grading": "grading",
	"attendance": "attendance",
};

// Validate and normalize tab ID
function getValidTabId(tabId: string | undefined): SettingsSection {
	if (tabId && tabId in tabIdMap) {
		return tabIdMap[tabId];
	}
	return "general"; // Default to general
}

export function InstitutionSettingsContent({ user, school, academicYears, initialActiveTab }: InstitutionSettingsContentProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [activeSection, setActiveSection] = useState<SettingsSection>(() =>
		getValidTabId(initialActiveTab)
	);
	const [currentSchool, setCurrentSchool] = useState<School>(school);

	// Update currentSchool when school prop changes
	useEffect(() => {
		setCurrentSchool(school);
	}, [school]);

	// Sync activeSection with URL when URL changes (browser back/forward navigation)
	// This handles cases where the user navigates using browser buttons
	useEffect(() => {
		const activeTabFromUrl = searchParams.get("activeTab");
		const validTab = getValidTabId(activeTabFromUrl || undefined);
		// Only update if different - this prevents loops when handleTabChange updates URL
		setActiveSection(prev => {
			if (prev !== validTab) {
				return validTab;
			}
			return prev;
		});
	}, [searchParams]);

	// Callback to handle school updates
	const handleSchoolUpdate = (updatedSchool: School) => {
		setCurrentSchool(updatedSchool);
	};

	const [direction, setDirection] = useState(0);
	const [prevSection, setPrevSection] = useState<SettingsSection>(activeSection);

	// Handle tab change and update URL with animation direction
	const handleTabChange = (tabId: SettingsSection) => {
		const newIndex = settingsTabs.findIndex(t => t.id === tabId);
		const oldIndex = settingsTabs.findIndex(t => t.id === activeSection);
		setDirection(newIndex > oldIndex ? 1 : -1);
		setPrevSection(activeSection);
		setActiveSection(tabId);

		const params = new URLSearchParams(searchParams.toString());
		params.set("activeTab", tabId);
		router.replace(`/dashboard/admin/settings?${params.toString()}`, { scroll: false });
	};

	const activeTab = settingsTabs.find(tab => tab.id === activeSection);

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 20 : -20,
			opacity: 0,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 20 : -20,
			opacity: 0,
		}),
	};

	return (
		<div className="space-y-6">
			{/* Settings Navigation */}
			<div className="border-b border-border">
				<nav className="flex gap-6 overflow-x-auto" aria-label="Settings sections">
					{settingsTabs.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeSection === tab.id;
						return (
							<button
								key={tab.id}
								onClick={() => handleTabChange(tab.id)}
								className={cn(
									"relative flex items-center gap-2 px-1 pb-4 text-sm font-medium transition-colors whitespace-nowrap",
									isActive
										? "text-primary"
										: "text-muted-foreground hover:text-foreground"
								)}
							>
								<Icon className="h-4 w-4" />
								{tab.label}
								{isActive && (
									<motion.div
										layoutId="activeTab"
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
										transition={{ type: "spring", stiffness: 500, damping: 30 }}
									/>
								)}
							</button>
						);
					})}
				</nav>
			</div>

			{/* Settings Content */}
			<div className="min-h-[600px] overflow-hidden relative">
				<AnimatePresence mode="wait" initial={false} custom={direction}>
					<motion.div
						key={activeSection}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 }
						}}
						className="w-full"
					>
						{activeSection === "general" && <GeneralSettings school={currentSchool} onSchoolUpdate={handleSchoolUpdate} />}
						{activeSection === "school-years" && <SchoolYearSettings school={currentSchool} academicYears={academicYears} />}
						{activeSection === "terms" && <TermsSettings school={currentSchool} academicYears={academicYears} />}
						{activeSection === "calendar" && <AcademicCalendar school={currentSchool} academicYears={academicYears} />}
						{activeSection === "grading" && <GradingSettings school={currentSchool} />}
						{activeSection === "attendance" && <AttendanceSettings school={currentSchool} />}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
