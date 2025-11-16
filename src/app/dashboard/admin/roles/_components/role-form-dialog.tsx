"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Shield, Users, Building, GraduationCap, BookOpen, Calendar, BarChartBig as ChartBar, X, CheckCircle2 } from 'lucide-react'
import { defaultPermissions, rolePermissionsMap } from "@/lib/default-roles"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface RoleFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "edit"
  roleName?: string
}

// Map permission categories to icons and colors
const categoryConfig = {
  tenant: { icon: Building, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10" },
  user: { icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10" },
  role: { icon: Shield, color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-500/10" },
  school: { icon: Building, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-500/10" },
  person: { icon: Users, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10" },
  student: { icon: GraduationCap, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10" },
  employee: { icon: Users, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500/10" },
  guardian: { icon: Users, color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-500/10" },
  academic_year: { icon: Calendar, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-500/10" },
  academic_term: { icon: Calendar, color: "text-fuchsia-600 dark:text-fuchsia-400", bg: "bg-fuchsia-500/10" },
  department: { icon: BookOpen, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
  grade_level: { icon: ChartBar, color: "text-lime-600 dark:text-lime-400", bg: "bg-lime-500/10" },
  dashboard: { icon: ChartBar, color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-500/10" },
}

export default function RoleFormDialog({ open, onOpenChange, mode, roleName }: RoleFormDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({})

  // Load existing role data in edit mode
  useEffect(() => {
    if (mode === "edit" && roleName) {
      setFormData({
        name: roleName,
        description: "Custom organizational role", // In real app, fetch from backend
      })
      setSelectedPermissions(rolePermissionsMap[roleName] || [])
    } else {
      // Reset for create mode
      setFormData({ name: "", description: "" })
      setSelectedPermissions([])
    }
    setErrors({})
    setSearchQuery("")
    setCategoryFilter("all")
  }, [mode, roleName, open])

  // Group permissions by category
  const groupedPermissions = useMemo(() => {
    return defaultPermissions.reduce((acc, perm) => {
      const category = perm.name.split(":")[0]
      if (!acc[category]) acc[category] = []
      acc[category].push(perm)
      return acc
    }, {} as Record<string, typeof defaultPermissions>)
  }, [])

  // Get all categories for filter dropdown
  const categories = useMemo(() => Object.keys(groupedPermissions).sort(), [groupedPermissions])

  // Filter permissions based on search and category
  const filteredPermissions = useMemo(() => {
    const filtered: Record<string, typeof defaultPermissions> = {}
    
    Object.entries(groupedPermissions).forEach(([category, perms]) => {
      // Filter by category
      if (categoryFilter !== "all" && category !== categoryFilter) return
      
      // Filter by search
      const matchingPerms = perms.filter((perm) => {
        const searchLower = searchQuery.toLowerCase()
        return (
          perm.name.toLowerCase().includes(searchLower) ||
          perm.description.toLowerCase().includes(searchLower)
        )
      })
      
      if (matchingPerms.length > 0) {
        filtered[category] = matchingPerms
      }
    })
    
    return filtered
  }, [groupedPermissions, searchQuery, categoryFilter])

  const togglePermission = (permName: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permName) ? prev.filter((p) => p !== permName) : [...prev, permName]
    )
  }

  const selectAllInCategory = (category: string) => {
    const categoryPerms = groupedPermissions[category].map((p) => p.name)
    const allSelected = categoryPerms.every((p) => selectedPermissions.includes(p))
    
    if (allSelected) {
      // Deselect all in category
      setSelectedPermissions((prev) => prev.filter((p) => !categoryPerms.includes(p)))
    } else {
      // Select all in category
      setSelectedPermissions((prev) => [...new Set([...prev, ...categoryPerms])])
    }
  }

  const validateForm = () => {
    const newErrors: { name?: string; description?: string } = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Role name is required"
    } else if (formData.name.length < 3) {
      newErrors.name = "Role name must be at least 3 characters"
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return
    
    console.log(`[v0] ${mode === "create" ? "Creating" : "Updating"} role:`, {
      ...formData,
      permissions: selectedPermissions,
    })
    
    // Reset and close
    onOpenChange(false)
  }

  const handleCancel = () => {
    setFormData({ name: "", description: "" })
    setSelectedPermissions([])
    setErrors({})
    onOpenChange(false)
  }

  // Calculate statistics
  const totalPermissions = defaultPermissions.length
  const selectedByCategory = useMemo(() => {
    const stats: Record<string, { selected: number; total: number }> = {}
    Object.entries(groupedPermissions).forEach(([category, perms]) => {
      stats[category] = {
        selected: perms.filter((p) => selectedPermissions.includes(p.name)).length,
        total: perms.length,
      }
    })
    return stats
  }, [groupedPermissions, selectedPermissions])

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="w-[95vw] max-w-[70vw] h-[90vh] max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
          <DialogTitle className="text-xl font-semibold">
            {mode === "create" ? "Create New Role" : `Edit Role: ${roleName}`}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Create a custom role and assign permissions for your organization"
              : "Modify role details and permissions"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
          {/* Left: Role Details */}
          <div className="w-full lg:w-[35%] border-b lg:border-b-0 lg:border-r border-border/40 p-6 space-y-6 overflow-y-auto">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role-name" className="text-sm font-medium">
                  Role Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="role-name"
                  placeholder="e.g., Department Head, Class Teacher"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? "border-destructive" : ""}
                  disabled={mode === "edit"} // Cannot change role name in edit mode
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role-description" className="text-sm font-medium">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="role-description"
                  placeholder="Describe the role's purpose and responsibilities..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && (
                  <p className="text-xs text-destructive">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Permission Summary */}
            <div className="space-y-3 pt-4 border-t border-border/40">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Permission Summary</h4>
                <Badge variant="outline" className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20">
                  {selectedPermissions.length} / {totalPermissions}
                </Badge>
              </div>

              <ScrollArea className="h-[200px] rounded-md border border-border/40 p-3">
                <div className="space-y-2">
                  {Object.entries(selectedByCategory)
                    .filter(([_, stats]) => stats.selected > 0)
                    .map(([category, stats]) => {
                      const config = categoryConfig[category as keyof typeof categoryConfig]
                      const Icon = config?.icon || Shield
                      return (
                        <div
                          key={category}
                          className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/30"
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`h-3.5 w-3.5 ${config?.color || ""}`} />
                            <span className="text-xs font-medium capitalize">{category.replace("_", " ")}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {stats.selected} / {stats.total}
                          </span>
                        </div>
                      )
                    })}
                  {selectedPermissions.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      No permissions selected yet
                    </p>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Right: Permission Selection - Increased width to 65% for better space utilization */}
          <div className="flex-1 lg:w-[65%] flex flex-col overflow-hidden">
            {/* Search and Filter */}
            <div className="px-6 py-4 border-b border-border/40 space-y-3">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search permissions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1).replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {Object.values(filteredPermissions).flat().length} permissions shown
                </span>
                <span>
                  {selectedPermissions.length} selected
                </span>
              </div>
            </div>

            {/* Permissions List */}
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-6 pb-4">
                {Object.entries(filteredPermissions).map(([category, perms]) => {
                  const config = categoryConfig[category as keyof typeof categoryConfig]
                  const Icon = config?.icon || Shield
                  const allSelected = perms.every((p) => selectedPermissions.includes(p.name))
                  const someSelected = perms.some((p) => selectedPermissions.includes(p.name))
                  
                  return (
                    <div key={category} className="space-y-3">
                      {/* Category Header */}
                      <div className="flex items-center justify-between sticky top-0 bg-background py-2 z-10">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-md ${config?.bg || "bg-muted"}`}>
                            <Icon className={`h-4 w-4 ${config?.color || ""}`} />
                          </div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider">
                            {category.replace("_", " ")}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {perms.filter((p) => selectedPermissions.includes(p.name)).length} / {perms.length}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => selectAllInCategory(category)}
                          className="h-7 text-xs"
                        >
                          {allSelected ? "Deselect All" : "Select All"}
                        </Button>
                      </div>

                      {/* Permissions in Category */}
                      <div className="space-y-1 pl-2">
                        {perms.map((perm) => {
                          const isSelected = selectedPermissions.includes(perm.name)
                          return (
                            <div
                              key={perm.name}
                              className={`flex items-start gap-3 p-3 rounded-md border transition-all cursor-pointer hover:bg-muted/40 ${
                                isSelected
                                  ? "border-teal-500/40 bg-teal-500/5 hover:bg-teal-500/10"
                                  : "border-border/40"
                              }`}
                              onClick={() => togglePermission(perm.name)}
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => togglePermission(perm.name)}
                                className="mt-0.5"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <code className="text-xs font-mono font-semibold">
                                    {perm.name}
                                  </code>
                                  {isSelected && (
                                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {perm.description}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}

                {Object.keys(filteredPermissions).length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No permissions found</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="px-6 py-4 border-t border-border/40 bg-muted/20">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              {selectedPermissions.length} permission{selectedPermissions.length !== 1 ? "s" : ""} selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700"
                disabled={selectedPermissions.length === 0}
              >
                {mode === "create" ? "Create Role" : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
