import React from 'react'
import { useUser } from '@/contexts/user-context';
import  { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/game-context';
import { client, account, ID } from '@/appwrite'
import Link from 'next/link'

export default function SignupForm() {
    const {user, setUser} = useUser();
    const {setGameState} = useGame();
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, email, password } = e.currentTarget;
        try {
            const response = await account.create(
                ID.unique(),
                email.value,
                password.value,
                username.value
            )
            const user = await account.get();
            setUser(user);
            setGameState('main-menu')
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='flex flex-col justify-center items-center gap-5 w-11/12'>
        <form className='sm:w-[30rem] w-full flex flex-col bg-zinc-200 py-6 px-4 gap-2 rounded-md'onSubmit={handleSignup}>
            <label className='text-sm' htmlFor="username">Name</label>
            <input className='rounded-sm p-2 mb-4' type="text" name="username" id="username" placeholder='Name'/>
            <label className='text-sm' htmlFor="email">Email</label>
            <input className='rounded-sm p-2 mb-4' type="email" name="email" id="email" placeholder='email'/>
            <label className='text-sm' htmlFor="password">Password</label>
            <input className='rounded-sm p-2 mb-4' type="password" name="password" id="password" placeholder='Password'/>
            <button className='rounded-full bg-zinc-700 p-2 text-white' type='submit'>Sign Up</button>
        </form>
        <Link href="/login">Back to login</Link>
    </div>
  )
}
