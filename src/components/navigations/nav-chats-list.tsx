'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Chat } from '@prisma/client'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'

type NavChatsListProps = {
  chats: Pick<Chat, 'id' | 'title'>[]
}

export function NavChatsList({ chats }: NavChatsListProps) {
  const chatIdFromParams = usePathname().split('/')[2]

  return (
    <ol className='flex flex-col space-y-3'>
      {chats.map(({ id, title }) => (
        <li key={id}>
          <Link
            href={`/chat/${id}`}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'h-auto w-full space-x-3 p-3',
              chatIdFromParams === id && 'bg-accent'
            )}
          >
            <Icons.messageSquare className='h-4 w-4' />
            <p title={title} className='flex-1 truncate'>
              {title}
            </p>
          </Link>
        </li>
      ))}
    </ol>
  )
}
