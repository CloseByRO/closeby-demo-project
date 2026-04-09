import { NextResponse, type NextRequest } from 'next/server'
import { redisGet } from '@/lib/services/upstashRedis'
import { normalizePhone } from '@/lib/antiAbuse/phone.js'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const phoneRaw = body?.phone
    if (typeof phoneRaw !== 'string') {
      return NextResponse.json({ error: 'Missing phone' }, { status: 400 })
    }

    const phone = normalizePhone(phoneRaw)
    if (!phone) {
      return NextResponse.json({ error: 'Invalid phone' }, { status: 400 })
    }

    // If Upstash isn't configured, fail open (Phase 1).
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({ locked: false, reason: 'no_store' })
    }

    const key = `lock:phone:${phone}`
    const value = await redisGet(key)
    return NextResponse.json({ locked: !!value })
  } catch (e) {
    return NextResponse.json({ locked: false, error: e instanceof Error ? e.message : String(e) }, { status: 200 })
  }
}

