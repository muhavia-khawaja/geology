'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'

type ButtonProps = { class: string; text: string }

export default function Button({ class: className, text }: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <div>
      <button type='submit' className={className} disabled={pending}>
        {pending ? 'Submitting...' : text}
      </button>
    </div>
  )
}
