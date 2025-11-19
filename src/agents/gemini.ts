import { GoogleGenerativeAI } from '@google/generative-ai';
import { Agent, AgentResponse } from './types';

export class GeminiAgent implements Agent {
    private client: GoogleGenerativeAI;
    private model: string;

    constructor(apiKey?: string, model: string = 'gemini-1.5-pro') {
        const key = apiKey || process.env.GOOGLE_API_KEY;

        if (!key) {
            throw new Error(
                'Google API key not found. Set GOOGLE_API_KEY environment variable or pass it to the constructor.'
            );
        }

        this.client = new GoogleGenerativeAI(key);
        this.model = model;
    }

    async run(prompt: string): Promise<AgentResponse> {
        console.log('[ZYPHER]: Sending prompt to Google Gemini...');

        try {
            const model = this.client.getGenerativeModel({ model: this.model });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const output = response.text();

            console.log('[ZYPHER]: Received response from Gemini ✅');

            return { text: output };
        } catch (err) {
            console.error('[ZYPHER]: Gemini query failed ❌', err);
            throw new Error('LLM query failed');
        }
    }
}
