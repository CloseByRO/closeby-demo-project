import { demoConfig } from './clients/demo'
import type { ClientConfig } from '@/types/client-config'

// In production: read CLIENT_SLUG env var to select the right client
const CLIENT_SLUG = process.env.CLIENT_SLUG ?? 'demo'

const configs: Record<string, ClientConfig> = {
  demo: demoConfig,
  // 'client-001': client001Config,  ← add new clients here
}

export const clientConfig: ClientConfig = configs[CLIENT_SLUG] ?? demoConfig

export default clientConfig
