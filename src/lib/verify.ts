// src/lib/verify.ts
import fs from 'fs';
import path from 'path';
import * as snarkjs from 'snarkjs';
import { verifySignature } from '../utils/signer';

interface ProofSession {
  prompt: string;
  response: string;
  timestamp: number;
  config: any;
  proofType: 'PromptOnly' | 'PromptAndInference';
  stamp: string;
  promptHash: string;
  zkProof?: {
    proof: any;
    publicSignals: string[];
  };
  signature?: string;
  signedBy?: string;
  success: boolean;
  error?: string;
}

export async function verifyProofSession(session: ProofSession, expectedHash?: string) {
  const result: {
    zkVerified?: boolean;
    signatureVerified?: boolean;
    recoveredAddress?: string;
    errors: string[];
  } = { errors: [] };

  if (expectedHash && session.promptHash !== expectedHash) {
    result.errors.push(`Prompt hash mismatch. Expected: ${expectedHash}, got: ${session.promptHash}`);
    return result;
  }

  // ZK verification
  if (session.zkProof) {
    try {
      const vkeyPath = path.resolve('src/middleware/zk/circuits/verification_key.json');
      if (!fs.existsSync(vkeyPath)) {
        result.errors.push('Verification key not found.');
      } else {
        const vkey = JSON.parse(fs.readFileSync(vkeyPath, 'utf-8'));
        const isValid = await snarkjs.groth16.verify(
          vkey,
          session.zkProof.publicSignals,
          session.zkProof.proof
        );
        result.zkVerified = isValid;
        if (!isValid) result.errors.push('ZK proof is invalid.');
      }
    } catch (err) {
      result.errors.push(`ZK proof error: ${err.message}`);
    }
  }

  // Signature verification
  if (session.signature && session.signedBy) {
    try {
      const message = session.prompt + session.response + (session.stamp ?? '');
      const recovered = verifySignature(message, session.signature);
      result.recoveredAddress = recovered;
      result.signatureVerified = recovered.toLowerCase() === session.signedBy.toLowerCase();
      if (!result.signatureVerified) {
        result.errors.push(`Signature mismatch. Expected: ${session.signedBy}, got: ${recovered}`);
      }
    } catch (err) {
      result.errors.push(`Signature verification error: ${err.message}`);
    }
  }

  return result;
}
