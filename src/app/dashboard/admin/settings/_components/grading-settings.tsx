"use client";

/**
 * EdForge EMIS - Grading Settings Component
 * 
 * Configures grade scales, passing marks, and grading policies.
 * 
 * NOTE: The grading configuration API is not yet available.
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
	Percent,
	Calculator,
	BookOpen,
	Save,
	AlertCircle,
	CheckCircle2,
	Trash2,
	Edit2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { School } from "@edforge/shared-types";

interface GradingSettingsProps {
	school: School;
}

// Mock Data Types
interface GradeScale {
	id: string;
	name: string;
	type: "letter" | "percentage" | "points";
	ranges: {
		grade: string;
		min: number;
		max: number;
		gpaPoint: number;
	}[];
	isDefault: boolean;
}

interface GradeCategory {
	id: string;
	name: string;
	weight: number;
	color: string;
}

export function GradingSettings({ school }: GradingSettingsProps) {
	const [activeTab, setActiveTab] = useState<"scales" | "gpa" | "categories">("scales");

	// Mock Data State
	const [gradeScales] = useState<GradeScale[]>([
		{
			id: "1",
			name: "Standard 4.0 Scale",
			type: "letter",
			isDefault: true,
			ranges: [
				{ grade: "A", min: 90, max: 100, gpaPoint: 4.0 },
				{ grade: "B", min: 80, max: 89, gpaPoint: 3.0 },
				{ grade: "C", min: 70, max: 79, gpaPoint: 2.0 },
				{ grade: "D", min: 60, max: 69, gpaPoint: 1.0 },
				{ grade: "F", min: 0, max: 59, gpaPoint: 0.0 },
			]
		},
		{
			id: "2",
			name: "Honors Scale (Weighted)",
			type: "letter",
			isDefault: false,
			ranges: [
				{ grade: "A", min: 90, max: 100, gpaPoint: 5.0 },
				{ grade: "B", min: 80, max: 89, gpaPoint: 4.0 },
				{ grade: "C", min: 70, max: 79, gpaPoint: 3.0 },
				{ grade: "D", min: 60, max: 69, gpaPoint: 1.0 },
				{ grade: "F", min: 0, max: 59, gpaPoint: 0.0 },
			]
		}
	]);

	const [categories] = useState<GradeCategory[]>([
		{ id: "1", name: "Tests & Exams", weight: 40, color: "bg-red-500" },
		{ id: "2", name: "Quizzes", weight: 20, color: "bg-blue-500" },
		{ id: "3", name: "Homework", weight: 15, color: "bg-green-500" },
		{ id: "4", name: "Classwork", weight: 15, color: "bg-yellow-500" },
		{ id: "5", name: "Participation", weight: 10, color: "bg-purple-500" },
	]);

	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-semibold text-foreground">Grading System</h2>
					<p className="text-sm text-muted-foreground mt-1">
						Configure grade scales, GPA calculations, and grading categories
					</p>
				</div>
				<Button className="bg-primary hover:bg-primary/90 shadow-sm">
					<Save className="h-4 w-4 mr-2" />
					Save Changes
				</Button>
			</div>

			<div className="flex items-center gap-2 p-1 bg-muted/50 rounded-lg w-fit">
				<Button
					variant={activeTab === "scales" ? "default" : "ghost"}
					size="sm"
					onClick={() => setActiveTab("scales")}
					className={activeTab === "scales" ? "bg-background text-foreground shadow-sm hover:bg-background" : "hover:bg-background/50"}
				>
					<Percent className="h-4 w-4 mr-2" />
					Grade Scales
				</Button>
				<Button
					variant={activeTab === "gpa" ? "default" : "ghost"}
					size="sm"
					onClick={() => setActiveTab("gpa")}
					className={activeTab === "gpa" ? "bg-background text-foreground shadow-sm hover:bg-background" : "hover:bg-background/50"}
				>
					<Calculator className="h-4 w-4 mr-2" />
					GPA Calculation
				</Button>
				<Button
					variant={activeTab === "categories" ? "default" : "ghost"}
					size="sm"
					onClick={() => setActiveTab("categories")}
					className={activeTab === "categories" ? "bg-background text-foreground shadow-sm hover:bg-background" : "hover:bg-background/50"}
				>
					<BookOpen className="h-4 w-4 mr-2" />
					Categories
				</Button>
			</div>

			{activeTab === "scales" && (
				<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<div className="grid gap-6">
						{gradeScales.map((scale) => (
							<Card key={scale.id} className="overflow-hidden border-border shadow-sm">
								<div className="p-6 border-b border-border bg-muted/10 flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
											<Percent className="h-5 w-5 text-primary" />
										</div>
										<div>
											<div className="flex items-center gap-3">
												<h3 className="font-semibold text-foreground">{scale.name}</h3>
												{scale.isDefault && (
													<Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
														Default
													</Badge>
												)}
											</div>
											<p className="text-sm text-muted-foreground">
												{scale.type.charAt(0).toUpperCase() + scale.type.slice(1)} based grading scale
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Button variant="ghost" size="sm">
											<Edit2 className="h-4 w-4 mr-2" />
											Edit
										</Button>
										{!scale.isDefault && (
											<Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
												<Trash2 className="h-4 w-4" />
											</Button>
										)}
									</div>
								</div>
								<div className="p-0">
									<table className="w-full text-sm">
										<thead className="bg-muted/30 text-muted-foreground font-medium">
											<tr>
												<th className="px-6 py-3 text-left">Grade</th>
												<th className="px-6 py-3 text-left">Range</th>
												<th className="px-6 py-3 text-left">GPA Points</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-border">
											{scale.ranges.map((range, index) => (
												<tr key={index} className="hover:bg-muted/20 transition-colors">
													<td className="px-6 py-3 font-medium">{range.grade}</td>
													<td className="px-6 py-3 text-muted-foreground">{range.min}% - {range.max}%</td>
													<td className="px-6 py-3">{range.gpaPoint.toFixed(1)}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</Card>
						))}

						<Button variant="outline" className="w-full border-dashed py-8 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5">
							<Plus className="h-4 w-4 mr-2" />
							Add New Grade Scale
						</Button>
					</div>
				</div>
			)}

			{activeTab === "gpa" && (
				<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<Card className="p-6 border-border shadow-sm">
						<h3 className="text-lg font-semibold mb-6">GPA Configuration</h3>
						<div className="grid gap-6 max-w-2xl">
							<div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/10">
								<div className="space-y-0.5">
									<Label className="text-base">Weighted GPA</Label>
									<p className="text-sm text-muted-foreground">
										Calculate GPA with added weight for honors/AP courses
									</p>
								</div>
								<Switch defaultChecked />
							</div>

							<div className="grid gap-2">
								<Label>Calculation Method</Label>
								<Select defaultValue="average">
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="average">Simple Average</SelectItem>
										<SelectItem value="weighted">Weighted Average</SelectItem>
										<SelectItem value="sum">Sum of Points</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid gap-2">
								<Label>Decimal Places</Label>
								<Select defaultValue="2">
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1">1 Decimal Place (e.g. 3.5)</SelectItem>
										<SelectItem value="2">2 Decimal Places (e.g. 3.55)</SelectItem>
										<SelectItem value="3">3 Decimal Places (e.g. 3.552)</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</Card>
				</div>
			)}

			{activeTab === "categories" && (
				<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{categories.map((category) => (
							<Card key={category.id} className="p-6 border-border shadow-sm hover:shadow-md transition-shadow">
								<div className="flex items-start justify-between mb-4">
									<div className={`h-3 w-3 rounded-full ${category.color}`} />
									<Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2">
										<MoreVertical className="h-4 w-4 text-muted-foreground" />
									</Button>
								</div>
								<div className="space-y-1">
									<h3 className="font-semibold text-lg">{category.name}</h3>
									<div className="flex items-baseline gap-1">
										<span className="text-2xl font-bold">{category.weight}%</span>
										<span className="text-sm text-muted-foreground">weight</span>
									</div>
								</div>
								<div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
									<span>Default Category</span>
									<Switch defaultChecked />
								</div>
							</Card>
						))}
						<Button variant="outline" className="h-auto min-h-[180px] flex flex-col items-center justify-center gap-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
							<div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
								<Plus className="h-5 w-5" />
							</div>
							<span className="font-medium">Add Category</span>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
