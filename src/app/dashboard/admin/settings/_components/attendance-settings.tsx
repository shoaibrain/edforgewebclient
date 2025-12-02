"use client";

/**
 * EdForge EMIS - Attendance Settings Component
 * 
 * Configures attendance policies, codes, and thresholds.
 * 
 * NOTE: The attendance configuration API is not yet available.
 * This feature will be enabled once the `/schools/{schoolId}/configuration` endpoint is implemented.
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Plus,
	MoreVertical,
	Clock,
	CalendarCheck,
	AlertTriangle,
	Save,
	CheckCircle2,
	Trash2,
	Edit2,
	Settings
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { School } from "@edforge/shared-types";

interface AttendanceSettingsProps {
	school: School;
}

// Mock Data Types
interface AttendanceCode {
	id: string;
	code: string;
	description: string;
	type: "present" | "absent" | "late" | "excused";
	color: string;
	isSystem: boolean;
}

interface AttendanceRule {
	id: string;
	name: string;
	threshold: number;
	period: "week" | "month" | "semester" | "year";
	action: string;
	isActive: boolean;
}

export function AttendanceSettings({ school }: AttendanceSettingsProps) {
	const [activeTab, setActiveTab] = useState<"codes" | "rules" | "settings">("codes");

	// Mock Data State
	const [attendanceCodes] = useState<AttendanceCode[]>([
		{ id: "1", code: "P", description: "Present", type: "present", color: "text-green-600 bg-green-50 border-green-200", isSystem: true },
		{ id: "2", code: "A", description: "Absent (Unexcused)", type: "absent", color: "text-red-600 bg-red-50 border-red-200", isSystem: true },
		{ id: "3", code: "L", description: "Late", type: "late", color: "text-yellow-600 bg-yellow-50 border-yellow-200", isSystem: true },
		{ id: "4", code: "E", description: "Excused Absence", type: "excused", color: "text-blue-600 bg-blue-50 border-blue-200", isSystem: false },
		{ id: "5", code: "T", description: "Tardy", type: "late", color: "text-orange-600 bg-orange-50 border-orange-200", isSystem: false },
	]);

	const [rules] = useState<AttendanceRule[]>([
		{ id: "1", name: "Excessive Absence Warning", threshold: 5, period: "semester", action: "Notify Parents", isActive: true },
		{ id: "2", name: "Chronic Absenteeism Alert", threshold: 10, period: "year", action: "Notify Principal", isActive: true },
		{ id: "3", name: "Perfect Attendance Award", threshold: 0, period: "semester", action: "Generate Certificate", isActive: false },
	]);

	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-semibold text-foreground">Attendance Settings</h2>
					<p className="text-sm text-muted-foreground mt-1">
						Configure attendance codes, policies, and automation rules
					</p>
				</div>
				<Button className="bg-primary hover:bg-primary/90 shadow-sm">
					<Save className="h-4 w-4 mr-2" />
					Save Changes
				</Button>
			</div>

			<div className="flex items-center gap-2 p-1 bg-muted/50 rounded-lg w-fit">
				<Button
					variant={activeTab === "codes" ? "default" : "ghost"}
					size="sm"
					onClick={() => setActiveTab("codes")}
					className={activeTab === "codes" ? "bg-background text-foreground shadow-sm hover:bg-background" : "hover:bg-background/50"}
				>
					<CalendarCheck className="h-4 w-4 mr-2" />
					Attendance Codes
				</Button>
				<Button
					variant={activeTab === "rules" ? "default" : "ghost"}
					size="sm"
					onClick={() => setActiveTab("rules")}
					className={activeTab === "rules" ? "bg-background text-foreground shadow-sm hover:bg-background" : "hover:bg-background/50"}
				>
					<AlertTriangle className="h-4 w-4 mr-2" />
					Rules & Alerts
				</Button>
				<Button
					variant={activeTab === "settings" ? "default" : "ghost"}
					size="sm"
					onClick={() => setActiveTab("settings")}
					className={activeTab === "settings" ? "bg-background text-foreground shadow-sm hover:bg-background" : "hover:bg-background/50"}
				>
					<Settings className="h-4 w-4 mr-2" />
					General Config
				</Button>
			</div>

			{activeTab === "codes" && (
				<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{attendanceCodes.map((code) => (
							<Card key={code.id} className="p-6 border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
								<div className="flex items-start justify-between mb-4">
									<div className={`h-12 w-12 rounded-lg flex items-center justify-center text-xl font-bold border ${code.color}`}>
										{code.code}
									</div>
									<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
										<Button variant="ghost" size="icon" className="h-8 w-8">
											<Edit2 className="h-4 w-4 text-muted-foreground" />
										</Button>
										{!code.isSystem && (
											<Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
												<Trash2 className="h-4 w-4" />
											</Button>
										)}
									</div>
								</div>
								<div className="space-y-2">
									<h3 className="font-semibold text-lg">{code.description}</h3>
									<div className="flex items-center justify-between">
										<Badge variant="outline" className="capitalize">
											{code.type}
										</Badge>
										{code.isSystem && (
											<span className="text-xs text-muted-foreground flex items-center gap-1">
												<Settings className="h-3 w-3" /> System
											</span>
										)}
									</div>
								</div>
							</Card>
						))}
						<Button variant="outline" className="h-auto min-h-[180px] flex flex-col items-center justify-center gap-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
							<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
								<Plus className="h-5 w-5" />
							</div>
							<span className="font-medium">Add Attendance Code</span>
						</Button>
					</div>
				</div>
			)}

			{activeTab === "rules" && (
				<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<Card className="overflow-hidden border-border shadow-sm">
						<div className="p-0">
							<table className="w-full text-sm">
								<thead className="bg-muted/30 text-muted-foreground font-medium">
									<tr>
										<th className="px-6 py-4 text-left">Rule Name</th>
										<th className="px-6 py-4 text-left">Condition</th>
										<th className="px-6 py-4 text-left">Action</th>
										<th className="px-6 py-4 text-right">Status</th>
										<th className="px-6 py-4 text-right">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-border">
									{rules.map((rule) => (
										<tr key={rule.id} className="hover:bg-muted/20 transition-colors">
											<td className="px-6 py-4 font-medium">{rule.name}</td>
											<td className="px-6 py-4 text-muted-foreground">
												{rule.threshold > 0 ? `> ${rule.threshold} absences` : "0 absences"} per {rule.period}
											</td>
											<td className="px-6 py-4">
												<Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
													{rule.action}
												</Badge>
											</td>
											<td className="px-6 py-4 text-right">
												<Switch checked={rule.isActive} />
											</td>
											<td className="px-6 py-4 text-right">
												<Button variant="ghost" size="icon" className="h-8 w-8">
													<MoreVertical className="h-4 w-4 text-muted-foreground" />
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="p-4 border-t border-border bg-muted/10">
							<Button variant="outline" size="sm" className="w-full border-dashed">
								<Plus className="h-4 w-4 mr-2" />
								Add New Rule
							</Button>
						</div>
					</Card>
				</div>
			)}

			{activeTab === "settings" && (
				<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<Card className="p-6 border-border shadow-sm">
						<h3 className="text-lg font-semibold mb-6">General Configuration</h3>
						<div className="grid gap-6 max-w-2xl">
							<div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/10">
								<div className="space-y-0.5">
									<Label className="text-base">Daily Attendance</Label>
									<p className="text-sm text-muted-foreground">
										Take attendance once per day (Homeroom)
									</p>
								</div>
								<Switch />
							</div>

							<div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/10">
								<div className="space-y-0.5">
									<Label className="text-base">Period Attendance</Label>
									<p className="text-sm text-muted-foreground">
										Take attendance for every class period
									</p>
								</div>
								<Switch defaultChecked />
							</div>

							<div className="grid gap-2 pt-4">
								<Label>Default Attendance Status</Label>
								<Select defaultValue="present">
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="present">Present (P)</SelectItem>
										<SelectItem value="empty">Empty / Not Set</SelectItem>
									</SelectContent>
								</Select>
								<p className="text-xs text-muted-foreground">
									Initial status when opening attendance sheet
								</p>
							</div>
						</div>
					</Card>
				</div>
			)}
		</div>
	);
}
