'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  url: string
  text: string
}

export default function SuccessToast({ url, text }: Props) {
  const [visible, setVisible] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      router.replace(url)
    }, 3000)

    return () => clearTimeout(timer)
  }, [router, url])

  if (!visible) return null

  return (
    <div className='toast toast-end'>
      <div className='alert alert-success shadow-lg'>
        <span>{text}</span>
      </div>
    </div>
  )
}
