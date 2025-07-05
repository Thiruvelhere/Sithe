import { init } from './src/core/init'
import { getZypherConfig } from './src/core/config'
import { runMiddleware } from './src/utils/middleware'
import { getContext } from './src/utils/sdkContext'
import { queryLLM } from './src/utils/llm'  // ✅ Real LLM hook

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

  // 🔁 Middleware before prompt
  runMiddleware('proofOfPrompt')

  // 🤖 Real LLM call via Ollama
  const prompt = "What is thiruvel in one sentence?"
  const response = await queryLLM(prompt)
  console.log('🤖 LLM Response:', response)

  // 🔁 Middleware after response
  runMiddleware('proofOfInference')

  // 🧠 Context state after LLM call
  const context = getContext()
  console.log("🧠 [Zypher] Final Runtime Context:", context)
}

main()
