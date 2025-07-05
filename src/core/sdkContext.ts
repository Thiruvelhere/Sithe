// This defines the structure of the SDK's runtime memory
type AgentExecutionContext = {
  currentPrompt?: string
  response?: string
  zkProof?: string
  timestamp?: number
}

// Internal singleton context (in-memory)
let context: AgentExecutionContext = {}

export function setPrompt(prompt: string) {
  context.currentPrompt = prompt
  context.timestamp = Date.now()
}
export function setResponse(response: string) {
  context.response = response
}

export function setProof(proof: string) {
  context.zkProof = proof
}

export function getContext(): AgentExecutionContext {
  return context
}

export function resetContext() {
  context = {}
}
