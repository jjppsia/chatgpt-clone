import Link from 'next/link'
import { User } from '@prisma/client'
import { Session } from 'next-auth'

import { db } from '@/lib/db'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { NavChatsList } from '@/components/navigations/nav-chats-list'
import { NavFooter } from '@/components/navigations/nav-footer'
import { buttonVariants } from '@/components/ui/button'

const getUserChats = async (userId: User['id']) => {
  return await db.chat.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

type NavContentProps = {
  user: Session['user']
}

export async function NavContent({ user }: NavContentProps) {
  const chats = await getUserChats(user.id)

  return (
    <nav className='flex h-full flex-col p-3'>
      <Link
        href='/chat'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'h-auto justify-start space-x-3 rounded-md border-2 p-3'
        )}
      >
        <Icons.plus className='h-4 w-4' />
        <h1>New chat</h1>
      </Link>
      <div className='my-6 grow overflow-y-auto'>
        <NavChatsList chats={chats} />
      </div>
      <NavFooter user={user} />
    </nav>
  )
}
