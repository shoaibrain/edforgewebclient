"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	DollarSign,
	CheckCircle2,
	AlertTriangle,
	Users,
	Download,
	Plus,
	Filter,
	Search,
	LayoutDashboard,
	FileText,
	Receipt,
	Settings,
	GraduationCap,
	Building,
	Edit,
	Trash2,
} from "lucide-react"
import { CollectionTrendsChart } from "./charts/collection-trends-chart"
import { CollectionByFeeTypesChart } from "./charts/collection-by-fee-types-chart"
import { OutstandingFeesTable } from "./outstanding-fees-table"
import { PaymentHistory } from "./payment-history"
import type { FeeCollectionAnalytics } from "@/lib/schemas/financial"

interface OutstandingFee {
	studentId: string
	studentName: string
	grade: string
	totalDue: number
	paid: number
	balance: number
	daysPastDue: number
	lastPayment: string | null
}

interface PaymentRecord {
	paymentId: string
	studentId: string
	studentName: string
	feeType: string
	amount: number
	paymentDate: string
	paymentMethod: string
	status: string
}

interface FeesDashboardProps {
	analytics: FeeCollectionAnalytics
	outstandingFees: OutstandingFee[]
	paymentHistory: PaymentRecord[]
	grade?: string
	academicYear: string
	search?: string
}

type TabSection = "overview" | "structure" | "outstanding" | "history";

const tabs = [
	{ id: "overview" as const, label: "Overview", icon: LayoutDashboard },
	{ id: "structure" as const, label: "Fee Structure", icon: Settings },
	{ id: "outstanding" as const, label: "Outstanding Fees", icon: FileText },
	{ id: "history" as const, label: "Payment History", icon: Receipt },
];

// Mock fee structure data
const feeStructures = [
	{
		id: "fee-001",
		name: "Tuition",
		amount: 5000,
		frequency: "Annual",
		applicableTo: ["All Grades"],
		mandatory: true,
		description: "Annual tuition fee for all students",
	},
	{
		id: "fee-002",
		name: "Registration",
		amount: 500,
		frequency: "One-time",
		applicableTo: ["All Grades"],
		mandatory: true,
		description: "One-time registration fee for new students",
	},
	{
		id: "fee-003",
		name: "Activity Fee",
		amount: 200,
		frequency: "Per Semester",
		applicableTo: ["Grade 6", "Grade 7", "Grade 8"],
		mandatory: false,
		description: "Fee for extracurricular activities",
	},
	{
		id: "fee-004",
		name: "Technology Fee",
		amount: 300,
		frequency: "Annual",
		applicableTo: ["All Grades"],
		mandatory: true,
		description: "Technology and computer lab access fee",
	},
	{
		id: "fee-005",
		name: "Lab Fee",
		amount: 150,
		frequency: "Per Semester",
		applicableTo: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
		mandatory: true,
		description: "Science laboratory materials and equipment fee",
	},
];

