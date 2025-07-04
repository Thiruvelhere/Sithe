import { getZypherConfig } from '../core/config'

export function shouldRun(middlewareName: 'proofOfPrompt' | 'proofOfInference'): boolean {
  const config = getZypherConfig()
  return config.middleware?.[middlewareName] ?? false
}

export function runMiddleware(middlewareName: 'proofOfPrompt' | 'proofOfInference') {
  if (shouldRun(middlewareName)) {
    console.log(`[ZYPHER]: Running ${middlewareName} ✅`)
    // TODO: Plug real logic here later (ZK/AI/etc)
  } else {
    console.log(`[ZYPHER]: Skipping ${middlewareName} ❌`)
  }
}
