import type { Metadata } from "next";
import { Shield, Lock, Eye, Database, Clock, Mail, Globe, Users } from "lucide-react";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description:
		"EdForge Technologies LLC Privacy Policy - Learn how we collect, use, and protect your data with FERPA, COPPA, and GDPR compliance.",
};

export default function PrivacyPolicyPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative py-20 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
				<div className="relative mx-auto max-w-4xl px-6">
					<div className="flex items-center justify-center mb-6">
						<div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
							<Shield className="h-12 w-12 text-primary" />
						</div>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
						Privacy Policy
					</h1>
					<p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
						Your privacy is fundamental to our mission. Learn how EdForge protects your data
						with enterprise-grade security and regulatory compliance.
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
						{/* Introduction */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Globe className="h-6 w-6 text-secondary" />
								Introduction
							</h2>
							<p className="text-muted-foreground">
								EdForge Technologies LLC ("EdForge," "we," "us," or "our") is committed to protecting
								the privacy of students, educators, parents, and all users of our Education Management
								Information System (EMIS). This Privacy Policy explains how we collect, use, disclose,
								and safeguard your information when you use our services.
							</p>
							<p className="text-muted-foreground">
								EdForge Technologies LLC is a Texas limited liability company located at 6600 McKinney
								Ranch Parkway, McKinney, TX 75070.
							</p>
						</div>

						{/* Data We Collect */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Database className="h-6 w-6 text-secondary" />
								Information We Collect
							</h2>
							
							<h3 className="text-xl font-semibold text-foreground mt-6">Student Education Records</h3>
							<p className="text-muted-foreground">
								When schools use EdForge, they may input student education records including:
							</p>
							<ul className="text-muted-foreground">
								<li>Student names, contact information, and demographics</li>
								<li>Academic records, grades, and transcripts</li>
								<li>Attendance and enrollment information</li>
								<li>Behavioral records and disciplinary actions</li>
								<li>Special education and accommodation records</li>
								<li>Health information necessary for educational purposes</li>
							</ul>

							<h3 className="text-xl font-semibold text-foreground mt-6">Staff and Institutional Data</h3>
							<ul className="text-muted-foreground">
								<li>Staff profiles, qualifications, and contact information</li>
								<li>Department and organizational structures</li>
								<li>Academic calendars and scheduling data</li>
								<li>Financial and budgetary information</li>
							</ul>

							<h3 className="text-xl font-semibold text-foreground mt-6">Usage and Technical Data</h3>
							<ul className="text-muted-foreground">
								<li>Login and authentication information</li>
								<li>Browser type, device information, and IP addresses</li>
								<li>Usage analytics and interaction patterns</li>
								<li>Error logs and performance data</li>
							</ul>
						</div>

						{/* FERPA Compliance */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Lock className="h-6 w-6 text-secondary" />
								FERPA Compliance
							</h2>
							<p className="text-muted-foreground">
								EdForge complies with the Family Educational Rights and Privacy Act (FERPA), a federal
								law that protects the privacy of student education records. As a "school official"
								under FERPA:
							</p>
							<ul className="text-muted-foreground">
								<li>
									<strong>Legitimate Educational Interest:</strong> We access student records only to
									provide the educational services contracted by schools
								</li>
								<li>
									<strong>Direct Control:</strong> Schools maintain direct control over the use and
									maintenance of education records
								</li>
								<li>
									<strong>No Re-disclosure:</strong> We do not disclose personally identifiable
									information from education records to third parties without consent
								</li>
								<li>
									<strong>Audit Trail:</strong> We maintain comprehensive audit logs of all data
									access for a minimum of 2 years as required by FERPA
								</li>
								<li>
									<strong>Data Deletion:</strong> Upon request or contract termination, we delete
									student records according to school instructions
								</li>
							</ul>
						</div>

						{/* COPPA Compliance */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Users className="h-6 w-6 text-secondary" />
								COPPA Compliance
							</h2>
							<p className="text-muted-foreground">
								EdForge complies with the Children's Online Privacy Protection Act (COPPA) for users
								under 13 years of age:
							</p>
							<ul className="text-muted-foreground">
								<li>
									<strong>School Consent:</strong> Schools provide consent on behalf of parents for
									the collection of student information for educational purposes
								</li>
								<li>
									<strong>Limited Collection:</strong> We collect only information necessary for
									educational services
								</li>
								<li>
									<strong>No Commercial Use:</strong> We do not use children's personal information
									for commercial purposes unrelated to educational services
								</li>
								<li>
									<strong>Parental Rights:</strong> Parents may review, request deletion, or refuse
									further collection of their child's information through their school
								</li>
								<li>
									<strong>Security:</strong> We implement reasonable security measures to protect
									children's personal information
								</li>
							</ul>
						</div>

						{/* GDPR Compliance */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Globe className="h-6 w-6 text-secondary" />
								GDPR Compliance
							</h2>
							<p className="text-muted-foreground">
								For users in the European Economic Area (EEA), we comply with the General Data
								Protection Regulation (GDPR):
							</p>
							<ul className="text-muted-foreground">
								<li>
									<strong>Lawful Basis:</strong> We process personal data based on contractual
									necessity with schools and legitimate educational interests
								</li>
								<li>
									<strong>Data Subject Rights:</strong> You have the right to access, rectify, erase,
									restrict processing, data portability, and object to processing
								</li>
								<li>
									<strong>Data Transfers:</strong> International data transfers are protected by
									appropriate safeguards including Standard Contractual Clauses
								</li>
								<li>
									<strong>Data Protection Officer:</strong> Contact our DPO at shoaibrain@edforge.net
								</li>
								<li>
									<strong>Supervisory Authority:</strong> You have the right to lodge a complaint
									with your local data protection authority
								</li>
							</ul>
						</div>

						{/* Data Retention */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Clock className="h-6 w-6 text-secondary" />
								Data Retention
							</h2>
							<p className="text-muted-foreground">Our data retention practices include:</p>
							<ul className="text-muted-foreground">
								<li>
									<strong>Active Data:</strong> Student and institutional data is retained for the
									duration of the service agreement with the school
								</li>
								<li>
									<strong>Audit Logs:</strong> Access and activity logs are retained for 2 years
									to comply with FERPA requirements
								</li>
								<li>
									<strong>Archived Data:</strong> Upon request, academic year data can be archived
									and stored in long-term encrypted storage
								</li>
								<li>
									<strong>Deletion:</strong> Upon contract termination, data is deleted within 90
									days unless legally required to retain
								</li>
							</ul>
						</div>

						{/* Third-Party Services */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Eye className="h-6 w-6 text-secondary" />
								Third-Party Services
							</h2>
							<p className="text-muted-foreground">
								EdForge may integrate with the following third-party services:
							</p>
							<ul className="text-muted-foreground">
								<li>
									<strong>Cloud Infrastructure:</strong> Amazon Web Services (AWS) and Google Cloud
									Platform for secure data hosting
								</li>
								<li>
									<strong>Authentication:</strong> AWS Cognito for secure user authentication
								</li>
								<li>
									<strong>Analytics:</strong> Vercel Analytics for anonymized usage statistics
								</li>
								<li>
									<strong>Google Workspace:</strong> Optional integration for schools using Google
									for Education
								</li>
							</ul>
							<p className="text-muted-foreground">
								All third-party service providers are contractually obligated to maintain the
								confidentiality and security of personal information.
							</p>
						</div>

						{/* Security */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Shield className="h-6 w-6 text-secondary" />
								Security Measures
							</h2>
							<p className="text-muted-foreground">
								We implement comprehensive security measures including:
							</p>
							<ul className="text-muted-foreground">
								<li>AES-256 encryption for data at rest</li>
								<li>TLS 1.3 encryption for data in transit</li>
								<li>Multi-tenant isolation at the infrastructure level</li>
								<li>Role-based access control (RBAC)</li>
								<li>Regular security audits and penetration testing</li>
								<li>Incident response and breach notification procedures</li>
							</ul>
							<p className="text-muted-foreground">
								For more details, please visit our{" "}
								<a href="/security" className="text-primary hover:underline">
									Security page
								</a>
								.
							</p>
						</div>

						{/* Contact */}
						<div className="mb-12 p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground flex items-center gap-3 mt-0">
								<Mail className="h-6 w-6 text-secondary" />
								Contact Us
							</h2>
							<p className="text-muted-foreground">
								If you have questions about this Privacy Policy or our data practices, please
								contact us:
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

						{/* Changes */}
						<div className="p-6 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground mt-0">Changes to This Policy</h2>
							<p className="text-muted-foreground mb-0">
								We may update this Privacy Policy from time to time. We will notify schools of any
								material changes by email and update the "Last Updated" date at the top of this page.
								Continued use of EdForge after changes constitutes acceptance of the updated policy.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

