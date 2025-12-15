import type { Metadata } from "next";
import { FileText, Scale, AlertTriangle, CheckCircle, Ban, Database, Gavel, Mail } from "lucide-react";

export const metadata: Metadata = {
	title: "Terms of Service",
	description:
		"EdForge Technologies LLC Terms of Service - Review our service agreement, acceptable use policy, and legal terms for using our EMIS platform.",
};

export default function TermsOfServicePage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative py-20 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
				<div className="relative mx-auto max-w-4xl px-6">
					<div className="flex items-center justify-center mb-6">
						<div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
							<FileText className="h-12 w-12 text-primary" />
						</div>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
						Terms of Service
					</h1>
					<p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
						Please read these terms carefully before using EdForge's Education Management
						Information System.
					</p>
					<p className="text-sm text-muted-foreground text-center mt-6">
						Last Updated: December 15, 2025
					</p>
				</div>
			</section>

			{/* Content */}
			<section className="py-16">
				<div className="mx-auto max-w-4xl px-6">
					<div className="prose prose-lg dark:prose-invert max-w-none">
						{/* Agreement */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Scale className="h-6 w-6 text-secondary" />
								Agreement to Terms
							</h2>
							<p className="text-muted-foreground">
								These Terms of Service ("Terms") constitute a legally binding agreement between you
								("User," "you," or "your") and EdForge Technologies LLC ("EdForge," "we," "us," or
								"our") governing your access to and use of our Education Management Information
								System (EMIS) platform and related services (collectively, the "Services").
							</p>
							<p className="text-muted-foreground">
								By accessing or using our Services, you agree to be bound by these Terms. If you are
								using the Services on behalf of an educational institution, school district, or
								organization, you represent that you have the authority to bind that entity to these
								Terms.
							</p>
							<p className="text-muted-foreground">
								EdForge Technologies LLC is a Texas limited liability company located at 6600 McKinney
								Ranch Parkway, McKinney, TX 75070.
							</p>
						</div>

						{/* Service Description */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<CheckCircle className="h-6 w-6 text-secondary" />
								Description of Services
							</h2>
							<p className="text-muted-foreground">
								EdForge provides an enterprise-grade Education Management Information System that
								includes:
							</p>
							<ul className="text-muted-foreground">
								<li>Student information and enrollment management</li>
								<li>Staff and teacher management</li>
								<li>Academic records and grade tracking</li>
								<li>Attendance monitoring</li>
								<li>Financial management and fee tracking</li>
								<li>Real-time analytics and reporting</li>
								<li>Multi-tenant institutional management</li>
								<li>Integration with third-party educational tools</li>
							</ul>
							<p className="text-muted-foreground">
								We reserve the right to modify, suspend, or discontinue any part of the Services at
								any time with reasonable notice to subscribers.
							</p>
						</div>

						{/* Acceptable Use */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<CheckCircle className="h-6 w-6 text-secondary" />
								Acceptable Use Policy
							</h2>
							<p className="text-muted-foreground">
								You agree to use EdForge Services only for lawful educational purposes. You agree to:
							</p>
							<ul className="text-muted-foreground">
								<li>Use the Services only for legitimate educational institution management</li>
								<li>Maintain the confidentiality of your account credentials</li>
								<li>Provide accurate and complete information</li>
								<li>Comply with all applicable laws, including FERPA, COPPA, and state privacy laws</li>
								<li>Obtain appropriate consent for the collection of student data</li>
								<li>Use appropriate security measures to protect access credentials</li>
								<li>Report any unauthorized access or security breaches promptly</li>
							</ul>
						</div>

						{/* Prohibited Uses */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Ban className="h-6 w-6 text-accent" />
								Prohibited Uses
							</h2>
							<p className="text-muted-foreground">You may NOT:</p>
							<ul className="text-muted-foreground">
								<li>Use the Services for any purpose other than educational institution management</li>
								<li>Sell, license, or commercially exploit student data</li>
								<li>Access or attempt to access accounts or data belonging to other tenants</li>
								<li>Introduce malware, viruses, or other harmful code</li>
								<li>Attempt to reverse engineer, decompile, or disassemble the Services</li>
								<li>Circumvent security measures or access controls</li>
								<li>Use the Services to violate any applicable law or regulation</li>
								<li>Share account credentials with unauthorized individuals</li>
								<li>Use automated systems to access the Services without permission</li>
							</ul>
						</div>

						{/* Data Ownership */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Database className="h-6 w-6 text-secondary" />
								Data Ownership and Rights
							</h2>
							<p className="text-muted-foreground">
								<strong>Your Data:</strong> You retain all ownership rights to the data you input
								into EdForge, including student records, staff information, and institutional data
								("Customer Data"). EdForge does not claim ownership of Customer Data.
							</p>
							<p className="text-muted-foreground">
								<strong>License to EdForge:</strong> You grant EdForge a limited, non-exclusive
								license to process, store, and transmit Customer Data solely to provide the Services.
							</p>
							<p className="text-muted-foreground">
								<strong>Student Education Records:</strong> Schools and districts retain full control
								over student education records as required by FERPA. EdForge acts as a "school
								official" with a legitimate educational interest.
							</p>
							<p className="text-muted-foreground">
								<strong>Data Export:</strong> You may export your Customer Data at any time in
								standard formats. Upon termination of service, you may request a complete export
								of your data.
							</p>
							<p className="text-muted-foreground">
								<strong>Data Deletion:</strong> Upon your request or termination of the service
								agreement, we will delete Customer Data within 90 days, except as required by law
								or for legitimate audit purposes.
							</p>
						</div>

						{/* Third-Party Integrations */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<CheckCircle className="h-6 w-6 text-secondary" />
								Third-Party Integrations
							</h2>
							<p className="text-muted-foreground">
								EdForge may integrate with third-party services, including but not limited to:
							</p>
							<ul className="text-muted-foreground">
								<li>Google Workspace for Education</li>
								<li>Student Information Systems (SIS)</li>
								<li>Learning Management Systems (LMS)</li>
								<li>Payment processors</li>
							</ul>
							<p className="text-muted-foreground">
								Your use of third-party integrations is subject to those providers' terms of service
								and privacy policies. EdForge is not responsible for the practices of third-party
								services.
							</p>
						</div>

						{/* AI Features Disclaimer */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<AlertTriangle className="h-6 w-6 text-warning" />
								AI-Powered Features Disclaimer
							</h2>
							<p className="text-muted-foreground">
								EdForge may include AI-powered analytics, predictions, and recommendations. You
								acknowledge and agree that:
							</p>
							<ul className="text-muted-foreground">
								<li>AI-generated insights are provided for informational purposes only</li>
								<li>AI predictions are not guaranteed to be accurate</li>
								<li>Final decisions regarding students should be made by qualified educators</li>
								<li>AI features should not replace professional educational judgment</li>
								<li>EdForge is not liable for decisions made based on AI recommendations</li>
							</ul>
						</div>

						{/* Disclaimers */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<AlertTriangle className="h-6 w-6 text-warning" />
								Disclaimers
							</h2>
							<p className="text-muted-foreground uppercase text-sm font-semibold">
								THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
								EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
								MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
							</p>
							<p className="text-muted-foreground">
								EdForge does not warrant that the Services will be uninterrupted, secure, or
								error-free. We do not warrant the accuracy or completeness of any information
								provided through the Services.
							</p>
						</div>

						{/* Limitation of Liability */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Scale className="h-6 w-6 text-secondary" />
								Limitation of Liability
							</h2>
							<p className="text-muted-foreground uppercase text-sm font-semibold">
								TO THE MAXIMUM EXTENT PERMITTED BY LAW, EDFORGE SHALL NOT BE LIABLE FOR ANY INDIRECT,
								INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED
								TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF
								THE SERVICES.
							</p>
							<p className="text-muted-foreground">
								EdForge's total liability for any claims arising under these Terms shall not exceed
								the amounts paid by you to EdForge in the twelve (12) months preceding the claim.
							</p>
						</div>

						{/* Indemnification */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Scale className="h-6 w-6 text-secondary" />
								Indemnification
							</h2>
							<p className="text-muted-foreground">
								You agree to indemnify, defend, and hold harmless EdForge and its officers, directors,
								employees, and agents from any claims, damages, losses, or expenses (including
								reasonable attorneys' fees) arising from:
							</p>
							<ul className="text-muted-foreground">
								<li>Your use of the Services</li>
								<li>Your violation of these Terms</li>
								<li>Your violation of any applicable law or regulation</li>
								<li>Your infringement of any third-party rights</li>
							</ul>
						</div>

						{/* Governing Law */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Gavel className="h-6 w-6 text-secondary" />
								Governing Law and Dispute Resolution
							</h2>
							<p className="text-muted-foreground">
								These Terms shall be governed by and construed in accordance with the laws of the
								State of Texas, without regard to its conflict of law principles.
							</p>
							<p className="text-muted-foreground">
								Any disputes arising under these Terms shall be resolved through binding arbitration
								in Collin County, Texas, in accordance with the rules of the American Arbitration
								Association. Either party may seek injunctive relief in any court of competent
								jurisdiction.
							</p>
						</div>

						{/* Termination */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Ban className="h-6 w-6 text-accent" />
								Termination
							</h2>
							<p className="text-muted-foreground">
								Either party may terminate the service agreement with 30 days' written notice. EdForge
								may immediately terminate or suspend access for:
							</p>
							<ul className="text-muted-foreground">
								<li>Violation of these Terms</li>
								<li>Non-payment of subscription fees</li>
								<li>Illegal activity or security threats</li>
							</ul>
							<p className="text-muted-foreground">
								Upon termination, you may request export of your Customer Data within 30 days. After
								this period, data will be deleted in accordance with our retention policies.
							</p>
						</div>

						{/* Contact */}
						<div className="p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Mail className="h-6 w-6 text-secondary" />
								Contact Information
							</h2>
							<p className="text-muted-foreground">
								For questions about these Terms, please contact us:
							</p>
							<div className="mt-4 space-y-2 text-muted-foreground">
								<p>
									<strong>EdForge Technologies LLC</strong>
								</p>
								<p>6600 McKinney Ranch Parkway</p>
								<p>McKinney, TX 75070</p>
								<p>
									Email:{" "}
									<a href="mailto:shoaibrain@edforge.net" className="text-primary hover:underline">
										shoaibrain@edforge.net
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

