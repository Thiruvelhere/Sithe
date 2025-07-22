// src/server.ts

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

import { init } from './core/init';
import { getZypherConfig } from './core/config';
import { runMiddleware } from './middleware/middleware';
import { setPrompt, setResponse, getContext } from './core/sdkContext';
import { getAgent } from './agents';
import { finalizeAndExport } from './utils/exporter';
import { formatError } from './utils/formatError';
import { verifyProofSession } from './lib/verify';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🧠 Ask Endpoint
app.post('/zypher/ask', async (req, res) => {
  const { prompt } = req.body;
  const timestamp = Date.now();

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid or missing prompt' });
  }

  try {
    // Init SDK
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

    // Set prompt and run proof
    setPrompt(prompt);
    await runMiddleware('proofOfPrompt');

    const resLLM = await agent.run(prompt);
    const response = resLLM.text;
    setResponse(response);

    await runMiddleware('proofOfInference');

    const context = getContext();

    // Export session
    const proofPath = `proofs/session_${timestamp}.json`;
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
      success: true,
      response,
      context,
      proofPath,
    });

  } catch (err) {
    console.error('[ZYPHER]: ❌ Error in /zypher/ask:', err);

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
      success: false,
      error: formatError(err),
    });
  }
});

// ✅ Verify Endpoint
app.post('/zypher/verify', async (req, res) => {
  const { filePath, expectedHash } = req.body;

  if (!filePath || typeof filePath !== 'string') {
    return res.status(400).json({ success: false, error: 'Missing or invalid filePath' });
  }

  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    return res.status(404).json({ success: false, error: `File not found: ${resolvedPath}` });
  }

  try {
    const raw = fs.readFileSync(resolvedPath, 'utf-8');
    const session = JSON.parse(raw);
    const result = await verifyProofSession(session, expectedHash);

    return res.json({
      success: result.errors.length === 0,
      zkVerified: result.zkVerified ?? false,
      signatureVerified: result.signatureVerified ?? false,
      recoveredAddress: result.recoveredAddress,
      errors: result.errors,
    });

  } catch (err) {
    console.error('[ZYPHER]: ❌ Error in /zypher/verify:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🧠 Zypher backend running at http://localhost:${PORT}`);
});
