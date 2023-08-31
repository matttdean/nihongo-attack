'use client'
import React, { createContext, useState, useContext, useEffect} from 'react'
import { ID, account } from '@/appwrite'
import { type } from 'os';

type UserContextProviderProps = {
    children: React.ReactNode;
}

type UserContextType = {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type User = {
    $id: string;
    email: string;
    name: string;
    prefs: {
        any: any;
    }
}


export const checkUser = async () => {
    try {
        const user = await account.get()
        return user;
    } catch (error) {
        return null
    }
}

const forgotPassword = async (email: string) => {
    try {
        const response = await account.createRecovery(email, "http://localhost:3000/reset-password")
        return response;
    } catch (error) {
        return null;
    }
}

const resetPassword = async (userId: string, secret: string, password: string) => {
    try {
        const response = await account.updateRecovery(userId, secret, password, password)
        return response;
    } catch (error) {
        return null;
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await account.createEmailSession(email, password)
        const user = await account.get();
        return user;
    } catch (error) {
        return null;
    }
}

export const getUser = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        return null;
    }
}

export const signup = async (email: string, password: string, username: string) => {
    try {
        const response = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
    } catch (error) {
        return null;
    }
}

export const updatePrefs = async (newPrefs: any) => {
    try {
        const user = await account.get();
        const prefs: any = await account.updatePrefs(newPrefs);
        return prefs;
    } catch (error) {
        return null;
    }
}

export const logout = async () => {
    try {
        const response = await account.deleteSession('current');
        return response;
    } catch (error) {
        return null;
    }
}


const UserContext = createContext<any>(null);

export default function UserContextProvider({children}: UserContextProviderProps) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

  return (
    <UserContext.Provider value={{
        user,
        setUser,
        loading,
        setLoading
    }}>{children}</UserContext.Provider>
  )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserContextProvider')
    }
    return context;
}