import { Agent } from './types';
import { OllamaAgent } from './ollama';
import { AnthropicAgent } from './anthropic';
import { GeminiAgent } from './gemini';
import { CohereAgent } from './cohere';
import { OpenAIAgent } from './openai';

export function getAgent(agentName: 'ollama' | 'anthropic' | 'gemini' | 'cohere' | 'openai' | 'mock' | 'manual'): Agent {
  switch (agentName) {
    case 'ollama':
      return new OllamaAgent();
    case 'anthropic':
      return new AnthropicAgent();
    case 'gemini':
      return new GeminiAgent();
    case 'cohere':
      return new CohereAgent();
    case 'openai':
      return new OpenAIAgent();
    default:
      throw new Error(`Unsupported agent: ${agentName}`);
  }
}
