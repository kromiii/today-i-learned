// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // すべてのアクセスに対して「403 Forbidden（閲覧禁止）」を返す
  return new NextResponse(
    '<h1>Service Temporarily Offline</h1><p>現在、このサイトは公開を停止しています。</p>',
    { status: 403, headers: { 'content-type': 'text/html; charset=utf-8' } }
  )
}

// すべてのパスに適用するための設定
export const config = {
  matcher: '/:path*',
}
