// Test script to verify SDK works without PRIVATE_KEY
import { runZypher } from './src/index'

// Temporarily delete PRIVATE_KEY from env
const originalKey = process.env.PRIVATE_KEY
delete process.env.PRIVATE_KEY

async function test() {
    console.log('🧪 Testing SDK without PRIVATE_KEY...\n')

    const result = await runZypher({
        prompt: "Hello from Zypher test",
        config: {
            agent: 'ollama',
            debug: true,
            middleware: {
                proofOfPrompt: true
            }
        }
    })

    console.log('\n📊 Test Result:')
    console.log('Success:', result.success)
    console.log('Prompt:', result.prompt)
    console.log('Response length:', result.response?.length || 0)
    console.log('Has stamp:', !!result.stamp)
    console.log('Has zkProof:', !!result.zkProof)
    console.log('Signature:', result.signature || 'null (expected)')
    console.log('SignedBy:', result.signedBy || 'null (expected)')

    if (result.success && !result.signature) {
        console.log('\n✅ TEST PASSED: SDK works without PRIVATE_KEY')
    } else if (!result.success) {
        console.log('\n❌ TEST FAILED: SDK should succeed without PRIVATE_KEY')
        console.log('Error:', result.error)
    } else {
        console.log('\n⚠️  Unexpected: signature present without PRIVATE_KEY')
    }

    // Restore original key
    if (originalKey) {
        process.env.PRIVATE_KEY = originalKey
    }
}

test().catch(console.error)
