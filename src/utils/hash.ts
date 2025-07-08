import crypto from 'crypto'

// BN254 field size
const SNARK_FIELD_SIZE = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617")

// Standard SHA256 hex output
export function sha256(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex')
}

// Convert to field element
export function sha256HexToField(data: string): string {
  const hex = sha256(data)
  const bn = BigInt('0x' + hex) % SNARK_FIELD_SIZE
  return bn.toString()
}
