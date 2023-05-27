import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { DesktopNav } from '@/components/navigations/desktop-nav'
import { MobileNav } from '@/components/navigations/mobile-nav'
import { NavContent } from '@/components/navigations/nav-content'

type ChatLayoutProps = {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || '/auth/login')
  }

  return (
    <div className='h-screen lg:flex'>
      <DesktopNav>
        {/* @ts-expect-error Async Server Component */}
        <NavContent user={user} />
      </DesktopNav>
      <MobileNav>
        {/* @ts-expect-error Async Server Component */}
        <NavContent user={user} />
      </MobileNav>
      {children}
    </div>
  )
}
