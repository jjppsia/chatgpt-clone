'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your login attempt.',
        action: (
          <ToastAction altText='Please try again'>Please try again</ToastAction>
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button className='mt-4 w-full' onClick={handleLogin} disabled={isLoading}>
      {isLoading ? (
        <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <span className='flex items-center space-x-4'>
          <Icons.google className='mr-2 h-6 w-6' />
          Login
        </span>
      )}
    </Button>
  )
}
