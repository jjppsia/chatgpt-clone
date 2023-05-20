type DesktopNavProps = {
  children: React.ReactNode
}

export function DesktopNav({ children }: DesktopNavProps) {
  return (
    <div className='fixed inset-y-0 z-50 hidden w-80 border-r md:block'>
      {children}
    </div>
  )
}
