"use client";

/**
 * EdForge EMIS - School Year Settings Component
 * 
 * Manages academic years and their configurations.
 * Uses real data from API and supports creating/editing academic years.
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Calendar, CheckCircle2, Circle, Edit, Archive, Loader2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { CreateSchoolYearDialog } from "./create-school-year-dialog";
import { updateAcademicYearAction } from "@/actions/school-actions";
import type { School, AcademicYear } from "@edforge/shared-types";
import { useRouter } from "next/navigation";

interface SchoolYearSettingsProps {
	school: School;
	academicYears: AcademicYear[];
}

export function SchoolYearSettings({ school, academicYears }: SchoolYearSettingsProps) {
	const router = useRouter();
	const [showCreateDialog, setShowCreateDialog] = useState(false);
	const [isUpdating, setIsUpdating] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const formatDate = (dateString: string): string => {
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric"
			});
		} catch {
			return dateString;
		}
	};

	const getStatusLabel = (year: AcademicYear): "active" | "upcoming" | "archived" => {
		if (year.isCurrent || year.status === "active") {
			return "active";
		}
		if (year.status === "planned") {
			return "upcoming";
		}
		return "archived";
	};

	const getStatusColor = (status: "active" | "upcoming" | "archived") => {
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

	const getTermCount = (year: AcademicYear): number => {
		// Use structure.gradingPeriodCount if available, otherwise default to 0
		return year.structure?.gradingPeriodCount || 0;
	};

	const handleSetAsActive = async (yearId: string) => {
		setIsUpdating(yearId);
		setError(null);
		try {
			// First, set all other years to not current
			// Then set this year as current
			await updateAcademicYearAction(school.schoolId, yearId, {
				isCurrent: true,
			});
			router.refresh();
		} catch (err: any) {
			console.error("[SchoolYearSettings] Error setting as active:", err);
			setError(err.message || "Failed to set year as active");
		} finally {
			setIsUpdating(null);
		}
	};

	const handleArchive = async (yearId: string) => {
		setIsUpdating(yearId);
		setError(null);
		try {
			await updateAcademicYearAction(school.schoolId, yearId, {
				status: "archived",
			});
			router.refresh();
		} catch (err: any) {
			console.error("[SchoolYearSettings] Error archiving year:", err);
			setError(err.message || "Failed to archive year");
		} finally {
			setIsUpdating(null);
		}
	};

	// Sort academic years: current first, then by start date descending
	const sortedYears = [...academicYears].sort((a, b) => {
		if (a.isCurrent && !b.isCurrent) return -1;
		if (!a.isCurrent && b.isCurrent) return 1;
		return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
	});

	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-semibold text-foreground">School Years</h2>
					<p className="text-sm text-muted-foreground mt-1">
						Manage academic years and their configurations
					</p>
				</div>
				<Button
					onClick={() => setShowCreateDialog(true)}
					className="bg-primary hover:bg-primary/90 shadow-sm"
				>
					<Plus className="h-4 w-4 mr-2" />
					Create School Year
				</Button>
			</div>

			{error && (
				<div className="rounded-md bg-destructive/15 border border-destructive/50 p-4 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
					<AlertCircle className="h-5 w-5 text-destructive" />
					<p className="text-sm text-destructive">{error}</p>
				</div>
			)}

			{academicYears.length === 0 ? (
				<Card className="p-12 text-center border-2 border-dashed border-muted-foreground/25 bg-muted/5">
					<div className="flex flex-col items-center gap-3">
						<div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
							<Calendar className="h-6 w-6 text-muted-foreground" />
						</div>
						<div className="space-y-1">
							<h3 className="font-medium text-foreground">No academic years found</h3>
							<p className="text-sm text-muted-foreground">
								Get started by creating your first academic year
							</p>
						</div>
						<Button
							variant="outline"
							className="mt-4"
							onClick={() => setShowCreateDialog(true)}
						>
							<Plus className="h-4 w-4 mr-2" />
							Create First School Year
						</Button>
					</div>
				</Card>
			) : (
				<div className="grid gap-4">
					{sortedYears.map((year) => {
						const status = getStatusLabel(year);
						const termCount = getTermCount(year);
						const isUpdatingThis = isUpdating === year.academicYearId;
						const isActive = status === "active";

						return (
							<Card
								key={year.academicYearId}
								className={`
									relative overflow-hidden transition-all duration-200
									${isActive
										? "bg-primary/5 border-primary/20 shadow-sm"
										: "bg-card border-border hover:border-primary/20 hover:shadow-sm"
									}
								`}
							>
								{isActive && (
									<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
								)}

								<div className="p-6 flex items-start justify-between gap-4">
									<div className="flex items-start gap-4">
										<div className={`
											mt-1 h-10 w-10 rounded-full flex items-center justify-center shrink-0
											${isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}
										`}>
											{isActive ? (
												<CheckCircle2 className="h-5 w-5" />
											) : (
												<Calendar className="h-5 w-5" />
											)}
										</div>

										<div className="space-y-1">
											<div className="flex items-center gap-3 flex-wrap">
												<h3 className="text-lg font-semibold text-foreground">{year.yearName}</h3>
												<Badge
													variant={isActive ? "default" : "secondary"}
													className={isActive ? "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20" : ""}
												>
													{status === "active" ? "Current Year" : status.charAt(0).toUpperCase() + status.slice(1)}
												</Badge>
												{year.yearCode && (
													<Badge variant="outline" className="font-mono text-xs">
														{year.yearCode}
													</Badge>
												)}
											</div>

											<p className="text-sm text-muted-foreground">
												Academic year configuration and term management
											</p>

											<div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
												<div className="flex items-center gap-2">
													<Calendar className="h-4 w-4" />
													<span>
														{formatDate(year.startDate)} - {formatDate(year.endDate)}
													</span>
												</div>
												{termCount > 0 && (
													<div className="flex items-center gap-2">
														<div className="h-1 w-1 rounded-full bg-muted-foreground" />
														<span>{termCount} Terms</span>
													</div>
												)}
											</div>
										</div>
									</div>

									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" disabled={isUpdatingThis} className="h-8 w-8">
												{isUpdatingThis ? (
													<Loader2 className="h-4 w-4 animate-spin" />
												) : (
													<MoreVertical className="h-4 w-4" />
												)}
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-48">
											<DropdownMenuItem
												onClick={() => {
													console.log("Edit academic year - coming soon");
												}}
											>
												<Edit className="h-4 w-4 mr-2" />
												Edit Details
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => {
													console.log("Manage terms - coming soon");
												}}
											>
												<Calendar className="h-4 w-4 mr-2" />
												Manage Terms
											</DropdownMenuItem>
											{status !== "active" && (
												<>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														onClick={() => handleSetAsActive(year.academicYearId)}
													>
														<CheckCircle2 className="h-4 w-4 mr-2" />
														Set as Active
													</DropdownMenuItem>
												</>
											)}
											<DropdownMenuSeparator />
											<DropdownMenuItem
												className="text-destructive focus:text-destructive"
												onClick={() => handleArchive(year.academicYearId)}
											>
												<Archive className="h-4 w-4 mr-2" />
												Archive Year
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</Card>
						);
					})}
				</div>
			)}

			<CreateSchoolYearDialog
				open={showCreateDialog}
				onOpenChange={setShowCreateDialog}
				schoolId={school.schoolId}
				onSuccess={() => {
					router.refresh();
				}}
			/>
		</div>
	);
}
