
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define user type
interface User {
  id: string;
  email: string;
  name: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Check for existing user session on mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Check for existing session in Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking session:", error);
          setIsLoading(false);
          return;
        }
        
        if (data.session) {
          const userData = data.session.user;
          
          // Extract user name from metadata if available
          let userName = userData.email?.split('@')[0] || '';
          
          if (userData.user_metadata && userData.user_metadata.name) {
            userName = userData.user_metadata.name;
          } else if (userData.user_metadata && userData.user_metadata.full_name) {
            userName = userData.user_metadata.full_name;
          }
          
          setUser({
            id: userData.id,
            email: userData.email || '',
            name: userName,
          });
        }
      } catch (error) {
        console.error("Failed to check user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Extract user name from metadata if available
          let userName = session.user.email?.split('@')[0] || '';
          
          if (session.user.user_metadata && session.user.user_metadata.name) {
            userName = session.user.user_metadata.name;
          } else if (session.user.user_metadata && session.user.user_metadata.full_name) {
            userName = session.user.user_metadata.full_name;
          }
          
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: userName,
          });
          
          toast({
            title: "Signed in successfully",
            description: `Welcome${userName ? ', ' + userName : ''}!`,
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    checkUserSession();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      if (!email || !password) {
        throw new Error("Please enter email and password");
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // User is set by the auth state change listener
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with Google function
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      // Get the current URL's origin for the redirect
      const redirectTo = `${window.location.origin}/events`;
      console.log("Redirecting to:", redirectTo);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo,
          // Ensure we're using the correct callback URL
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        },
      });
      
      if (error) throw error;
      
      console.log("OAuth response:", data);
      // The user will be redirected to Google for authentication
      // The state will be updated by the auth state change listener
      // when they return to the app
    } catch (error) {
      toast({
        title: "Google login failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      setIsLoading(false);
      throw error;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      if (!name || !email || !password) {
        throw new Error("Please fill in all fields");
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) throw error;
      
      if (data.user) {
        // User is set by the auth state change listener
        toast({
          title: "Registration successful",
          description: "Your account has been created",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: "Logout failed",
        description: "There was an error during logout",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
