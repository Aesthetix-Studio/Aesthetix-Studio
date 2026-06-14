import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple token bucket rate limiter (10 requests per minute per IP)
const LIMIT = 10;
const WINDOW_MS = 60 * 1000;
const ipMap = new Map<string, { count: number; reset: number }>();

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? request.headers.get('x-real-ip') ?? 'unknown';
  const now = Date.now();
  const record = ipMap.get(ip) ?? { count: 0, reset: now + WINDOW_MS };

  if (now > record.reset) {
    record.count = 0;
    record.reset = now + WINDOW_MS;
  }

  record.count++;
  ipMap.set(ip, record);

  if (record.count > LIMIT) {
    return new NextResponse(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Apply to all routes
};
