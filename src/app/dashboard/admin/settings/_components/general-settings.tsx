"use client";

/**
 * EdForge EMIS - General Settings Component
 * 
 * Handles basic institution information, contact details, and mission statement.
 * Uses real school data from API and supports updates via Server Actions.
 */

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Save, CheckCircle, AlertCircle, Building2, MapPin, Phone, Mail, Globe, Award, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { updateSchoolAction, getSchoolAction } from "@/actions/school-actions";
import type { School } from "@edforge/shared-types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { HttpStatus } from "@/types/api";

const SCHOOL_TYPES = [
	{ value: "elementary", label: "Elementary" },
	{ value: "middle", label: "Middle School" },
	{ value: "high", label: "High School" },
	{ value: "k12", label: "K-12" },
	{ value: "alternative", label: "Alternative" },
	{ value: "special", label: "Special Education" },
];

interface GeneralSettingsProps {
	school: School;
	onSchoolUpdate?: (updatedSchool: School) => void;
}

export function GeneralSettings({ school, onSchoolUpdate }: GeneralSettingsProps) {
	const router = useRouter();
	const [isSaving, setIsSaving] = useState(false);
	const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
	const [error, setError] = useState<string | null>(null);
	const [currentSchool, setCurrentSchool] = useState<School>(school);

	// Form state
	const [formData, setFormData] = useState({
		schoolName: school.schoolName || "",
		schoolCode: school.schoolCode || "",
		schoolType: school.schoolType || "elementary",
		description: school.description || "",
		motto: school.motto || "",
		logoUrl: school.logoUrl || "",
		accreditation: school.accreditationInfo?.accreditedBy?.join(", ") || "",
		// Contact Info
		primaryEmail: school.contactInfo?.primaryEmail || "",
		primaryPhone: school.contactInfo?.primaryPhone || "",
		secondaryPhone: school.contactInfo?.secondaryPhone || "",
		website: school.contactInfo?.website || "",
		// Address
		street: school.address?.street || "",
		city: school.address?.city || "",
		state: school.address?.state || "",
		country: school.address?.country || "US",
		postalCode: school.address?.postalCode || "",
	});

	// Update currentSchool when school prop changes
	useEffect(() => {
		setCurrentSchool(school);
	}, [school]);

	// Update form when school data changes
	useEffect(() => {
		setFormData({
			schoolName: currentSchool.schoolName || "",
			schoolCode: currentSchool.schoolCode || "",
			schoolType: currentSchool.schoolType || "elementary",
			description: currentSchool.description || "",
			motto: currentSchool.motto || "",
			logoUrl: currentSchool.logoUrl || "",
			accreditation: currentSchool.accreditationInfo?.accreditedBy?.join(", ") || "",
			primaryEmail: currentSchool.contactInfo?.primaryEmail || "",
			primaryPhone: currentSchool.contactInfo?.primaryPhone || "",
			secondaryPhone: currentSchool.contactInfo?.secondaryPhone || "",
			website: currentSchool.contactInfo?.website || "",
			street: currentSchool.address?.street || "",
			city: currentSchool.address?.city || "",
			state: currentSchool.address?.state || "",
			country: currentSchool.address?.country || "US",
			postalCode: currentSchool.address?.postalCode || "",
		});
	}, [currentSchool]);

	const handleSave = async (retryCount = 0) => {
		setIsSaving(true);
		setSaveStatus("saving");
		setError(null);

		try {
			// Prepare update data matching UpdateSchoolDto structure
			const updateData: any = {
				schoolName: formData.schoolName,
				contactInfo: {
					primaryEmail: formData.primaryEmail,
					primaryPhone: formData.primaryPhone,
					secondaryPhone: formData.secondaryPhone || undefined,
					website: formData.website || undefined,
				},
				address: {
					street: formData.street,
					city: formData.city,
					state: formData.state,
					country: formData.country,
					postalCode: formData.postalCode,
					timezone: currentSchool.address?.timezone || "America/New_York", // Preserve existing timezone
				},
				description: formData.description || undefined,
				version: currentSchool.version, // Required for optimistic locking - use current school version
			};

			// Only include accreditation if provided
			if (formData.accreditation) {
				updateData.accreditationInfo = {
					accreditedBy: formData.accreditation.split(",").map((s) => s.trim()).filter(Boolean),
				};
			}

			const updatedSchool = await updateSchoolAction(currentSchool.schoolId, updateData);

			// Immediately update local state with returned school data (including new version)
			setCurrentSchool(updatedSchool);
			if (onSchoolUpdate) {
				onSchoolUpdate(updatedSchool);
			}

			setSaveStatus("saved");
			setTimeout(() => setSaveStatus("idle"), 3000);

			// Refresh the page data (async, but state is already updated)
			router.refresh();
		} catch (err: any) {
			console.error("[GeneralSettings] Error updating school:", err);

			// Check if it's a conflict error (409) and retry with fresh data
			const isConflict = axios.isAxiosError(err) && err.response?.status === HttpStatus.CONFLICT;

			if (isConflict && retryCount < 2) {
				// Fetch fresh school data and retry
				try {
					console.log(`[GeneralSettings] Conflict detected (attempt ${retryCount + 1}), fetching fresh data...`);
					const freshSchool = await getSchoolAction(currentSchool.schoolId);
					setCurrentSchool(freshSchool);
					if (onSchoolUpdate) {
						onSchoolUpdate(freshSchool);
					}
					// Retry with fresh version
					return handleSave(retryCount + 1);
				} catch (fetchErr) {
					console.error("[GeneralSettings] Error fetching fresh school data:", fetchErr);
					setError("Failed to refresh data. Please refresh the page and try again.");
					setSaveStatus("error");
				}
			} else {
				// Show error message
				const errorMessage = err.response?.data?.message || err.message || "Failed to save changes. Please try again.";
				setError(errorMessage);
				setSaveStatus("error");
			}
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{error && (
				<div className="rounded-md bg-destructive/15 border border-destructive/50 p-4 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
					<AlertCircle className="h-5 w-5 text-destructive" />
					<p className="text-sm text-destructive">{error}</p>
				</div>
			)}

			{/* Institution Identity */}
			<section className="space-y-4">
				<div className="flex items-center gap-2 border-b pb-2">
					<Building2 className="h-5 w-5 text-primary" />
					<h2 className="text-lg font-semibold tracking-tight">Institution Identity</h2>
				</div>

				<Card className="p-6 border-border/60 shadow-sm hover:shadow-md transition-shadow duration-200">
					<div className="flex flex-col md:flex-row gap-8">
						{/* Logo Upload Section */}
						<div className="flex flex-col items-center gap-3 shrink-0">
							<div className="relative group cursor-pointer">
								{currentSchool.logoUrl ? (
									<img
										src={currentSchool.logoUrl}
										alt={`${currentSchool.schoolName} logo`}
										className="h-32 w-32 rounded-xl object-cover border-2 border-border shadow-sm group-hover:border-primary/50 transition-colors"
									/>
								) : (
									<div className="h-32 w-32 rounded-xl bg-muted/30 border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
										<Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
										<span className="text-xs text-muted-foreground font-medium">Upload Logo</span>
									</div>
								)}
								<div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
									<span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full">Change</span>
								</div>
							</div>
							<p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Institution Logo</p>
						</div>

						{/* Identity Fields */}
						<div className="flex-1 grid gap-6">
							<div className="grid gap-2">
								<Label htmlFor="institution-name" className="text-sm font-medium">Institution Name</Label>
								<Input
									id="institution-name"
									value={formData.schoolName}
									onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
									className="h-10 bg-background/50 focus:bg-background transition-colors"
									placeholder="e.g. Springfield High School"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="grid gap-2">
									<Label htmlFor="institution-code" className="text-sm font-medium">Institution Code</Label>
									<div className="relative">
										<Input
											id="institution-code"
											value={formData.schoolCode}
											onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })}
											className="h-10 bg-muted/50 font-mono text-sm pl-9"
											disabled
										/>
										<div className="absolute left-3 top-2.5 text-muted-foreground">
											<span className="text-xs font-bold">#</span>
										</div>
									</div>
									<p className="text-[11px] text-muted-foreground">
										Unique system identifier (read-only)
									</p>
								</div>

								<div className="grid gap-2">
									<Label htmlFor="institution-type" className="text-sm font-medium">Institution Type</Label>
									<Select
										value={formData.schoolType}
										onValueChange={(value: any) => setFormData({ ...formData, schoolType: value })}
									>
										<SelectTrigger className="h-10 bg-background/50">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{SCHOOL_TYPES.map((type) => (
												<SelectItem key={type.value} value={type.value}>
													{type.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="accreditation" className="text-sm font-medium">Accreditation</Label>
								<div className="relative">
									<Award className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										id="accreditation"
										value={formData.accreditation}
										onChange={(e) => setFormData({ ...formData, accreditation: e.target.value })}
										placeholder="e.g., Regional Accreditation Board"
										className="h-10 pl-9 bg-background/50 focus:bg-background transition-colors"
									/>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</section>

			{/* Contact Information */}
			<section className="space-y-4">
				<div className="flex items-center gap-2 border-b pb-2">
					<MapPin className="h-5 w-5 text-primary" />
					<h2 className="text-lg font-semibold tracking-tight">Contact & Location</h2>
				</div>

				<Card className="p-6 border-border/60 shadow-sm hover:shadow-md transition-shadow duration-200">
					<div className="grid gap-6">
						<div className="grid gap-2">
							<Label htmlFor="address" className="text-sm font-medium">Street Address</Label>
							<div className="relative">
								<MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									id="address"
									value={formData.street}
									onChange={(e) => setFormData({ ...formData, street: e.target.value })}
									className="h-10 pl-9 bg-background/50 focus:bg-background transition-colors"
									placeholder="123 Education Lane"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="city" className="text-sm font-medium">City</Label>
								<Input
									id="city"
									value={formData.city}
									onChange={(e) => setFormData({ ...formData, city: e.target.value })}
									className="h-10 bg-background/50"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="state" className="text-sm font-medium">State/Province</Label>
								<Input
									id="state"
									value={formData.state}
									onChange={(e) => setFormData({ ...formData, state: e.target.value })}
									className="h-10 bg-background/50"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="zip" className="text-sm font-medium">ZIP/Postal Code</Label>
								<Input
									id="zip"
									value={formData.postalCode}
									onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
									className="h-10 bg-background/50"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
							<div className="grid gap-2">
								<Label htmlFor="phone" className="text-sm font-medium">Primary Phone</Label>
								<div className="relative">
									<Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										id="phone"
										value={formData.primaryPhone}
										onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
										className="h-10 pl-9 bg-background/50"
										placeholder="+1 (555) 000-0000"
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										id="email"
										type="email"
										value={formData.primaryEmail}
										onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
										className="h-10 pl-9 bg-background/50"
										placeholder="admin@school.edu"
									/>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="grid gap-2">
								<Label htmlFor="secondary-phone" className="text-sm font-medium">Secondary Phone <span className="text-muted-foreground font-normal">(Optional)</span></Label>
								<div className="relative">
									<Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										id="secondary-phone"
										value={formData.secondaryPhone}
										onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value })}
										className="h-10 pl-9 bg-background/50"
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="website" className="text-sm font-medium">Website</Label>
								<div className="relative">
									<Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										id="website"
										type="url"
										value={formData.website}
										onChange={(e) => setFormData({ ...formData, website: e.target.value })}
										className="h-10 pl-9 bg-background/50"
										placeholder="https://www.school.edu"
									/>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</section>

			{/* Mission & Description */}
			<section className="space-y-4">
				<div className="flex items-center gap-2 border-b pb-2">
					<Target className="h-5 w-5 text-primary" />
					<h2 className="text-lg font-semibold tracking-tight">Mission & Description</h2>
				</div>

				<Card className="p-6 border-border/60 shadow-sm hover:shadow-md transition-shadow duration-200">
					<div className="space-y-6">
						<div className="grid gap-2">
							<Label htmlFor="motto" className="text-sm font-medium">Mission Statement / Motto</Label>
							<Textarea
								id="motto"
								rows={3}
								value={formData.motto}
								onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
								placeholder="Enter your institution's mission statement or motto..."
								className="min-h-[80px] bg-background/50 resize-y focus:bg-background transition-colors"
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="description" className="text-sm font-medium">Institution Description</Label>
							<Textarea
								id="description"
								rows={4}
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								placeholder="Brief description of your institution..."
								className="min-h-[100px] bg-background/50 resize-y focus:bg-background transition-colors"
							/>
						</div>
					</div>
				</Card>
			</section>

			{/* Save Actions */}
			<div className="sticky bottom-6 z-10 flex justify-end items-center gap-4 p-4 bg-background/80 backdrop-blur-md border border-border/50 rounded-xl shadow-lg">
				<div className="flex-1 flex items-center gap-2">
					{saveStatus === "saved" && (
						<div className="flex items-center gap-2 text-sm text-emerald-600 font-medium animate-in fade-in slide-in-from-left-2">
							<CheckCircle className="h-4 w-4" />
							Changes saved successfully
						</div>
					)}
					{saveStatus === "error" && (
						<div className="flex items-center gap-2 text-sm text-destructive font-medium animate-in fade-in slide-in-from-left-2">
							<AlertCircle className="h-4 w-4" />
							Failed to save changes
						</div>
					)}
				</div>

				<Button variant="outline" onClick={() => router.refresh()} disabled={isSaving}>
					Cancel
				</Button>
				<Button
					onClick={() => handleSave()}
					disabled={isSaving}
					className="min-w-[140px] shadow-md hover:shadow-lg transition-all"
				>
					{isSaving ? (
						<>
							<div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
							Saving...
						</>
					) : (
						<>
							<Save className="h-4 w-4 mr-2" />
							Save Changes
						</>
					)}
				</Button>
			</div>
		</div>
	);
}
