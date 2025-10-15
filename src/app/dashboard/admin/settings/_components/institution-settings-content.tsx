"use client";

/**
 * EdForge EMIS - Institution Settings Content
 * 
 * Client component for institution settings with interactive features.
 * Based on V0 prototype design, adapted for EdForge dashboard integration.
 */

import { useState } from "react";
import { Building2, Calendar, CalendarDays, GraduationCap, ClipboardCheck, Award } from "lucide-react";
import { GeneralSettings } from "./general-settings";
import { SchoolYearSettings } from "./school-year-settings";
import { TermsSettings } from "./terms-settings";
import { AcademicCalendar } from "./academic-calendar";
import { GradingSettings } from "./grading-settings";
import { AttendanceSettings } from "./attendance-settings";
import { cn } from "@/lib/utils";
import type { User } from "@/types/rbac";

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
}

export function InstitutionSettingsContent({ user }: InstitutionSettingsContentProps) {
	const [activeSection, setActiveSection] = useState<SettingsSection>("general");

	const activeTab = settingsTabs.find(tab => tab.id === activeSection);

	return (
		<div className="space-y-6">
			{/* Settings Navigation */}
			<div className="border-b border-border">
				<nav className="flex gap-6 overflow-x-auto" aria-label="Settings sections">
					{settingsTabs.map((tab) => {
						const Icon = tab.icon;
						return (
							<button
								key={tab.id}
								onClick={() => setActiveSection(tab.id)}
								className={cn(
									"flex items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium transition-colors whitespace-nowrap",
									activeSection === tab.id
										? "border-primary text-primary"
										: "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
								)}
							>
								<Icon className="h-4 w-4" />
								{tab.label}
							</button>
						);
					})}
				</nav>
			</div>

			{/* Settings Content */}
			<div className="min-h-[600px]">
				{activeSection === "general" && <GeneralSettings />}
				{activeSection === "school-years" && <SchoolYearSettings />}
				{activeSection === "terms" && <TermsSettings />}
				{activeSection === "calendar" && <AcademicCalendar />}
				{activeSection === "grading" && <GradingSettings />}
				{activeSection === "attendance" && <AttendanceSettings />}
			</div>
		</div>
	);
}
