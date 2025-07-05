import { getContext, setProof } from '../../core/sdkContext'
import { createHash } from 'crypto'

export function generateFakeZKProof(): string {
  const { currentPrompt, response } = getContext()

  const input = `${currentPrompt}:${response}`
  const proof = createHash('sha256').update(input).digest('hex')

  const fakeProof = `0xzk_${proof.slice(0, 24)}`
  setProof(fakeProof)

  console.log('[ZYPHER]: 🔐 Fake ZK Proof Generated:', fakeProof)
  return fakeProof
}
