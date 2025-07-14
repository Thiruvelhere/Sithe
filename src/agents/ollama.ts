import { Agent, AgentResponse } from './types';

export class OllamaAgent implements Agent {
  async run(prompt: string): Promise<AgentResponse> {
    console.log('[ZYPHER]: Sending prompt to Ollama...');

    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          prompt,
          stream: false
        })
      });

      const data = await res.json();
      const output = data.response;

      console.log('[ZYPHER]: Received response ✅');

      return { text: output };
    } catch (err) {
      console.error('[ZYPHER]: Ollama query failed ❌', err);
      throw new Error('LLM query failed');
    }
  }
}
