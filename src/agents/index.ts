import { Agent } from './types';
import { OllamaAgent } from './ollama';

export function getAgent(agentName: 'ollama' | 'mock' | 'manual'): Agent {
  switch (agentName) {
    case 'ollama':
      return new OllamaAgent();
    default:
      throw new Error(`Unsupported agent: ${agentName}`);
  }
}
