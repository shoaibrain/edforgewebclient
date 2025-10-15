"use client";

/**
 * EdForge EMIS - School Year Settings Component
 * 
 * Manages academic years and their configurations.
 * Adapted from V0 prototype for EdForge dashboard integration.
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Calendar, CheckCircle2, Circle, Edit, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { CreateSchoolYearDialog } from "./create-school-year-dialog";

interface SchoolYear {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	status: "active" | "upcoming" | "archived";
	terms: number;
}

const mockSchoolYears: SchoolYear[] = [
	{
		id: "1",
		name: "2024-2025",
		startDate: "Aug 15, 2024",
		endDate: "Jun 10, 2025",
		status: "active",
		terms: 4,
	},
	{
		id: "2",
		name: "2025-2026",
		startDate: "Aug 18, 2025",
		endDate: "Jun 12, 2026",
		status: "upcoming",
		terms: 4,
	},
	{
		id: "3",
		name: "2023-2024",
		startDate: "Aug 16, 2023",
		endDate: "Jun 8, 2024",
		status: "archived",
		terms: 4,
	},
];

export function SchoolYearSettings() {
	const [showCreateDialog, setShowCreateDialog] = useState(false);

	const getStatusColor = (status: SchoolYear["status"]) => {
		switch (status) {
			case "active":
				return "bg-green-50 text-green-700 border-green-200";
			case "upcoming":
				return "bg-blue-50 text-blue-700 border-blue-200";
			case "archived":
				return "bg-gray-50 text-gray-700 border-gray-200";
			default:
				return "bg-gray-50 text-gray-700 border-gray-200";
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold text-foreground">School Years</h2>
					<p className="text-sm text-muted-foreground mt-1">
						Manage academic years and their configurations
					</p>
				</div>
				<Button 
					onClick={() => setShowCreateDialog(true)} 
					className="bg-primary hover:bg-primary/90"
				>
					<Plus className="h-4 w-4 mr-2" />
					Create School Year
				</Button>
			</div>

			<Card className="bg-card border-border overflow-hidden">
				<div className="divide-y divide-border">
					{mockSchoolYears.map((year) => (
						<div key={year.id} className="p-6 hover:bg-accent/50 transition-colors">
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-4">
									<div className="mt-1">
										{year.status === "active" ? (
											<CheckCircle2 className="h-5 w-5 text-green-600" />
										) : (
											<Circle className="h-5 w-5 text-muted-foreground" />
										)}
									</div>

									<div className="space-y-3">
										<div>
											<div className="flex items-center gap-3">
												<h3 className="text-lg font-semibold text-foreground">{year.name}</h3>
												<Badge variant="outline" className={getStatusColor(year.status)}>
													{year.status.charAt(0).toUpperCase() + year.status.slice(1)}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground mt-1">
												Academic year configuration and term management
											</p>
										</div>

										<div className="flex items-center gap-6 text-sm">
											<div className="flex items-center gap-2 text-muted-foreground">
												<Calendar className="h-4 w-4" />
												<span>
													{year.startDate} - {year.endDate}
												</span>
											</div>
											<div className="text-muted-foreground">{year.terms} Terms</div>
										</div>
									</div>
								</div>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="sm">
											<MoreVertical className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem>
											<Edit className="h-4 w-4 mr-2" />
											Edit Details
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Calendar className="h-4 w-4 mr-2" />
											Manage Terms
										</DropdownMenuItem>
										{year.status !== "active" && (
											<DropdownMenuItem>
												<CheckCircle2 className="h-4 w-4 mr-2" />
												Set as Active
											</DropdownMenuItem>
										)}
										<DropdownMenuSeparator />
										<DropdownMenuItem className="text-destructive">
											<Archive className="h-4 w-4 mr-2" />
											Archive Year
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					))}
				</div>
			</Card>

			<CreateSchoolYearDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
		</div>
	);
}
