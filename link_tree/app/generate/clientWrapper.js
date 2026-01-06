// app/generate/ClientWrapper.js
'use client'
import React, { Suspense } from 'react'
import ClientGenerate from './ClientGenerate'

export default function ClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientGenerate />
    </Suspense>
  )
}
