import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <p className='text-3xl font-bold text-indigo-500'>Diskord</p>
      <UserButton  afterSignOutUrl='/'/>
      <ModeToggle />
    </>
  )
}
