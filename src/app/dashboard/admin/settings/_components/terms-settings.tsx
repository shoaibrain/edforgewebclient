"use client";

/**
 * EdForge EMIS - Terms Settings Component
 * 
 * Manages academic terms (grading periods) within school years.
 * Uses real data from API and supports creating/editing grading periods.
 */

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Edit2, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getGradingPeriodsAction } from "@/actions/school-actions";
import type { School, AcademicYear, GradingPeriod } from "@edforge/shared-types";
import { CreateGradingPeriodDialog } from "./create-grading-period-dialog";
import { useRouter } from "next/navigation";

interface TermsSettingsProps {
	school: School;
	academicYears: AcademicYear[];
}

export function TermsSettings({ school, academicYears }: TermsSettingsProps) {
	const router = useRouter();
	const [selectedYearId, setSelectedYearId] = useState<string | null>(null);
	const [gradingPeriods, setGradingPeriods] = useState<GradingPeriod[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showCreateDialog, setShowCreateDialog] = useState(false);

	// Set default to current academic year or first year
	useEffect(() => {
		if (academicYears.length > 0 && !selectedYearId) {
			const currentYear = academicYears.find(y => y.isCurrent) || academicYears[0];
			setSelectedYearId(currentYear.academicYearId);
		}
	}, [academicYears, selectedYearId]);

	// Fetch grading periods when year changes
	useEffect(() => {
		if (selectedYearId && school.schoolId) {
			fetchGradingPeriods();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedYearId, school.schoolId]);

	const fetchGradingPeriods = async () => {
		if (!selectedYearId || !school.schoolId) return;

		setIsLoading(true);
		setError(null);
		try {
			const periods = await getGradingPeriodsAction(school.schoolId, selectedYearId);
			// Sort by period number
			periods.sort((a, b) => a.periodNumber - b.periodNumber);
			setGradingPeriods(periods);
		} catch (err: any) {
			console.error("[TermsSettings] Error fetching grading periods:", err);
			setError(err.message || "Failed to load grading periods");
		} finally {
			setIsLoading(false);
		}
	};

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

	const getStatusColor = (status: GradingPeriod["status"]) => {
		switch (status) {
			case "active":
				return "bg-green-50 text-green-700 border-green-200";
			case "planned":
				return "bg-blue-50 text-blue-700 border-blue-200";
			case "completed":
				return "bg-gray-50 text-gray-700 border-gray-200";
			default:
				return "bg-gray-50 text-gray-700 border-gray-200";
		}
	};

	const getStatusLabel = (period: GradingPeriod): string => {
		if (period.isCurrent) return "Current";
		return period.status.charAt(0).toUpperCase() + period.status.slice(1);
	};

	const calculateDays = (startDate: string, endDate: string): number => {
		try {
			const start = new Date(startDate);
			const end = new Date(endDate);
			const diffTime = Math.abs(end.getTime() - start.getTime());
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			return diffDays;
		} catch {
			return 0;
		}
	};

	const selectedYear = academicYears.find(y => y.academicYearId === selectedYearId);

	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-semibold text-foreground">Terms & Semesters</h2>
					<p className="text-sm text-muted-foreground mt-1">
						Configure academic terms (grading periods) within school years
					</p>
				</div>
				<Button
					className="bg-primary hover:bg-primary/90 shadow-sm"
					disabled={!selectedYearId}
					onClick={() => setShowCreateDialog(true)}
				>
					<Plus className="h-4 w-4 mr-2" />
					Add Term
				</Button>
			</div>

			{error && (
				<div className="rounded-md bg-destructive/15 border border-destructive/50 p-4 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
					<AlertCircle className="h-5 w-5 text-destructive" />
					<p className="text-sm text-destructive">{error}</p>
				</div>
			)}

			<Card className="p-4 bg-card border-border shadow-sm">
				<div className="flex items-center gap-4">
					<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
						<Calendar className="h-5 w-5 text-primary" />
					</div>
					<div className="flex-1">
						<label className="text-sm font-medium text-muted-foreground mb-1.5 block">
							Select Academic Year
						</label>
						<Select
							value={selectedYearId || ""}
							// @ts-ignore
							onValueChange={(value) => setSelectedYearId(value)}
						>
							<SelectTrigger className="w-full sm:w-[300px] h-10 bg-background/50">
								<SelectValue placeholder="Select academic year" />
							</SelectTrigger>
							<SelectContent>
								{academicYears.map((year) => (
									<SelectItem key={year.academicYearId} value={year.academicYearId}>
										{year.yearName} {year.isCurrent && "(Current)"}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</Card>

			{isLoading ? (
				<div className="flex flex-col items-center justify-center p-12 gap-3">
					<Loader2 className="h-8 w-8 animate-spin text-primary" />
					<p className="text-sm text-muted-foreground">Loading grading periods...</p>
				</div>
			) : gradingPeriods.length === 0 ? (
				<Card className="p-12 text-center border-2 border-dashed border-muted-foreground/25 bg-muted/5">
					<div className="flex flex-col items-center gap-3">
						<div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
							<Calendar className="h-6 w-6 text-muted-foreground" />
						</div>
						<div className="space-y-1">
							<h3 className="font-medium text-foreground">No grading periods found</h3>
							<p className="text-sm text-muted-foreground">
								No terms configured for {selectedYear?.yearName || "selected year"}
							</p>
						</div>
						<Button
							variant="outline"
							className="mt-4"
							onClick={() => setShowCreateDialog(true)}
						>
							<Plus className="h-4 w-4 mr-2" />
							Create First Term
						</Button>
					</div>
				</Card>
			) : (
				<div className="grid gap-4">
					{gradingPeriods.map((period) => {
						const isActive = period.status === "active";
						return (
							<Card
								key={period.gradingPeriodId}
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
									<div className="flex-1 space-y-4">
										<div className="flex items-start justify-between">
											<div className="space-y-1">
												<div className="flex items-center gap-3 flex-wrap">
													<h3 className="text-lg font-semibold text-foreground">
														{period.periodName}
													</h3>
													<Badge
														variant={isActive ? "default" : "secondary"}
														className={isActive ? "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20" : ""}
													>
														{getStatusLabel(period)}
													</Badge>
													{period.periodCode && (
														<Badge variant="outline" className="font-mono text-xs">
															{period.periodCode}
														</Badge>
													)}
												</div>
												<div className="flex items-center gap-2 text-sm text-muted-foreground">
													<Calendar className="h-4 w-4" />
													<span>
														{formatDate(period.startDate)} - {formatDate(period.endDate)}
													</span>
													<span className="text-muted-foreground/50">•</span>
													<span>
														{calculateDays(period.startDate, period.endDate)} days
													</span>
												</div>
											</div>

											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8 text-muted-foreground hover:text-foreground"
												onClick={() => {
													console.log("Edit grading period - coming soon");
												}}
											>
												<Edit2 className="h-4 w-4" />
											</Button>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
											{period.gradeEntryDeadline && (
												<div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
													<div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
														<AlertCircle className="h-4 w-4 text-orange-600" />
													</div>
													<div>
														<p className="text-xs text-muted-foreground">Grades Due</p>
														<p className="text-sm font-medium text-foreground">
															{formatDate(period.gradeEntryDeadline)}
														</p>
													</div>
												</div>
											)}
											{period.reportCardDate && (
												<div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
													<div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
														<Calendar className="h-4 w-4 text-blue-600" />
													</div>
													<div>
														<p className="text-xs text-muted-foreground">Report Cards</p>
														<p className="text-sm font-medium text-foreground">
															{formatDate(period.reportCardDate)}
														</p>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</Card>
						);
					})}
				</div>
			)}

			<CreateGradingPeriodDialog
				open={showCreateDialog}
				onOpenChange={setShowCreateDialog}
				schoolId={school.schoolId}
				academicYearId={selectedYearId!}
				academicYear={selectedYear}
				onSuccess={() => {
					fetchGradingPeriods();
					setShowCreateDialog(false);
					router.refresh();
				}}
			/>
		</div>
	);
}
