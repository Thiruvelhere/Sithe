# ⚡ Zypher SDK

> 🧠 ZK SDK to prove a prompt was truly used in generating an LLM response — with Poseidon Hash, Groth16 ZKPs & wallet-based EVM signature.

Zypher gives developers the ability to **cryptographically verify the origin of an LLM interaction** — ensuring that a specific prompt was used, the output is untampered, and signed by a real wallet.

---

## 🚀 Features

- ✅ One-liner `runZypher(prompt)`
- 🔐 Poseidon Hash + Groth16 Proof generation
- 🧠 Full prompt & response integrity
- 🔏 EVM wallet signature (sign + verify)
- 🧪 Verifier CLI with optional `--expectedHash` & `--expectedSigner`
- 🧃 JSON session export with zkStamp
- 🛠️ Minimal circuits, full privacy
- 🦾 Ollama or OpenAI agent support

---

## 📦 Install & Setup

```bash
pnpm install
```

You must compile your circom circuit first:

```bash
cd src/middleware/zk/circuits
circom prompt_hash.circom --r1cs --wasm --sym -o build -l ../../../../circomlib/circuits
```

## ✨ Quick Usage (SDK)

```typescript
import { runZypher } from 'zypher-sdk'

const result = await runZypher({
  prompt: "What is uuu in one sentence?",
  config: {
    apiKey: 'YOUR_API_KEY',
    network: 'polygon',
    agent: 'ollama', // or 'openai'
    debug: true,
    middleware: {
      proofOfPrompt: true,
      proofOfInference: true
    }
  }
})
```

### ✅ This does:

1. Hash the prompt using Poseidon
2. Generate ZK witness & proof (Groth16)
3. Auto-sign with the user's wallet
4. Export session as verifiable JSON

## 📤 Example Output

```json
{
  "prompt": "What is uuu in one sentence?",
  "response": "In music, 'uuu' represents ...",
  "stamp": "0xzk_abc123",
  "promptHash": "19201350...",
  "zkProof": {
    "proof": { ... },
    "publicSignals": []
  },
  "signature": "0x...",
  "signedBy": "0xYourWalletAddress",
  "success": true
}
```

Exported to `/proofs/session_<timestamp>.json`.

## 🧪 Verifying Sessions

```bash
pnpm verify proofs/session_1752460000000.json
```

With optional checks:

```bash
pnpm verify proofs/session_1752460000000.json \
  --expectedHash <hash> \
  --expectedSigner 0xYourWalletAddress
```

## 🛠️ Circuit: prompt_hash.circom

```circom
signal input prompt;
signal input promptHash;

component hasher = Poseidon(1);
hasher.inputs[0] <== prompt;
hasher.out === promptHash;
```

Located at `src/middleware/zk/circuits`.

## 📁 Folder Structure

```
├── src/
│   ├── cli/             # Verifier CLI
│   ├── core/            # init, pipeline, export logic
│   ├── middleware/zk/   # Circuits, wasm, r1cs
│   ├── utils/           # Signature, file, hash
├── proofs/              # Exported sessions
├── circomlib/           # External circuits
├── dev.ts               # Sample test runner
├── README.md
```

## 🧠 Why Zypher?

Zypher bridges AI & Web3 with proof of prompt authenticity. Perfect for:

- 🤖 Verifiable LLM outputs
- 🧾 Audit trails
- 🗳️ AI-powered DAOs
- 🧬 Chain-of-trust AI pipelines
- ⛓️ ZKML experiments

## 🧑‍💻 Author

Made with 💙 by **Thiruvel S.**

Drop a star ⭐ if you vibe with the vision!

## 📌 Status

✅ **MVP is complete.** CLI + SDK are working.

Ready to demo, test, and integrate into dApps.

---

