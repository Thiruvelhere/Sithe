import { init } from './src/core/init'
import { getZypherConfig } from './src/core/config'
import { runMiddleware } from './src/middleware/middleware'
import { getContext } from './src/core/sdkContext'
import { queryLLM } from './src/agents/llm'  // ✅ Real LLM hook

async function main() {
  // 🔁 Initialize SDK config
  init({
    apiKey: 'abc123',
    network: 'polygon',
    debug: true,
    agent: 'ollama',
    middleware: {
      proofOfPrompt: true,
      proofOfInference: true,
    },
  })

  console.log('⚙️ Config fetched later:', getZypherConfig())

  // 🔁 Middleware before prompt (ZK input)
  await runMiddleware('proofOfPrompt')  // ⬅️ Add await here

  // 🤖 Real LLM call via Ollama
  const prompt = "What is uuu in one sentence?"
  const response = await queryLLM(prompt)
  console.log('🤖 LLM Response:', response)

  // 🔁 Middleware after response (ZK proof)
  await runMiddleware('proofOfInference')  // ⬅️ Add await here

  // 🧠 Context state after LLM call
  const context = getContext()
  console.log("🧠 [Zypher] Final Runtime Context:", context)
}

main()
