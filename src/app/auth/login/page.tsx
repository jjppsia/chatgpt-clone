'use client'

import Image from 'next/image'
import building from '@/public/images/building.jpg'

import { LoginButton } from '@/components/login-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  return (
    <div className='flex min-h-full flex-1'>
      <div className='relative hidden w-0 flex-1 lg:block'>
        <Image
          className='absolute inset-0 h-full w-full object-cover'
          src={building}
          alt='Building'
          priority
          fill
        />
      </div>
      <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <Card>
            <CardHeader>
              <CardTitle className='text-center text-2xl'>
                Sign in to your account
              </CardTitle>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <LoginButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
