'use client'
import React from 'react'
import SignupForm from '@/components/signup-form'
import { motion } from 'framer-motion'

export default function Login() {
  return (

        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        className="w-full h-screen flex justify-center items-center bg-zinc-500">
         <SignupForm />
        </motion.div>

  )
}
