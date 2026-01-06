// app/generate/ClientWrapper.js
'use client'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

const ClientGenerate = dynamic(() => import('./ClientGenerate'), { ssr: false })

export default function ClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientGenerate />
    </Suspense>
  )
}
