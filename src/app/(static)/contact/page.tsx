"use client";

import { useState } from "react";
import type { Metadata } from "next";
import {
	Mail,
	MapPin,
	MessageSquare,
	Send,
	Building2,
	Users,
	Headphones,
	Briefcase,
	CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const contactReasons = [
	{
		id: "sales",
		icon: Briefcase,
		title: "Sales Inquiry",
		description: "Learn about pricing and get a demo",
	},
	{
		id: "support",
		icon: Headphones,
		title: "Technical Support",
		description: "Get help with the platform",
	},
	{
		id: "partnership",
		icon: Users,
		title: "Partnership",
		description: "Explore partnership opportunities",
	},
	{
		id: "general",
		icon: MessageSquare,
		title: "General Question",
		description: "Other inquiries",
	},
];

export default function ContactPage() {
	const [selectedReason, setSelectedReason] = useState("sales");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setIsSubmitting(false);
		setIsSubmitted(true);
	};

	if (isSubmitted) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="max-w-md mx-auto px-6 text-center">
					<div className="p-4 rounded-full bg-green-500/10 w-fit mx-auto mb-6">
						<CheckCircle className="h-12 w-12 text-green-500" />
					</div>
					<h1 className="text-3xl font-bold text-foreground mb-4">Message Sent!</h1>
					<p className="text-muted-foreground mb-8">
						Thank you for reaching out. We'll get back to you within 1-2 business days.
					</p>
					<Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full">
						Send Another Message
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative py-20 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
				<div className="relative mx-auto max-w-4xl px-6">
					<div className="flex items-center justify-center mb-6">
						<div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
							<Mail className="h-12 w-12 text-primary" />
						</div>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
						Contact Us
					</h1>
					<p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
						Have questions about EdForge? We'd love to hear from you. Our team is here to help.
					</p>
				</div>
			</section>

			{/* Contact Content */}
			<section className="py-16">
				<div className="mx-auto max-w-6xl px-6">
					<div className="grid lg:grid-cols-3 gap-12">
						{/* Contact Information */}
						<div className="lg:col-span-1 space-y-8">
							<div>
								<h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
								<p className="text-muted-foreground">
									Whether you're interested in a demo, need technical support, or want to explore
									partnership opportunities, we're here to help.
								</p>
							</div>

							{/* Contact Details */}
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="p-2 rounded-lg bg-primary/10">
										<Mail className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold text-foreground">Email</h3>
										<a
											href="mailto:shoaibrain@edforge.net"
											className="text-muted-foreground hover:text-primary transition-colors"
										>
											shoaibrain@edforge.net
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="p-2 rounded-lg bg-primary/10">
										<MapPin className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold text-foreground">Address</h3>
										<p className="text-muted-foreground">
											6600 McKinney Ranch Parkway
											<br />
											McKinney, TX 75070
											<br />
											United States
										</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="p-2 rounded-lg bg-primary/10">
										<Building2 className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold text-foreground">Company</h3>
										<p className="text-muted-foreground">EdForge Technologies LLC</p>
									</div>
								</div>
							</div>

							{/* Direct Email Links */}
							<div className="p-6 rounded-2xl bg-card border border-border">
								<h3 className="font-semibold text-foreground mb-4">Direct Contacts</h3>
								<ul className="space-y-3 text-sm">
									<li>
										<span className="text-muted-foreground">All Inquiries:</span>{" "}
										<a
											href="mailto:shoaibrain@edforge.net"
											className="text-primary hover:underline"
										>
											shoaibrain@edforge.net
										</a>
									</li>
								</ul>
							</div>
						</div>

						{/* Contact Form */}
						<div className="lg:col-span-2">
							<div className="p-8 rounded-2xl bg-card border border-border">
								<h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

								<form onSubmit={handleSubmit} className="space-y-6">
									{/* Inquiry Type */}
									<div>
										<Label className="text-foreground mb-3 block">What can we help you with?</Label>
										<div className="grid grid-cols-2 gap-3">
											{contactReasons.map((reason) => (
												<button
													key={reason.id}
													type="button"
													onClick={() => setSelectedReason(reason.id)}
													className={`p-4 rounded-xl border text-left transition-all ${
														selectedReason === reason.id
															? "border-primary bg-primary/5"
															: "border-border bg-background hover:border-primary/50"
													}`}
												>
													<reason.icon
														className={`h-5 w-5 mb-2 ${
															selectedReason === reason.id ? "text-primary" : "text-muted-foreground"
														}`}
													/>
													<p className="font-semibold text-foreground text-sm">{reason.title}</p>
													<p className="text-xs text-muted-foreground">{reason.description}</p>
												</button>
											))}
										</div>
									</div>

									{/* Name Fields */}
									<div className="grid sm:grid-cols-2 gap-4">
										<div>
											<Label htmlFor="firstName" className="text-foreground">
												First Name *
											</Label>
											<input
												type="text"
												id="firstName"
												name="firstName"
												required
												className="mt-2 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
												placeholder="John"
											/>
										</div>
										<div>
											<Label htmlFor="lastName" className="text-foreground">
												Last Name *
											</Label>
											<input
												type="text"
												id="lastName"
												name="lastName"
												required
												className="mt-2 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
												placeholder="Doe"
											/>
										</div>
									</div>

									{/* Email */}
									<div>
										<Label htmlFor="email" className="text-foreground">
											Email Address *
										</Label>
										<input
											type="email"
											id="email"
											name="email"
											required
											className="mt-2 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
											placeholder="john.doe@school.edu"
										/>
									</div>

									{/* Organization */}
									<div>
										<Label htmlFor="organization" className="text-foreground">
											School/Organization
										</Label>
										<input
											type="text"
											id="organization"
											name="organization"
											className="mt-2 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
											placeholder="Lincoln High School"
										/>
									</div>

									{/* Role */}
									<div>
										<Label htmlFor="role" className="text-foreground">
											Your Role
										</Label>
										<select
											id="role"
											name="role"
											className="mt-2 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
										>
											<option value="">Select your role...</option>
											<option value="administrator">School Administrator</option>
											<option value="district_admin">District Administrator</option>
											<option value="teacher">Teacher</option>
											<option value="it_staff">IT Staff</option>
											<option value="other">Other</option>
										</select>
									</div>

									{/* Message */}
									<div>
										<Label htmlFor="message" className="text-foreground">
											Message *
										</Label>
										<textarea
											id="message"
											name="message"
											required
											rows={5}
											className="mt-2 w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
											placeholder="Tell us how we can help..."
										/>
									</div>

									{/* Submit Button */}
									<Button
										type="submit"
										size="lg"
										className="w-full rounded-xl"
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<span className="animate-spin mr-2">⏳</span>
												Sending...
											</>
										) : (
											<>
												<Send className="mr-2 h-4 w-4" />
												Send Message
											</>
										)}
									</Button>

									<p className="text-xs text-muted-foreground text-center">
										By submitting this form, you agree to our{" "}
										<a href="/privacy" className="text-primary hover:underline">
											Privacy Policy
										</a>
										.
									</p>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Teaser */}
			<section className="py-16 bg-muted/30">
				<div className="mx-auto max-w-4xl px-6 text-center">
					<h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
					<p className="text-muted-foreground mb-8">
						Looking for quick answers? Check out our most common questions.
					</p>
					<div className="grid sm:grid-cols-2 gap-6 text-left">
						<div className="p-6 rounded-2xl bg-card border border-border">
							<h3 className="font-semibold text-foreground mb-2">How secure is my data?</h3>
							<p className="text-sm text-muted-foreground">
								EdForge uses enterprise-grade security with AES-256 encryption, multi-tenant
								isolation, and FERPA-compliant audit logging.{" "}
								<a href="/security" className="text-primary hover:underline">
									Learn more
								</a>
							</p>
						</div>
						<div className="p-6 rounded-2xl bg-card border border-border">
							<h3 className="font-semibold text-foreground mb-2">Do you offer a free trial?</h3>
							<p className="text-sm text-muted-foreground">
								Yes! We offer a pilot program for schools interested in trying EdForge. Contact our
								sales team to get started.
							</p>
						</div>
						<div className="p-6 rounded-2xl bg-card border border-border">
							<h3 className="font-semibold text-foreground mb-2">What integrations do you support?</h3>
							<p className="text-sm text-muted-foreground">
								EdForge integrates with Google Workspace for Education, popular SIS systems, and
								offers an API for custom integrations.
							</p>
						</div>
						<div className="p-6 rounded-2xl bg-card border border-border">
							<h3 className="font-semibold text-foreground mb-2">Who owns the student data?</h3>
							<p className="text-sm text-muted-foreground">
								Schools retain full ownership of all student data. EdForge processes data only to
								provide services as outlined in our{" "}
								<a href="/terms" className="text-primary hover:underline">
									Terms of Service
								</a>
								.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

