#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
import { argv } from 'process';
import * as snarkjs from 'snarkjs';
import { verifySignature } from '../utils/signer'; // ✅ Add this line

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
  signature?: string;        // ✅ new
  signedBy?: string;         // ✅ new
  success: boolean;
  error?: string;
}

async function main() {
  const filePath = argv[2];
  const expectedHash = argv.includes('--expectedHash')
    ? argv[argv.indexOf('--expectedHash') + 1]
    : null;

  if (!filePath) {
    console.error('❌ Usage: pnpm zypher verify <file> [--expectedHash <hash>]');
    process.exit(1);
  }

  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${fullPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(fullPath, 'utf-8');
  const session: ProofSession = JSON.parse(raw);

  console.log(`📄 Verifying: ${path.basename(fullPath)}\n`);
  console.log(`🧠 Prompt: ${session.prompt}`);
  console.log(`📅 Timestamp: ${new Date(session.timestamp).toLocaleString()}`);
  console.log(`🏷️ Stamp: ${session.stamp}`);
  console.log(`🔐 PromptHash: ${session.promptHash}`);
  console.log(`📦 ProofType: ${session.proofType}`);
  console.log(`🟢 Success: ${session.success}`);

  if (expectedHash && session.promptHash !== expectedHash) {
    console.error(`❌ promptHash mismatch. Expected: ${expectedHash}`);
    process.exit(1);
  }

  // ✅ ZK proof verification
  if (session.zkProof) {
    try {
      const vkeyPath = path.resolve('src/middleware/zk/circuits/verification_key.json');
      if (!fs.existsSync(vkeyPath)) {
        console.error('❌ Missing verification key at src/middleware/zk/circuits/verification_key.json');
        process.exit(1);
      }

      const vkey = JSON.parse(fs.readFileSync(vkeyPath, 'utf-8'));

      const isValid = await snarkjs.groth16.verify(
        vkey,
        session.zkProof.publicSignals,
        session.zkProof.proof
      );

      if (isValid) {
        console.log('\n✅ ZK Proof is VALID ✅');
      } else {
        console.error('\n❌ ZK Proof is INVALID ❌');
        process.exit(1);
      }
    } catch (err) {
      console.error('❌ Error during proof verification:', err);
      process.exit(1);
    }
  } else {
    console.warn('⚠️ No zkProof field found. Skipping ZK verification.');
  }

  // ✅ Signature verification
  if (session.signature && session.signedBy) {
    const signedMessage = session.prompt + session.response + (session.stamp ?? '');
    const recoveredAddress = verifySignature(signedMessage, session.signature);

    if (recoveredAddress.toLowerCase() === session.signedBy.toLowerCase()) {
      console.log(`🔏 Signature verified ✅ by ${recoveredAddress}`);
    } else {
      console.error(
        `❌ Signature mismatch! Claimed: ${session.signedBy}, Got: ${recoveredAddress}`
      );
      process.exit(1);
    }
  } else {
    console.warn('⚠️ No signature found. Skipping signature verification.');
  }

  console.log('\n🎉 Session verification complete.');
}

main();
