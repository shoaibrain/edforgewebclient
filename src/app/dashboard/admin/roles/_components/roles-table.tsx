"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Shield, Users, Copy, Edit, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { defaultRoles, rolePermissionsMap } from "@/lib/default-roles"
import RoleFormDialog from "./role-form-dialog"

interface RolesTableProps {
  searchQuery: string
  roleTypeFilter: string
  onEditRole: (roleName: string) => void
}

// Mock custom roles data
const customRoles = [
  {
    name: "Department Head",
    description: "Manage curriculum and staff within assigned department",
    type: "custom",
    permissions: 5,
    users: 8,
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-15",
  },
  {
    name: "Class Teacher",
    description: "Manage classroom activities, grades, and student records",
    type: "custom",
    permissions: 12,
    users: 24,
    createdBy: "Michael Chen",
    createdAt: "2024-01-20",
  },
  {
    name: "Counselor",
    description: "Student welfare and guidance, view student records",
    type: "custom",
    permissions: 7,
    users: 3,
    createdBy: "Emily Rodriguez",
    createdAt: "2024-02-05",
  },
]

export default function RolesTable({ searchQuery, roleTypeFilter, onEditRole }: RolesTableProps) {
  // Combine system and custom roles
  const allRoles = useMemo(() => {
    const systemRolesData = defaultRoles.map((role) => ({
      name: role.name,
      description: role.description,
      type: "system" as const,
      permissions: rolePermissionsMap[role.name]?.length || 0,
      users: role.name === "TENANT_ADMIN" ? 2 : role.name === "SCHOOL_ADMIN" ? 8 : 15,
      createdBy: "System",
      createdAt: "System Defined",
    }))

    return [...systemRolesData, ...customRoles]
  }, [])

  // Filter roles
  const filteredRoles = useMemo(() => {
    return allRoles.filter((role) => {
      const matchesSearch =
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType =
        roleTypeFilter === "all" ||
        (roleTypeFilter === "system" && role.type === "system") ||
        (roleTypeFilter === "custom" && role.type === "custom")

      return matchesSearch && matchesType
    })
  }, [allRoles, searchQuery, roleTypeFilter])

  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [roleDialogMode, setRoleDialogMode] = useState<"create" | "edit">("create")
  const [selectedRoleName, setSelectedRoleName] = useState<string>()

  const handleEditRole = (roleName: string) => {
    setSelectedRoleName(roleName)
    setRoleDialogMode("edit")
    setRoleDialogOpen(true)
  }

  return (
    <>
      <div className="rounded-md border border-border/40 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/40">
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role Name</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Permissions</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Users</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  No roles found
                </TableCell>
              </TableRow>
            ) : (
              filteredRoles.map((role) => (
                <TableRow key={role.name} className="border-border/40 hover:bg-muted/30">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{role.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-md">
                    {role.description}
                  </TableCell>
                  <TableCell>
                    {role.type === "system" ? (
                      <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                        System
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20">
                        Custom
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-medium">{role.permissions}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium">{role.users}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="text-xs">
                      <div>{role.createdBy}</div>
                      <div className="text-muted-foreground/70">{role.createdAt}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditRole(role.name)}>
                          <Edit className="h-3.5 w-3.5 mr-2" />
                          Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-3.5 w-3.5 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" disabled={role.type === "system"}>
                          <Trash2 className="h-3.5 w-3.5 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Table Footer */}
        <div className="border-t border-border/40 px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
          <div>
            Showing {filteredRoles.length} of {allRoles.length} roles
          </div>
          <div>
            {allRoles.filter((r) => r.type === "system").length} system · {allRoles.filter((r) => r.type === "custom").length} custom
          </div>
        </div>
      </div>

      <RoleFormDialog
        open={roleDialogOpen}
        onOpenChange={setRoleDialogOpen}
        mode={roleDialogMode}
        roleName={selectedRoleName}
      />
    </>
  )
}
