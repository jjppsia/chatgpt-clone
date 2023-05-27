import { Message } from '@prisma/client'

export type OverridenMessageType = {
  content: Message['content']
  role: Exclude<Message['role'], string> | 'system' | 'assistant' | 'user'
}

export type MessageWithChatId = {
  chatId: string
} & OverridenMessageType
