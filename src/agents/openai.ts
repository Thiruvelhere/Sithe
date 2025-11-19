import OpenAI from 'openai';
import { Agent, AgentResponse } from './types';

export class OpenAIAgent implements Agent {
    private client: OpenAI;
    private model: string;

    constructor(apiKey?: string, model: string = 'gpt-4o-mini') {
        const key = apiKey || process.env.OPENAI_API_KEY;

        if (!key) {
            throw new Error(
                'OpenAI API key not found. Set OPENAI_API_KEY environment variable or pass it to the constructor.'
            );
        }

        this.client = new OpenAI({ apiKey: key });
        this.model = model;
    }

    async run(prompt: string): Promise<AgentResponse> {
        console.log('[ZYPHER]: Sending prompt to OpenAI...');

        try {
            const completion = await this.client.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            });

            const output = completion.choices[0]?.message?.content || '';

            console.log('[ZYPHER]: Received response from OpenAI ✅');

            return { text: output };
        } catch (err) {
            console.error('[ZYPHER]: OpenAI query failed ❌', err);
            throw new Error('LLM query failed');
        }
    }
}
