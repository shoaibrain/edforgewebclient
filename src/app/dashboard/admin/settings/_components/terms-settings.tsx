"use client";

/**
 * EdForge EMIS - Terms Settings Component
 * 
 * Manages academic terms and semesters within school years.
 * Adapted from V0 prototype for EdForge dashboard integration.
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Term {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	status: "current" | "upcoming" | "completed";
	schoolYear: string;
}

const mockTerms: Term[] = [
	{
		id: "1",
		name: "Fall Semester",
		startDate: "Aug 15, 2024",
		endDate: "Dec 20, 2024",
		status: "current",
		schoolYear: "2024-2025",
	},
	{
		id: "2",
		name: "Spring Semester",
		startDate: "Jan 8, 2025",
		endDate: "Jun 10, 2025",
		status: "upcoming",
		schoolYear: "2024-2025",
	},
	{
		id: "3",
		name: "Spring Semester",
		startDate: "Jan 9, 2024",
		endDate: "Jun 8, 2024",
		status: "completed",
		schoolYear: "2023-2024",
	},
];

export function TermsSettings() {
	const [selectedYear, setSelectedYear] = useState("2024-2025");

	const getStatusColor = (status: Term["status"]) => {
		switch (status) {
			case "current":
				return "bg-green-50 text-green-700 border-green-200";
			case "upcoming":
				return "bg-blue-50 text-blue-700 border-blue-200";
			case "completed":
				return "bg-gray-50 text-gray-700 border-gray-200";
			default:
				return "bg-gray-50 text-gray-700 border-gray-200";
		}
	};

	const filteredTerms = mockTerms.filter((term) => term.schoolYear === selectedYear);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold text-foreground">Terms & Semesters</h2>
					<p className="text-sm text-muted-foreground mt-1">
						Configure academic terms within school years
					</p>
				</div>
				<Button className="bg-primary hover:bg-primary/90">
					<Plus className="h-4 w-4 mr-2" />
					Add Term
				</Button>
			</div>

			<Card className="p-4 bg-card border-border">
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">School Year:</span>
					<select
						value={selectedYear}
						onChange={(e) => setSelectedYear(e.target.value)}
						className="rounded-md border border-border bg-input px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
					>
						<option>2024-2025</option>
						<option>2025-2026</option>
						<option>2023-2024</option>
					</select>
				</div>
			</Card>

			<div className="grid gap-4">
				{filteredTerms.map((term) => (
					<Card key={term.id} className="p-6 bg-card border-border">
						<div className="flex items-start justify-between">
							<div className="space-y-3 flex-1">
								<div className="flex items-center gap-3">
									<h3 className="text-lg font-semibold text-foreground">{term.name}</h3>
									<Badge variant="outline" className={getStatusColor(term.status)}>
										{term.status.charAt(0).toUpperCase() + term.status.slice(1)}
									</Badge>
								</div>

								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Calendar className="h-4 w-4" />
									<span>
										{term.startDate} - {term.endDate}
									</span>
								</div>

								<div className="flex items-center gap-4 pt-2">
									<div className="text-sm">
										<span className="text-muted-foreground">Duration: </span>
										<span className="text-foreground font-medium">18 weeks</span>
									</div>
									<div className="text-sm">
										<span className="text-muted-foreground">Instructional Days: </span>
										<span className="text-foreground font-medium">90 days</span>
									</div>
								</div>
							</div>

							<Button variant="ghost" size="sm">
								<Edit2 className="h-4 w-4" />
							</Button>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
