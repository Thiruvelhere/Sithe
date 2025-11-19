# Zypher Landing Page Wireframe
**URL:** sithe.in  
**Purpose:** Convert visitors to free tier sign-ups and paid customers  
**Design Style:** Modern, technical, trustworthy (purple + green color scheme)

---

## 📐 Page Structure

### 1. HERO SECTION
**Layout:** Full-width, centered content

```
┌─────────────────────────────────────────────────────────┐
│                    [Zypher Logo]                        │
│                                                         │
│          Prove Your AI. Protect Your Trust.            │
│                                                         │
│   Cryptographically verify AI-generated content using  │
│        zero-knowledge proofs. Built for developers.    │
│                                                         │
│   [Get Started Free] [View Documentation]              │
│                                                         │
│   npm install @zypher/sdk                              │
│                                                         │
│   [Animated demo GIF showing proof generation]         │
└─────────────────────────────────────────────────────────┘
```

**Elements:**
- **Headline:** "Prove Your AI. Protect Your Trust."
- **Subheadline:** "Cryptographically verify AI-generated content using zero-knowledge proofs. Built for developers."
- **Primary CTA:** "Get Started Free" (button → sign-up)
- **Secondary CTA:** "View Documentation" (link → docs)
- **Code snippet:** `npm install @zypher/sdk` (copy button)
- **Visual:** Animated GIF or video showing proof generation

**Color scheme:**
- Background: Dark gradient (purple to black)
- Text: White/light gray
- CTAs: Green gradient buttons
- Code block: Dark with syntax highlighting

---

### 2. SOCIAL PROOF STRIP
**Layout:** Horizontal ticker/badges

```
┌─────────────────────────────────────────────────────────┐
│  [GitHub Stars: 100+] [npm Downloads: 1k+] [MIT License]│
│  "Used by developers at [Company1] [Company2] [Company3]"│
└─────────────────────────────────────────────────────────┘
```

**Elements:**
- GitHub stars badge
- npm downloads badge
- License badge
- Customer logos (when available)

---

### 3. PROBLEM STATEMENT
**Layout:** Two-column (text + visual)

```
┌─────────────────────────────────────────────────────────┐
│  The AI Trust Crisis                                    │
│                                                         │
│  [Left Column - Text]          [Right Column - Visual]  │
│  • How do you prove AI         [Diagram showing AI     │
│    authenticity?                trust gap]             │
│  • How do you ensure                                   │
│    compliance?                                         │
│  • How do you build trust?                             │
│                                                         │
│  Traditional solutions (watermarking, logging) fail.   │
│  Zypher uses cryptography to solve this.               │
└─────────────────────────────────────────────────────────┘
```

---

### 4. HOW IT WORKS
**Layout:** Three-step process (horizontal cards)

```
┌─────────────────────────────────────────────────────────┐
│                    How Zypher Works                     │
│                                                         │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│  │   STEP 1 │    │   STEP 2 │    │   STEP 3 │         │
│  │          │    │          │    │          │         │
│  │  Hash    │ →  │  Prove   │ →  │  Verify  │         │
│  │  Prompt  │    │  with ZK │    │  Anyone  │         │
│  │          │    │          │    │          │         │
│  │ Poseidon │    │ Groth16  │    │  5ms     │         │
│  │ hashing  │    │ proofs   │    │  check   │         │
│  └──────────┘    └──────────┘    └──────────┘         │
└─────────────────────────────────────────────────────────┘
```

**Elements:**
- Step 1: Hash prompt with Poseidon
- Step 2: Generate Groth16 ZK proof
- Step 3: Verify in milliseconds

---

### 5. CODE EXAMPLE (LIVE DEMO)
**Layout:** Interactive code block with output

