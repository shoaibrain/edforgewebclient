"use client";

/**
 * EdForge EMIS - Create Grading Period Dialog Component
 * 
 * Dialog for creating new grading periods (terms) within an academic year.
 * Uses real API integration matching CreateGradingPeriodDto structure.
 */

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, Loader2, Calendar } from "lucide-react";
import { createGradingPeriodAction, getGradingPeriodsAction } from "@/actions/school-actions";
import type { CreateGradingPeriodRequest, AcademicYear } from "@edforge/shared-types";
import { getUserFriendlyMessage } from "@/lib/api-errors";

interface CreateGradingPeriodDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	schoolId: string;
	academicYearId: string;
	academicYear?: AcademicYear;
	onSuccess?: () => void;
}

export function CreateGradingPeriodDialog({
	open,
	onOpenChange,
	schoolId,
	academicYearId,
	academicYear,
	onSuccess
}: CreateGradingPeriodDialogProps) {
	const [isCreating, setIsCreating] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [nextPeriodNumber, setNextPeriodNumber] = useState<number>(1);
	const [formData, setFormData] = useState({
		periodName: "",
		periodType: "semester" as "semester" | "quarter" | "trimester" | "custom",
		periodNumber: 1,
		startDate: "",
		endDate: "",
		isCurrent: false,
		instructionalDays: "",
		gradesDueDate: "",
		reportCardDate: "",
	});

	// Fetch existing grading periods to determine next period number
	useEffect(() => {
		if (open && schoolId && academicYearId) {
			fetchNextPeriodNumber();
		}
	}, [open, schoolId, academicYearId]);

	const fetchNextPeriodNumber = async () => {
		try {
			const periods = await getGradingPeriodsAction(schoolId, academicYearId);
			if (periods.length > 0) {
				const maxPeriodNumber = Math.max(...periods.map(p => p.periodNumber));
				setNextPeriodNumber(maxPeriodNumber + 1);
				setFormData(prev => ({ ...prev, periodNumber: maxPeriodNumber + 1 }));
			} else {
				setNextPeriodNumber(1);
				setFormData(prev => ({ ...prev, periodNumber: 1 }));
			}
		} catch (err) {
			console.error("[CreateGradingPeriodDialog] Error fetching periods:", err);
			// Default to 1 if fetch fails
			setNextPeriodNumber(1);
		}
	};

	// Reset form when dialog closes
	useEffect(() => {
		if (!open) {
			setFormData({
				periodName: "",
				periodType: "semester",
				periodNumber: nextPeriodNumber,
				startDate: "",
				endDate: "",
				isCurrent: false,
				instructionalDays: "",
				gradesDueDate: "",
				reportCardDate: "",
			});
			setError(null);
		}
	}, [open, nextPeriodNumber]);

	// Set default dates based on academic year if available
	useEffect(() => {
		if (academicYear && open && !formData.startDate) {
			// Set start date to academic year start date
			setFormData(prev => ({ ...prev, startDate: academicYear.startDate.split('T')[0] }));
		}
	}, [academicYear, open]);

	const handleCreate = async () => {
		if (!formData.periodName || !formData.startDate || !formData.endDate) {
			setError("Please fill in all required fields");
			return;
		}

		// Validate dates are within academic year boundaries
		if (academicYear) {
			const yearStart = new Date(academicYear.startDate);
			const yearEnd = new Date(academicYear.endDate);
			const periodStart = new Date(formData.startDate);
			const periodEnd = new Date(formData.endDate);

			if (periodStart < yearStart || periodEnd > yearEnd) {
				setError(`Period dates must be within academic year: ${academicYear.startDate.split('T')[0]} to ${academicYear.endDate.split('T')[0]}`);
				return;
			}
		}

		setIsCreating(true);
		setError(null);

		try {
			const periodData: CreateGradingPeriodRequest = {
				periodName: formData.periodName,
				periodType: formData.periodType,
				periodNumber: formData.periodNumber,
				startDate: formData.startDate,
				endDate: formData.endDate,
				isCurrent: formData.isCurrent || undefined,
				instructionalDays: formData.instructionalDays ? parseInt(formData.instructionalDays) : undefined,
				gradesDueDate: formData.gradesDueDate || undefined,
				reportCardDate: formData.reportCardDate || undefined,
			};

			await createGradingPeriodAction(schoolId, academicYearId, periodData);

			// Success - close dialog and refresh
			onOpenChange(false);
			if (onSuccess) {
				onSuccess();
			}
		} catch (err: any) {
			console.error("[CreateGradingPeriodDialog] Error creating grading period:", err);
			// Use improved error message extraction to show detailed backend validation errors
			const errorMessage = getUserFriendlyMessage(err);
			setError(errorMessage || "Failed to create grading period. Please try again.");
		} finally {
			setIsCreating(false);
		}
	};

	const handleInputChange = (field: string, value: string | number | boolean) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-card border-border sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 gap-0">
				<DialogHeader className="p-6 pb-4 border-b border-border/50 bg-muted/20">
					<DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
						<Calendar className="h-5 w-5 text-primary" />
						Create Grading Period
					</DialogTitle>
					<DialogDescription className="text-muted-foreground">
						Add a new term (grading period) to the academic year
					</DialogDescription>
				</DialogHeader>

				<div className="p-6 space-y-6">
					{error && (
						<div className="rounded-md bg-destructive/15 border border-destructive/50 p-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
							<AlertCircle className="h-4 w-4 text-destructive" />
							<p className="text-sm text-destructive">{error}</p>
						</div>
					)}

					<div className="grid gap-6">
						<div className="grid gap-2">
							<Label htmlFor="period-name" className="text-sm font-medium">Period Name <span className="text-destructive">*</span></Label>
							<Input
								id="period-name"
								placeholder="e.g., Fall Semester, Q1, Trimester 1"
								value={formData.periodName}
								onChange={(e) => handleInputChange("periodName", e.target.value)}
								className="h-10 bg-background/50 focus:bg-background transition-colors"
								required
							/>
							<p className="text-[11px] text-muted-foreground">
								Display name for this grading period
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="period-type" className="text-sm font-medium">Period Type <span className="text-destructive">*</span></Label>
								<select
									id="period-type"
									value={formData.periodType}
									onChange={(e) => handleInputChange("periodType", e.target.value)}
									className="h-10 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
									required
								>
									<option value="semester">Semester</option>
									<option value="quarter">Quarter</option>
									<option value="trimester">Trimester</option>
									<option value="custom">Custom</option>
								</select>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="period-number" className="text-sm font-medium">Period Number <span className="text-destructive">*</span></Label>
								<Input
									id="period-number"
									type="number"
									min="1"
									value={formData.periodNumber}
									onChange={(e) => handleInputChange("periodNumber", parseInt(e.target.value) || 1)}
									className="h-10 bg-background/50 focus:bg-background transition-colors"
									required
								/>
								<p className="text-[11px] text-muted-foreground">
									Sequence number (1, 2, 3, 4...)
								</p>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="start-date" className="text-sm font-medium">Start Date <span className="text-destructive">*</span></Label>
								<Input
									id="start-date"
									type="date"
									value={formData.startDate}
									onChange={(e) => handleInputChange("startDate", e.target.value)}
									min={academicYear?.startDate.split('T')[0]}
									max={academicYear?.endDate.split('T')[0]}
									className="h-10 bg-background/50 focus:bg-background transition-colors"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="end-date" className="text-sm font-medium">End Date <span className="text-destructive">*</span></Label>
								<Input
									id="end-date"
									type="date"
									value={formData.endDate}
									onChange={(e) => handleInputChange("endDate", e.target.value)}
									min={formData.startDate || academicYear?.startDate.split('T')[0]}
									max={academicYear?.endDate.split('T')[0]}
									className="h-10 bg-background/50 focus:bg-background transition-colors"
									required
								/>
							</div>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="instructional-days" className="text-sm font-medium">Instructional Days</Label>
							<Input
								id="instructional-days"
								type="number"
								min="0"
								placeholder="Auto-calculated if empty"
								value={formData.instructionalDays}
								onChange={(e) => handleInputChange("instructionalDays", e.target.value)}
								className="h-10 bg-background/50 focus:bg-background transition-colors"
							/>
							<p className="text-[11px] text-muted-foreground">
								Number of teaching days (optional)
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="grades-due-date" className="text-sm font-medium">Grades Due Date</Label>
								<Input
									id="grades-due-date"
									type="date"
									value={formData.gradesDueDate}
									onChange={(e) => handleInputChange("gradesDueDate", e.target.value)}
									min={formData.startDate}
									max={formData.endDate}
									className="h-10 bg-background/50 focus:bg-background transition-colors"
								/>
								<p className="text-[11px] text-muted-foreground">
									When teachers must submit grades
								</p>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="report-card-date" className="text-sm font-medium">Report Card Date</Label>
								<Input
									id="report-card-date"
									type="date"
									value={formData.reportCardDate}
									onChange={(e) => handleInputChange("reportCardDate", e.target.value)}
									min={formData.endDate}
									className="h-10 bg-background/50 focus:bg-background transition-colors"
								/>
								<p className="text-[11px] text-muted-foreground">
									When report cards are issued
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3 rounded-lg bg-primary/5 border border-primary/20 p-4">
							<input
								type="checkbox"
								id="is-current-period"
								checked={formData.isCurrent}
								onChange={(e) => handleInputChange("isCurrent", e.target.checked)}
								className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
							/>
							<Label htmlFor="is-current-period" className="text-sm font-medium cursor-pointer flex-1">
								Set as current active period
							</Label>
						</div>
					</div>
				</div>

				<DialogFooter className="p-6 pt-2 border-t border-border/50 bg-muted/20">
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isCreating}
						className="bg-background hover:bg-muted"
					>
						Cancel
					</Button>
					<Button
						onClick={handleCreate}
						disabled={isCreating || !formData.periodName || !formData.startDate || !formData.endDate}
						className="bg-primary hover:bg-primary/90 shadow-sm"
					>
						{isCreating ? (
							<>
								<Loader2 className="h-4 w-4 mr-2 animate-spin" />
								Creating...
							</>
						) : (
							<>
								<CheckCircle className="h-4 w-4 mr-2" />
								Create Period
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

