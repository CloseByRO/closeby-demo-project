type SetIfNotExistsOpts = {
  key: string
  value: unknown
  ttlSeconds: number
}

type UpstashResult<T> = { result: T }

function getUpstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url) throw new Error('Missing UPSTASH_REDIS_REST_URL')
  if (!token) throw new Error('Missing UPSTASH_REDIS_REST_TOKEN')
  return { url: url.replace(/\/+$/, ''), token }
}

async function upstashFetch<T>(path: string, body?: unknown): Promise<T> {
  const { url, token } = getUpstashConfig()
  const res = await fetch(`${url}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Upstash request failed (${res.status}): ${text}`)
  }
  return (await res.json()) as T
}

export async function redisSetIfNotExists({ key, value, ttlSeconds }: SetIfNotExistsOpts): Promise<boolean> {
  if (!key) throw new Error('redisSetIfNotExists: key is required')
  if (!Number.isFinite(ttlSeconds) || ttlSeconds <= 0) throw new Error('redisSetIfNotExists: ttlSeconds must be > 0')

  const val = typeof value === 'string' ? value : JSON.stringify(value)
  const data = await upstashFetch<UpstashResult<number>>('/set', [key, val, 'NX', 'EX', ttlSeconds])
  return data.result === 1
}

export async function redisGet(key: string): Promise<string | null> {
  if (!key) throw new Error('redisGet: key is required')
  const data = await upstashFetch<UpstashResult<string | null>>('/get', [key])
  return data.result ?? null
}

