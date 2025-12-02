"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	Package,
	DollarSign,
	AlertTriangle,
	TrendingUp,
	Download,
	Plus,
	Filter,
	Search,
	LayoutDashboard,
	PackageX,
	FileText,
	Building2,
} from "lucide-react"
import { SupplyOrderTrendsChart } from "./charts/supply-order-trends-chart"
import { InventoryByCategoryChart } from "./charts/inventory-by-category-chart"
import { LowStockItems } from "./low-stock-items"
import { SupplyUtilization } from "./supply-utilization"
import type { SupplyAnalytics } from "@/lib/schemas/financial"

interface SupplyDashboardProps {
	analytics: SupplyAnalytics
	category?: string
	academicYear: string
	search?: string
}

type TabSection = "overview" | "low-stock" | "requisitions" | "suppliers";

const tabs = [
	{ id: "overview" as const, label: "Overview", icon: LayoutDashboard },
	{ id: "low-stock" as const, label: "Low Stock Items", icon: PackageX },
	{ id: "requisitions" as const, label: "Requisitions", icon: FileText },
	{ id: "suppliers" as const, label: "Suppliers", icon: Building2 },
];

export function SupplyDashboard({
	analytics,
	category,
	academicYear,
	search: initialSearch
}: SupplyDashboardProps) {
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
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount)
	}

	const outOfStockCount = analytics.lowStockItems.filter(item => item.status === "out_of_stock").length
	const lowStockCount = analytics.lowStockItems.filter(item => item.status === "low_stock").length

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
					<h1 className="text-3xl font-bold tracking-tight">School Supply Management</h1>
					<p className="text-muted-foreground mt-1">
						Track inventory and manage supply requisitions.
					</p>
				</div>
				<div className="flex items-center gap-2 flex-wrap">
					<Input
						placeholder="Search supplies..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-[250px]"
					/>
					<Select defaultValue={category || "all"}>
						<SelectTrigger className="w-[160px]">
							<SelectValue placeholder="All Categories" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							<SelectItem value="textbooks">Textbooks</SelectItem>
							<SelectItem value="teaching_materials">Teaching Materials</SelectItem>
							<SelectItem value="desks">Desks</SelectItem>
							<SelectItem value="chairs">Chairs</SelectItem>
							<SelectItem value="paper">Paper</SelectItem>
							<SelectItem value="writing_instruments">Writing Instruments</SelectItem>
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
						New Requisition
					</Button>
					<Button variant="outline">
						<Download className="h-4 w-4 mr-2" />
						Export Report
					</Button>
				</div>
			</div>

			{/* Inventory Alert */}
			<AnimatePresence mode="wait">
				{(outOfStockCount > 0 || lowStockCount > 0) && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
					>
						<Alert className="border-error bg-error/5">
							<AlertTriangle className="h-4 w-4 text-error" />
							<AlertTitle className="flex items-center justify-between">
								<span>Inventory Alert</span>
							</AlertTitle>
							<AlertDescription>
								{outOfStockCount} item{outOfStockCount !== 1 ? 's' : ''} out of stock. {lowStockCount} item{lowStockCount !== 1 ? 's' : ''} running low.
								Create requisitions to restock critical items.
								<Button variant="outline" size="sm" className="ml-4">
									View Items
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
							<p className="text-xs font-medium text-muted-foreground">Total Items</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className="text-2xl font-bold text-foreground">{analytics.totalItems.toLocaleString()}</span>
							</div>
							<p className="text-xs text-muted-foreground mt-1">Items in inventory</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
							<Package className="h-5 w-5 text-primary" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
					<CardContent className="p-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground">Total Value</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className="text-2xl font-bold text-foreground">{formatCurrency(analytics.totalValue)}</span>
							</div>
							<p className="text-xs text-muted-foreground mt-1">Current inventory value</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
							<DollarSign className="h-5 w-5 text-success" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
					<CardContent className="p-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground">Low Stock Items</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className="text-2xl font-bold text-error">{lowStockCount + outOfStockCount}</span>
							</div>
							<p className="text-xs text-error mt-1">{outOfStockCount} out of stock</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-error/10 flex items-center justify-center">
							<AlertTriangle className="h-5 w-5 text-error" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card border-border shadow-sm hover:shadow-md transition-all">
					<CardContent className="p-4 flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground">Avg Utilization</p>
							<div className="flex items-baseline gap-2 mt-1">
								<span className="text-2xl font-bold text-foreground">
									{(Object.values(analytics.categoryBreakdown).reduce((sum, cat) => sum + cat.averageUtilization, 0) / Object.keys(analytics.categoryBreakdown).length).toFixed(1)}%
								</span>
							</div>
							<p className="text-xs text-muted-foreground mt-1">Across all categories</p>
						</div>
						<div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
							<TrendingUp className="h-5 w-5 text-blue-600" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Tab Navigation */}
			<div className="border-b border-border">
				<nav className="flex gap-8" aria-label="Supply management sections">
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
									<SupplyOrderTrendsChart data={analytics.trends} />
									<InventoryByCategoryChart data={analytics.categoryBreakdown} />
								</div>
								<SupplyUtilization analytics={analytics} />
							</div>
						)}

						{activeTab === "low-stock" && (
							<div className="space-y-6">
								<LowStockItems items={analytics.lowStockItems} />
							</div>
						)}

						{activeTab === "requisitions" && (
							<Card>
								<CardHeader>
									<CardTitle>Supply Requisitions</CardTitle>
									<CardDescription>Recent and pending supply requisitions</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">Requisition management will be displayed here.</p>
								</CardContent>
							</Card>
						)}

						{activeTab === "suppliers" && (
							<Card>
								<CardHeader>
									<CardTitle>Suppliers</CardTitle>
									<CardDescription>Supplier information and contact details</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">Supplier management will be displayed here.</p>
								</CardContent>
							</Card>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
