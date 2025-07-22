// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { init } from './core/init';
import { getZypherConfig } from './core/config';
import { runMiddleware } from './middleware/middleware';
import { setPrompt, setResponse, getContext } from './core/sdkContext';
import { getAgent } from './agents';
import { finalizeAndExport } from './utils/exporter';
import { formatError } from './utils/formatError';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/zypher/ask', async (req, res) => {
  const { prompt } = req.body;
  const timestamp = Date.now();

  try {
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

    setPrompt(prompt);

    await runMiddleware('proofOfPrompt');

    const resLLM = await agent.run(prompt);
    const response = resLLM.text;
    setResponse(response);

    await runMiddleware('proofOfInference');

    const context = getContext();

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

    return res.json({
      response,
      context,
      proofPath: `proofs/session_${timestamp}.json`,
      success: true,
    });

  } catch (err) {
    console.error('[ZYPHER]: ❌ Error in backend handler:', err);

    await finalizeAndExport({
      prompt,
      response: '',
      timestamp,
      config: getZypherConfig(),
      proofType: 'PromptOnly',
      stamp: undefined,
      promptHash: undefined,
      error: formatError(err),
    });

    return res.status(500).json({
      error: formatError(err),
      success: false,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🧠 Zypher backend running at http://localhost:${PORT}`);
});
