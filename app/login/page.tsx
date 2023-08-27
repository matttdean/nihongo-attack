'use client'
import React from 'react'
import UserContextProvider from '@/contexts/user-context'
import GameContextProvider from '@/contexts/game-context'
import LoginForm from '@/components/login-form'

export default function Login() {
  return (

        <div className='flex justify-center items-center w-full h-screen'>
         <LoginForm />
        </div>

  )
}
