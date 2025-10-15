"use client";

/**
 * EdForge EMIS - Create School Year Dialog Component
 * 
 * Dialog for creating new academic years.
 * Adapted from V0 prototype for EdForge dashboard integration.
 */

import { useState } from "react";
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
import { CheckCircle } from "lucide-react";

interface CreateSchoolYearDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CreateSchoolYearDialog({ open, onOpenChange }: CreateSchoolYearDialogProps) {
	const [isCreating, setIsCreating] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		startDate: "",
		endDate: "",
		numTerms: "4",
		setActive: false,
	});

	const handleCreate = async () => {
		setIsCreating(true);
		
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));
		
		setIsCreating(false);
		onOpenChange(false);
		
		// Reset form
		setFormData({
			name: "",
			startDate: "",
			endDate: "",
			numTerms: "4",
			setActive: false,
		});
	};

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-card border-border sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle className="text-foreground">Create School Year</DialogTitle>
					<DialogDescription className="text-muted-foreground">
						Set up a new academic year with start and end dates
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-4">
					<div>
						<Label htmlFor="year-name">School Year Name</Label>
						<Input 
							id="year-name" 
							placeholder="e.g., 2025-2026" 
							value={formData.name}
							onChange={(e) => handleInputChange("name", e.target.value)}
							className="mt-1.5 bg-input border-border" 
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="start-date">Start Date</Label>
							<Input 
								id="start-date" 
								type="date" 
								value={formData.startDate}
								onChange={(e) => handleInputChange("startDate", e.target.value)}
								className="mt-1.5 bg-input border-border" 
							/>
						</div>
						<div>
							<Label htmlFor="end-date">End Date</Label>
							<Input 
								id="end-date" 
								type="date" 
								value={formData.endDate}
								onChange={(e) => handleInputChange("endDate", e.target.value)}
								className="mt-1.5 bg-input border-border" 
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="num-terms">Number of Terms</Label>
						<select
							id="num-terms"
							value={formData.numTerms}
							onChange={(e) => handleInputChange("numTerms", e.target.value)}
							className="mt-1.5 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
						>
							<option value="2">2 (Semesters)</option>
							<option value="3">3 (Trimesters)</option>
							<option value="4">4 (Quarters)</option>
						</select>
					</div>

					<div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/30 p-3">
						<input 
							type="checkbox" 
							id="set-active" 
							checked={formData.setActive}
							onChange={(e) => handleInputChange("setActive", e.target.checked)}
							className="rounded" 
						/>
						<Label htmlFor="set-active" className="text-sm font-normal cursor-pointer">
							Set as active school year immediately
						</Label>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button 
						onClick={handleCreate} 
						disabled={isCreating || !formData.name || !formData.startDate || !formData.endDate} 
						className="bg-primary hover:bg-primary/90"
					>
						{isCreating ? (
							<>
								<CheckCircle className="h-4 w-4 mr-2 animate-spin" />
								Creating...
							</>
						) : (
							"Create School Year"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
