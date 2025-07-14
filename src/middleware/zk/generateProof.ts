import { exec } from 'child_process';
import { writeJson, readJson } from '../../utils/fileIO';
import {
  
  setZkProof,
  setStamp,
  setPromptHash,
} from '../../core/sdkContext';
import { buildZKInput } from './inputBuilder';
import { sha256 } from '../../utils/hash';
import path from 'path';
import fs from 'fs';

export async function generateProof(): Promise<string> {
  const input = await buildZKInput();
  const zkDir = path.resolve(__dirname); // /src/middleware/zk
  const circuitsDir = path.join(zkDir, 'circuits');

  const inputPath = path.join(circuitsDir, 'input.json');
  const witnessPath = path.join(circuitsDir, 'witness.wtns');
  const wasmPath = path.join(circuitsDir, 'prompt_hash_js', 'prompt_hash.wasm');
  const zkeyPath = path.join(circuitsDir, 'prompt_hash.zkey');
  const proofPath = path.join(circuitsDir, 'proof.json');
  const publicPath = path.join(circuitsDir, 'public.json');

  // Write the input.json for witness generation
  console.log('[ZYPHER]: ZK Input', input);
  await writeJson(inputPath, input);

  return new Promise((resolve, reject) => {
    // Step 1: Generate witness
    exec(`snarkjs wtns calculate ${wasmPath} ${inputPath} ${witnessPath}`, (err1, stdout1, stderr1) => {
      if (err1) {
        console.error('[ZYPHER]: ❌ Witness generation failed\n', stderr1);
        return reject('Witness generation failed');
      }

      console.log('[ZYPHER]: ✅ Witness generated');

      // Step 2: Generate ZK proof
      exec(`snarkjs groth16 prove ${zkeyPath} ${witnessPath} ${proofPath} ${publicPath}`, async (err2, stdout2, stderr2) => {
        if (err2) {
          console.error('[ZYPHER]: ❌ Proof generation failed\n', stderr2);
          return reject('Proof generation failed');
        }

        console.log('[ZYPHER]: ✅ ZK Proof generated');

        try {
          const proof = await readJson(proofPath);
          const publicSignals = await readJson(publicPath);

          const proofHash = sha256(JSON.stringify(proof));
          const zkStamp = '0xzk_' + proofHash.slice(0, 24);

          // ✅ Set for context & export
          setZkProof({ proof, publicSignals });
          setPromptHash(publicSignals[0]); // assuming promptHash is the first
          setStamp(zkStamp);
          

          console.log('[ZYPHER]: 🏷️ ZK Stamp:', zkStamp);
          resolve(zkStamp);
        } catch (err3) {
          console.error('[ZYPHER]: ❌ Failed to read proof/public json', err3);
          reject('Reading proof failed');
        }
      });
    });
  });
}
