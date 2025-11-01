interface ZypherConfig {
    apiKey: string;
    network: string;
    agent: 'ollama';
    debug?: boolean;
    middleware?: {
        proofOfPrompt?: boolean;
        proofOfInference?: boolean;
    };
    sandboxMode?: boolean;
}

declare function init(config: ZypherConfig): boolean;

declare const Zypher: {
    init: typeof init;
    ask(prompt: string): Promise<{
        response: string;
        context: {
            currentPrompt?: string;
            response?: string;
            timestamp?: number;
            stamp?: string;
            promptHash?: string;
            zkProof?: {
                proof: any;
                publicSignals: string[];
            };
        };
        proofPath: string;
    }>;
    verify(session: any, expectedHash?: string): Promise<{
        zkVerified?: boolean;
        signatureVerified?: boolean;
        recoveredAddress?: string;
        errors: string[];
    }>;
};

export { Zypher, Zypher as default };
