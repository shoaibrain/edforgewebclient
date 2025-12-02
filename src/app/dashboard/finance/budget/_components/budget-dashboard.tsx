"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import {
	DollarSign,
	TrendingUp,
	TrendingDown,
	AlertTriangle,
	Info,
	Download,
	Plus,
	X,
	Filter,
	LayoutDashboard,
	PieChart,
	Receipt,
	LineChart,
} from "lucide-react"
import { SpendingTrendsChart } from "./charts/spending-trends-chart"
import { CategorySpendingChart } from "./charts/category-spending-chart"
import { BudgetVarianceAnalysis } from "./budget-variance-analysis"
import { ForecastPlanning } from "./forecast-planning"
import type { BudgetAnalytics } from "@/lib/schemas/financial"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

interface BudgetAlert {
	id: string
	type: "warning" | "info"
	category: string
	message: string
	spendingRate: number
	remainingMonths: number
}

interface BudgetDashboardProps {
	analytics: BudgetAnalytics
	alerts: BudgetAlert[]
	department?: string
	fiscalYear: string
}

type TabSection = "overview" | "categories" | "transactions" | "forecast";

const tabs = [
	{ id: "overview" as const, label: "Overview", icon: LayoutDashboard },
	{ id: "categories" as const, label: "Categories", icon: PieChart },
	{ id: "transactions" as const, label: "Transactions", icon: Receipt },
	{ id: "forecast" as const, label: "Forecast & Planning", icon: LineChart },
];

export function BudgetDashboard({ analytics, alerts, department, fiscalYear }: BudgetDashboardProps) {
	const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set())
	const [activeTab, setActiveTab] = useState<TabSection>("overview")
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
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount)
	}

	const getSpendingRateColor = (rate: number) => {
		if (rate >= 90) return "text-error"
		if (rate >= 80) return "text-warning"
		return "text-success"
	}

	const getSpendingRateBgColor = (rate: number) => {
		if (rate >= 90) return "bg-error/10 border-error/20"
		if (rate >= 80) return "bg-warning/10 border-warning/20"
		return "bg-success/10 border-success/20"
	}

	const visibleAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id))

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
					<h1 className="text-3xl font-bold tracking-tight">Budget Management</h1>
					<p className="text-muted-foreground mt-1">
						Track expenditures and manage financial resources.
					</p>
				</div>
				<div className="flex items-center gap-2 flex-wrap">
					<Select defaultValue={department || "all"}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="All Departments" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Departments</SelectItem>
							<SelectItem value="elementary">Elementary</SelectItem>
							<SelectItem value="middle">Middle School</SelectItem>
							<SelectItem value="high">High School</SelectItem>
						</SelectContent>
					</Select>
					<Select defaultValue={fiscalYear}>
						<SelectTrigger className="w-[140px]">
							<SelectValue placeholder="Fiscal Year" />
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
						Allocate Budget
					</Button>
					<Button variant="outline">
						<Download className="h-4 w-4 mr-2" />
						Export Report
					</Button>
				</div>
			</div>

			{/* Budget Alerts */}
			<AnimatePresence mode="wait">
				{visibleAlerts.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
					>
						<Alert className={`border-warning bg-warning/5`}>
							<AlertTriangle className="h-4 w-4 text-warning" />
							<AlertTitle className="flex items-center justify-between">
								<span>{visibleAlerts[0].message}</span>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setDismissedAlerts(prev => new Set(prev).add(visibleAlerts[0].id))}
									className="h-6 w-6 p-0"
								>
									<X className="h-4 w-4" />
								</Button>
							</AlertTitle>
							<AlertDescription className="mt-2">
								<Button variant="outline" size="sm">
									Review Allocation
								</Button>
							</AlertDescription>
						</Alert>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Key Metrics Cards */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
					<CardContent className="p-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground">Total Allocated</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className="text-2xl font-bold text-foreground">{formatCurrency(analytics.totalAllocated)}</span>
							</div>
							<p className="text-xs text-muted-foreground mt-1">Total budget for fiscal year</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
							<DollarSign className="h-5 w-5 text-primary" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
					<CardContent className="p-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground">Total Spent</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className="text-2xl font-bold text-foreground">{formatCurrency(analytics.totalSpent)}</span>
							</div>
							<p className="text-xs text-muted-foreground mt-1">{analytics.spendingRate.toFixed(1)}% of budget</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
							<TrendingUp className="h-5 w-5 text-blue-600" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
					<CardContent className="p-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground">Remaining Budget</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className="text-2xl font-bold text-foreground">{formatCurrency(analytics.totalRemaining)}</span>
							</div>
							<p className="text-xs text-muted-foreground mt-1">{(100 - analytics.spendingRate).toFixed(1)}% remaining</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
							<TrendingDown className="h-5 w-5 text-green-600" />
						</div>
					</CardContent>
				</Card>

				<Card className={cn("bg-card border-border shadow-sm hover:shadow-md transition-all", getSpendingRateBgColor(analytics.spendingRate))}>
					<CardContent className="p-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground">Spending Rate</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className={cn("text-2xl font-bold", getSpendingRateColor(analytics.spendingRate))}>
									{analytics.spendingRate.toFixed(1)}%
								</span>
							</div>
							<p className="text-xs text-muted-foreground mt-1">On track for year-end</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
							<Info className="h-5 w-5 text-orange-600" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Tab Navigation */}
			<div className="border-b border-border">
				<nav className="flex gap-8" aria-label="Budget sections">
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
									<SpendingTrendsChart data={analytics.trends} />
									<CategorySpendingChart data={analytics.categoryBreakdown} />
								</div>
							</div>
						)}

						{activeTab === "categories" && (
							<div className="space-y-6">
								<BudgetVarianceAnalysis
									variances={analytics.variances}
									categoryBreakdown={analytics.categoryBreakdown}
								/>
							</div>
						)}

						{activeTab === "transactions" && (
							<Card>
								<CardHeader>
									<CardTitle>Recent Transactions</CardTitle>
									<CardDescription>Budget transactions and expenditures</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">Transaction history will be displayed here.</p>
								</CardContent>
							</Card>
						)}

						{activeTab === "forecast" && (
							<ForecastPlanning
								analytics={analytics}
								fiscalYear={fiscalYear}
							/>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
