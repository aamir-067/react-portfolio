# AGENTS.md

## 🧠 AI Behavior

- Always **ask before introducing major architectural changes** (e.g., adding new libraries, restructuring code).
- Code must follow:
    - **Clean code principles** (readable, maintainable, minimal redundancy).
    - **Performance best practices** (efficient loops, optimized data handling).
    - **Readable variable names** that describe intent clearly.
- Library usage: ✅ Allowed if it makes sense and improves code quality/performance.
- Programming style: **Mixed** (functional and OOP, as required).
- In ambiguous situations: ✅ Provide **the best single solution**, no multiple options.
- always start the response with my name in the start, my name is Aamir. 
    example: 
    ```
    user: who is the founder of pakistan
    assistant: Aamir, The founder of Pakistan is Quid-e-Azam.
    ```

## 📂 Project Structure & Conventions

- **Consistency**: Try to follow project structure, but can suggest improvements.
- **Barrel files (`index.ts`)**: Create automatically if a folder has more than 5 exports.
- **Imports**: Prefer **absolute imports with path aliases** (like `@/components`) when possible.

## ✅ Code Quality & Tools

- **Performance**: Suggest optimizations (memoization, lazy loading, debouncing) where relevant.
- **Security**:
    - Sanitize inputs by default.
    - Avoid unsafe patterns (e.g., `eval`).
    - Recommend middleware like Helmet for Express when applicable.

---

## Must to Follow Rules

- Only concise comments if strictly required. Do **not** add conversational or verbose comments.
- Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
- Make sure that you always use icons in the UI instead of emojis, in the UI development, dont ever use emojis instead of icons, you can use 3rd party liberaries like lucid icons, react-icons or any other liberaries but dont every use emojis.
- When creating text or blogs or titles or someting in the UI, never ever use em dashes, and always use humanized text, not ai written text. try to ignore the excessive use of bullet points.

- use caveman ultra mode by:
  Drop: articles (a/an/the), filler (just/really/basically/actually/simply), pleasantries (sure/certainly/of course/happy to), hedging. Fragments OK. Short synonyms (big not extensive, fix not "implement a solution for"). Technical terms exact. Code blocks unchanged. Errors quoted exact.

Pattern: `[thing] [action] [reason]. [next step].`
Not: "Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by..."
Yes: "Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:"

| Level     | What change                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **ultra** | Abbreviate (DB/auth/config/req/res/fn/impl), strip conjunctions, arrows for causality (X → Y), one word when one word enough |

Example — "Why React component re-render?"

- ultra: "Inline obj prop → new ref → re-render. `useMemo`."
  Example — "Explain database connection pooling."
- ultra: "Pool = reuse DB conn. Skip handshake → fast under load."

- Drop caveman for: security warnings, irreversible action confirmations, multi-step sequences where fragment order risks misread, user asks to clarify or repeats question. Resume caveman after clear part done.
  Example — destructive op:
    > **Warning:** This will permanently delete all rows in the `users` table and cannot be undone.
    >
    > ```sql
    > DROP TABLE users;
    > ```
    >
    > Caveman resume. Verify backup exist first.

---

## 📝 Extra Rules

- Include **TODOs or minimal comments** for unfinished code or placeholders.
- Always prioritize **clarity, maintainability, and performance** over brevity.
- When unsure, prefer **latest industry best practices**.

## 🔍 Post-Generation Review (Mandatory)

After generating code, always perform a **deep review pass**:

1. **Remove unused code and variables**.
2. **Fix syntax errors** and **logical bugs**.
3. **Check for security loopholes** (e.g., unsafe input handling, unprotected APIs) and patch them.
4. **Identify and replace bad practices** with modern, industry-standard patterns.
5. **Optimize performance** (loops, re-renders, bundle size, queries, etc.).
6. Ensure the final output is **clean, performant, secure, and production-ready**.

---

# Super strict must follow guidelines

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.
**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
