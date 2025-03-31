import supabase from './supabase'
import { AuthError, Session, User } from '@supabase/supabase-js'

type AuthResponse = {
  user?: User | null
  session?: Session | null
  error?: AuthError | { message: string }
}

// Helper to format error messages
const formatErrorMessage = (error: AuthError): string => {
  switch (error?.message) {
    case 'Invalid login credentials':
      return 'The email or password you entered is incorrect.'
    case 'Email already in use':
      return 'This email is already registered. Please try logging in.'
    default:
      return error.message || 'An unexpected error occurred. Please try again later.'
  }
}

// Sign Up
export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  } catch (error) {
    console.error('Sign-up error:', error)
    if (error instanceof AuthError) {
      return { error: { ...error, message: formatErrorMessage(error) } }
    }
    return { error: { message: 'Unexpected error occurred during sign-up' } }
  }
}

// Sign In
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  } catch (error) {
    console.error('Sign-in error:', error)
    if (error instanceof AuthError) {
      return { error: { ...error, message: formatErrorMessage(error) } }
    }
    return { error: { message: 'Unexpected error occurred during sign-in' } }
  }
}

// Reset Password
export const resetPassword = async (email: string): Promise<{ error?: AuthError | { message: string } }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return {}
  } catch (error) {
    console.error('Password reset error:', error)
    if (error instanceof AuthError) {
      return { error }
    }
    return { error: { message: 'Unexpected error occurred during password reset' } }
  }
}

// Logout
export const signOut = async (): Promise<{ error?: AuthError | { message: string } }> => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return {}
  } catch (error) {
    console.error('Sign-out error:', error)
    if (error instanceof AuthError) {
      return { error }
    }
    return { error: { message: 'Unexpected error occurred during sign-out' } }
  }
}
