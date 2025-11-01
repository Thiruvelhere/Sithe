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

      if (!res.ok) {
        throw new Error(`Ollama returned ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      // ✅ Handle multiple possible response formats
      const output =
        data.response ||
        data.output ||
        data.message?.content ||
        data.data?.response ||
        'No response generated.';

      console.log('🤖 [Ollama Response]:', output);

      console.log('[ZYPHER]: Received response ✅');

      return { text: output };
    } catch (err: any) {
      console.error('[ZYPHER]: Ollama query failed ❌', err.message);
      return { text: 'Error generating response.' };
    }
  }
}
