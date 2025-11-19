# Release Notes: v1.0.2

**Date:** 2025-11-19
**Package:** `@zypher-sdk/sdk`
**Version:** `1.0.3`

## 🚀 Ready for Launch

This release marks a significant milestone with critical bug fixes and a complete rebranding to **Sithe**.

### 🔧 Critical Fixes
- **ZK Proof Generation**: Fixed an issue where `proofOfPrompt` middleware was not triggering the proof generation process.
- **Missing Assets**: Resolved `verification_key.json` missing error by ensuring ZK circuits are correctly bundled in the build.
- **Developer Experience**: `runZypher` now directly returns `signature` and `signedBy` for easier access.

### 🎨 Rebranding
- **Domain**: Updated all references to `sithe.in`.
- **Contact**: Updated support email to `contact@sithe.in`.

### 📦 Installation
```bash
npm install @zypher-sdk/sdk@latest
```

### 🛠️ Upgrade Guide
If you are upgrading from v1.0.1:
1. Uninstall the old version: `npm uninstall @zypher-sdk/sdk`
2. Install the new version: `npm install @zypher-sdk/sdk@1.0.3`
3. No code changes required (backward compatible).

---
*Built with ❤️ by the Sithe Team*
