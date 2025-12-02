"use client";

import { School } from "@/types/school";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Globe,
    Users,
    GraduationCap,
    Calendar,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SchoolCardProps {
    school: School;
    isActive?: boolean;
}

export function SchoolCard({ school, isActive = false }: SchoolCardProps) {
    const statusColor = {
        active: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20",
        inactive: "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 border-slate-500/20",
        suspended: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20",
        closed: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20",
        planned: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20",
    };

    return (
        <Card className={cn(
            "overflow-hidden transition-all duration-300 hover:shadow-md border-l-4",
            isActive ? "border-l-primary ring-1 ring-primary/20" : "border-l-transparent hover:border-l-primary/50"
        )}>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-xl font-bold tracking-tight">
                                {school.schoolName}
                            </CardTitle>
                            {isActive && (
                                <Badge variant="outline" className="text-xs font-normal bg-primary/5 text-primary border-primary/20">
                                    Current
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">
                                {school.schoolCode}
                            </span>
                            <span>•</span>
                            <span className="capitalize">{school.schoolType} School</span>
                        </div>
                    </div>
                    <Badge
                        variant="outline"
                        className={cn("capitalize border", statusColor[school.status] || statusColor.inactive)}
                    >
                        {school.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Contact Info */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Building2 className="h-4 w-4" /> Contact Details
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                <span className="text-foreground/80">
                                    {school.address.street}, {school.address.city}, {school.address.state} {school.address.postalCode}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                                <span className="text-foreground/80">{school.contactInfo.primaryPhone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                                <span className="text-foreground/80">{school.contactInfo.primaryEmail}</span>
                            </div>
                            {school.contactInfo.website && (
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <a
                                        href={school.contactInfo.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        {school.contactInfo.website.replace(/^https?:\/\//, '')}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats & Info */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" /> Academic Info
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-muted/30 p-2.5 rounded-lg border border-border/50">
                                <div className="text-xs text-muted-foreground mb-1">Grades</div>
                                <div className="font-medium text-sm">
                                    {school.gradeRange.lowestGrade} - {school.gradeRange.highestGrade}
                                </div>
                            </div>
                            <div className="bg-muted/30 p-2.5 rounded-lg border border-border/50">
                                <div className="text-xs text-muted-foreground mb-1">Capacity</div>
                                <div className="font-medium text-sm flex items-center gap-1.5">
                                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                    {school.maxStudentCapacity.toLocaleString()}
                                </div>
                            </div>
                            {school.foundedDate && (
                                <div className="bg-muted/30 p-2.5 rounded-lg border border-border/50 col-span-2">
                                    <div className="text-xs text-muted-foreground mb-1">Founded</div>
                                    <div className="font-medium text-sm flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                        {new Date(school.foundedDate).getFullYear()}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end pt-2 border-t">
                    <Button variant="ghost" size="sm" asChild className="text-xs hover:bg-primary/5 hover:text-primary">
                        <Link href={`/dashboard/admin/settings?schoolId=${school.schoolId}`}>
                            Manage Settings
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
