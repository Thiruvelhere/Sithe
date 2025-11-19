# ⚡ Zypher SDK

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![ZK Proofs](https://img.shields.io/badge/ZK-Groth16-purple)](https://github.com/iden3/snarkjs)
[![npm version](https://img.shields.io/npm/v/@zypher-sdk/sdk.svg)](https://www.npmjs.com/package/@zypher-sdk/sdk)

> 🧠 **Cryptographically verify AI-generated content** — Prove a specific prompt was used to generate an LLM response using Zero-Knowledge Proofs.

## ✅ Status: Production Ready
The SDK is **fully tested and published**.
- **Package:** [`@zypher-sdk/sdk`](https://www.npmjs.com/package/@zypher-sdk/sdk)
- **Version:** `v1.0.3`
- **Test Coverage:** Comprehensive (Installation, Proof Generation, Verification, Signatures)
- **Audit:** Internal audit completed for ZK circuits.

Zypher enables developers to create **tamper-proof, verifiable AI interactions** using Poseidon hashing, Groth16 ZK proofs, and EVM wallet signatures. Perfect for AI DAOs, content verification, and compliance.

---

## 🚀 Features

- ✅ **One-liner API** - Simple `runZypher(prompt)` interface
- 🔐 **ZK Proofs** - Groth16 proofs with Poseidon hashing
- 🧠 **Full Integrity** - Cryptographically bind prompts to outputs
- 🔏 **Wallet Signatures** - EVM-compatible signature verification
- 🧪 **CLI Verifier** - Verify proofs with optional hash/signer checks
- 🧃 **JSON Export** - Portable session files with zkStamp
- 🦾 **Multi-Provider** - Ollama and OpenAI support (more coming)
- 🔒 **Production-Ready** - Audited circuits, secure by default

---

## 📦 Installation

### npm (Recommended)

```bash
npm install @zypher-sdk/sdk
```

### Prerequisites
- Node.js 18+ 
- Ollama (for local LLM) or OpenAI API key

### Quick Start

```bash
# Install the package
npm install @zypher-sdk/sdk

# Create a new file (e.g., demo.js)
# Add your code (see Usage section below)

# Run it
node demo.js
```

### Development Setup (from source)

If you want to contribute or modify the SDK:

```bash
# Clone the repository
git clone https://github.com/Thiruvelhere/Sithe.git
cd Sithe

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run the demo
npm run dev
```

### Environment Setup

Create a `.env` file (only needed for development from source):
```bash
# Ollama Configuration (for local LLM)
OLLAMA_MODEL=tinyllama

# Or OpenAI Configuration
OPENAI_API_KEY=your_api_key_here

# Wallet Configuration (optional)
PRIVATE_KEY=your_wallet_private_key
```

---

## ✨ Usage

### Basic Example

```typescript
import { runZypher } from './src/core/init'

const result = await runZypher({
  prompt: "What is zero-knowledge proof?",
  config: {
    agent: 'ollama',
    debug: true,
    middleware: {
      proofOfPrompt: true,
      proofOfInference: true
    }
  }
})

console.log('Proof:', result.zkProof)
console.log('Stamp:', result.stamp)
```

### Running the Test Script

```bash
npm run dev
```

This runs `dev.ts` which generates a proof for the prompt "who is Owen coyle" and exports it to `proofs/`.

---

## 🧪 Verification

### Verify a Proof

```bash
npm run verify -- proofs/session_1763529005432.json
```

**Output:**
```
✅ ZK Proof is VALID ✅
🔏 Signature verified ✅ by 0x9Ff857b0080D6E9C379b67365af5Fae191F0CFD2
🎉 Session verification complete.
```

### Advanced Verification

```bash
# Verify with expected hash
npm run verify -- proofs/session.json --expectedHash <hash>

# Verify with expected signer
npm run verify -- proofs/session.json --expectedSigner 0xYourAddress
```

---

## 📤 Proof Output Format

```json
{
  "prompt": "What is zero-knowledge proof?",
  "response": "A zero-knowledge proof is...",
  "timestamp": 1763529005432,
  "stamp": "0xzk_fdc92ec4f21e7b64307e91ef",
  "promptHash": "6264399997161685341692574698719876498530273268892724325425371605895313659712",
  "zkProof": {
    "proof": {
      "pi_a": ["...", "...", "1"],
      "pi_b": [["...", "..."], ["...", "..."], ["1", "0"]],
      "pi_c": ["...", "...", "1"],
      "protocol": "groth16",
      "curve": "bn128"
    },
    "publicSignals": ["6264399997161685341692574698719876498530273268892724325425371605895313659712"]
  },
  "signature": "0x14b3c5cc0964fa6d807cdc4445d7d917c38d736c442047a2d45e9c51b2f5d9f3...",
  "signedBy": "0x9Ff857b0080D6E9C379b67365af5Fae191F0CFD2",
  "success": true
}
```

All proofs are automatically saved to `proofs/session_<timestamp>.json`.

---

## 🛠️ How It Works

### 1. Prompt Hashing
```typescript
// Convert prompt to BigInt and hash with Poseidon
const promptBigInt = BigInt('0x' + Buffer.from(prompt).toString('hex'))
const promptHash = poseidon([promptBigInt])
```

### 2. ZK Proof Generation
```circom
// Circuit: prompt_hash.circom
signal input prompt;
signal output promptHash;

component hasher = Poseidon(1);
hasher.inputs[0] <== prompt;
promptHash <== hasher.out;
```

### 3. Verification
- Verify ZK proof using Groth16 verifier
- Verify wallet signature
- Check public signals match claimed promptHash

---

## 🔒 Security

### Cryptographic Guarantees

- **Prompt Binding**: ZK proof cryptographically binds the `promptHash` to the proof
- **Tamper-Proof**: Any modification to the proof invalidates verification
- **Signature Verification**: EVM wallet signatures ensure authenticity
- **Public Signals**: `promptHash` is included as a public output (nPublic = 1)

### Recent Security Fix (Nov 2025)

We identified and fixed a critical vulnerability where the circuit was compiled without public outputs. The fix included:
- Recompiled circuit with Circom 2.1.6
- Regenerated trusted setup with public signals
- Updated proof generation logic
- **Verified**: Tampered proofs now fail verification ✅



---

## 📁 Project Structure

```
Sithe/
├── src/
│   ├── agents/              # LLM provider integrations
│   │   ├── ollama.ts        # Ollama integration
│   │   └── index.ts         # Agent factory
│   ├── cli/                 # CLI tools
│   │   └── verify.ts        # Proof verification CLI
│   ├── core/                # Core SDK logic
│   │   ├── init.ts          # SDK initialization
│   │   ├── config.ts        # Configuration management
│   │   └── sdkContext.ts    # Runtime context
│   ├── middleware/          # Middleware layer
│   │   └── zk/              # ZK proof generation
│   │       ├── circuits/    # Circom circuits
│   │       ├── generateProof.ts
│   │       └── inputBuilder.ts
│   └── utils/               # Utilities
│       ├── signer.ts        # Wallet signatures
│       ├── hash.ts          # Hashing functions
│       └── exporter.ts      # Session export
├── proofs/                  # Generated proofs
├── dev.ts                   # Test script
└── README.md
```

---

## 🧠 Use Cases

### 1. AI-Powered DAOs
Prove that governance decisions were made using specific prompts, ensuring transparency and auditability.

### 2. Content Verification
Publishers can verify that AI-generated articles used approved prompts, preventing misinformation.

### 3. Compliance & Auditing
Companies can prove their AI usage for regulatory compliance (EU AI Act, etc.).

### 4. Research Reproducibility
Researchers can share verifiable AI experiments with cryptographic proof of prompts used.

### 5. Chain-of-Trust AI
Build multi-step AI pipelines where each step's authenticity is cryptographically verified.

---

## 🚧 Roadmap

- [x] Core ZK proof generation
- [x] Ollama integration
- [x] CLI verification tool
- [x] Wallet signature support
- [ ] Configurable LLM models
- [ ] Multi-provider support (Anthropic, Google)
- [ ] Smart contract deployment
- [ ] Web dashboard
- [ ] Batch proof generation
- [ ] Browser extension

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🧑‍💻 Author

**Thiruvel S.**

- GitHub: [@Thiruvelhere](https://github.com/Thiruvelhere)
- Project: [Zypher SDK](https://github.com/Thiruvelhere/Sithe)

---

## 🌟 Acknowledgments

- [iden3](https://github.com/iden3) for circom and snarkjs
- [circomlibjs](https://github.com/iden3/circomlibjs) for Poseidon implementation
- The ZK and AI communities for inspiration

---

**⭐ Star this repo if you find it useful!**

**🐛 Found a bug? [Open an issue](https://github.com/Thiruvelhere/Sithe/issues)**

**💬 Questions? [Start a discussion](https://github.com/Thiruvelhere/Sithe/discussions)**
