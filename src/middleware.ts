import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of implemented routes that should NOT show 404
const implementedRoutes = [
  '/',
  '/dashboard',
  '/dashboard/students',
  '/dashboard/curriculum/classes',
  '/dashboard/curriculum/classes/create',
  // Add more implemented routes as they are created
]

// List of routes that should show 404 (not implemented yet)
const unimplementedRoutes = [
  '/dashboard/analytics',
  '/dashboard/teachers',
  '/dashboard/curriculum',
  '/dashboard/grades',
  '/dashboard/attendance',
  '/dashboard/profile',
  '/dashboard/children',
  '/dashboard/announcements',
  '/dashboard/messages',
  '/dashboard/reports',
  '/dashboard/admin',
  // Add student enrollment, records, etc.
  '/dashboard/students/enrollment',
  '/dashboard/students/records',
  '/dashboard/students/new',
  // Add teacher routes
  '/dashboard/teachers/assignments',
  // Add curriculum routes
  '/dashboard/curriculum/courses',
  '/dashboard/curriculum/schedules',
  // Add grade routes
  '/dashboard/grades/gradebook',
  '/dashboard/grades/view',
  '/dashboard/grades/reports',
  '/dashboard/grades/entry',
  // Add attendance routes
  '/dashboard/attendance/take',
  '/dashboard/attendance/view',
  '/dashboard/attendance/reports',
  // Add children routes
  '/dashboard/children/progress',
  '/dashboard/children/attendance',
  '/dashboard/children/communication',
  // Add announcement routes
  '/dashboard/announcements/create',
  // Add report routes
  '/dashboard/reports/generate',
  '/dashboard/reports/custom',
  // Add admin routes
  '/dashboard/admin/institution',
  '/dashboard/admin/users',
  '/dashboard/admin/roles',
  '/dashboard/admin/system',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is in the unimplemented routes list
  const isUnimplemented = unimplementedRoutes.some(route => {
    // Handle exact matches
    if (pathname === route) return true
    
    // Handle dynamic routes (like /dashboard/students/[id])
    if (route.includes('[') && route.includes(']')) {
      const routePattern = route.replace(/\[.*?\]/g, '[^/]+')
      const regex = new RegExp(`^${routePattern}$`)
      return regex.test(pathname)
    }
    
    // Handle nested routes (like /dashboard/students/*)
    if (route.endsWith('*')) {
      const baseRoute = route.slice(0, -1)
      return pathname.startsWith(baseRoute)
    }
    
    return false
  })

  // If it's an unimplemented route, redirect to 404
  if (isUnimplemented) {
    return NextResponse.rewrite(new URL('/not-found', request.url))
  }

  // For implemented routes or other routes, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
