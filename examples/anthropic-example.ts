import { runZypher } from '../src/index';

/**
 * Example: Using Anthropic Claude with Zypher
 * 
 * Prerequisites:
 * - Set ANTHROPIC_API_KEY environment variable
 * - Run: npm install
 */

async function main() {
    try {
        const result = await runZypher({
            prompt: "Explain zero-knowledge proofs in simple terms",
            config: {
                agent: 'anthropic',
                debug: true,
                middleware: {
                    proofOfPrompt: true,
                },
            },
        });

        console.log('\n=== Response ===');
        console.log(result.response);
        console.log('\n=== Proof Details ===');
        console.log('Stamp:', result.stamp);
        console.log('Prompt Hash:', result.promptHash);
        console.log('Success:', result.success);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
