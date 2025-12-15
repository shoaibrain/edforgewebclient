import type { Metadata } from "next";
import {
	Shield,
	Lock,
	Database,
	Server,
	Key,
	Eye,
	FileCheck,
	Activity,
	Layers,
	CheckCircle2,
	Clock,
	Users,
	AlertTriangle,
	Mail,
} from "lucide-react";

export const metadata: Metadata = {
	title: "Security",
	description:
		"EdForge Security - Enterprise-grade security with multi-tenant isolation, encryption, FERPA compliance, and comprehensive audit logging.",
};

const securityFeatures = [
	{
		icon: Lock,
		title: "Data Encryption",
		description:
			"All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.3. Database encryption is managed through AWS KMS with automatic key rotation.",
	},
	{
		icon: Layers,
		title: "Multi-Tenant Isolation",
		description:
			"Infrastructure-level tenant isolation using partition-key based separation in DynamoDB. Each tenant's data is physically separated, preventing any cross-tenant data access.",
	},
	{
		icon: Users,
		title: "Role-Based Access Control",
		description:
			"Granular RBAC system with customizable roles and permissions. Define exactly who can access what data at the school, district, and system levels.",
	},
	{
		icon: Activity,
		title: "Comprehensive Audit Logging",
		description:
			"Every data access and modification is logged with WHO, WHAT, WHEN, and WHERE. Audit logs are retained for 2 years to comply with FERPA requirements.",
	},
	{
		icon: Key,
		title: "Secure Authentication",
		description:
			"Enterprise-grade authentication powered by AWS Cognito with support for SSO, MFA, and integration with identity providers like Google Workspace and Azure AD.",
	},
	{
		icon: Eye,
		title: "Real-Time Monitoring",
		description:
			"24/7 security monitoring with automated threat detection, anomaly alerts, and incident response procedures.",
	},
];

const complianceItems = [
	{
		title: "FERPA Compliant",
		description:
			"Full compliance with Family Educational Rights and Privacy Act requirements for student data protection.",
	},
	{
		title: "COPPA Ready",
		description:
			"Designed to meet Children's Online Privacy Protection Act requirements for users under 13.",
	},
	{
		title: "GDPR Compatible",
		description:
			"Data processing agreements and controls to support GDPR compliance for international users.",
	},
	{
		title: "SOC 2 Roadmap",
		description:
			"Actively pursuing SOC 2 Type II certification with controls already implemented.",
	},
];

