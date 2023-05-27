import { Session } from 'next-auth'

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

type NavFooterProps = {
  user: Session['user']
}

export function NavFooter({ user }: NavFooterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex h-auto cursor-pointer items-center p-3'
          )}
        >
          <Avatar className='h-6 w-6 rounded-lg'>
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback>
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <p className='ml-3'>{user.name}</p>
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
  )
}
