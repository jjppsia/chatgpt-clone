import { redirect } from 'next/navigation'
import { User } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { Chatbox } from '@/components/chatbox'

const getUserChats = async (userId: User['id']) => {
  return await db.chat.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function ChatPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || '/auth/login')
  }

  const chats = await getUserChats(user.id)

  return <Chatbox user={user} chats={chats} />
}
