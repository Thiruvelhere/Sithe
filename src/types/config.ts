export interface ZypherConfig {
  apiKey: string
  network: string
  //llmProvider: 'ollama'
  agent: 'ollama' | 'anthropic' | 'gemini' | 'cohere' | 'openai',
  debug?: boolean
  middleware?: {
    proofOfPrompt?: boolean
    proofOfInference?: boolean
  }
  sandboxMode?: boolean
}
