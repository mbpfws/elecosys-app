'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import { useDispatch } from 'react-redux'
import { setUser, clearUser } from '@/redux-store/slices/authSlice'

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  userRole: string | null
  isAdmin: boolean
  signUp: (email: string, password: string, metadata?: { [key: string]: any }) => Promise<{
    error: Error | null
    data: any | null
  }>
  signIn: (email: string, password: string) => Promise<{
    error: Error | null
    data: any | null
  }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{
    error: Error | null
    data: any | null
  }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setAuthUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    // Check active session
    const getSession = async () => {
      setIsLoading(true)
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error getting session:', error.message)
      }

      setSession(session)
      setAuthUser(session?.user ?? null)

      if (session?.user) {
        // Fetch user profile to get role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (profileError) {
          console.error('Error fetching user profile:', profileError.message)
        }

        const role = profile?.role || 'user'
        setUserRole(role)
        setIsAdmin(role === 'admin')

        // Update Redux store with user data
        dispatch(setUser({
          id: session.user.id,
          email: session.user.email,
          role: role,
          // Add other user properties as needed
        }))
      } else {
        setUserRole(null)
        setIsAdmin(false)
      }

      setIsLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setAuthUser(session?.user ?? null)

        if (session?.user) {
          // Fetch user profile to get role
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()

          if (profileError) {
            console.error('Error fetching user profile:', profileError.message)
          }

          const role = profile?.role || 'user'
          setUserRole(role)
          setIsAdmin(role === 'admin')

          // Update Redux store with user data
          dispatch(setUser({
            id: session.user.id,
            email: session.user.email,
            role: role,
            // Add other user properties as needed
          }))
        } else {
          // Clear user data from Redux store
          setUserRole(null)
          setIsAdmin(false)
          dispatch(clearUser())
        }

        setIsLoading(false)
      }
    )

    // Cleanup subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [dispatch, router])

  const signUp = async (email: string, password: string, metadata?: { [key: string]: any }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })

      return { data, error }
    } catch (error) {
      console.error('Error in signUp:', error)
      return { data: null, error: error as Error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      return { data, error }
    } catch (error) {
      console.error('Error in signIn:', error)
      return { data: null, error: error as Error }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      dispatch(clearUser())
      router.push('/pages/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      return { data, error }
    } catch (error) {
      console.error('Error in resetPassword:', error)
      return { data: null, error: error as Error }
    }
  }

  const value = {
    user,
    session,
    isLoading,
    userRole,
    isAdmin,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
