# playwright-test-generator

An AI-powered Playwright test script generator using LLaMA (Groq) and ZeroStep fixtures.

## Features

- Generate Playwright test scripts from plain-language scenarios.
- Automatically create descriptive titles and test steps.
- Supports custom URLs, titles, and output directory.
- Uses Playwright + ZeroStep AI fixtures.
- Easily integrate into your projects via a simple function call.

## Installation

### From npm registry (public)

```bash
npm install playwright-test-generator
```

### From GitHub Packages (private)
If you want to use GitHub Packages, add the following to your package.json:

```bash
{
  "name": "@raghadisraghad/playwright-test-generator",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
}
```
And then install via:


```bash
npm install @raghadisraghad/playwright-test-generator
```

## Copy .envexample to .env and update it with your values:''

```bash
cp .envexample .env
```