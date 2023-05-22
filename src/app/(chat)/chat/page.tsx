import { Chatbox } from '@/components/chatbox'
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

export default function ChatPage() {
  return (
    <div className='h-screen md:flex'>
      <DesktopNav>
        <MainNav chats={chats} />
      </DesktopNav>
      <MobileNav>
        <MainNav chats={chats} />
      </MobileNav>
      <Chatbox />
    </div>
  )
}
