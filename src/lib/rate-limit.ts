/**
 * Simple in-memory rate limiter — good enough to blunt casual form spam.
 *
 * Limitation: this state lives in the Node.js process, so it resets on
 * every deploy/restart and isn't shared across serverless instances. For
 * meaningful abuse protection at scale, put this behind a shared store
 * (e.g. Upstash Redis) or a platform-level rate limiter/WAF instead. It's
 * intentionally kept dependency-free here since it's a reasonable
 * starting point for a low-traffic personal site.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5; // per IP, per window

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (bucket.count >= MAX_REQUESTS) {
    return true;
  }

  bucket.count += 1;
  return false;
}
