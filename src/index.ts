import { init } from './core/init';
import { getZypherConfig } from './core/config';
import { runMiddleware } from './middleware/middleware';
import { verifyProofSession } from './lib/verify';
import { getAgent } from './agents';
import { setPrompt, setResponse, getContext } from './core/sdkContext';
import { finalizeAndExport } from './utils/exporter';

export const Zypher = {
  init,

  async ask(prompt: string) {
    const config = getZypherConfig();
    const agent = getAgent(config.agent);

    setPrompt(prompt);
    await runMiddleware('proofOfPrompt');

    const resLLM = await agent.run(prompt);
    const response = resLLM.text;
    setResponse(response);

    await runMiddleware('proofOfInference');
    const context = getContext();

    const proofPath = `proofs/session_${Date.now()}.json`;
    await finalizeAndExport({
      prompt,
      response,
      timestamp: Date.now(),
      config,
      proofType: 'PromptAndInference',
      stamp: context.stamp,
      promptHash: context.promptHash,
      error: null,
    });

    return { response, context, proofPath };
  },

  async verify(session: any, expectedHash?: string) {
    const result = await verifyProofSession(session, expectedHash);
    return result;
  },
};

export default Zypher;
