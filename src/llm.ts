export interface LlmResult {
  confidence: number;
  justification: string;
  key_evidence: string[];
}

const SYSTEM_PROMPT = `You are an expert fact-checker.`;

export async function scoreStatement(statement: string): Promise<LlmResult | null> {
  const prompt = `**Task**\nYou are an expert fact-checker.\nRate how much confidence a reasonable, well-informed reader should have that the following statement is *factually accurate and not misleading*.\n\n**Statement**\n"${statement.replace(/"/g, '\"')}"\n\n**Instructions**\n1. **Read the statement carefully.**\n2. **Reason silently** about the evidence.\n3. **Decide on a confidence score from 0–100**.\n4. **Output** exactly this JSON: {\n  "confidence": <integer 0-100>,\n  "justification": "<concise 1-2 sentence rationale>",\n  "key_evidence": ["<source or fact #1>", "<source or fact #2>"]\n}`;

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt,
        options: { temperature: 0.2 },
        stream: false
      })
    });
    const json = await res.json();
    const text: string = json.response ?? '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
} 