```
┌─────────────────────────────────────────────────────────┐
│              Try It Yourself (Live Demo)                │
│                                                         │
│  [Code Editor - Left]          [Output - Right]        │
│  import { runZypher }          {                       │
│  from '@zypher/sdk'              "response": "...",    │
│                                  "stamp": "0xzk...",   │
│  const result =                  "zkProof": {...},    │
│    await runZypher({             "signature": "0x..."  │
│      prompt: "Hello AI"        }                       │
│    })                                                  │
│                                                         │
│  [Run Code] button                                     │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- Editable code block (Monaco editor)
- "Run Code" button (simulated or real API call)
- Live output display
- Copy code button

---

### 6. KEY FEATURES
**Layout:** 2x3 grid of feature cards

```
┌─────────────────────────────────────────────────────────┐
│                     Key Features                        │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ 🔐 ZK Proofs│  │ 🧠 Multi-LLM│  │ ⚡ Fast     │    │
│  │ Groth16     │  │ OpenAI,     │  │ 5ms verify  │    │
│  │ tamper-proof│  │ Ollama, etc │  │ time        │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ 🔏 Wallet   │  │ 🧪 CLI Tools│  │ 📦 Easy     │    │
│  │ Signatures  │  │ Verify      │  │ One-liner   │    │
│  │ EVM-ready   │  │ proofs      │  │ API         │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
```

**Features:**
1. **ZK Proofs:** Groth16 tamper-proof verification
2. **Multi-LLM:** OpenAI, Ollama, Anthropic support
3. **Fast:** 5ms verification time
4. **Wallet Signatures:** EVM-compatible signing
5. **CLI Tools:** Command-line verification
6. **Easy API:** One-liner integration

---

### 7. USE CASES
**Layout:** Tabbed interface or accordion

```
┌─────────────────────────────────────────────────────────┐
│                      Use Cases                          │
│                                                         │
│  [AI DAOs] [Compliance] [Content] [Research] [More]    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ AI-Powered DAOs                                 │   │
│  │                                                 │   │
│  │ Prove governance decisions used correct prompts│   │
│  │ • Transparent voting                            │   │
│  │ • Auditable AI recommendations                  │   │
│  │ • Member trust                                  │   │
│  │                                                 │   │
│  │ [Case Study] [Learn More]                      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Use cases:**
1. AI-Powered DAOs
2. Compliance & Auditing
3. Content Verification
4. Research Reproducibility
5. Chain-of-Trust Pipelines

---

### 8. PRICING
**Layout:** 4-column pricing cards

```
┌─────────────────────────────────────────────────────────┐
│                  Simple, Transparent Pricing            │
│                                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │ FREE │  │ DEV  │  │STARTUP│ │BUSINESS│             │
│  │      │  │      │  │       │  │       │             │
│  │  $0  │  │ $29  │  │  $99  │  │ $299  │             │
│  │ /mo  │  │ /mo  │  │  /mo  │  │ /mo   │             │
│  │      │  │      │  │       │  │       │             │
│  │ 100  │  │ 1k   │  │ 10k   │  │100k   │             │
│  │proofs│  │proofs│  │proofs │  │proofs │             │
│  │      │  │      │  │       │  │       │             │
│  │[Try] │  │[Buy] │  │ [Buy] │  │[Contact]│           │
│  └──────┘  └──────┘  └──────┘  └──────┘              │
└─────────────────────────────────────────────────────────┘
```

**Tiers:**
- **Free:** 100 proofs/month, community support
- **Developer:** $29/mo, 1k proofs, email support
- **Startup:** $99/mo, 10k proofs, priority support
- **Business:** $299/mo, 100k proofs, SLA, custom features

**Features comparison table below cards**

---

### 9. TESTIMONIALS / SOCIAL PROOF
**Layout:** Carousel of testimonial cards

```
┌─────────────────────────────────────────────────────────┐
│              What Developers Are Saying                 │
│                                                         │
│  ┌───────────────────────────────────────────────┐     │
│  │ "Zypher made AI verification trivial. We     │     │
│  │  integrated it in 10 minutes."                │     │
│  │                                               │     │
│  │  — Alex Chen, CTO @ AI Startup                │     │
│  │  [Photo] [Company Logo]                       │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
│  [< Previous] [Next >]                                  │
└─────────────────────────────────────────────────────────┘
```

**Placeholder testimonials** (to be replaced with real ones):
- Beta tester feedback
- GitHub stars/comments
- Twitter mentions

