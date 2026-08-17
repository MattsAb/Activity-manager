import type { User } from '@activity-manager/types';
import { createContext, useContext, useState} from 'react';

type AuthContextType = {
    user: User |  null
    login: () => void
    logout: () => void

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const login = () => {

    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}