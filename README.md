# ⚡ Zypher SDK

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![ZK Proofs](https://img.shields.io/badge/ZK-Groth16-purple)](https://github.com/iden3/snarkjs)
[![npm version](https://img.shields.io/npm/v/@zypher-sdk/sdk.svg)](https://www.npmjs.com/package/@zypher-sdk/sdk)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da?logo=discord&logoColor=white)](https://discord.gg/vffYw3cGhc)

# The Standard for Verifiable AI

> **Trust, but verify.** Cryptographically bind LLM outputs to their prompts using Zero-Knowledge Proofs.

Zypher is the **missing layer of trust** for the AI era. It allows developers to generate a cryptographic proof that a specific AI response was generated from a specific prompt, ensuring integrity, compliance, and transparency.

[**📄 Read the Technical Whitepaper**](WHITEPAPER.md) • [**🚀 Join the Private Beta**](https://thiruvelhere.github.io/Sithe/)

---

## 🤝 Join the Inner Circle

We are building the future of **Verifiable AI** together. Whether you're building an AI DAO, a compliance tool, or just exploring:

👉 **[Join our Discord Community](https://discord.gg/vffYw3cGhc)**

- **Get direct support** from the core team.
- **Showcase your projects** to other builders.
- **Shape the roadmap** of the SDK.

---

## 🚀 Why Zypher?

In a world of deepfakes and hallucinations, **proof matters**.

*   ✅ **Compliance Ready**: Meet emerging regulations (EU AI Act) by proving *exactly* what your AI models are doing.
*   🔐 **Tamper-Proof**: Using Groth16 ZK proofs and Poseidon hashing, our proofs are mathematically impossible to forge.
*   🦾 **Multi-Provider**: Works seamlessly with **OpenAI**, **Anthropic (Claude)**, **Google Gemini**, **Cohere**, and **Ollama**.
*   ⚡ **Production Grade**: Fully audited circuits, written in TypeScript, and ready for scale.

---

## 📦 Installation

```bash
npm install @zypher-sdk/sdk
```

---

## ⚡ Quick Start

Generate your first verifiable AI response in under 30 seconds.

```typescript
import { runZypher } from '@zypher-sdk/sdk'

// 1. Run the agent with verification enabled
const result = await runZypher({
  prompt: "Explain zero-knowledge proofs to a 5-year-old",
  config: {
    agent: 'anthropic', // or 'openai', 'gemini', 'cohere', 'ollama'
  }
})

// 2. You now have a cryptographically signed proof!
console.log('✅ Response:', result.response)
console.log('🔐 ZK Proof:', result.zkProof)
console.log('✍️ Signature:', result.signature)
```

---

## 🧠 Supported Providers

We support the world's best AI models out of the box. Just set your API key in `.env` and you're good to go.

| Provider | Config Key | Env Variable |
| :--- | :--- | :--- |
| **Anthropic** | `anthropic` | `ANTHROPIC_API_KEY` |
| **OpenAI** | `openai` | `OPENAI_API_KEY` |
| **Google Gemini** | `gemini` | `GOOGLE_API_KEY` |
| **Cohere** | `cohere` | `COHERE_API_KEY` |
| **Ollama** | `ollama` | *(None required)* |

---

## 🧪 Verification

Don't just take our word for it. Verify the proofs yourself using our CLI.

```bash
# Verify a proof file
npm run verify -- proofs/session_1763529005432.json
```

**Output:**
```text
✅ ZK Proof is VALID
🔏 Signature verified by 0x9Ff8...
🎉 Session verification complete.
```

---

## 🛠️ How It Works

1.  **Hash**: We hash your prompt using **Poseidon**, a ZK-friendly hashing algorithm.
2.  **Prove**: We generate a **Zero-Knowledge Proof (Groth16)** that attests that the hash corresponds to the prompt.
3.  **Sign**: The proof and response are signed by a wallet, creating an immutable **Chain of Trust**.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🧑‍💻 Author

**Thiruvel S.**

*   GitHub: [@Thiruvelhere](https://github.com/Thiruvelhere)
*   **[Join the Discord](https://discord.gg/vffYw3cGhc)** to chat with me directly!
