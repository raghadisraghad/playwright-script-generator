# Playwright AI Test Generator

An AI-powered Playwright test script generator prototype that uses LLaMA (Groq) and ZeroStep fixtures.

**🚨 This is a prototype demonstrating a larger concept.**

## 🎯 What This Prototype Does

This prototype version:
- Takes user input in plain language describing a test scenario
- Generates a Playwright test script using AI (LLaMA via Groq)
- Uses ZeroStep AI fixtures for intelligent test execution
- Saves the generated script and can run it automatically
- Provides basic configuration for URLs, titles, and output directories

## 💡 The Bigger Idea Behind This Prototype

The actual vision for this project is much larger: **A tool that completely understands your project's structure to generate intelligent, context-aware tests.**

**The full concept would:**
1. **Scan and memorize** your entire project directory when installed
2. **Understand** all pages, components, and their relationships
3. **Analyze** existing code to infer functionality
4. **Generate tests** that are perfectly tailored to your specific project
5. **Learn** from your project changes over time
6. **Suggest** test scenarios you might have missed

**Example:** Instead of just converting "test login" to generic code, it would know:
- Your exact login page URL and structure
- Your specific form field names and validation rules
- What happens after successful login in your app
- All edge cases based on your codebase

---

## ✨ Current Prototype Features

- Generate Playwright test scripts from plain-language scenarios
- Automatically create descriptive titles and test steps
- Supports custom URLs, titles, and output directory
- Uses Playwright + ZeroStep AI fixtures
- Easily integrate into your projects via a simple function call

## Installation

### From npm registry
```bash
npm install playwright-test-generator
```

### From GitHub Packages
Add to package.json:
```json
{
  "name": "@raghadisraghad/playwright-test-generator",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
}
```
Then:
```bash
npm install @raghadisraghad/playwright-test-generator
```

## Configuration
```bash
cp .envexample .env
```
Update `.env` with your API keys and settings.