export function FeesDashboard({
	analytics,
	outstandingFees,
	paymentHistory,
	grade,
	academicYear,
	search: initialSearch
}: FeesDashboardProps) {
	const [activeTab, setActiveTab] = useState<TabSection>("overview")
	const [search, setSearch] = useState(initialSearch || "")
	const [direction, setDirection] = useState(0)

	const handleTabChange = (tabId: TabSection) => {
		const newIndex = tabs.findIndex(t => t.id === tabId);
		const oldIndex = tabs.findIndex(t => t.id === activeTab);
		setDirection(newIndex > oldIndex ? 1 : -1);
		setActiveTab(tabId);
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount)
	}

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 20 : -20,
			opacity: 0,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 20 : -20,
			opacity: 0,
		}),
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">School Fees Management</h1>
					<p className="text-muted-foreground mt-1">
						Monitor fee collections and outstanding payments.
					</p>
				</div>
				<div className="flex items-center gap-2 flex-wrap">
					<Input
						placeholder="Search students..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-[250px]"
					/>
					<Select defaultValue={grade || "all"}>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="All Grades" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Grades</SelectItem>
							<SelectItem value="grade1">Grade 1</SelectItem>
							<SelectItem value="grade2">Grade 2</SelectItem>
							<SelectItem value="grade3">Grade 3</SelectItem>
							<SelectItem value="grade4">Grade 4</SelectItem>
							<SelectItem value="grade5">Grade 5</SelectItem>
						</SelectContent>
					</Select>
					<Select defaultValue={academicYear}>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Academic Year" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="2024-2025">2024-2025</SelectItem>
							<SelectItem value="2023-2024">2023-2024</SelectItem>
							<SelectItem value="2022-2023">2022-2023</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline" size="icon">
						<Filter className="h-4 w-4" />
					</Button>
					<Button className="bg-success hover:bg-success/90">
						<Plus className="h-4 w-4 mr-2" />
						Record Payment
					</Button>
					<Button variant="outline">
						<Download className="h-4 w-4 mr-2" />
						Export Report
					</Button>
				</div>
			</div>

			{/* Key Metrics Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
					<CardContent className="p-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground">Total Fees Due</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className="text-2xl font-bold text-foreground">{formatCurrency(analytics.totalFeesDue)}</span>
							</div>
							<p className="text-xs text-muted-foreground mt-1">Expected fee revenue</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
							<DollarSign className="h-5 w-5 text-primary" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
					<CardContent className="p-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground">Fees Collected</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className="text-2xl font-bold text-success">{formatCurrency(analytics.totalFeesCollected)}</span>
							</div>
							<p className="text-xs text-success mt-1">{analytics.collectionRate.toFixed(1)}% collected</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
							<CheckCircle2 className="h-5 w-5 text-success" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
					<CardContent className="p-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground">Outstanding Fees</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className="text-2xl font-bold text-error">{formatCurrency(analytics.totalFeesOutstanding)}</span>
							</div>
							<p className="text-xs text-error mt-1">{(100 - analytics.collectionRate).toFixed(1)}% pending</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-error/10 flex items-center justify-center">
							<AlertTriangle className="h-5 w-5 text-error" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
					<CardContent className="p-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground">Total Payments</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className="text-2xl font-bold text-foreground">{analytics.totalPayments}</span>
							</div>
							<p className="text-xs text-muted-foreground mt-1">Avg: {formatCurrency(analytics.averagePaymentAmount)}</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
							<Users className="h-5 w-5 text-blue-600" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Tab Navigation */}
			<div className="border-b border-border">
				<nav className="flex gap-8" aria-label="Fee management sections">
					{tabs.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;
						return (
							<button
								key={tab.id}
								onClick={() => handleTabChange(tab.id)}
								className={cn(
									"relative flex items-center gap-2 pb-4 text-sm font-medium transition-colors",
									isActive
										? "text-primary"
										: "text-muted-foreground hover:text-foreground"
								)}
							>
								<Icon className="h-4 w-4" />
								{tab.label}
								{isActive && (
									<motion.div
										layoutId="activeTab"
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
										transition={{ type: "spring", stiffness: 500, damping: 30 }}
									/>
								)}
							</button>
						);
					})}
				</nav>
			</div>

			{/* Tab Content */}
			<div className="min-h-[600px] relative">
				<AnimatePresence mode="wait" initial={false} custom={direction}>
					<motion.div
						key={activeTab}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 }
						}}
						className="w-full"
					>
						{activeTab === "overview" && (
							<div className="space-y-6">
								<div className="grid gap-6 lg:grid-cols-2">
									<CollectionTrendsChart data={analytics.trends} />
									<CollectionByFeeTypesChart data={analytics.feeTypeBreakdown} />
								</div>
							</div>
						)}

						{activeTab === "structure" && (
							<div className="space-y-6">
								<Card>
									<CardHeader>
										<div className="flex items-center justify-between">
											<div>
												<CardTitle>Fee Structure Configuration</CardTitle>
												<CardDescription>
													Configure fee types, amounts, and grade-level assignments
												</CardDescription>
											</div>
											<Button className="bg-primary hover:bg-primary/90">
												<Plus className="h-4 w-4 mr-2" />
												Add Fee Type
											</Button>
										</div>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{feeStructures.map((fee) => (
												<Card key={fee.id} className="bg-muted/30 border-border/50 hover:bg-muted/50 transition-colors">
													<CardContent className="p-4">
														<div className="flex items-start justify-between">
															<div className="flex-1">
																<div className="flex items-center gap-3 mb-2">
																	<h3 className="text-lg font-semibold text-foreground">{fee.name}</h3>
																	{fee.mandatory && (
																		<Badge variant="default" className="text-xs">Mandatory</Badge>
																	)}
																	<Badge variant="outline" className="text-xs">{fee.frequency}</Badge>
																</div>
																<p className="text-sm text-muted-foreground mb-3">{fee.description}</p>
																<div className="grid gap-3 md:grid-cols-3">
																	<div>
																		<p className="text-xs text-muted-foreground mb-1">Amount</p>
																		<p className="text-lg font-bold text-primary">{formatCurrency(fee.amount)}</p>
																	</div>
																	<div className="md:col-span-2">
																		<p className="text-xs text-muted-foreground mb-1">Applicable To</p>
																		<div className="flex flex-wrap gap-1">
																			{fee.applicableTo.map((grade, idx) => (
																				<Badge key={idx} variant="secondary" className="text-xs">
																					<GraduationCap className="h-3 w-3 mr-1" />
																					{grade}
																				</Badge>
																			))}
																		</div>
																	</div>
																</div>
															</div>
															<div className="flex items-center gap-2 ml-4">
																<Button variant="ghost" size="icon" className="h-8 w-8">
																	<Edit className="h-4 w-4" />
																</Button>
																<Button variant="ghost" size="icon" className="h-8 w-8 text-error hover:text-error">
																	<Trash2 className="h-4 w-4" />
																</Button>
															</div>
														</div>
													</CardContent>
												</Card>
											))}
										</div>
									</CardContent>
								</Card>
							</div>
						)}

						{activeTab === "outstanding" && (
							<div className="space-y-6">
								<OutstandingFeesTable fees={outstandingFees} search={search} />
							</div>
						)}

						{activeTab === "history" && (
							<div className="space-y-6">
								<PaymentHistory payments={paymentHistory} />
							</div>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
