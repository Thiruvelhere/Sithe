import { init } from './src/core/init'
import { getZypherConfig } from './src/core/config'
import { runMiddleware } from './src/utils/middleware'
init({
  apiKey: 'abc123',
  network: 'polygon',
  debug: true,
  middleware: {
    proofOfPrompt: true,
    proofOfInference: false,
  },
})

console.log('Config fetched later:', getZypherConfig())
runMiddleware('proofOfPrompt')
runMiddleware('proofOfInference')