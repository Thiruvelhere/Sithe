# Publishing Zypher SDK to npm

**Package Name:** `@zypher/sdk`  
**Version:** 1.0.0  
**Registry:** npm (public)

---

## Prerequisites

### 1. npm Account Setup
- [ ] Create npm account at https://www.npmjs.com/signup
- [ ] Verify email address
- [ ] Enable 2FA (recommended)

### 2. Create npm Organization
Since we're publishing as `@zypher/sdk` (scoped package), you need an organization:

```bash
# Login to npm
npm login

# Create organization (one-time)
npm org create zypher
```

**Alternative:** If you don't want to create an organization, change package name to `zypher-sdk` (unscoped) in `package.json`.

### 3. Verify Build Works

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Verify dist/ folder is created
ls dist/
```

Expected output in `dist/`:
- `index.js` (compiled JavaScript)
- `index.d.ts` (TypeScript definitions)

---

## Publishing Steps

### Step 1: Login to npm

```bash
npm login
```

Enter your credentials:
- Username
- Password
- Email
- 2FA code (if enabled)

### Step 2: Test Package Locally

Before publishing, test the package locally:

```bash
# Create a tarball
npm pack

# This creates: zypher-sdk-1.0.0.tgz
```

Test installation in another directory:

```bash
# In a test directory
mkdir test-zypher
cd test-zypher
npm init -y
npm install ../Sithe/zypher-sdk-1.0.0.tgz

# Test import
node -e "const zypher = require('@zypher/sdk'); console.log(zypher)"
```

### Step 3: Publish to npm

```bash
# Make sure you're in the Sithe directory
cd c:\Users\thiru\Sithe

# Publish (this will run prepublishOnly script automatically)
npm publish --access public
```

**Note:** The `--access public` flag is required for scoped packages to make them publicly accessible.

### Step 4: Verify Publication

Check your package on npm:
- Visit: https://www.npmjs.com/package/@zypher/sdk
- Verify metadata, README, and version

Test installation:

```bash
# In a new directory
npm install @zypher/sdk

# Test import
node -e "const { runZypher } = require('@zypher/sdk'); console.log(runZypher)"
```

---

## Post-Publishing

### Update README Badge

Add npm badge to README.md:

```markdown
[![npm version](https://badge.fury.io/js/%40zypher%2Fsdk.svg)](https://www.npmjs.com/package/@zypher/sdk)
[![npm downloads](https://img.shields.io/npm/dm/@zypher/sdk.svg)](https://www.npmjs.com/package/@zypher/sdk)
```

### Announce on Social Media

**Twitter:**
```
🚀 Zypher SDK v1.0.0 is now on npm!

Cryptographically verify AI-generated content using zero-knowledge proofs.

npm install @zypher/sdk

✅ One-liner API
🔐 Groth16 ZK proofs
🧠 Multi-LLM support

Docs: sithe.in
GitHub: github.com/Thiruvelhere/Sithe

#AI #ZeroKnowledge #Web3
```

**LinkedIn:**
```
Excited to announce the launch of Zypher SDK v1.0.0! 🚀

Zypher enables developers to cryptographically verify AI-generated content using zero-knowledge proofs.

Key features:
• Tamper-proof verification using Groth16 ZK proofs
• Support for OpenAI, Ollama, and more
• One-liner API integration
• Production-ready security

Perfect for AI DAOs, compliance teams, and anyone building trustworthy AI applications.

Try it now: npm install @zypher/sdk

Learn more: sithe.in
```

---

## Version Updates (Future)

### Patch Release (1.0.1)

```bash
# Update version
npm version patch

# Publish
npm publish --access public
```

### Minor Release (1.1.0)

```bash
# Update version
npm version minor

# Publish
npm publish --access public
```

### Major Release (2.0.0)

```bash
# Update version
npm version major

# Publish
npm publish --access public
```

---

## Troubleshooting

### Error: "You do not have permission to publish"

**Solution:** Make sure you're logged in and have access to the `@zypher` organization:

```bash
npm login
npm org ls zypher
```

### Error: "Package name already exists"

**Solution:** The package name is taken. Choose a different name or request ownership.

### Error: "Missing README"

**Solution:** Ensure README.md exists in the root directory.

### Build Fails

**Solution:** Check TypeScript compilation:

```bash
npm run build
# Check for errors
```

### Package Too Large

**Solution:** Check what's being published:

```bash
npm pack --dry-run
```

Ensure `.npmignore` or `files` in `package.json` excludes unnecessary files.

---

## Security Best Practices

### 1. Enable 2FA on npm

```bash
npm profile enable-2fa auth-and-writes
```

### 2. Use npm Tokens for CI/CD

Instead of password, use automation tokens:

```bash
npm token create --read-only
```

### 3. Review Package Contents

Before publishing:

```bash
npm pack --dry-run
```

### 4. Sign Releases

Use GPG to sign releases:

```bash
git tag -s v1.0.0 -m "Release v1.0.0"
git push --tags
```

---

## Checklist

### Pre-Publish
- [x] Updated package.json with metadata
- [x] Added LICENSE file
- [x] Updated README for npm users
- [ ] Build succeeds (`npm run build`)
- [ ] Tests pass (if any)
- [ ] Local installation works
- [ ] npm account created
- [ ] npm organization created (for @zypher/sdk)

### Publish
- [ ] Logged in to npm (`npm login`)
- [ ] Published package (`npm publish --access public`)
- [ ] Verified on npmjs.com
- [ ] Tested installation from npm

### Post-Publish
- [ ] Updated README with npm badge
- [ ] Announced on Twitter
- [ ] Announced on LinkedIn
- [ ] Updated GTM_ACTION_PLAN.md (mark as complete)
- [ ] Notified beta testers

---

## Quick Reference

```bash
# Login
npm login

# Build
npm run build

# Test locally
npm pack
npm install ./zypher-sdk-1.0.0.tgz

# Publish
npm publish --access public

# Update version
npm version patch|minor|major

# View package info
npm info @zypher/sdk
```

---

## Support

If you encounter issues:
- npm support: https://www.npmjs.com/support
- GitHub issues: https://github.com/Thiruvelhere/Sithe/issues
- Email: contact@sithe.in
