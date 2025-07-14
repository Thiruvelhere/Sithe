// This defines the structure of the SDK's runtime memory
type AgentExecutionContext = {
  currentPrompt?: string;
  response?: string;
  zkProof?: string;
  timestamp?: number;
  stamp?: string;         // ✅ Added
  promptHash?: string;    // ✅ Added
};

// Internal singleton context (in-memory)
let context: AgentExecutionContext = {};

// Setters
export function setPrompt(prompt: string) {
  context.currentPrompt = prompt;
  context.timestamp = Date.now();
}

export function setResponse(response: string) {
  context.response = response;
}

export function setProof(proof: string) {
  context.zkProof = proof;
}

// ✅ New setters (optional, but clean)
export function setStamp(stamp: string) {
  context.stamp = stamp;
}

export function setPromptHash(hash: string) {
  context.promptHash = hash;
}

// Get the whole context
export function getContext(): AgentExecutionContext {
  return context;
}

// Reset context
export function resetContext() {
  context = {};
}
