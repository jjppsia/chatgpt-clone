import Link from 'next/link'
import { Chat } from '@/app/page'

import { Icons } from '@/components/icons'
import { LogoutButton } from '@/components/logout-button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

type MainNavProps = {
  chats: Chat[]
}

export function MainNav({ chats }: MainNavProps) {
  return (
    <nav className='flex h-full flex-col'>
      <Link
        href='#'
        className='flex items-center space-x-3 rounded-md border-2 p-3 text-sm'
      >
        <Icons.plus className='h-4 w-4' />
        <h1>New chat</h1>
      </Link>

      {/* Chats list */}
      <div className='my-6 h-screen max-h-[calc(100vh-13.375rem)] overflow-y-auto md:max-h-none'>
        <ol className='flex flex-col'>
          {chats.map(({ href, chatMessage }, index) => (
            <li key={index}>
              <Link
                href={href}
                className='relative flex items-center space-x-3 p-3 text-sm'
              >
                <Icons.messageSquare className='h-4 w-4' />
                <p className='max-h-5 flex-1 truncate'>{chatMessage}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <Popover>
        <PopoverTrigger asChild>
          <div className='mt-auto flex items-center text-sm'>
            <div className='rounded-md border-2 p-1'>
              <Icons.user className='h-4 w-4' />
            </div>
            <p className='ml-3'>Your name</p>
            <Button variant='ghost' size='sm' className='ml-auto'>
              <Icons.ellipsis className='h-4 w-4' />
              <span className='sr-only'>Open popover</span>
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className='w-full bg-background p-2 text-accent-foreground'
          align='end'
        >
          <ThemeToggle />
          <Separator className='my-2' />
          <LogoutButton />
        </PopoverContent>
      </Popover>
    </nav>
  )
}
