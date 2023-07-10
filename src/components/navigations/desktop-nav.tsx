import { Chat } from '@prisma/client'
import { Session } from 'next-auth'

import { NavContent } from '@/components/navigations/nav-content'

type DesktopNavProps = {
  user: Session['user']
  chats: Chat[]
}

export function DesktopNav({ user, chats }: DesktopNavProps) {
  return (
    <div className='hidden w-80 border-r lg:block'>
      <NavContent user={user} chats={chats} />
    </div>
  )
}
