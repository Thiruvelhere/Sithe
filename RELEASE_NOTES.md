# Release Notes - v1.0.4

## 🎉 Multi-Provider Support

**Release Date**: November 19, 2025

---

## 🚀 New Features

### Multi-Provider LLM Support

Zypher SDK now supports **5 major LLM providers**, giving developers the flexibility to choose their preferred AI model while maintaining cryptographic verification:

- ✅ **Ollama** (local, free)
- ✅ **OpenAI** (GPT-4o-mini, GPT-4, etc.)
- ✅ **Anthropic** (Claude 3.5 Sonnet)
- ✅ **Google Gemini** (Gemini 1.5 Pro)
- ✅ **Cohere** (Command R+)

### Simple Provider Switching

```typescript
// Use any provider with the same API
const result = await runZypher({
  prompt: "Your prompt here",
  config: { agent: 'anthropic' } // or 'gemini', 'cohere', 'openai', 'ollama'
});
```

---

## 📦 What's Included

### New Agent Implementations
- `src/agents/anthropic.ts` - Anthropic Claude integration
- `src/agents/gemini.ts` - Google Gemini integration
- `src/agents/cohere.ts` - Cohere integration
- `src/agents/openai.ts` - OpenAI integration

### New Dependencies
- `@anthropic-ai/sdk` v0.32.1
- `@google/generative-ai` v0.21.0
- `cohere-ai` v7.14.0

### Examples
- `examples/anthropic-example.ts`
- `examples/gemini-example.ts`
- `examples/cohere-example.ts`
- `examples/openai-example.ts`

### Testing
- `test-providers.ts` - Comprehensive test suite for all providers
- New npm script: `npm run test-providers`

---

## 🔧 Changes

### Added
- Multi-provider support for Anthropic, Gemini, Cohere, and OpenAI
- Provider-specific agent implementations
- Comprehensive examples for each provider
- Test suite for all providers
- Verification documentation

### Changed
- Updated `ZypherConfig.agent` type to support all providers
- Updated `getAgent()` factory to handle new providers
- OpenAI default model changed from `gpt-4` to `gpt-4o-mini` (more accessible)

### Updated
- README with multi-provider documentation
- Environment setup instructions
- Prerequisites section with provider links

---

## 📋 Migration Guide

### From v1.0.3 to v1.0.4

**No breaking changes!** This is a backward-compatible feature release.

If you're using TypeScript and explicitly typing the agent field:

```typescript
// Before (still works)
const config: ZypherConfig = {
  agent: 'ollama',
  // ...
};

// After (new options available)
const config: ZypherConfig = {
  agent: 'anthropic', // or 'gemini', 'cohere', 'openai'
  // ...
};
```

---

## 🔐 API Keys Required

To use the new providers, set the appropriate environment variable:

```bash
# Choose one or more:
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIza...
COHERE_API_KEY=...
OPENAI_API_KEY=sk-...
```

Get your API keys:
- **Anthropic**: https://console.anthropic.com
- **Google Gemini**: https://ai.google.dev
- **Cohere**: https://dashboard.cohere.com
- **OpenAI**: https://platform.openai.com

---

## ✅ Verification Status

All provider implementations have been verified against official SDK documentation:

- ✅ Anthropic: Uses `messages.create()` API
- ✅ Gemini: Uses `generateContent()` API
- ✅ Cohere: Uses `chat()` API
- ✅ OpenAI: Uses `chat.completions.create()` API

See [PROVIDER_VERIFICATION.md](PROVIDER_VERIFICATION.md) for detailed verification report.

---

## 🧪 Testing

### Install Dependencies
```bash
npm install
```

### Test All Providers
```bash
npm run test-providers
```

### Test Individual Provider
```bash
ts-node examples/anthropic-example.ts
```

---

## 📊 Roadmap Progress

### Q1 2025 Goals
- [x] Core SDK Improvements
  - [x] Fix ZK circuit vulnerability
  - [x] Implement Groth16 proofs
  - [x] Add wallet signatures
  - [x] **Multi-provider support** ✨ NEW
- [ ] Performance optimization (< 2s proof generation)
- [ ] Batch proof generation

### Next Up: Cloud API Development
- REST API endpoints
- Authentication & rate limiting
- PostgreSQL database
- Stripe billing integration

---

## 🙏 Acknowledgments

Thanks to the teams at Anthropic, Google, Cohere, and OpenAI for their excellent SDKs and documentation.

---

## 📝 Full Changelog

**v1.0.4** (2025-11-19)
- Added multi-provider support (Anthropic, Gemini, Cohere, OpenAI)
- Added 4 new agent implementations
- Added provider examples and test suite
- Updated documentation and README
- Changed OpenAI default model to gpt-4o-mini

**v1.0.3** (2025-11-19)
- Published to npm as @zypher-sdk/sdk
- Comprehensive testing and verification

---

**Install now**: `npm install @zypher-sdk/sdk@1.0.4`

**Documentation**: [README.md](README.md)

**Examples**: [examples/](examples/)
