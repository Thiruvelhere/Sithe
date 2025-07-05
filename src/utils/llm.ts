import { setPrompt, setResponse } from './sdkContext'

export async function queryLLM(prompt: string): Promise<string> {
  setPrompt(prompt)
  console.log("[ZYPHER]: Sending prompt to Ollama...")

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false
      })
    })

    const data = await res.json()
    const output = data.response

    console.log("[ZYPHER]: Received response ✅")

    setResponse(output)
    return output
  } catch (err) {
    console.error("[ZYPHER]: Error querying LLM ❌", err)
    return "LLM query failed"
  }
}
