/**
 * EdForge EMIS - Navigation Configuration
 * 
 * This file defines the navigation structure for the dashboard with role-based permissions.
 * Each navigation item specifies which permissions are required to view it.
 */

import { NavItem, Permission } from "@/types/rbac";

export const DASHBOARD_NAVIGATION: NavItem[] = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: "LayoutDashboard",
		isActive: true,
		// No permissions = visible to everyone
	},
	{
		title: "Analytics",
		url: "/dashboard/analytics",
		icon: "BarChart3",
		permissions: [
			Permission.VIEW_INSTITUTION_ANALYTICS,
			Permission.VIEW_SYSTEM_ANALYTICS,
		],
	},
	{
		title: "Students",
		url: "/dashboard/students",
		icon: "Users",
		permissions: [Permission.VIEW_STUDENTS, Permission.MANAGE_STUDENTS],
		items: [
			{
				title: "All Students",
				url: "/dashboard/students",
				permissions: [Permission.VIEW_STUDENTS],
			},
			{
				title: "Enrollment",
				url: "/dashboard/students/enrollment",
				permissions: [Permission.MANAGE_STUDENTS],
			},
			{
				title: "Student Records",
				url: "/dashboard/students/records",
				permissions: [Permission.VIEW_STUDENTS],
			},
		],
	},
	{
		title: "Teachers",
		url: "/dashboard/teachers",
		icon: "GraduationCap",
		permissions: [Permission.VIEW_TEACHERS, Permission.MANAGE_TEACHERS],
		items: [
			{
				title: "All Teachers",
				url: "/dashboard/teachers",
				permissions: [Permission.VIEW_TEACHERS],
			},
			{
				title: "Assignments",
				url: "/dashboard/teachers/assignments",
				permissions: [Permission.MANAGE_TEACHERS],
			},
		],
	},
	{
		title: "Curriculum",
		url: "/dashboard/curriculum",
		icon: "BookOpen",
		permissions: [Permission.MANAGE_CURRICULUM, Permission.MANAGE_COURSES],
		items: [
			{
				title: "Courses",
				url: "/dashboard/curriculum/courses",
				permissions: [Permission.MANAGE_COURSES],
			},
			{
				title: "Classes",
				url: "/dashboard/curriculum/classes",
				permissions: [Permission.MANAGE_CLASSES],
			},
			{
				title: "Schedules",
				url: "/dashboard/curriculum/schedules",
				permissions: [Permission.MANAGE_CURRICULUM],
			},
		],
	},
	{
		title: "Grades",
		url: "/dashboard/grades",
		icon: "Award",
		permissions: [Permission.VIEW_GRADES, Permission.MANAGE_GRADES],
		items: [
			{
				title: "Grade Book",
				url: "/dashboard/grades/gradebook",
				permissions: [Permission.MANAGE_GRADES],
			},
			{
				title: "View Grades",
				url: "/dashboard/grades/view",
				permissions: [Permission.VIEW_GRADES],
			},
			{
				title: "Report Cards",
				url: "/dashboard/grades/reports",
				permissions: [Permission.GENERATE_REPORTS],
			},
		],
	},
	{
		title: "Attendance",
		url: "/dashboard/attendance",
		icon: "Calendar",
		permissions: [Permission.VIEW_ATTENDANCE, Permission.MANAGE_ATTENDANCE],
		items: [
			{
				title: "Take Attendance",
				url: "/dashboard/attendance/take",
				permissions: [Permission.MANAGE_ATTENDANCE],
			},
			{
				title: "View Attendance",
				url: "/dashboard/attendance/view",
				permissions: [Permission.VIEW_ATTENDANCE],
			},
			{
				title: "Reports",
				url: "/dashboard/attendance/reports",
				permissions: [Permission.VIEW_ATTENDANCE],
			},
		],
	},
	{
		title: "My Profile",
		url: "/dashboard/profile",
		icon: "User",
		permissions: [Permission.VIEW_OWN_PROFILE],
	},
	{
		title: "My Children",
		url: "/dashboard/children",
		icon: "Users",
		permissions: [Permission.VIEW_CHILD_PROGRESS],
		items: [
			{
				title: "Academic Progress",
				url: "/dashboard/children/progress",
				permissions: [Permission.VIEW_CHILD_PROGRESS],
			},
			{
				title: "Attendance",
				url: "/dashboard/children/attendance",
				permissions: [Permission.VIEW_CHILD_ATTENDANCE],
			},
			{
				title: "Communication",
				url: "/dashboard/children/communication",
				permissions: [Permission.COMMUNICATE_WITH_TEACHERS],
			},
		],
	},
	{
		title: "Announcements",
		url: "/dashboard/announcements",
		icon: "Megaphone",
		permissions: [Permission.VIEW_ANNOUNCEMENTS, Permission.SEND_ANNOUNCEMENTS],
		items: [
			{
				title: "View All",
				url: "/dashboard/announcements",
				permissions: [Permission.VIEW_ANNOUNCEMENTS],
			},
			{
				title: "Create New",
				url: "/dashboard/announcements/create",
				permissions: [Permission.SEND_ANNOUNCEMENTS],
			},
		],
	},
	{
		title: "Messages",
		url: "/dashboard/messages",
		icon: "Mail",
		permissions: [Permission.SEND_MESSAGES],
		badge: 5, // Unread message count
	},
	{
		title: "Reports",
		url: "/dashboard/reports",
		icon: "FileText",
		permissions: [Permission.VIEW_REPORTS, Permission.GENERATE_REPORTS],
		items: [
			{
				title: "View Reports",
				url: "/dashboard/reports",
				permissions: [Permission.VIEW_REPORTS],
			},
			{
				title: "Generate Report",
				url: "/dashboard/reports/generate",
				permissions: [Permission.GENERATE_REPORTS],
			},
			{
				title: "Custom Reports",
				url: "/dashboard/reports/custom",
				permissions: [Permission.GENERATE_REPORTS],
			},
		],
	},
	{
		title: "Administration",
		url: "/dashboard/admin",
		icon: "Settings",
		permissions: [
			Permission.MANAGE_INSTITUTION,
			Permission.MANAGE_USERS,
			Permission.MANAGE_ROLES,
		],
		items: [
			{
				title: "Institution Settings",
				url: "/dashboard/admin/institution",
				permissions: [Permission.MANAGE_INSTITUTION],
			},
			{
				title: "User Management",
				url: "/dashboard/admin/users",
				permissions: [Permission.MANAGE_USERS],
			},
			{
				title: "Roles & Permissions",
				url: "/dashboard/admin/roles",
				permissions: [Permission.MANAGE_ROLES],
			},
			{
				title: "System Settings",
				url: "/dashboard/admin/system",
				permissions: [Permission.MANAGE_SYSTEM_SETTINGS],
			},
		],
	},
];

/**
 * Quick actions that appear based on role
 */
export const QUICK_ACTIONS = [
	{
		title: "New Student",
		url: "/dashboard/students/new",
		icon: "UserPlus",
		permissions: [Permission.MANAGE_STUDENTS],
	},
	{
		title: "Take Attendance",
		url: "/dashboard/attendance/take",
		icon: "CheckSquare",
		permissions: [Permission.MANAGE_ATTENDANCE],
	},
	{
		title: "Grade Entry",
		url: "/dashboard/grades/entry",
		icon: "Edit",
		permissions: [Permission.MANAGE_GRADES],
	},
	{
		title: "Send Announcement",
		url: "/dashboard/announcements/create",
		icon: "Megaphone",
		permissions: [Permission.SEND_ANNOUNCEMENTS],
	},
];

