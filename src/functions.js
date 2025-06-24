import readline from 'node:readline/promises'
import dotenv from 'dotenv'
import { Groq } from 'groq-sdk'

dotenv.config()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  try {
    return await rl.question(question)
  } finally {
    rl.close()
  }
}

export async function generateSteps(scenario, finalUrl) {
  const prompt = `You are an ai assitance for a playwrigth script generator,
  Break this test into the fewest high-level Playwright+ZeroStep AI steps.
  include this URL : "${finalUrl}" as a first step to go to.
  Return ONLY a JSON array of strings—no explanation or extra text:
  "${scenario}"`
  const response = await groq.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 1000,
  })
  const content = response.choices?.[0]?.message?.content?.trim()
  if (!content) throw new Error('No response content from Groq API')
  try {
    return JSON.parse(content);
  } catch (e) {
    console.error('Failed to parse JSON:', content);
    throw e;
  }
}

export async function generateTitle(scenario) {
  const prompt = `Give a short, filename-friendly title for this test scenario:\n"${scenario}"\nReturn only a short lowercase title, max 8 words, separated by spaces.`
  const response = await groq.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 50,
  })
  const content = response.choices?.[0]?.message?.content?.trim()
  if (!content) throw new Error('No title received from AI')
  return content
}

export async function generateDescription(scenario) {
  const prompt = `Give a quick short description for this test scenario:\n"${scenario}"\nReturn only a short lowercase description, max 8 words, separated by spaces.`
  const response = await groq.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 50,
  })
  const content = response.choices?.[0]?.message?.content?.trim()
  if (!content) throw new Error('No description received from AI')
  return content
}

export function sanitizeName(input) {
  return input
    .replace(/^["']|["']$/g, '')
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export async function codeGenerator(scenario, finalUrl, finalTitle, generatedDescription) {
  const prompt = `
You are an AI assistant for generating Playwright tests using ZeroStep AI.

The script format must follow this structure using Playwright fixtures:

\`\`\`ts
import { test } from 'playwright-test-generator/fixture';
import { expect } from '@playwright/test';

test.describe('${generatedDescription}', () => {
  test('${finalTitle.toLowerCase()}', async ({ ai, page }) => {
    await page.goto('${finalUrl}');
    // steps here
  });
});
\`\`\`

Generate ONLY the code. Use high-level \`await ai("...")\` steps. Include assertions with \`expect()\` where appropriate.

Scenario: "${scenario}"
Return ONLY the full code block.
`;

  const response = await groq.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.6,
    max_tokens: 1500,
  });

  const content = response.choices?.[0]?.message?.content?.trim();
  if (!content || !content.includes('test.describe')) throw new Error('Invalid AI response');
  
  return content;
}
