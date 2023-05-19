import { useOpenWithMediaQuery } from '@/hooks/use-open-with-media-query'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

type MobileNavProps = {
  children: React.ReactNode
}

export function MobileNav({ children }: MobileNavProps) {
  const [open, setOpen] = useOpenWithMediaQuery('(min-width: 768px)')

  return (
    <div className='sticky top-0 z-40 flex items-center justify-between border-b p-2 md:hidden'>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' size='sm'>
            <span className='sr-only'>Open sidebar</span>
            <Icons.menu className='h-6 w-6' aria-hidden='true' />
          </Button>
        </SheetTrigger>
        <SheetContent
          position='left'
          size='xl'
          className='flex min-w-[15.3125rem] max-w-xs flex-col'
        >
          <div className='mt-6'>{children}</div>
        </SheetContent>
      </Sheet>
      <p>New chat</p>
      <Button variant='ghost' size='sm'>
        <span className='sr-only'>Create a new chat</span>
        <Icons.plus className='h-6 w-6' aria-hidden='true' />
      </Button>
    </div>
  )
}