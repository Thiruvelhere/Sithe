import { CohereClient } from 'cohere-ai';
import { Agent, AgentResponse } from './types';

export class CohereAgent implements Agent {
    private client: CohereClient;
    private model: string;

    constructor(apiKey?: string, model: string = 'command-r-plus') {
        const key = apiKey || process.env.COHERE_API_KEY;

        if (!key) {
            throw new Error(
                'Cohere API key not found. Set COHERE_API_KEY environment variable or pass it to the constructor.'
            );
        }

        this.client = new CohereClient({ token: key });
        this.model = model;
    }

    async run(prompt: string): Promise<AgentResponse> {
        console.log('[ZYPHER]: Sending prompt to Cohere...');

        try {
            const response = await this.client.chat({
                model: this.model,
                message: prompt,
            });

            const output = response.text || '';

            console.log('[ZYPHER]: Received response from Cohere ✅');

            return { text: output };
        } catch (err) {
            console.error('[ZYPHER]: Cohere query failed ❌', err);
            throw new Error('LLM query failed');
        }
    }
}
