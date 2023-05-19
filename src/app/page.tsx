import { DesktopNav } from '@/components/navigations/desktop-nav'
import { MainNav } from '@/components/navigations/main-nav'
import { MobileNav } from '@/components/navigations/mobile-nav'

export type Chat = {
  href: string
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
    <>
      <DesktopNav>
        <MainNav chats={chats} />
      </DesktopNav>
      <MobileNav>
        <MainNav chats={chats} />
      </MobileNav>
      <main className='py-10 lg:pl-72'>
        <div className='px-4 sm:px-6 lg:px-8'>{/* content */}</div>
      </main>
    </>
  )
}
