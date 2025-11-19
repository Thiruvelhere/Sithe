import { runZypher } from './src/index';

/**
 * Multi-Provider Test Script
 * 
 * Tests all available providers to ensure they work correctly with ZK proof generation.
 * Set the appropriate API keys in your .env file before running.
 */

interface TestResult {
    provider: string;
    success: boolean;
    error?: string;
    hasProof: boolean;
    hasSignature: boolean;
}

async function testProvider(provider: 'ollama' | 'anthropic' | 'gemini' | 'cohere' | 'openai'): Promise<TestResult> {
    console.log(`\n🧪 Testing ${provider}...`);

    try {
        const result = await runZypher({
            prompt: "What is 2+2?",
            config: {
                agent: provider,
                debug: false,
                middleware: {
                    proofOfPrompt: true,
                },
            },
        });

        const testResult: TestResult = {
            provider,
            success: result.success,
            hasProof: !!result.zkProof,
            hasSignature: !!result.signature,
        };

        if (result.success) {
            console.log(`✅ ${provider} - Success`);
            console.log(`   Response: ${result.response.substring(0, 50)}...`);
            console.log(`   Proof: ${testResult.hasProof ? 'Yes' : 'No'}`);
            console.log(`   Signature: ${testResult.hasSignature ? 'Yes' : 'No'}`);
        } else {
            console.log(`❌ ${provider} - Failed: ${result.error}`);
            testResult.error = result.error;
        }

        return testResult;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log(`❌ ${provider} - Error: ${errorMessage}`);

        return {
            provider,
            success: false,
            error: errorMessage,
            hasProof: false,
            hasSignature: false,
        };
    }
}

async function main() {
    console.log('🚀 Zypher Multi-Provider Test Suite\n');
    console.log('Testing all available providers...');
    console.log('Note: Providers without API keys will fail gracefully.\n');

    const providers: Array<'ollama' | 'anthropic' | 'gemini' | 'cohere' | 'openai'> = [
        'ollama',
        'anthropic',
        'gemini',
        'cohere',
        'openai',
    ];

    const results: TestResult[] = [];

    for (const provider of providers) {
        const result = await testProvider(provider);
        results.push(result);
    }

    // Summary
    console.log('\n\n📊 Test Summary\n');
    console.log('Provider      | Status | Proof | Signature');
    console.log('------------- | ------ | ----- | ---------');

    results.forEach(r => {
        const status = r.success ? '✅ Pass' : '❌ Fail';
        const proof = r.hasProof ? '✅' : '❌';
        const signature = r.hasSignature ? '✅' : '❌';
        console.log(`${r.provider.padEnd(13)} | ${status} | ${proof}    | ${signature}`);
    });

    const successCount = results.filter(r => r.success).length;
    console.log(`\n✨ ${successCount}/${results.length} providers working\n`);

    if (successCount === 0) {
        console.log('⚠️  No providers are configured. Please set at least one API key in your .env file.');
        console.log('   For Ollama, make sure it is running locally on port 11434.');
    }
}

main().catch(console.error);
