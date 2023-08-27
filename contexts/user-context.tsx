'use client'
import React, { createContext, useState, useContext} from 'react'

type UserContextProviderProps = {
    children: React.ReactNode;
}

type UserContextType = {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<any>(null);

export default function UserContextProvider({children}: UserContextProviderProps) {
    const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider  value={{
        user,
        setUser
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