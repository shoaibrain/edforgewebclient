"use client";

/**
 * EdForge EMIS - Academic Calendar Component
 * 
 * Manages holidays, breaks, and important academic dates.
 * Adapted from V0 prototype for EdForge dashboard integration.
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CalendarIcon, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CalendarEvent {
	id: string;
	title: string;
	date: string;
	type: "holiday" | "break" | "event" | "deadline";
	description?: string;
}

const mockEvents: CalendarEvent[] = [
	{
		id: "1",
		title: "Thanksgiving Break",
		date: "Nov 25-29, 2024",
		type: "break",
		description: "School closed for Thanksgiving holiday",
	},
	{
		id: "2",
		title: "Winter Break",
		date: "Dec 21, 2024 - Jan 7, 2025",
		type: "break",
		description: "Winter holiday break",
	},
	{
		id: "3",
		title: "Martin Luther King Jr. Day",
		date: "Jan 20, 2025",
		type: "holiday",
		description: "School closed",
	},
	{
		id: "4",
		title: "Spring Break",
		date: "Mar 10-14, 2025",
		type: "break",
		description: "Spring holiday break",
	},
	{
		id: "5",
		title: "Parent-Teacher Conferences",
		date: "Apr 15-16, 2025",
		type: "event",
		description: "Evening conferences available",
	},
];

const eventTypeColors = {
	holiday: "bg-orange-50 text-orange-700 border-orange-200",
	break: "bg-blue-50 text-blue-700 border-blue-200",
	event: "bg-green-50 text-green-700 border-green-200",
	deadline: "bg-red-50 text-red-700 border-red-200",
};

export function AcademicCalendar() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold text-foreground">Academic Calendar</h2>
					<p className="text-sm text-muted-foreground mt-1">
						Manage holidays, breaks, and important dates
					</p>
				</div>
				<Button className="bg-primary hover:bg-primary/90">
					<Plus className="h-4 w-4 mr-2" />
					Add Event
				</Button>
			</div>

			<div className="grid gap-3">
				{mockEvents.map((event) => (
					<Card key={event.id} className="p-4 bg-card border-border hover:bg-accent/50 transition-colors">
						<div className="flex items-start gap-4">
							<div className="mt-1">
								<CalendarIcon className="h-5 w-5 text-primary" />
							</div>

							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 mb-1">
									<h3 className="font-medium text-foreground">{event.title}</h3>
									<Badge variant="outline" className={eventTypeColors[event.type]}>
										{event.type.charAt(0).toUpperCase() + event.type.slice(1)}
									</Badge>
								</div>
								<p className="text-sm text-muted-foreground mb-1">{event.date}</p>
								{event.description && (
									<p className="text-sm text-muted-foreground">{event.description}</p>
								)}
							</div>

							<Button variant="ghost" size="sm" className="shrink-0">
								<Edit className="h-4 w-4 mr-1" />
								Edit
							</Button>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
