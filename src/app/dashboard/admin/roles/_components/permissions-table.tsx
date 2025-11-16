"use client"

import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, Users, Shield, School, GraduationCap, User, TrendingUp, MoreHorizontal, Key } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { defaultPermissions } from "@/lib/default-roles"

interface PermissionsTableProps {
  searchQuery: string
}

const getResourceIcon = (resource: string) => {
  if (resource.includes("tenant")) return Building
  if (resource.includes("user")) return Users
  if (resource.includes("role")) return Shield
  if (resource.includes("school")) return School
  if (resource.includes("student")) return GraduationCap
  if (resource.includes("person") || resource.includes("employee") || resource.includes("guardian")) return User
  if (resource.includes("grade") || resource.includes("academic") || resource.includes("department")) return TrendingUp
  return Key
}

const getActionBadge = (action: string) => {
  if (action.includes("create") || action.includes("admit") || action.includes("onboard"))
    return <Badge className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">create</Badge>
  if (action.includes("read") || action.includes("view"))
    return <Badge className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">read</Badge>
  if (action.includes("update"))
    return <Badge className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">update</Badge>
  if (action.includes("delete"))
    return <Badge className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">delete</Badge>
  if (action.includes("manage") || action.includes("assign") || action.includes("grant"))
    return <Badge className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">manage</Badge>
  return <Badge variant="outline" className="text-xs">action</Badge>
}

const getResourceCategory = (permissionName: string): string => {
  const resource = permissionName.split(":")[0]
  if (resource === "tenant") return "Tenant"
  if (resource === "user") return "User"
  if (resource === "role") return "Role"
  if (resource === "school") return "School"
  if (resource === "person") return "Person"
  if (resource.includes("academic") || resource.includes("grade") || resource.includes("department")) return "Academic"
  if (resource === "student" || resource === "employee" || resource === "guardian") return "Person"
  return "General"
}

export default function PermissionsTable({ searchQuery }: PermissionsTableProps) {
  // Group permissions by category
  const groupedPermissions = useMemo(() => {
    const groups: Record<string, typeof defaultPermissions> = {}

    defaultPermissions.forEach((perm) => {
      const category = getResourceCategory(perm.name)
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(perm)
    })

    return groups
  }, [])

  // Filter permissions
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groupedPermissions

    const filtered: Record<string, typeof defaultPermissions> = {}

    Object.entries(groupedPermissions).forEach(([category, perms]) => {
      const matchingPerms = perms.filter(
        (perm) =>
          perm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          perm.description.toLowerCase().includes(searchQuery.toLowerCase())
      )

      if (matchingPerms.length > 0) {
        filtered[category] = matchingPerms
      }
    })

    return filtered
  }, [groupedPermissions, searchQuery])

  return (
    <div className="space-y-6">
      {Object.entries(filteredGroups).map(([category, permissions]) => {
        const Icon = getResourceIcon(category.toLowerCase())

        return (
          <div key={category} className="rounded-md border border-border/40 bg-card overflow-hidden">
            {/* Category Header */}
            <div className="bg-muted/30 px-4 py-2.5 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{category}</h3>
                <Badge variant="outline" className="text-xs ml-1">
                  {permissions.length}
                </Badge>
              </div>
            </div>

            {/* Permissions Table */}
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/40">
                  <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[250px]">
                    Permission
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[120px]">
                    Action
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Description
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((permission) => (
                  <TableRow key={permission.name} className="border-border/40 hover:bg-muted/20">
                    <TableCell className="font-mono text-xs">{permission.name}</TableCell>
                    <TableCell>{getActionBadge(permission.name)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{permission.description}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Roles</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      })}
    </div>
  )
}
