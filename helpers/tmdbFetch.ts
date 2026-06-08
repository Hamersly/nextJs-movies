import { NextResponse } from 'next/server';

const ALLOWED_FORMATS = ['movie', 'tv'] as const;

export function validateFormat(format: string | null): format is 'movie' | 'tv' {
  return ALLOWED_FORMATS.includes(format as 'movie');
}

export async function tmdbFetch(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

export function cacheHeaders(): Record<string, string> {
  return { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600' };
}

export function errorResponse(error: unknown, logPrefix: string) {
  console.error(`TMDB ${logPrefix} error:`, error);
  return NextResponse.json({ error: true }, { status: 502 });
}
