// index.js or lib.js
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import {
  generateTitle,
  generateDescription,
  sanitizeName,
  codeGenerator
} from './functions.js';

dotenv.config();

/**
 * Generate and save a Playwright test script
 * @param {Object} options
 * @param {string} options.scenario - Test scenario description
 * @param {string} [options.url] - Optional URL (fallbacks to .env TEST_URL)
 * @param {string} [options.title] - Optional title (AI-generated if not provided)
 * @param {string} [options.outputDir] - Directory to save test (defaults to user's CWD)
 */
export async function generateScript({ scenario, url = process.env.TEST_URL, title = null, outputDir = process.cwd() }) {
  if (!scenario) throw new Error('❌ Scenario description is required.');

  const finalUrl = url || process.env.TEST_URL;
  if (!finalUrl) throw new Error('❌ URL is required (either pass it or define TEST_URL in .env).');

  const [generatedTitle, generatedDescription] = await Promise.all([
    generateTitle(scenario),
    generateDescription(scenario)
  ]);

  const finalTitle = title ? title : generatedTitle;
  const fileName = sanitizeName(finalTitle) + '.spec.ts';

  const testContent = await codeGenerator(scenario, finalUrl, finalTitle, generatedDescription);

  const scenariosPath = path.join(outputDir, 'scenarios');
  await fs.mkdir(scenariosPath, { recursive: true });

  const testPath = path.join(scenariosPath, fileName);
  await fs.writeFile(testPath, testContent);

  return {
    filePath: testPath,
    title: finalTitle
  };
}
