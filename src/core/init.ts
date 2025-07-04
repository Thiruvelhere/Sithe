export interface SDKConfig {
  apiKey: string
  network: string
}

let internalConfig: SDKConfig

export function init(config: SDKConfig) {
  if (!config.apiKey || !config.network) {
    throw new Error("Missing required fields")
  }

  internalConfig = config
  console.log("Zypher SDK initialized:", internalConfig)

  return true
}
