// This defines the structure of the SDK's runtime memory
type AgentExecutionContext = {
  currentPrompt?: string;
  response?: string;
  timestamp?: number;
  stamp?: string;
  promptHash?: string;
  zkProof?: {
    proof: any;
    publicSignals: string[];
  };
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

export function setStamp(stamp: string) {
  context.stamp = stamp;
}

export function setPromptHash(hash: string) {
  context.promptHash = hash;
}

export function setZkProof(zk: { proof: any; publicSignals: string[] }) {
  context.zkProof = zk;
}

// Get context
export function getContext(): AgentExecutionContext {
  return context;
}

// Reset context
export function resetContext() {
  context = {};
}
