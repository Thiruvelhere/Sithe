    export interface AgentResponse {
  text: string;
}

export interface Agent {
  run(prompt: string): Promise<AgentResponse>;
}
