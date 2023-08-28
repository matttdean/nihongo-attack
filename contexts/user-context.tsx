'use client'
import React, { createContext, useState, useContext, useEffect} from 'react'
import { account } from '@/appwrite'
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


const checkUser = async () => {
    try {
        const user = await account.get()
        return user;
    } catch (error) {
        return null
    }
}


const UserContext = createContext<any>(null);

export default function UserContextProvider({children}: UserContextProviderProps) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        checkUser().then((user) => {
            if (user === null) {
                setLoading(false);
                return;
            }
            setUser({$id: user.$id, email: user.email, name: user.name, prefs: user.prefs});
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
        })
    }, [])

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