---

### 10. FAQ
**Layout:** Accordion (expandable questions)

```
┌─────────────────────────────────────────────────────────┐
│                Frequently Asked Questions               │
│                                                         │
│  ▼ What is a zero-knowledge proof?                     │
│    A ZK proof lets you prove something is true...      │
│                                                         │
│  ▶ How does Zypher work?                               │
│  ▶ Is it secure?                                        │
│  ▶ What LLMs are supported?                            │
│  ▶ Can I use it on-chain?                              │
│  ▶ How much does it cost?                              │
└─────────────────────────────────────────────────────────┘
```

**Questions:**
1. What is a zero-knowledge proof?
2. How does Zypher work?
3. Is it secure?
4. What LLMs are supported?
5. Can I use it on-chain?
6. How much does it cost?

---

### 11. FINAL CTA
**Layout:** Full-width banner with gradient background

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         Ready to Prove Your AI?                         │
│                                                         │
│    Get started in 5 minutes. No credit card required.  │
│                                                         │
│         [Start Free Trial] [Talk to Sales]              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### 12. FOOTER
**Layout:** Multi-column footer

```
┌─────────────────────────────────────────────────────────┐
│  [Product]      [Developers]    [Company]    [Social]  │
│  Features       Docs            About        Twitter   │
│  Pricing        GitHub          Blog         Discord   │
│  Use Cases      API Ref         Careers      LinkedIn  │
│  Roadmap        Examples        Contact      GitHub    │
│                                                         │
│  © 2025 Zypher. All rights reserved.                   │
│  [Privacy Policy] [Terms of Service] [Security]        │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Design Specifications

### Color Palette
- **Primary:** Purple (#8B5CF6) - Cryptography
- **Secondary:** Green (#10B981) - Trust
- **Background:** Dark (#0F172A, #1E293B)
- **Text:** White (#FFFFFF), Gray (#94A3B8)
- **Accent:** Blue (#3B82F6) for links

### Typography
- **Headings:** Inter Bold (Google Fonts)
- **Body:** Inter Regular
- **Code:** JetBrains Mono

### Spacing
- **Section padding:** 80px top/bottom
- **Container max-width:** 1200px
- **Grid gap:** 24px

### Animations
- **Scroll animations:** Fade-in on scroll
- **Hover effects:** Subtle scale (1.05x)
- **Button hover:** Gradient shift
- **Code block:** Syntax highlighting with smooth transitions

---

## 📱 Responsive Design

### Desktop (1200px+)
- Full multi-column layouts
- Large hero section
- Side-by-side code examples

### Tablet (768px - 1199px)
- 2-column grids become single column
- Smaller hero section
- Stacked code examples

### Mobile (< 768px)
- Single column layout
- Hamburger menu
- Simplified pricing cards
- Touch-optimized buttons

---

## 🚀 Technical Implementation

### Framework
- **Option 1:** Next.js (for SEO, SSR)
- **Option 2:** Vite + React (faster development)
- **Option 3:** HTML + Vanilla CSS (simplest)

### Components
- Hero section with animated background
- Interactive code editor (Monaco or CodeMirror)
- Pricing calculator
- FAQ accordion
- Testimonial carousel

### Performance
- Lazy load images
- Code splitting
- CDN for static assets
- Lighthouse score: 90+

---

## 📊 Conversion Optimization

### Primary Goal
Convert visitors to free tier sign-ups

### Secondary Goals
- GitHub stars
- Documentation views
- Newsletter sign-ups

### A/B Testing
- Hero headline variations
- CTA button colors
- Pricing display order
- Social proof placement

### Analytics
- Google Analytics / PostHog
- Heatmaps (Hotjar)
- Session recordings
- Conversion funnels

---

## ✅ Launch Checklist

- [ ] Design mockup in Figma
- [ ] Build responsive HTML/CSS
- [ ] Implement interactive code demo
- [ ] Add pricing calculator
- [ ] Set up analytics
- [ ] SEO optimization (meta tags, schema)
- [ ] Performance testing (Lighthouse)
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Deploy to sithe.in
