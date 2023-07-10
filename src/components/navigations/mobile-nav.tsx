'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useOpenWithMediaQuery } from '@/hooks/use-open-with-media-query'
import { Chat } from '@prisma/client'
import { Session } from 'next-auth'

import { Icons } from '@/components/icons'
import { NavContent } from '@/components/navigations/nav-content'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

type MobileNavProps = {
  user: Session['user']
  chats: Chat[]
}

export function MobileNav({ user, chats }: MobileNavProps) {
  const [open, setOpen] = useOpenWithMediaQuery('(min-width: 1024px)')
  const router = useRouter()
  const chatIdFromParams = usePathname().split('/')[2]

  return (
    <div className='sticky top-0 z-50 flex h-14 items-center justify-between border-b p-2 lg:hidden'>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' size='sm'>
            <span className='sr-only'>Open sidebar</span>
            <Icons.menu className='h-6 w-6' aria-hidden='true' />
          </Button>
        </SheetTrigger>
        <SheetContent
          className='min-w-[160px] max-w-xs sm:max-w-xs'
          side='left'
        >
          <NavContent user={user} chats={chats} setOpenChange={setOpen} />
        </SheetContent>
      </Sheet>
      {chatIdFromParams ? null : <p>New Chat</p>}
      <Button variant='ghost' size='sm' onClick={() => router.push('/chat')}>
        <span className='sr-only'>Create a new chat</span>
        <Icons.plus className='h-6 w-6' aria-hidden='true' />
      </Button>
    </div>
  )
}
