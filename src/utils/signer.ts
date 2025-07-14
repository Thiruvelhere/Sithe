// src/utils/signer.ts
import { Wallet, utils } from 'ethers';
import { sha256 } from './hash';
import * as dotenv from 'dotenv';

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY || !PRIVATE_KEY.startsWith('0x') || PRIVATE_KEY.length !== 66) {
  throw new Error('❌ Invalid or missing PRIVATE_KEY in .env');
}

const wallet = new Wallet(PRIVATE_KEY);

export async function signData(data: string): Promise<string> {
  const hash = sha256(data);
  const signature = await wallet.signMessage(hash);
  return signature;
}

export function getSignerAddress(): string {
  return wallet.address;
}

// ✅ Add this: used by verify.ts to recover the signer
export function verifySignature(message: string, signature: string): string {
  const hash = sha256(message);
  return utils.verifyMessage(hash, signature);
}
