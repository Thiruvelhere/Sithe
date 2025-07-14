import fs from 'fs';
import path from 'path';
import { ZypherConfig } from '../types/config';
import { getContext } from '../core/sdkContext';

export type ProofType = 'PromptOnly' | 'PromptAndInference';

interface ExportOptions {
  prompt: string;
  response: string;
  timestamp: number;
  config: ZypherConfig;
  proofType: ProofType;
  stamp?: string;
  promptHash?: string;
  error?: {
    message: string;
    cause?: string;
  } | null;
}

export async function finalizeAndExport({
  prompt,
  response,
  timestamp,
  config,
  proofType,
  stamp,
  promptHash,
  error,
}: ExportOptions) {
  const context = getContext();

  const sessionOutput = {
    prompt,
    response,
    timestamp,
    config,
    proofType,
    stamp: stamp ?? context.stamp ?? null,
    promptHash: promptHash ?? context.promptHash ?? null,
    zkProof: context.zkProof ?? null,
    success: error === null,
    error,
  };

  try {
    const proofsDir = path.join(__dirname, '../../proofs');
    if (!fs.existsSync(proofsDir)) {
      fs.mkdirSync(proofsDir, { recursive: true });
    }

    const filename = `session_${timestamp}.json`;
    const filePath = path.join(proofsDir, filename);

    fs.writeFileSync(filePath, JSON.stringify(sessionOutput, null, 2), 'utf-8');
    console.log(`[ZYPHER]: 📤 Proof exported successfully to ${filePath}`);
  } catch (fsError) {
    console.error('[ZYPHER]: ❌ Failed to write proof file:', fsError);
  }
}
