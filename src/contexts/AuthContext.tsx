import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { supabase } from '@/lib/supabase';

interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  loginWithGoogle: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Supabase auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser({
          uid: session.user.id,
          email: session.user.email ?? '',
          displayName: session.user.user_metadata.full_name || session.user.email,
          photoURL: session.user.user_metadata.avatar_url || null,
        });
      } else {
        setCurrentUser(null);
      }
    });
    // Set initial user
    const user = supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setCurrentUser({
          uid: data.user.id,
          email: data.user.email ?? '',
          displayName: data.user.user_metadata.full_name || data.user.email,
          photoURL: data.user.user_metadata.avatar_url || null,
        });
      }
      setLoading(false);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  async function signup(email: string, password: string, displayName: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: displayName },
      },
    });
    if (error) throw error;
    return data;
  }

  // Login function
  async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  // Logout function
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setCurrentUser(null);
  }

  // Reset password
  async function resetPassword(email: string) {
    const redirectUrl = typeof window !== 'undefined' && window.location?.origin 
      ? `${window.location.origin}/reset-password`
      : '/reset-password';
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    if (error) throw error;
  }

  // Update profile
  async function updateUserProfile(displayName: string) {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: displayName },
    });
    if (error) throw error;
    // Optionally update local state
    setCurrentUser((prev) => prev ? { ...prev, displayName } : prev);
  }

  // Login with Google
  async function loginWithGoogle() {
    const redirectUrl = typeof window !== 'undefined' && window.location?.origin 
      ? window.location.origin
      : '';
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    });
    if (error) throw error;
  }

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 