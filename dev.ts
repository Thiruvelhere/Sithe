import { init } from './src/core/init'
import { getZypherConfig } from './src/core/config'

init({
  apiKey: 'abc123',
  network: 'polygon',
  debug: true,
})

console.log('Config fetched later:', getZypherConfig())
