'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

import { sleep } from '@/lib/utils'
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
      await sleep(3000)
      setIsLoading(false)
    }
  }

  return (
    <Button className='mt-4 w-full' onClick={handleLogin} disabled={isLoading}>
      <span className='flex items-center'>
        {isLoading ? (
          <Icons.spinner className='h-6 w-6 animate-spin' />
        ) : (
          <Icons.google className='h-6 w-6' />
        )}
        <p className='ml-3'>{isLoading ? 'Logging in...' : 'Google'}</p>
      </span>
    </Button>
  )
}
