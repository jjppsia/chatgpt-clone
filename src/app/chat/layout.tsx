import { redirect } from 'next/navigation'
import { User } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { DesktopNav } from '@/components/navigations/desktop-nav'
import { MobileNav } from '@/components/navigations/mobile-nav'

const getUserChats = async (userId: User['id']) => {
  const chats = await db.chat.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return chats
}

type ChatLayoutProps = {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || '/auth/login')
  }

  const chats = await getUserChats(user.id)

  return (
    <div className='h-screen lg:flex'>
      <DesktopNav user={user} chats={chats} />
      <MobileNav user={user} chats={chats} />
      {children}
    </div>
  )
}
