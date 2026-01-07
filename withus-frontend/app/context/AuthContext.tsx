'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    nickname: string;
    avatarUrl?: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (userInfo: User) => void;
    logout: () => void;
    showOnboarding: boolean;
    setShowOnboarding: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const router = useRouter();

    // Check localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('withus_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userInfo: User) => {
        setIsLoggedIn(true);
        setUser(userInfo);
        localStorage.setItem('withus_user', JSON.stringify(userInfo));
        router.push('/'); // Redirect to main page
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('withus_user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, showOnboarding, setShowOnboarding }}>
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
