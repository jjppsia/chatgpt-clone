import { MessageWithChatId, OverridenMessageType } from '@/app/api/chats/types'
import { Chat } from '@prisma/client'
import { OpenAIEdgeStream } from 'openai-edge-stream'

import { env } from '@/lib/validations/env'

export const runtime = 'edge'

const INITIAL_SYSTEM_MESSAGE: OverridenMessageType = {
  role: 'system',
  content:
    'Your name is ChatJPS. An incredibly intelligent and quick-thinking AI, that always replies with and enthusiastic and positive energy. You were created by Jp Sia. Your response must be formatted as markdown.',
}

const TOKEN = 4
const MAXIMUM_TOKENS = 2000

export async function POST(req: Request) {
  try {
    const domain = req.headers.get('origin')

    const {
      chatIdFromParams,
      prompt,
    }: {
      chatIdFromParams: string
      prompt: string
    } = await req.json()

    let chatId = chatIdFromParams
    let newChatId: Chat['id'] | undefined
    let chatMessages: OverridenMessageType[] = []

    if (chatId) {
      const response = await fetch(`${domain}/api/chats`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          cookie: req.headers.get('cookie') || '',
        },
        body: JSON.stringify({
          chatId,
          role: 'user',
          content: prompt,
        } as MessageWithChatId),
      })

      const { messages }: { messages: OverridenMessageType[] } =
        await response.json()

      chatMessages = messages || []
    } else {
      const response = await fetch(`${domain}/api/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: req.headers.get('cookie') || '',
        },
        body: JSON.stringify({ chatId, prompt }),
      })

      const {
        id,
        messages,
      }: {
        id: Chat['id']
        messages: OverridenMessageType[]
      } = await response.json()

      chatId = id
      newChatId = id
      chatMessages = messages || []
    }

    const messagesToInclude: OverridenMessageType[] = []

    chatMessages.reverse()

    chatMessages.forEach((chatMessage) => {
      let usedTokens = 0

      const messageTokens = chatMessage.content.length / TOKEN
      usedTokens += messageTokens

      if (usedTokens <= MAXIMUM_TOKENS) {
        messagesToInclude.push(chatMessage)
      } else {
        return
      }
    })

    messagesToInclude.reverse()

    const stream = await OpenAIEdgeStream(
      'https://api.openai.com/v1/chat/completions',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            INITIAL_SYSTEM_MESSAGE,
            ...messagesToInclude,
          ] as OverridenMessageType[],
          stream: true,
        }),
      },
      {
        onBeforeStream: async ({ emit }) => {
          if (newChatId) {
            emit(newChatId, 'onBeforeStream')
          }
        },
        onAfterStream: async ({ fullContent }) => {
          await fetch(`${domain}/api/chats`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              cookie: req.headers.get('cookie') || '',
            },
            body: JSON.stringify({
              chatId,
              role: 'assistant',
              content: fullContent,
            } as MessageWithChatId),
          })
        },
      }
    )

    return new Response(stream)
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
        message: 'An error occurred when sending a new message to OpenAI.',
      }),
      { status: 500 }
    )
  }
}
