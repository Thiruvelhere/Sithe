# Changelog

All notable changes to this project will be documented in this file.

## [1.0.3] - 2025-11-19

### Fixed
- **Middleware**: Fixed a critical bug where `proofOfPrompt` middleware was not triggering ZK proof generation.
- **Build**: Updated build script to correctly copy ZK circuits to the distribution folder, resolving `verification_key.json` missing errors.
- **Exports**: `runZypher` now correctly returns `signature` and `signedBy` in the result object.

### Changed
- **Branding**: Updated all domain references from `zypher.in` to `sithe.in`.
- **Contact**: Updated contact email to `contact@sithe.in`.

## [1.0.1] - 2025-11-19

### Added
- Initial release of `@zypher-sdk/sdk`.
- Core ZK proof generation for AI prompts.
- Ollama integration.
- Wallet signature support.
