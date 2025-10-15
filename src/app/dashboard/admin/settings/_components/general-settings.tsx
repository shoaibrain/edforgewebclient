"use client";

/**
 * EdForge EMIS - General Settings Component
 * 
 * Handles basic institution information, contact details, and mission statement.
 * Adapted from V0 prototype for EdForge dashboard integration.
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Save, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function GeneralSettings() {
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
			{/* Institution Identity */}
			<Card className="p-6 bg-card border-border">
				<div className="mb-6">
					<h2 className="text-xl font-semibold text-foreground">Institution Identity</h2>
					<p className="text-sm text-muted-foreground mt-1">
						Basic information about your educational institution
					</p>
				</div>

				<div className="space-y-6">
					<div className="flex items-start gap-6">
						<div className="shrink-0">
							<div className="h-24 w-24 rounded-lg bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
								<Upload className="h-8 w-8 text-primary" />
							</div>
							<Button variant="outline" size="sm" className="mt-2 w-24 bg-transparent">
								Upload
							</Button>
						</div>

						<div className="flex-1 space-y-4">
							<div>
								<Label htmlFor="institution-name">Institution Name</Label>
								<Input
									id="institution-name"
									defaultValue="Springfield High School"
									className="mt-1.5 bg-input border-border"
								/>
							</div>

							<div>
								<Label htmlFor="institution-code">Institution Code</Label>
								<Input 
									id="institution-code" 
									defaultValue="SHS-2024" 
									className="mt-1.5 bg-input border-border" 
								/>
								<p className="text-xs text-muted-foreground mt-1.5">
									Unique identifier used in reports and integrations
								</p>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="institution-type">Institution Type</Label>
							<select
								id="institution-type"
								className="mt-1.5 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
							>
								<option>High School</option>
								<option>Middle School</option>
								<option>Elementary School</option>
								<option>University</option>
								<option>College</option>
							</select>
						</div>

						<div>
							<Label htmlFor="accreditation">Accreditation</Label>
							<Input
								id="accreditation"
								placeholder="e.g., Regional Accreditation Board"
								className="mt-1.5 bg-input border-border"
							/>
						</div>
					</div>
				</div>
			</Card>

			{/* Contact Information */}
			<Card className="p-6 bg-card border-border">
				<div className="mb-6">
					<h2 className="text-xl font-semibold text-foreground">Contact Information</h2>
					<p className="text-sm text-muted-foreground mt-1">
						Primary contact details for your institution
					</p>
				</div>

				<div className="space-y-4">
					<div>
						<Label htmlFor="address">Street Address</Label>
						<Input 
							id="address" 
							defaultValue="742 Evergreen Terrace" 
							className="mt-1.5 bg-input border-border" 
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<Label htmlFor="city">City</Label>
							<Input 
								id="city" 
								defaultValue="Springfield" 
								className="mt-1.5 bg-input border-border" 
							/>
						</div>
						<div>
							<Label htmlFor="state">State/Province</Label>
							<Input 
								id="state" 
								defaultValue="IL" 
								className="mt-1.5 bg-input border-border" 
							/>
						</div>
						<div>
							<Label htmlFor="zip">ZIP/Postal Code</Label>
							<Input 
								id="zip" 
								defaultValue="62701" 
								className="mt-1.5 bg-input border-border" 
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<Label htmlFor="phone">Phone Number</Label>
							<Input 
								id="phone" 
								defaultValue="+1 (555) 123-4567" 
								className="mt-1.5 bg-input border-border" 
							/>
						</div>
						<div>
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								type="email"
								defaultValue="admin@springfield.edu"
								className="mt-1.5 bg-input border-border"
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="website">Website</Label>
						<Input 
							id="website" 
							defaultValue="https://springfield.edu" 
							className="mt-1.5 bg-input border-border" 
						/>
					</div>
				</div>
			</Card>

			{/* Mission & Description */}
			<Card className="p-6 bg-card border-border">
				<div className="mb-6">
					<h2 className="text-xl font-semibold text-foreground">Mission & Description</h2>
					<p className="text-sm text-muted-foreground mt-1">
						Share your institution's mission and values
					</p>
				</div>

				<div className="space-y-4">
					<div>
						<Label htmlFor="mission">Mission Statement</Label>
						<Textarea
							id="mission"
							rows={4}
							defaultValue="To provide exceptional education that empowers students to become lifelong learners and responsible global citizens."
							className="mt-1.5 bg-input border-border resize-none"
						/>
					</div>

					<div>
						<Label htmlFor="description">Institution Description</Label>
						<Textarea
							id="description"
							rows={3}
							placeholder="Brief description of your institution..."
							className="mt-1.5 bg-input border-border resize-none"
						/>
					</div>
				</div>
			</Card>

			{/* Save Actions */}
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
