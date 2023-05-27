'use client'

import Link from 'next/link'
import { Chat } from '@prisma/client'
import { Session } from 'next-auth'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { NavChatsList } from '@/components/navigations/nav-chats-list'
import { NavFooter } from '@/components/navigations/nav-footer'
import { buttonVariants } from '@/components/ui/button'

type NavContentProps = {
  user: Session['user']
  chats: Chat[]
  setOpenChange?: (open: boolean) => void
}

export function NavContent({ user, chats, setOpenChange }: NavContentProps) {
  return (
    <nav className='flex h-full flex-col p-3'>
      <Link
        href='/chat'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'h-auto justify-start space-x-3 rounded-md border-2 p-3'
        )}
        onClick={() => setOpenChange?.(false)}
      >
        <Icons.plus className='h-4 w-4' />
        <h1>New chat</h1>
      </Link>
      <div className='my-6 grow overflow-y-auto'>
        <NavChatsList chats={chats} setOpenChange={setOpenChange} />
      </div>
      <NavFooter user={user} />
    </nav>
  )
}
