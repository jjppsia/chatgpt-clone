type DesktopNavProps = {
  children: React.ReactNode
}

export function DesktopNav({ children }: DesktopNavProps) {
  return <nav className='hidden w-80 border-r lg:block'>{children}</nav>
}
