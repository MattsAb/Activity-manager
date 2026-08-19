import type { ApiResponse, FrontendUser } from '@activity-manager/types';
import { createContext, useContext, useEffect, useState} from 'react';
import { getMe } from '../utils/services/auth.api';
import { socket } from '../utils/socket';

type AuthContextType = {
    user: FrontendUser |  null
    saveUser: (token: string) => void
    isLoading: boolean
    logout: () => void

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<FrontendUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('idToken');
        if (token) {
        getMe().then((res) => {
            if (res.success && res.data) {
                setUser(res.data);
                setIsLoading(false)
            }
            else {
                localStorage.removeItem('idToken');
                setIsLoading(false)
            }
        });
        }
    }, []);

    useEffect(() => {
        if (user) {
            socket.auth = { token: localStorage.getItem('idToken') }
            socket.connect()
            return () => { socket.disconnect() }
        }
    }, [user])

    const saveUser = async (token: string): Promise<ApiResponse<null>> => {
        localStorage.setItem('idToken', token)
        const response = await getMe()

        if (response.success && response.data) {
            setUser(response.data)
            return { success: true }
        }
        return { success: false, error: response.error ?? 'Failed to load user' }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('idToken');
    }

    return (
        <AuthContext.Provider value={{user,saveUser,logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}