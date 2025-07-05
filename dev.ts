import { init } from './src/core/init'
import { getZypherConfig } from './src/core/config'
import { runMiddleware } from './src/utils/middleware'
import { setPrompt, setResponse, setProof, getContext } from './src/utils/sdkContext'


// 🔧 Manually simulate context for test
setPrompt("What is zkML?")
setResponse("zkML is zero-knowledge machine learning...")
setProof("0xfakezkproof123")

const context = getContext()
console.log("🧠 [Manual] Zypher Runtime Context:", context)

// 🔁 Initialize SDK config
init({
  apiKey: 'abc123',
  network: 'polygon',
  debug: true,
  agent: 'ollama',
  middleware: {
    proofOfPrompt: true,
    proofOfInference: false,
  },
})

// 🔍 Verify internal config
console.log('⚙️ Config fetched later:', getZypherConfig())

// 🧪 Run middleware manually
runMiddleware('proofOfPrompt')
runMiddleware('proofOfInference')

