import { ZypherConfig } from '../types/config'

let internalConfig: ZypherConfig | null = null

export function setZypherConfig(config: ZypherConfig) {
  internalConfig = {
    debug: false,
    middleware: {
      proofOfPrompt: true,
      proofOfInference: true,
    },
    sandboxMode: false,
    ...config,
  }
}

export function getZypherConfig(): ZypherConfig {
  if (!internalConfig) {
    throw new Error('Zypher SDK not initialized')
  }
  return internalConfig
}
