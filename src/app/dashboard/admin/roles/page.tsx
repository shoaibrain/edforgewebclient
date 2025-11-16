"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Download, MoreHorizontal, Shield, UsersIcon, Key } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import RolesTable from "./_components/roles-table"
import PermissionsTable from "./_components/permissions-table"
import RoleFormDialog from "./_components/role-form-dialog"

export default function RolesAndPermissionsPage() {
  const [activeTab, setActiveTab] = useState<"roles" | "permissions">("roles")
  const [searchQuery, setSearchQuery] = useState("")
  const [roleTypeFilter, setRoleTypeFilter] = useState("all")
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [roleDialogMode, setRoleDialogMode] = useState<"create" | "edit">("create")
  const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined)

  const handleCreateRole = () => {
    setRoleDialogMode("create")
    setSelectedRole(undefined)
    setRoleDialogOpen(true)
  }

  const handleEditRole = (roleName: string) => {
    setRoleDialogMode("edit")
    setSelectedRole(roleName)
    setRoleDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-foreground">Roles & Permissions</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Manage access control and authorization</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
              <Button 
                size="sm" 
                className="h-8 gap-1.5 bg-teal-600 hover:bg-teal-700 text-white" 
                onClick={handleCreateRole}
                disabled={activeTab === "permissions"}
              >
                <Plus className="h-3.5 w-3.5" />
                {activeTab === "roles" ? "New Role" : "New Permission"}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-border/40 px-6">
          <button
            onClick={() => setActiveTab("roles")}
            className={`text-sm py-2.5 px-0 mr-6 font-medium transition-colors border-b-2 ${
              activeTab === "roles"
                ? "border-teal-500 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Roles
          </button>
          <button
            onClick={() => setActiveTab("permissions")}
            className={`text-sm py-2.5 px-0 font-medium transition-colors border-b-2 ${
              activeTab === "permissions"
                ? "border-teal-500 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Permissions
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="border-b border-border/40 bg-card/10">
        <div className="px-6 py-3 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={activeTab === "roles" ? "Search by name, description..." : "Search permissions..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 bg-background/50 border-border/50 text-sm"
            />
          </div>

          {activeTab === "roles" && (
            <Select value={roleTypeFilter} onValueChange={setRoleTypeFilter}>
              <SelectTrigger className="w-[140px] h-8 text-sm bg-background/50">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="system">System Roles</SelectItem>
                <SelectItem value="custom">Custom Roles</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Main Content - Data Table */}
      <div className="px-6 py-4">
        {activeTab === "roles" ? (
          <RolesTable 
            searchQuery={searchQuery} 
            roleTypeFilter={roleTypeFilter}
            onEditRole={handleEditRole}
          />
        ) : (
          <PermissionsTable searchQuery={searchQuery} />
        )}
      </div>

      <RoleFormDialog 
        open={roleDialogOpen} 
        onOpenChange={setRoleDialogOpen}
        mode={roleDialogMode}
        roleName={selectedRole}
      />
    </div>
  )
}
