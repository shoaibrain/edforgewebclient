"use client";

/**
 * EdForge EMIS - Attendance Settings Component
 * 
 * Configures attendance policies, codes, and thresholds.
 * Adapted from V0 prototype for EdForge dashboard integration.
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, CheckCircle, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const attendanceCodes = [
	{ code: "P", label: "Present", color: "bg-green-50 text-green-700 border-green-200" },
	{ code: "A", label: "Absent", color: "bg-red-50 text-red-700 border-red-200" },
	{ code: "T", label: "Tardy", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
	{ code: "E", label: "Excused", color: "bg-blue-50 text-blue-700 border-blue-200" },
	{ code: "L", label: "Late", color: "bg-purple-50 text-purple-700 border-purple-200" },
];

export function AttendanceSettings() {
	const [isSaving, setIsSaving] = useState(false);
	const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

	const handleSave = async () => {
		setIsSaving(true);
		setSaveStatus("saving");
		
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));
		
		setIsSaving(false);
		setSaveStatus("saved");
		
		// Reset status after 3 seconds
		setTimeout(() => setSaveStatus("idle"), 3000);
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-semibold text-foreground">Attendance Settings</h2>
				<p className="text-sm text-muted-foreground mt-1">
					Configure attendance policies, codes, and thresholds
				</p>
			</div>

			<Card className="p-6 bg-card border-border">
				<div className="mb-6">
					<h3 className="text-lg font-semibold text-foreground">Attendance Codes</h3>
					<p className="text-sm text-muted-foreground mt-1">
						Define codes used for tracking student attendance
					</p>
				</div>

				<div className="space-y-3">
					{attendanceCodes.map((item) => (
						<div key={item.code} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
							<div className="flex items-center gap-4">
								<Badge 
									variant="outline" 
									className={`${item.color} font-mono text-base w-10 justify-center`}
								>
									{item.code}
								</Badge>
								<div>
									<div className="font-medium text-foreground">{item.label}</div>
									<div className="text-xs text-muted-foreground">Code: {item.code}</div>
								</div>
							</div>
							<Button variant="ghost" size="sm">
								<Edit className="h-4 w-4 mr-1" />
								Edit
							</Button>
						</div>
					))}
				</div>

				<Button variant="outline" className="mt-4 w-full bg-transparent">
					<Plus className="h-4 w-4 mr-2" />
					Add Custom Code
				</Button>
			</Card>

			<Card className="p-6 bg-card border-border">
				<div className="mb-6">
					<h3 className="text-lg font-semibold text-foreground">Attendance Policies</h3>
					<p className="text-sm text-muted-foreground mt-1">
						Set thresholds and rules for attendance tracking
					</p>
				</div>

				<div className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="tardy-threshold">Tardy Threshold (minutes)</Label>
							<Input 
								id="tardy-threshold" 
								type="number" 
								defaultValue="15" 
								className="mt-1.5 bg-input border-border" 
							/>
							<p className="text-xs text-muted-foreground mt-1.5">
								Minutes late before marked as tardy
							</p>
						</div>
						<div>
							<Label htmlFor="absence-threshold">Absence Alert Threshold</Label>
							<Input 
								id="absence-threshold" 
								type="number" 
								defaultValue="5" 
								className="mt-1.5 bg-input border-border" 
							/>
							<p className="text-xs text-muted-foreground mt-1.5">
								Number of absences before alert
							</p>
						</div>
					</div>

					<div className="space-y-3 pt-2">
						<div className="flex items-center gap-2">
							<input type="checkbox" id="auto-notify" defaultChecked className="rounded" />
							<Label htmlFor="auto-notify" className="text-sm font-normal cursor-pointer">
								Automatically notify parents of absences
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<input type="checkbox" id="require-excuse" defaultChecked className="rounded" />
							<Label htmlFor="require-excuse" className="text-sm font-normal cursor-pointer">
								Require documentation for excused absences
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<input type="checkbox" id="track-partial" className="rounded" />
							<Label htmlFor="track-partial" className="text-sm font-normal cursor-pointer">
								Track partial day absences
							</Label>
						</div>
					</div>
				</div>
			</Card>

			<div className="flex justify-between items-center">
				{saveStatus === "saved" && (
					<Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
						<CheckCircle className="h-3 w-3 mr-1" />
						Changes saved successfully
					</Badge>
				)}
				
				<Button 
					onClick={handleSave} 
					disabled={isSaving} 
					className="bg-primary hover:bg-primary/90"
				>
					<Save className="h-4 w-4 mr-2" />
					{isSaving ? "Saving..." : "Save Changes"}
				</Button>
			</div>
		</div>
	);
}
