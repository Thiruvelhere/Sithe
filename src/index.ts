// Core SDK initialization
export { init } from './core/init'
export { getZypherConfig, setZypherConfig } from './core/config'
export { getContext, setPrompt, setResponse } from './core/sdkContext'

// Middleware
export { runMiddleware } from './middleware/middleware'

// Agents
export { getAgent } from './agents'

// Utils
export { finalizeAndExport } from './utils/exporter'
export { formatError } from './utils/formatError'

// Types
export type { ZypherConfig } from './types/config'

// Main wrapper function for easy usage
import { init } from './core/init'
import { getZypherConfig } from './core/config'
import { runMiddleware } from './middleware/middleware'
import { setPrompt, setResponse, getContext } from './core/sdkContext'
import { getAgent } from './agents'
import { finalizeAndExport } from './utils/exporter'
import { formatError } from './utils/formatError'
import type { ZypherConfig } from './types/config'

export interface RunZypherOptions {
    prompt: string
    config?: Partial<ZypherConfig>
}

export interface RunZypherResult {
    prompt: string
    response: string
    timestamp: number
    stamp?: string
    promptHash?: string
    zkProof?: any
    signature?: string
    signedBy?: string
    success: boolean
    error?: string
}

/**
 * Main SDK function - run AI with ZK proof generation
 * @param options - Prompt and optional config
 * @returns Result with proof, signature, and stamp
 */
export async function runZypher(options: RunZypherOptions): Promise<RunZypherResult> {
    const { prompt, config: userConfig } = options
    const timestamp = Date.now()
    let response = '' // Declare outside try block so it's accessible in catch

    try {
        // Initialize with default config if provided
        if (userConfig) {
            const defaultConfig: ZypherConfig = {
                apiKey: userConfig.apiKey || 'default',
                network: userConfig.network || 'polygon',
                debug: userConfig.debug ?? false,
                agent: userConfig.agent || 'ollama',
                middleware: {
                    proofOfPrompt: userConfig.middleware?.proofOfPrompt ?? true,
                    proofOfInference: userConfig.middleware?.proofOfInference ?? false,
                },
            }
            init(defaultConfig)
        }

        const config = getZypherConfig()
        const agent = getAgent(config.agent)

        // Set prompt
        setPrompt(prompt)

        // Generate proof of prompt
        await runMiddleware('proofOfPrompt')

        // Run LLM
        const res = await agent.run(prompt)
        response = res.text // Assign to outer variable
        setResponse(response)

        // Generate proof of inference if enabled
        if (config.middleware?.proofOfInference) {
            await runMiddleware('proofOfInference')
        }

        // Get final context
        const context = getContext()

        // Export session
        const { signature, signedBy } = await finalizeAndExport({
            prompt,
            response,
            timestamp,
            config,
            proofType: config.middleware?.proofOfInference ? 'PromptAndInference' : 'PromptOnly',
            stamp: context.stamp,
            promptHash: context.promptHash,
            error: null,
        })

        return {
            prompt,
            response,
            timestamp,
            stamp: context.stamp,
            promptHash: context.promptHash,
            zkProof: context.zkProof,
            signature,
            signedBy,
            success: true,
        }
    } catch (err) {
        const errorMessage = formatError(err)

        return {
            prompt,
            response, // Use the captured response instead of empty string
            timestamp,
            success: false,
            error: typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
        }
    }
}
