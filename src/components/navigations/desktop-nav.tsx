type DesktopNavProps = {
  children: React.ReactNode
}

export function DesktopNav({ children }: DesktopNavProps) {
  return <div className='hidden w-80 border-r md:block'>{children}</div>
}
