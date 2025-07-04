export interface ZypherConfig {
  apiKey: string
  network: string
  debug?: boolean
  middleware?: {
    proofOfPrompt?: boolean
    proofOfInference?: boolean
  }
  sandboxMode?: boolean
}
