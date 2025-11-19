import Anthropic from '@anthropic-ai/sdk';
import { Agent, AgentResponse } from './types';

export class AnthropicAgent implements Agent {
    private client: Anthropic;
    private model: string;

    constructor(apiKey?: string, model: string = 'claude-3-5-sonnet-20241022') {
        const key = apiKey || process.env.ANTHROPIC_API_KEY;

        if (!key) {
            throw new Error(
                'Anthropic API key not found. Set ANTHROPIC_API_KEY environment variable or pass it to the constructor.'
            );
        }

        this.client = new Anthropic({ apiKey: key });
        this.model = model;
    }

    async run(prompt: string): Promise<AgentResponse> {
        console.log('[ZYPHER]: Sending prompt to Anthropic (Claude)...');

        try {
            const message = await this.client.messages.create({
                model: this.model,
                max_tokens: 1024,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            });

            const output = message.content[0].type === 'text'
                ? message.content[0].text
                : '';

            console.log('[ZYPHER]: Received response from Claude ✅');

            return { text: output };
        } catch (err) {
            console.error('[ZYPHER]: Anthropic query failed ❌', err);
            throw new Error('LLM query failed');
        }
    }
}
