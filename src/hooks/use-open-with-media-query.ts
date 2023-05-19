import { useEffect, useState } from 'react'
import { useMediaQuery } from '@react-hookz/web'

export function useOpenWithMediaQuery(query: string) {
  const [open, setOpen] = useState(false)
  const matches = useMediaQuery(query)

  useEffect(() => {
    if (matches) {
      setOpen(false)
    }
  }, [matches])

  return [open, setOpen] as const
}