export default function SecurityPage() {
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
						Enterprise-Grade Security
					</h1>
					<p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
						EdForge is built from the ground up with security as a core principle. Protect
						your students' data with infrastructure-level isolation and compliance-ready
						architecture.
					</p>
				</div>
			</section>

			{/* Architecture Overview */}
			<section className="py-16 bg-muted/30">
				<div className="mx-auto max-w-6xl px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-foreground mb-4">
							Multi-Tenant Security Architecture
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Our architecture ensures complete data isolation between tenants while
							providing enterprise-grade performance and scalability.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{/* Architecture Diagram */}
						<div className="p-6 rounded-2xl bg-card border border-border">
							<h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
								<Server className="h-5 w-5 text-secondary" />
								Tenant Isolation Model
							</h3>
							<div className="space-y-4">
								<div className="p-4 rounded-lg bg-background border border-border">
									<div className="flex items-center gap-3 mb-2">
										<div className="w-3 h-3 rounded-full bg-green-500" />
										<span className="font-semibold text-foreground">Basic Tier</span>
									</div>
									<p className="text-sm text-muted-foreground">
										Shared table with partition-key isolation. Cost-effective for smaller
										institutions.
									</p>
								</div>
								<div className="p-4 rounded-lg bg-background border border-border">
									<div className="flex items-center gap-3 mb-2">
										<div className="w-3 h-3 rounded-full bg-blue-500" />
										<span className="font-semibold text-foreground">Advanced Tier</span>
									</div>
									<p className="text-sm text-muted-foreground">
										Enhanced isolation with dedicated table partitions and higher throughput.
									</p>
								</div>
								<div className="p-4 rounded-lg bg-background border border-border">
									<div className="flex items-center gap-3 mb-2">
										<div className="w-3 h-3 rounded-full bg-purple-500" />
										<span className="font-semibold text-foreground">Premium/Enterprise</span>
									</div>
									<p className="text-sm text-muted-foreground">
										Dedicated tables per tenant with custom SLAs and compliance guarantees.
									</p>
								</div>
							</div>
						</div>

						{/* Data Flow */}
						<div className="p-6 rounded-2xl bg-card border border-border">
							<h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
								<Database className="h-5 w-5 text-secondary" />
								Data Protection Flow
							</h3>
							<div className="space-y-4">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
										<span className="text-sm font-bold text-primary">1</span>
									</div>
									<div>
										<p className="font-semibold text-foreground">Request Authentication</p>
										<p className="text-sm text-muted-foreground">
											JWT tokens validated with tenant context extraction
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
										<span className="text-sm font-bold text-primary">2</span>
									</div>
									<div>
										<p className="font-semibold text-foreground">Tenant Validation</p>
										<p className="text-sm text-muted-foreground">
											All queries scoped to tenant partition key
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
										<span className="text-sm font-bold text-primary">3</span>
									</div>
									<div>
										<p className="font-semibold text-foreground">RBAC Enforcement</p>
										<p className="text-sm text-muted-foreground">
											Role-based permissions checked before data access
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
										<span className="text-sm font-bold text-primary">4</span>
									</div>
									<div>
										<p className="font-semibold text-foreground">Audit Logging</p>
										<p className="text-sm text-muted-foreground">
											All access logged with immutable audit trail
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Security Features Grid */}
			<section className="py-16">
				<div className="mx-auto max-w-6xl px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-foreground mb-4">Security Features</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Comprehensive security controls designed for educational data protection.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{securityFeatures.map((feature, index) => (
							<div
								key={index}
								className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
							>
								<div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
									<feature.icon className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
								<p className="text-muted-foreground text-sm">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Compliance Section */}
			<section className="py-16 bg-muted/30">
				<div className="mx-auto max-w-6xl px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-foreground mb-4">Compliance & Certifications</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Built to meet the strictest educational data protection requirements.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{complianceItems.map((item, index) => (
							<div
								key={index}
								className="p-6 rounded-2xl bg-card border border-border text-center"
							>
								<div className="flex justify-center mb-4">
									<CheckCircle2 className="h-10 w-10 text-green-500" />
								</div>
								<h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
								<p className="text-muted-foreground text-sm">{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Audit Trail Section */}
			<section className="py-16">
				<div className="mx-auto max-w-6xl px-6">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl font-bold text-foreground mb-4">
								FERPA-Compliant Audit Trail
							</h2>
							<p className="text-muted-foreground mb-6">
								Every action in EdForge is logged with comprehensive audit information,
								retained for the 2-year period required by FERPA and available for
								compliance reporting.
							</p>
							<ul className="space-y-4">
								<li className="flex items-start gap-3">
									<Clock className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
									<div>
										<p className="font-semibold text-foreground">Timestamped Records</p>
										<p className="text-sm text-muted-foreground">
											Precise timestamps for every data access and modification
										</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<Users className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
									<div>
										<p className="font-semibold text-foreground">User Attribution</p>
										<p className="text-sm text-muted-foreground">
											Track WHO accessed WHAT data and WHEN
										</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<FileCheck className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
									<div>
										<p className="font-semibold text-foreground">Change Tracking</p>
										<p className="text-sm text-muted-foreground">
											Before/after snapshots for all data changes
										</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<Database className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
									<div>
										<p className="font-semibold text-foreground">Immutable Storage</p>
										<p className="text-sm text-muted-foreground">
											Audit logs cannot be modified or deleted
										</p>
									</div>
								</li>
							</ul>
						</div>

						<div className="p-6 rounded-2xl bg-card border border-border">
							<h3 className="text-lg font-bold text-foreground mb-4">Sample Audit Entry</h3>
							<pre className="text-xs text-muted-foreground bg-background p-4 rounded-lg overflow-x-auto">
								{`{
  "timestamp": "2025-12-15T10:30:00Z",
  "userId": "user-abc-123",
  "userRole": "school_admin",
  "action": "UPDATE_STUDENT",
  "entityType": "STUDENT",
  "entityId": "student-xyz-789",
  "schoolId": "school-456",
  "changes": {
    "before": { "grade": "10" },
    "after": { "grade": "11" }
  },
  "ipAddress": "192.168.1.xxx",
  "severity": "info",
  "ttl": 1797552600
}`}
							</pre>
						</div>
					</div>
				</div>
			</section>

			{/* Infrastructure Section */}
			<section className="py-16 bg-muted/30">
				<div className="mx-auto max-w-6xl px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-foreground mb-4">
							Cloud Infrastructure Security
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Built on enterprise-grade cloud infrastructure with best-in-class security.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						<div className="p-6 rounded-2xl bg-card border border-border">
							<h3 className="text-lg font-bold text-foreground mb-4">AWS Infrastructure</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									DynamoDB with encryption at rest
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									Cognito for identity management
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									VPC isolation for services
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									CloudWatch monitoring
								</li>
							</ul>
						</div>

						<div className="p-6 rounded-2xl bg-card border border-border">
							<h3 className="text-lg font-bold text-foreground mb-4">Event-Driven Design</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									EventBridge for service coordination
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									Asynchronous processing
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									Decoupled microservices
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									Dead-letter queues for reliability
								</li>
							</ul>
						</div>

						<div className="p-6 rounded-2xl bg-card border border-border">
							<h3 className="text-lg font-bold text-foreground mb-4">Data Protection</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									AES-256 encryption at rest
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									TLS 1.3 in transit
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									Automated backups
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle2 className="h-4 w-4 text-green-500" />
									Point-in-time recovery
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Report Vulnerability */}
			<section className="py-16">
				<div className="mx-auto max-w-4xl px-6">
					<div className="p-8 rounded-2xl bg-card border border-border text-center">
						<AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-foreground mb-4">
							Report a Security Vulnerability
						</h2>
						<p className="text-muted-foreground mb-6 max-w-xl mx-auto">
							If you discover a security vulnerability in EdForge, please report it
							responsibly. We take all reports seriously and will respond promptly.
						</p>
						<div className="flex items-center justify-center gap-2 text-primary">
							<Mail className="h-5 w-5" />
							<a href="mailto:shoaibrain@edforge.net" className="hover:underline font-semibold">
								shoaibrain@edforge.net
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

