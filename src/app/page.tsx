'use client'

import { UrlObject } from 'url'
import Link from 'next/link'

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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type Chat = {
  href: string | UrlObject
  chatMessage: string
}

const chats: Chat[] = [
  {
    href: '#',
    chatMessage:
      'lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.',
  },
  {
    href: '#',
    chatMessage:
      'lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.',
  },
  {
    href: '#',
    chatMessage:
      'lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.',
  },
]

export default function RootPage() {
  return (
    <div>
      {/* Sidebar for desktop */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        <div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6'>
          <nav className='flex flex-1 flex-col'></nav>
        </div>
      </div>

      {/* Topbar */}
      <div className='sticky top-0 z-40 flex items-center justify-between border-b p-2 md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' size='sm'>
              <span className='sr-only'>Open sidebar</span>
              <Icons.menu className='h-6 w-6' aria-hidden='true' />
            </Button>
          </SheetTrigger>
          <SheetContent position='left' size='xl' className='flex flex-col'>
            <SheetHeader>
              <SheetTitle className='flex items-center'>
                <Icons.messageCircle className='h-6 w-6' />
                <p className='ml-3 text-2xl font-bold'>ChatJPS</p>
              </SheetTitle>
            </SheetHeader>
            <nav className='my-6 flex h-full flex-col'>
              <Link
                href='#'
                className='flex items-center space-x-3 rounded-md border-2 p-3 text-sm'
              >
                <Icons.plus className='h-4 w-4' />
                <h1>New chat</h1>
              </Link>
              <div className='mt-4 max-h-[calc(100vh-16rem)] overflow-y-auto'>
                <ol className='flex flex-1 flex-col'>
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
          </SheetContent>
        </Sheet>
        <p>New chat</p>
        <Button variant='ghost' size='sm'>
          <span className='sr-only'>Create a new chat</span>
          <Icons.plus className='h-6 w-6' aria-hidden='true' />
        </Button>
      </div>

      <main className='py-10 lg:pl-72'>
        <div className='px-4 sm:px-6 lg:px-8'>{/* Your content */}</div>
      </main>
    </div>
  )
}
