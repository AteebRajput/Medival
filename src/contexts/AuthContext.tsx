import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials as requested
const ADMIN_USERNAME = 'Sultan';
const ADMIN_PASSWORD = 'admin';

// Session duration in milliseconds (30 minutes)
const SESSION_DURATION = 30 * 60 * 1000;

interface AuthProviderProps {
  children: ReactNode;
}

interface StoredAuthData {
  user: string;
  expiresAt: number;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth) {
      try {
        const authData: StoredAuthData = JSON.parse(storedAuth);
        const now = Date.now();
        
        // Check if session is still valid (not expired)
        if (authData.expiresAt > now) {
          setIsAuthenticated(true);
          setUser(authData.user);
          
          // Refresh the expiration time on page load
          const newExpiresAt = now + SESSION_DURATION;
          localStorage.setItem('adminAuth', JSON.stringify({
            user: authData.user,
            expiresAt: newExpiresAt,
          }));
        } else {
          // Session expired, clean up
          localStorage.removeItem('adminAuth');
        }
      } catch {
        // Invalid data, clean up
        localStorage.removeItem('adminAuth');
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setUser(username);
      
      const expiresAt = Date.now() + SESSION_DURATION;
      localStorage.setItem('adminAuth', JSON.stringify({ 
        user: username,
        expiresAt,
      }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('adminAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
