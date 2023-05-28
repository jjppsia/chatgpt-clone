import { MessageWithChatId, OverridenMessageType } from '@/app/api/chats/types'
import { Chat, Message } from '@prisma/client'
import { OpenAIEdgeStream } from 'openai-edge-stream'

import { env } from '@/lib/validations/env'

export const runtime = 'edge'

const INITIAL_SYSTEM_MESSAGE: OverridenMessageType = {
  role: 'system',
  content: `Your name is ChatJPS. An incredibly intelligent and quick-thinking AI,
    that always replies with and enthusiastic and positive energy.
    You were created by Jp Sia. Your response must be formatted as markdown.`,
}
const TOKEN = 4
const MAXIMUM_TOKENS = 2000

type HTTPMethod = 'POST' | 'PATCH'
type JSONValue = MessageWithChatId | Pick<Message, 'content'>

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

    const fetchMethod: HTTPMethod = chatIdFromParams ? 'PATCH' : 'POST'

    const fetchHeaders = {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') || '',
    }

    const jsonValue: JSONValue = chatIdFromParams
      ? { chatId: chatIdFromParams, role: 'user', content: prompt }
      : { content: prompt }

    const fetchBody = JSON.stringify(jsonValue)

    const response = await fetch(`${domain}/api/chats`, {
      method: fetchMethod,
      headers: fetchHeaders,
      body: fetchBody,
    })

    const {
      id,
      messages,
    }: {
      id: Chat['id']
      messages: OverridenMessageType[]
    } = await response.json()

    const messagesToInclude: OverridenMessageType[] = []

    messages.reverse()

    messages.forEach((message) => {
      let usedTokens = 0

      const messageTokens = message.content.length / TOKEN
      usedTokens += messageTokens

      if (usedTokens > MAXIMUM_TOKENS) {
        return
      }

      messagesToInclude.push(message)
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
          if (id) {
            emit(id, 'onBeforeStream')
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
              chatId: id,
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
