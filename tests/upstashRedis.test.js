import test from 'node:test'
import assert from 'node:assert/strict'

import { redisSetIfNotExists, redisGet } from '../lib/services/upstashRedis.js'

test('redisSetIfNotExists uses /set/{key}/{val}/NX/EX/{ttl} and Bearer auth', async () => {
  const prevFetch = globalThis.fetch
  const calls = []
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init })
    return {
      ok: true,
      json: async () => ({ result: 'OK' }),
      text: async () => '',
    }
  }

  process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io'
  process.env.UPSTASH_REDIS_REST_TOKEN = 'token_x'

  try {
    const ok = await redisSetIfNotExists({ key: 'lock:phone:+4076', value: { a: 1 }, ttlSeconds: 60 })
    assert.equal(ok, true)
    assert.equal(calls.length, 1)
    assert.match(calls[0].url, /^https:\/\/example\.upstash\.io\/set\//)
    assert.match(calls[0].url, /\/NX\/EX\/60$/)
    assert.equal(calls[0].init.method, 'GET')
    assert.equal(calls[0].init.headers.Authorization, 'Bearer token_x')
  } finally {
    globalThis.fetch = prevFetch
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  }
})

test('redisGet uses /get/{key}', async () => {
  const prevFetch = globalThis.fetch
  const calls = []
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init })
    return {
      ok: true,
      json: async () => ({ result: 'value' }),
      text: async () => '',
    }
  }

  process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io/'
  process.env.UPSTASH_REDIS_REST_TOKEN = 'token_x'

  try {
    const v = await redisGet('k')
    assert.equal(v, 'value')
    assert.equal(calls.length, 1)
    assert.equal(calls[0].url, 'https://example.upstash.io/get/k')
  } finally {
    globalThis.fetch = prevFetch
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  }
})

test('redisSetIfNotExists supports Vercel KV_* env vars', async () => {
  const prevFetch = globalThis.fetch
  const calls = []
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init })
    return {
      ok: true,
      json: async () => ({ result: 'OK' }),
      text: async () => '',
    }
  }

  process.env.KV_REST_API_URL = 'https://kv.example.upstash.io'
  process.env.KV_REST_API_TOKEN = 'token_kv'

  try {
    const ok = await redisSetIfNotExists({ key: 'k', value: 'v', ttlSeconds: 1 })
    assert.equal(ok, true)
    assert.equal(calls.length, 1)
    assert.equal(calls[0].init.headers.Authorization, 'Bearer token_kv')
    assert.match(calls[0].url, /^https:\/\/kv\.example\.upstash\.io\/set\//)
  } finally {
    globalThis.fetch = prevFetch
    delete process.env.KV_REST_API_URL
    delete process.env.KV_REST_API_TOKEN
  }
})

