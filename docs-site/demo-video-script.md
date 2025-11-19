# Zypher Demo Video Script
**Duration:** 2 minutes 30 seconds  
**Format:** Screen recording + voiceover  
**Target Audience:** Developers, AI builders, Web3 enthusiasts

---

## 🎬 SECTION 1: HOOK (0:00 - 0:10)
**Duration:** 10 seconds  
**Visual:** Bold text animation on dark background

**Voiceover:**
> "How do you prove your AI didn't lie? In 2 minutes, I'll show you how to cryptographically verify any AI interaction."

**On-screen text:**
- "Can you trust your AI?"
- "Zypher: Prove Your AI. Protect Your Trust."

---

## 🔴 SECTION 2: PROBLEM (0:10 - 0:40)
**Duration:** 30 seconds  
**Visual:** Split screen showing real-world scenarios

**Voiceover:**
> "Imagine you're building an AI-powered DAO. Members vote based on AI analysis. But how do they know the AI actually used the prompt you claimed? Or that the results weren't tampered with?
>
> Traditional solutions like watermarking can be removed. Logging can be hacked. Digital signatures don't bind prompts to outputs.
>
> This is the AI trust crisis—and it's costing billions in compliance, legal risks, and lost user trust."

**On-screen visuals:**
- DAO governance interface
- News headlines about AI manipulation
- Regulatory compliance warnings

---

## ✅ SECTION 3: SOLUTION (0:40 - 1:40)
**Duration:** 60 seconds  
**Visual:** Live demo in VS Code

**Voiceover:**
> "Meet Zypher—the first SDK to cryptographically verify AI interactions using zero-knowledge proofs.
>
> Here's how it works. Install Zypher with one command."

**Screen shows:**
```bash
npm install @zypher/sdk
```

**Voiceover continues:**
> "Then, wrap any AI call with Zypher. Let's ask an AI about zero-knowledge proofs."

**Screen shows code:**
```typescript
import { runZypher } from '@zypher/sdk'

const result = await runZypher({
  prompt: "Explain zero-knowledge proofs in simple terms",
  config: { agent: 'openai' }
})
```

**Voiceover:**
> "Zypher does three things automatically:
>
> First, it hashes your prompt using Poseidon—a hash function designed for zero-knowledge circuits.
>
> Second, it generates a Groth16 ZK proof that cryptographically binds the prompt to the output. This proof is tamper-proof—any modification breaks verification.
>
> Third, it signs everything with your wallet, creating a unique zkStamp."

**Screen shows output:**
```json
{
  "response": "A zero-knowledge proof is...",
  "stamp": "0xzk_fdc92ec4f21e7b64307e91ef",
  "zkProof": { ... },
  "signature": "0x14b3c5cc..."
}
```

**Voiceover:**
> "Now anyone can verify this proof—in milliseconds—without seeing your private data."

**Screen shows verification:**
```bash
npm run verify -- proof.json
✅ ZK Proof is VALID
🔏 Signature verified by 0x9Ff857...
```

---

## ⚡ SECTION 4: KEY FEATURES (1:40 - 2:00)
**Duration:** 20 seconds  
**Visual:** Feature cards with icons

**Voiceover:**
> "Zypher gives you:
> - One-liner API integration
> - Support for OpenAI, Ollama, and more
> - Tamper-proof proofs using Groth16
> - EVM wallet signatures
> - CLI verification tools
> - Production-ready security"

**On-screen text (rapid display):**
- ✅ One-liner API
- 🧠 Multi-provider support
- 🔐 Groth16 ZK proofs
- 🔏 Wallet signatures
- 🧪 CLI verifier
- 🔒 Production-ready

---

## 🚀 SECTION 5: CALL TO ACTION (2:00 - 2:30)
**Duration:** 30 seconds  
**Visual:** Website preview + GitHub repo

**Voiceover:**
> "Whether you're building AI DAOs, ensuring compliance, or just want to prove your AI is legitimate—Zypher makes it simple.
>
> Get started in 5 minutes. Free tier available. Visit sithe.in or check out our GitHub.
>
> Stop trusting your AI. Start proving it."

**On-screen text:**
- **Website:** sithe.in
- **GitHub:** github.com/Thiruvelhere/Sithe
- **Docs:** docs.sithe.in
- **Free tier:** 100 proofs/month

**Final frame:**
- Zypher logo
- "Prove Your AI. Protect Your Trust."
- Social links (Twitter, Discord, GitHub)

---

## 📋 Production Notes

### Visual Style
- **Color scheme:** Purple (cryptography) + Green (trust) on dark background
- **Font:** Modern monospace for code, sans-serif for text
- **Animations:** Smooth transitions, subtle zoom effects
- **Code highlighting:** Syntax highlighting for TypeScript/JSON

### Audio
- **Voiceover:** Clear, confident, technical but accessible
- **Background music:** Subtle electronic/tech vibe (low volume)
- **Sound effects:** Minimal (checkmarks, transitions)

### Recording Setup
- **Screen resolution:** 1920x1080
- **Recording tool:** OBS Studio or Loom
- **Code editor:** VS Code with dark theme
- **Terminal:** Clean, minimal prompt

### Timing Breakdown
| Section | Duration | Cumulative |
|---------|----------|------------|
| Hook | 10s | 0:10 |
| Problem | 30s | 0:40 |
| Solution | 60s | 1:40 |
| Features | 20s | 2:00 |
| CTA | 30s | 2:30 |

### Call-to-Action Links
- Primary: sithe.in
- Secondary: github.com/Thiruvelhere/Sithe
- Tertiary: docs.sithe.in (when ready)

### Distribution Channels
- YouTube (main channel)
- Twitter (pinned tweet)
- Product Hunt (launch day)
- LinkedIn (professional audience)
- Reddit (r/MachineLearning, r/crypto)

---

## 🎯 Success Metrics

**Target KPIs:**
- Views: 1,000+ in first week
- Click-through rate: 5%+
- Sign-ups from video: 50+
- Engagement rate: 10%+

**A/B Testing:**
- Test different hooks (first 10 seconds)
- Test different CTAs
- Test thumbnail variations
