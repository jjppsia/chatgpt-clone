import Link from 'next/link'
import { Chat } from '@/app/(chat)/chat/page'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { LogoutButton } from '@/components/logout-button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
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
    <nav className='flex h-full flex-col p-3'>
      <Link
        href='#'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'h-auto justify-start space-x-3 rounded-md border-2 p-3'
        )}
      >
        <Icons.plus className='h-4 w-4' />
        <h1>New chat</h1>
      </Link>

      {/* Chats list */}
      <div className='my-6 grow overflow-y-auto'>
        <ol className='flex flex-col'>
          {chats.map(({ href, chatMessage }, index) => (
            <li key={index}>
              <Link
                href={href}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'h-auto w-full space-x-3 p-3'
                )}
              >
                <Icons.messageSquare className='h-4 w-4' />
                <p className='flex-1 truncate'>{chatMessage}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'flex h-auto cursor-pointer items-center p-3'
            )}
          >
            <Avatar className='h-6 w-6 rounded-lg'>
              <AvatarImage src='https://github.com/jjppsia.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className='ml-3'>Your name</p>
            <Button variant='ghost' className='ml-auto h-auto p-1'>
              <Icons.ellipsis className='h-4 w-4' />
              <span className='sr-only'>Open popover</span>
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-full bg-background p-2' align='end'>
          <ThemeToggle />
          <Separator className='my-2' />
          <LogoutButton />
        </PopoverContent>
      </Popover>
    </nav>
  )
}
