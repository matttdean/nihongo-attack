'use client'
import React from 'react'
import UserContextProvider from '@/contexts/user-context'
import GameContextProvider from '@/contexts/game-context'
import SignupForm from '@/components/signup-form'

export default function Login() {
  return (

        <div className='flex justify-center items-center w-full h-screen'>
         <SignupForm />
        </div>

  )
}
