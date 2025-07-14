import { init } from './src/core/init';
import { getZypherConfig } from './src/core/config';
import { runMiddleware } from './src/middleware/middleware';
import { setPrompt, setResponse, getContext } from './src/core/sdkContext';
import { getAgent } from './src/agents';
import { finalizeAndExport } from './src/utils/exporter';
import { formatError } from './src/utils/formatError';

async function main() {
  const prompt = "What is uuu in one sentence?";
  const timestamp = Date.now();

  try {
    // 🔁 Init SDK
    init({
      apiKey: 'abc123',
      network: 'polygon',
      debug: true,
      agent: 'ollama',
      middleware: {
        proofOfPrompt: true,
        proofOfInference: true,
      },
    });

    const config = getZypherConfig();
    const proofType = config.middleware?.proofOfInference ? 'PromptAndInference' : 'PromptOnly';
    const agent = getAgent(config.agent);

    console.log('⚙️ Config fetched later:', config);

    // ➕ Set prompt
    setPrompt(prompt);

    // 🔁 Proof of Prompt
    await runMiddleware('proofOfPrompt');

    // 🤖 Run LLM
    const res = await agent.run(prompt);
    const response = res.text;
    console.log('🤖 LLM Response:', response);
    setResponse(response);

    // 🔁 Proof of Inference
    await runMiddleware('proofOfInference');

    // 🧠 Final context
    const context = getContext();
    console.log("🧠 [Zypher] Final Runtime Context:", context);

    // ✅ Export session
    await finalizeAndExport({
      prompt,
      response,
      timestamp,
      config,
      proofType,
      stamp: context.stamp,
      promptHash: context.promptHash,
      error: null,
    });

  } catch (err) {
    console.error('[ZYPHER]: ❌ Error in runtime:', err);

    const config = getZypherConfig(); // get again in case it was partially initialized

    await finalizeAndExport({
      prompt,
      response: '',
      timestamp,
      config,
      proofType: 'PromptOnly',
      stamp: undefined,
      promptHash: undefined,
      error: formatError(err),
    });
  }
}

main();
