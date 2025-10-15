"use client";

/**
 * EdForge EMIS - Grading Settings Component
 * 
 * Configures grade scales, passing marks, and grading policies.
 * Adapted from V0 prototype for EdForge dashboard integration.
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function GradingSettings() {
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
				<h2 className="text-2xl font-semibold text-foreground">Grading System</h2>
				<p className="text-sm text-muted-foreground mt-1">
					Configure grade scales, passing marks, and grading policies
				</p>
			</div>

			<Card className="p-6 bg-card border-border">
				<div className="mb-6">
					<h3 className="text-lg font-semibold text-foreground">Grade Scale</h3>
					<p className="text-sm text-muted-foreground mt-1">
						Define letter grades and their corresponding percentage ranges
					</p>
				</div>

				<div className="space-y-3">
					{[
						{ grade: "A", min: "90", max: "100", gpa: "4.0" },
						{ grade: "B", min: "80", max: "89", gpa: "3.0" },
						{ grade: "C", min: "70", max: "79", gpa: "2.0" },
						{ grade: "D", min: "60", max: "69", gpa: "1.0" },
						{ grade: "F", min: "0", max: "59", gpa: "0.0" },
					].map((item) => (
						<div key={item.grade} className="grid grid-cols-4 gap-4 items-center p-3 rounded-lg bg-accent/30">
							<div>
								<Label className="text-xs text-muted-foreground">Grade</Label>
								<div className="text-lg font-semibold text-foreground mt-1">{item.grade}</div>
							</div>
							<div>
								<Label htmlFor={`min-${item.grade}`} className="text-xs text-muted-foreground">
									Min %
								</Label>
								<Input 
									id={`min-${item.grade}`} 
									defaultValue={item.min} 
									className="mt-1 bg-input border-border h-9" 
								/>
							</div>
							<div>
								<Label htmlFor={`max-${item.grade}`} className="text-xs text-muted-foreground">
									Max %
								</Label>
								<Input 
									id={`max-${item.grade}`} 
									defaultValue={item.max} 
									className="mt-1 bg-input border-border h-9" 
								/>
							</div>
							<div>
								<Label htmlFor={`gpa-${item.grade}`} className="text-xs text-muted-foreground">
									GPA
								</Label>
								<Input 
									id={`gpa-${item.grade}`} 
									defaultValue={item.gpa} 
									className="mt-1 bg-input border-border h-9" 
								/>
							</div>
						</div>
					))}
				</div>
			</Card>

			<Card className="p-6 bg-card border-border">
				<div className="mb-6">
					<h3 className="text-lg font-semibold text-foreground">Grading Policies</h3>
					<p className="text-sm text-muted-foreground mt-1">
						Set institution-wide grading rules and thresholds
					</p>
				</div>

				<div className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="passing-grade">Minimum Passing Grade</Label>
							<Input 
								id="passing-grade" 
								defaultValue="60" 
								className="mt-1.5 bg-input border-border" 
							/>
						</div>
						<div>
							<Label htmlFor="honors-threshold">Honors Threshold</Label>
							<Input 
								id="honors-threshold" 
								defaultValue="90" 
								className="mt-1.5 bg-input border-border" 
							/>
						</div>
					</div>

					<div className="space-y-3 pt-2">
						<div className="flex items-center gap-2">
							<input type="checkbox" id="weighted-gpa" defaultChecked className="rounded" />
							<Label htmlFor="weighted-gpa" className="text-sm font-normal cursor-pointer">
								Enable weighted GPA for honors and AP courses
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<input type="checkbox" id="plus-minus" className="rounded" />
							<Label htmlFor="plus-minus" className="text-sm font-normal cursor-pointer">
								Use plus/minus grading (A+, A, A-, etc.)
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<input type="checkbox" id="round-grades" defaultChecked className="rounded" />
							<Label htmlFor="round-grades" className="text-sm font-normal cursor-pointer">
								Round final grades to nearest whole number
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
