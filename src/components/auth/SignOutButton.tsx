"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { getCognitoLogoutUrl, clearBrowserStorage } from "@/lib/cognito-logout"

export function SignOutButton() {
  const handleSignOut = async () => {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('[AUTH] Starting logout process')
      }

      // Step 1: Clear all browser storage (localStorage, sessionStorage)
      // This ensures no sensitive data remains in the browser
      clearBrowserStorage()
      
      // Step 2: Sign out from NextAuth
      // This clears NextAuth session cookies (next-auth.session-token, etc.)
      // Using redirect: false to prevent automatic redirect so we can handle Cognito logout
      await signOut({ 
        redirect: false,
        // Clear all callback URLs and other NextAuth data
      })
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[AUTH] NextAuth signout completed')
      }
      
      // Step 3: Get Cognito logout URL and redirect
      // This invalidates the refresh token on Cognito's side
      const logoutUrl = await getCognitoLogoutUrl()
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[AUTH] Redirecting to Cognito logout')
      }
      
      // Step 4: Redirect to Cognito logout (uses correct Hosted UI domain)
      // Cognito will invalidate the refresh token and redirect back to our app
      window.location.href = logoutUrl
    } catch (error) {
      console.error('[AUTH] Logout error:', error)
      // Force clear everything and reload on error
      // This ensures we don't leave the user in a partially logged-out state
      clearBrowserStorage()
      window.location.href = '/auth/signin'
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSignOut}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  )
}

