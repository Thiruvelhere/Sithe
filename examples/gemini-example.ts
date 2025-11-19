import { runZypher } from '../src/index';

/**
 * Example: Using Google Gemini with Zypher
 * 
 * Prerequisites:
 * - Set GOOGLE_API_KEY environment variable
 * - Run: npm install
 */

async function main() {
    try {
        const result = await runZypher({
            prompt: "What are the benefits of cryptographic verification?",
            config: {
                agent: 'gemini',
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
