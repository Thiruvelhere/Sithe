import { ZypherConfig } from '../types/config'
import { setZypherConfig } from './config'

export function init(config: ZypherConfig) {
  if (!config.apiKey || !config.network) {
    throw new Error('Missing required fields')
  }

  setZypherConfig(config)

  console.log('Zypher SDK initialized with config:', config)
  return true
}
