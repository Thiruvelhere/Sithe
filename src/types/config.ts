export interface ZypherConfig {
  apiKey: string
  network: string
  //llmProvider: 'ollama'
  agent: 'ollama',
  debug?: boolean
  middleware?: {
    proofOfPrompt?: boolean
    proofOfInference?: boolean
  }
  sandboxMode?: boolean
}
