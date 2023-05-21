'use client'

import { useState } from 'react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function Chatbox() {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <main className='flex h-[calc(100vh-3.5rem)] grow flex-col p-5 md:h-screen md:p-3'>
      <div className='mx-auto h-full w-full max-w-6xl overflow-auto border-2'></div>
      <footer className='mx-auto mt-5 w-full max-w-xl p-3'>
        <form onSubmit={handleSubmit} className='relative flex  items-center'>
          <Textarea
            placeholder='Send a mesage.'
            className='h-10 min-h-0 resize-none'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant='ghost'
            size='sm'
            className='absolute right-3 h-auto p-1'
            disabled={!message}
          >
            <Icons.send className='h-4 w-4' aria-hidden='true' />
            <span className='sr-only'>Send</span>
          </Button>
        </form>
      </footer>
    </main>
  )
}
