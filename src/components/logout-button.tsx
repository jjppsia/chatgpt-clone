'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'

import { sleep } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      await signOut()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your logout attempt.',
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
    <Button
      variant='ghost'
      size='sm'
      className='flex w-full justify-start'
      disabled={isLoading}
      onClick={handleLogout}
    >
      {isLoading ? (
        <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <Icons.logout className='h-4 w-4' />
      )}
      <p className='ml-3 text-sm'>{isLoading ? 'Logging out...' : 'Logout'}</p>
    </Button>
  )
}
