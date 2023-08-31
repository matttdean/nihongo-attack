'use client'
import React from 'react'
import UserContextProvider from '@/contexts/user-context'
import GameContextProvider from '@/contexts/game-context'
import LoginForm from '@/components/login-form'
import { motion } from 'framer-motion'

export default function Login() {
  return (

        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0}}
        exit={{ opacity: 0, y: 100}}

        className='flex justify-center items-center w-full h-screen'>
         <LoginForm />
        </motion.div>

  )
}
