import { MessageWithChatId, OverridenMessageType } from '@/app/api/chats/types'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const { prompt }: { prompt: string } = await req.json()

    const chat = await db.chat.create({
      data: {
        userId: session.user.id,
        title: prompt,
        messages: {
          set: [{ role: 'user', content: prompt } as OverridenMessageType],
        },
      },
    })

    return new Response(JSON.stringify(chat))
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
        message: 'An error occurred when creating a new chat.',
      }),
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const { chatId, role, content }: MessageWithChatId = await req.json()

    const existingChat = await db.chat.findFirst({
      where: { id: chatId, userId: session.user.id },
    })

    if (!existingChat) {
      return new Response(null, { status: 404 })
    }

    const chat = await db.chat.update({
      where: { id: existingChat.id },
      data: {
        messages: {
          set: [
            ...existingChat.messages,
            {
              role: role,
              content: content,
            },
          ] as OverridenMessageType[],
        },
      },
    })

    return new Response(JSON.stringify(chat))
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
        message: 'An error occurred when adding a message to a chat.',
      }),
      { status: 500 }
    )
  }
}
