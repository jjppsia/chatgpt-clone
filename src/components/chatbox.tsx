'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { MessageWithChatId } from '@/app/api/chats/types'
import { Chat } from '@prisma/client'
import { Session } from 'next-auth'
import { streamReader } from 'openai-edge-stream'

import { Icons } from '@/components/icons'
import { ChatMessageMemo } from '@/components/message'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from './ui/toast'
import { toast } from './ui/use-toast'

type ChatboxProps = {
  user: Session['user']
  chats: Chat[]
}

export function Chatbox({ user, chats }: ChatboxProps) {
  const [prompt, setPrompt] = useState('')
  const [openAIResponseMessage, setOpenAIResponseMessage] = useState('')
  const [newChatMessages, setNewChatMessages] = useState<MessageWithChatId[]>(
    []
  )
  const [generatingResponse, setGeneratingResponse] = useState(false)
  const [newChatId, setNewChatId] = useState<string | null>(null)
  const [fullMessage, setFullMessage] = useState('')

  const router = useRouter()

  const chatIdFromParams = usePathname().split('/')[2]

  useEffect(() => {
    if (!generatingResponse && newChatId) {
      router.refresh()
      router.push(`/chat/${newChatId}`)
    }
  }, [generatingResponse, newChatId, router])

  useEffect(() => {
    if (!generatingResponse && fullMessage) {
      setNewChatMessages((prevMessage) => {
        const newChatMessages: MessageWithChatId[] = [
          ...prevMessage,
          {
            chatId: crypto.randomUUID(),
            role: 'assistant',
            content: fullMessage,
          },
        ]

        return newChatMessages
      })

      setFullMessage('')
    }
  }, [fullMessage, generatingResponse])

  const selectedChatMessages = useMemo(() => {
    return chats
      .filter((chat) => chat.id === chatIdFromParams)
      .flatMap(({ messages }) => {
        return messages.map(
          (message) =>
            ({
              chatId: crypto.randomUUID(),
              ...message,
            } as MessageWithChatId)
        )
      })
  }, [chats, chatIdFromParams])

  if (chatIdFromParams && !selectedChatMessages.length) {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: `Unable to load ${chatIdFromParams}.`,
      action: (
        <ToastAction altText='Please try again'>Please try again</ToastAction>
      ),
    })
  }

  useEffect(() => {
    if (!newChatMessages.length && selectedChatMessages.length) {
      setNewChatMessages(selectedChatMessages)
    }
  }, [newChatMessages.length, selectedChatMessages])

  const handleMessageAndResponse = async () => {
    if (!prompt.trim()) {
      return
    }

    setGeneratingResponse(true)

    setNewChatMessages((prevMessage) => {
      const newChatMessages: MessageWithChatId[] = [
        ...prevMessage,
        {
          chatId: crypto.randomUUID(),
          role: 'user',
          content: prompt,
        },
      ]

      return newChatMessages
    })

    setPrompt('')

    const response = await fetch('/api/chats/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatIdFromParams: chatIdFromParams, prompt }),
    })

    const data = response.body

    if (!data) {
      return
    }

    const reader = data.getReader()

    let content = ''

    await streamReader(reader, (message) => {
      if (message.event === 'onBeforeStream') {
        setNewChatId(message.content)
      } else {
        setOpenAIResponseMessage(
          (prevMessage) => `${prevMessage}${message.content}`
        )
        content += message.content
      }
    })

    setFullMessage(content)
    setOpenAIResponseMessage('')
    setGeneratingResponse(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleMessageAndResponse()
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      await handleMessageAndResponse()
    }
  }

  return (
    <main className='flex h-[calc(100vh-3.5rem)] grow flex-col p-5 lg:h-screen lg:p-3'>
      <div className='mx-auto h-full w-full max-w-3xl overflow-y-auto'>
        {newChatMessages.map(({ chatId, role, content }) => (
          <ChatMessageMemo
            key={chatId}
            user={user}
            role={role}
            content={content}
          />
        ))}
        {openAIResponseMessage && (
          <ChatMessageMemo
            user={user}
            role='assistant'
            content={openAIResponseMessage}
          />
        )}
      </div>

      <footer className='mx-auto mt-5 w-full max-w-xl py-3'>
        <form onSubmit={handleSubmit} className='relative flex items-center'>
          <Textarea
            placeholder='Send a mesage.'
            className='h-10 min-h-0 resize-none'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={generatingResponse}
          />
          <Button
            variant='ghost'
            size='sm'
            className='absolute right-4 h-auto p-1'
            disabled={!prompt || generatingResponse}
          >
            <Icons.send className='h-4 w-4' aria-hidden='true' />
            <span className='sr-only'>Send</span>
          </Button>
        </form>
      </footer>
    </main>
  )
}
