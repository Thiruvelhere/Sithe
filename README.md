 Zypher: ZK Proof of Prompt

Fully verifiable LLM proof backend — Poseidon hash, Groth16 ZKPs, and EVM signature for prompt authenticity.

Zypher allows developers to prove and verify that a specific prompt was used in generating an AI response, using zero-knowledge proofs and wallet-based signatures.

🚀 Features
✅ Run prompt → Generate ZK proof + EVM signature
🔐 Poseidon Hash + Groth16 ZKPs
🧠 Prompt + Response integrity (optional)
🔏 Ethereum wallet signature support
🧃 JSON session export
🧪 /zypher/verify to validate ZK proof + signature
🛠️ Circom circuits included
🦾 Ollama agent (local LLM) supported out-of-the-box

🧱 Project Structure
SITHE/
├── proofs/                    # Exported proof sessions
├── src/
│   ├── core/                  # SDK core logic
│   ├── lib/                   # ZK verification logic
│   ├── middleware/zk/         # Circom circuits + wasm
│   ├── utils/                 # Hashing, signer, exporter
│   ├── server.ts              # API endpoints (/ask, /verify)
│   └── index.ts
├── .env
├── package.json
├── tsconfig.json
├── README.md

⚙️ Setup
Install dependencies:
bashpnpm install
Set up the circuit once:
bashpnpm run setup
This compiles the circuit, generates proving & verification keys, and creates the Solidity verifier contract.
🧠 Usage: Backend API
1. Start Backend
bashpnpm dev
# or
ts-node src/server.ts
2. Generate Proof via POST
httpPOST /zypher/ask
Content-Type: application/json

{
  "prompt": "What is uuu in one sentence?"
}
Returns:
json{
  "success": true,
  "response": "In music, 'uuu' represents ...",
  "context": {
    "stamp": "0xzk_abc123",
    "promptHash": "5583763..."
  },
  "proofPath": "proofs/session_1753167378138.json"
}
3. Verify Proof
httpPOST /zypher/verify
Content-Type: application/json

{
  "filePath": "proofs/session_1753167378138.json",
  "expectedHash": "5583763567162948235552502319905212695854055389241869984655918192339465633750"
}
Returns:
json{
  "success": true,
  "zkVerified": true,
  "signatureVerified": true,
  "recoveredAddress": "0x9Ff857b0...",
  "errors": []
}
🧪 Example Output JSON
A generated proof session looks like:
json{
  "prompt": "What is uuu in one sentence?",
  "response": "In music, 'uuu' represents ...",
  "promptHash": "5583763567...",
  "stamp": "0xzk_abc123",
  "zkProof": {
    "proof": { ... },
    "publicSignals": [ ... ]
  },
  "signature": "0x...",
  "signedBy": "0xYourWalletAddress",
  "success": true
}
Saved to:
proofs/session_<timestamp>.json
🧪 Circuit: prompt_hash.circom
circomsignal input prompt;
signal input promptHash;

component hasher = Poseidon(1);
hasher.inputs[0] <== prompt;
hasher.out === promptHash;
Located at:
src/middleware/zk/circuits/prompt_hash.circom
🧠 Why Zypher?
Zypher bridges AI and Web3 with cryptographic proof of prompt authenticity. Perfect for:
🤖 Verifiable LLM outputs
📜 AI audit trails
🗳️ Prompt-governed DAOs
🧬 Chain-of-trust AI pipelines
🔒 ZKML experiments
✨ Credits
Made with 💙 by Thiruvel S.
If this inspires you, drop a ⭐️ on GitHub.
📌 Project Status
✅ Backend is fully working
✅ ZK Proof generation & verification
✅ JSON session exports
🔜 Future: Deploy on serverless / turn into SDK module
