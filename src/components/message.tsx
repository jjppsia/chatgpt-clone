import { memo } from 'react'
import { OverridenMessageType } from '@/app/api/chats/types'
import { Session } from 'next-auth'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type MessageProps = {
  user: Session['user']
} & OverridenMessageType

function ChatMessage({ user, role, content }: MessageProps) {
  return (
    <div
      className={cn(
        'flex items-center space-x-5 border-border p-8',
        role === 'assistant' ? 'bg-accent' : ''
      )}
    >
      {role === 'user' ? (
        <Avatar className='h-6 w-6 self-start rounded-sm'>
          {user.image ? <AvatarImage src={user.image} /> : null}
          <AvatarFallback>
            {user.name ? user.name[0].toUpperCase() : 'U'}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className='h-6 w-6 shrink-0 self-start rounded-sm bg-green-600 text-white'>
          <Icons.chatgpt />
        </div>
      )}
      <div className='prose prose-slate dark:prose-invert'>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  )
}

export const ChatMessageMemo = memo(ChatMessage)
