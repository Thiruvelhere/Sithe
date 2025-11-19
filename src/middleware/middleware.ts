import { getZypherConfig } from '../core/config'
import { generateProof } from './zk/generateProof'

export function shouldRun(middlewareName: 'proofOfPrompt' | 'proofOfInference') {
  const config = getZypherConfig()
  return config.middleware?.[middlewareName] ?? false
}

export async function runMiddleware(middlewareName: 'proofOfPrompt' | 'proofOfInference') {
  if (!shouldRun(middlewareName)) {
    console.log(`[ZYPHER]: Skipping ${middlewareName} ❌`)
    return
  }

  console.log(`[ZYPHER]: Running ${middlewareName} ✅`)

  if (middlewareName === 'proofOfInference' || middlewareName === 'proofOfPrompt') {
    await generateProof()
  }

  // proofOfPrompt can be added similarly later
}
