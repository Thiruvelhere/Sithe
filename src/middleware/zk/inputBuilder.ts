import { getContext } from '../../core/sdkContext'
import { buildPoseidon } from 'circomlibjs' // ⬅️ Correct import

let poseidon: any

async function initPoseidon() {
  if (!poseidon) {
    poseidon = await buildPoseidon() // ⬅️ This is async!
  }
  return poseidon
}

export async function buildZKInput(): Promise<Record<string, string>> {
  const ctx = getContext()
  const prompt = ctx.currentPrompt || ''

  const promptBigInt = BigInt('0x' + Buffer.from(prompt, 'utf8').toString('hex'))

  const hasher = await initPoseidon()
  const hash = hasher.F.toString(hasher([promptBigInt]))

  return {
    prompt: promptBigInt.toString(),
    promptHash: hash
  }
}
