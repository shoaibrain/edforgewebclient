import type { Metadata } from "next";
import {
	Building2,
	Target,
	Lightbulb,
	Heart,
	Shield,
	Users,
	Zap,
	Globe,
	GraduationCap,
	MapPin,
	Calendar,
	ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "About Us",
	description:
		"Learn about EdForge Technologies LLC - Our mission to transform education management with enterprise-grade technology, innovation, and data privacy.",
};

const values = [
	{
		icon: Shield,
		title: "Data Privacy First",
		description:
			"Student data protection is non-negotiable. We build every feature with FERPA, COPPA, and GDPR compliance at the core.",
	},
	{
		icon: Lightbulb,
		title: "Innovation",
		description:
			"Leveraging event-driven architecture, AI, and modern cloud technologies to solve real educational challenges.",
	},
	{
		icon: Heart,
		title: "Educational Equity",
		description:
			"Technology should empower every student. We design for accessibility and inclusivity in every school.",
	},
	{
		icon: Users,
		title: "Partnership",
		description:
			"We succeed when educators succeed. Every feature is built in partnership with teachers, administrators, and districts.",
	},
];

const milestones = [
	{
		date: "December 2025",
		title: "Company Founded",
		description: "EdForge Technologies LLC established in McKinney, Texas",
	},
	{
		date: "December 2025",
		title: "Platform Development",
		description: "Building enterprise-grade multi-tenant EMIS architecture",
	},
	{
		date: "Q1 2026",
		title: "Beta Launch",
		description: "Pilot program with select K-12 schools and districts",
	},
	{
		date: "Q2 2026",
		title: "General Availability",
		description: "Full platform launch with Google Cloud integration",
	},
];

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative py-20 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
				<div className="relative mx-auto max-w-4xl px-6">
					<div className="flex items-center justify-center mb-6">
						<div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
							<Building2 className="h-12 w-12 text-primary" />
						</div>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
						About EdForge
					</h1>
					<p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
						Transforming education management through enterprise-grade technology,
						unwavering data privacy, and a passion for student success.
					</p>
				</div>
			</section>

			{/* Mission Section */}
			<section className="py-16">
				<div className="mx-auto max-w-6xl px-6">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<div className="flex items-center gap-2 text-secondary mb-4">
								<Target className="h-5 w-5" />
								<span className="font-semibold uppercase tracking-wider text-sm">Our Mission</span>
							</div>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
								Empowering Education Through Technology
							</h2>
							<p className="text-muted-foreground text-lg mb-6">
								EdForge Technologies LLC was founded with a singular vision: to free educators
								from the weight of legacy systems and administrative burden, so they can focus
								on what matters most—their students.
							</p>
							<p className="text-muted-foreground">
								We believe that every school, regardless of size or budget, deserves access to
								enterprise-grade education management tools. Our multi-tenant SaaS platform
								delivers the power of modern technology with the simplicity educators need and
								the security students deserve.
							</p>
						</div>

						<div className="p-8 rounded-2xl bg-card border border-border">
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="p-2 rounded-lg bg-secondary/10">
										<GraduationCap className="h-6 w-6 text-secondary" />
									</div>
									<div>
										<h3 className="font-semibold text-foreground">Student-Centric Design</h3>
										<p className="text-sm text-muted-foreground">
											Every feature is designed to improve student outcomes
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="p-2 rounded-lg bg-secondary/10">
										<Zap className="h-6 w-6 text-secondary" />
									</div>
									<div>
										<h3 className="font-semibold text-foreground">Modern Architecture</h3>
										<p className="text-sm text-muted-foreground">
											Event-driven, cloud-native, and built for scale
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<div className="p-2 rounded-lg bg-secondary/10">
										<Globe className="h-6 w-6 text-secondary" />
									</div>
									<div>
										<h3 className="font-semibold text-foreground">Global Ready</h3>
										<p className="text-sm text-muted-foreground">
											Multi-timezone, multi-language, GDPR compatible
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-16 bg-muted/30">
				<div className="mx-auto max-w-6xl px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							The principles that guide everything we build and every decision we make.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{values.map((value, index) => (
							<div
								key={index}
								className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
							>
								<div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
									<value.icon className="h-6 w-6 text-primary" />
								</div>
								<h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
								<p className="text-muted-foreground text-sm">{value.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Company Info Section */}
			<section className="py-16">
				<div className="mx-auto max-w-6xl px-6">
					<div className="grid md:grid-cols-2 gap-12">
						{/* Company Details */}
						<div className="p-8 rounded-2xl bg-card border border-border">
							<h2 className="text-2xl font-bold text-foreground mb-6">Company Information</h2>

							<div className="space-y-6">
								<div>
									<div className="flex items-center gap-2 text-muted-foreground mb-2">
										<Building2 className="h-4 w-4" />
										<span className="text-sm font-semibold uppercase tracking-wider">
											Legal Name
										</span>
									</div>
									<p className="text-foreground font-semibold">EdForge Technologies LLC</p>
								</div>

								<div>
									<div className="flex items-center gap-2 text-muted-foreground mb-2">
										<Calendar className="h-4 w-4" />
										<span className="text-sm font-semibold uppercase tracking-wider">
											Founded
										</span>
									</div>
									<p className="text-foreground">December 8, 2025</p>
								</div>

								<div>
									<div className="flex items-center gap-2 text-muted-foreground mb-2">
										<MapPin className="h-4 w-4" />
										<span className="text-sm font-semibold uppercase tracking-wider">
											Headquarters
										</span>
									</div>
									<p className="text-foreground">
										6600 McKinney Ranch Parkway
										<br />
										McKinney, TX 75070
										<br />
										United States
									</p>
								</div>

								<div>
									<div className="flex items-center gap-2 text-muted-foreground mb-2">
										<Globe className="h-4 w-4" />
										<span className="text-sm font-semibold uppercase tracking-wider">
											Jurisdiction
										</span>
									</div>
									<p className="text-foreground">State of Texas, USA</p>
								</div>
							</div>
						</div>

						{/* Timeline */}
						<div>
							<h2 className="text-2xl font-bold text-foreground mb-6">Our Journey</h2>

							<div className="space-y-6">
								{milestones.map((milestone, index) => (
									<div key={index} className="flex gap-4">
										<div className="flex flex-col items-center">
											<div className="w-3 h-3 rounded-full bg-primary" />
											{index < milestones.length - 1 && (
												<div className="w-0.5 h-full bg-border mt-2" />
											)}
										</div>
										<div className="pb-6">
											<p className="text-sm text-secondary font-semibold">{milestone.date}</p>
											<h3 className="text-lg font-bold text-foreground">{milestone.title}</h3>
											<p className="text-muted-foreground text-sm">{milestone.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="py-16 bg-muted/30">
				<div className="mx-auto max-w-6xl px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-foreground mb-4">Leadership</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							A team passionate about transforming education through technology.
						</p>
					</div>

					<div className="flex justify-center">
						<div className="p-8 rounded-2xl bg-card border border-border max-w-md text-center">
							<div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
								<span className="text-3xl font-bold text-white">SR</span>
							</div>
							<h3 className="text-xl font-bold text-foreground">Shoaib Rain</h3>
							<p className="text-secondary font-semibold mb-4">Founder & CEO</p>
							<p className="text-muted-foreground text-sm">
								Passionate about leveraging technology to solve real problems in education.
								Building EdForge to empower schools with the tools they need to help every
								student succeed.
							</p>
						</div>
					</div>

					<div className="text-center mt-8">
						<p className="text-muted-foreground">
							Interested in joining our mission?{" "}
							<Link href="/contact" className="text-primary hover:underline">
								Get in touch
							</Link>
						</p>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16">
				<div className="mx-auto max-w-4xl px-6">
					<div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-center">
						<h2 className="text-3xl font-bold text-foreground mb-4">
							Ready to Transform Your School?
						</h2>
						<p className="text-muted-foreground mb-8 max-w-xl mx-auto">
							Join forward-thinking schools and districts that are modernizing education
							management with EdForge.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/contact">
								<Button size="lg" className="rounded-full px-8">
									Contact Sales
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
							<Link href="/security">
								<Button size="lg" variant="outline" className="rounded-full px-8">
									Learn About Security
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

