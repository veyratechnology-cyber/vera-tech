# TypeScript Safety Guide - Preventing Build Errors

## Overview
This document explains the TypeScript safety measures implemented to prevent build errors in production deployments.

---

## Root Causes of Previous Errors

### 1. Prisma Client Options Type Mismatch
**Problem:** Inline type assertions with `as const` caused incompatibility with Prisma's type system.

**Solution:** Import and use `Prisma.PrismaClientOptions` and `Prisma.LogLevel[]` types explicitly.

**Before (Broken):**
```typescript
const prismaClientOptions = {
  log: ["error", "warn"],  // ❌ Type: string[]
  errorFormat: "minimal" as const,  // ❌ Causes type issues
};
```

**After (Fixed):**
```typescript
import { PrismaClient, Prisma } from "@prisma/client";

const logConfig: Prisma.LogLevel[] = ["error", "warn"];  // ✅ Properly typed

const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: logConfig,
  errorFormat: "minimal",  // ✅ Type-safe
};
```

### 2. GroupBy Type Mismatch
**Problem:** Using `_count: true` instead of `_count: { _all: true }`.

**Before (Broken):**
```typescript
prisma.consultation.groupBy({
  by: ["status"],
  _count: true,  // ❌ Wrong type
})
```

**After (Fixed):**
```typescript
prisma.consultation.groupBy({
  by: ["status"],
  _count: {
    _all: true,  // ✅ Correct type
  },
})
```

---

## Implemented Safety Measures

### 1. Proper Type Imports
**Files:** `lib/prisma.ts`, `lib/db/prisma.ts`

Always import Prisma types explicitly:
```typescript
import { PrismaClient, Prisma } from "@prisma/client";
```

### 2. Type Declarations
**File:** `types/prisma.d.ts`

Global type definitions for Prisma client singleton pattern.

### 3. Strict TypeScript Configuration
**File:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,  // Enable all strict type checking
    "noEmit": true,  // Check types without emitting
  }
}
```

### 4. Pre-Build Type Checking
**File:** `scripts/check-types.js`

Comprehensive type checking before deployment:
1. Prisma client generation
2. TypeScript compilation
3. Next.js build

**Run manually:**
```bash
npm run check-types
```

### 5. CI/CD Type Checking
**File:** `.github/workflows/type-check.yml`

Automated checks on every push/PR:
- TypeScript type check
- ESLint
- Full build test

### 6. Next.js Configuration
**File:** `next.config.js`

```javascript
typescript: {
  ignoreBuildErrors: false,  // Fail build on type errors
},
eslint: {
  ignoreDuringBuilds: false,  // Run ESLint during build
},
```

---

## Developer Workflow

### Before Committing Code

1. **Run Type Check:**
```bash
npm run type-check
```

2. **Run Full Build:**
```bash
npm run build
```

3. **Run Linter:**
```bash
npm run lint
```

### Before Deploying to Production

Run comprehensive check:
```bash
npm run check-types
```

This will:
- ✅ Generate Prisma types
- ✅ Check all TypeScript types
- ✅ Build the application
- ❌ Stop if any errors found

### Automated Checks

GitHub Actions will automatically:
1. Run on every push to `main` or `develop`
2. Run on every pull request
3. Fail if type errors detected
4. Block merging until fixed

---

## Common TypeScript Patterns to Follow

### 1. Prisma Client Configuration

**DO:**
```typescript
import { PrismaClient, Prisma } from "@prisma/client";

const logConfig: Prisma.LogLevel[] = ["error"];
const options: Prisma.PrismaClientOptions = {
  log: logConfig,
  errorFormat: "minimal",
};

const prisma = new PrismaClient(options);
```

**DON'T:**
```typescript
const prisma = new PrismaClient({
  log: ["error"],  // ❌ Not explicitly typed
  errorFormat: "minimal" as const,  // ❌ Avoid inline assertions
});
```

### 2. Prisma Queries with GroupBy

**DO:**
```typescript
const stats = await prisma.model.groupBy({
  by: ["field"],
  _count: {
    _all: true,  // ✅ Correct structure
  },
});

// Access count
console.log(stats[0]._count._all);
```

**DON'T:**
```typescript
const stats = await prisma.model.groupBy({
  by: ["field"],
  _count: true,  // ❌ Wrong type
});
```

### 3. Async Error Handling

**DO:**
```typescript
async function fetchData() {
  try {
    const data = await prisma.model.findMany();
    return { data, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
}
```

**DON'T:**
```typescript
async function fetchData() {
  const data = await prisma.model.findMany();  // ❌ Unhandled rejection
  return data;
}
```

### 4. Component Props

**DO:**
```typescript
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  // Properly typed
}
```

**DON'T:**
```typescript
export default async function Page({ params, searchParams }: any) {  // ❌ Avoid 'any'
  // No type safety
}
```

---

## Troubleshooting Type Errors

### Error: "Type 'string[]' is not assignable to type 'LogLevel[]'"

**Solution:** Import and use `Prisma.LogLevel[]`:
```typescript
import { Prisma } from "@prisma/client";
const log: Prisma.LogLevel[] = ["error", "warn"];
```

### Error: "Argument of type X is not assignable to parameter of type Y"

**Solution:** 
1. Import the correct Prisma types
2. Explicitly type variables
3. Check Prisma documentation for correct structure

### Error: "groupBy _count type error"

**Solution:** Use structured _count:
```typescript
_count: {
  _all: true,
  // or specific fields:
  // fieldName: true,
}
```

---

## Type Safety Checklist

Before committing/deploying:

- [ ] All imports include necessary type imports
- [ ] No `any` types used (except unavoidable cases with `// @ts-expect-error` comment)
- [ ] Prisma queries use correct type structures
- [ ] Error handling returns structured `{data, error}` objects
- [ ] Component props are properly typed
- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds
- [ ] No TypeScript errors in terminal

---

## VSCode Settings

Add to `.vscode/settings.json` for better TypeScript support:

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.validate.enable": true,
  "typescript.format.enable": true
}
```

---

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Prisma Client API Reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Next.js TypeScript](https://nextjs.org/docs/basic-features/typescript)
- [Prisma TypeScript](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client#using-custom-model-and-field-names)

---

## Summary

**Key Principle:** Always use explicit Prisma types from `@prisma/client` package. Never rely on type inference for Prisma client configuration.

**Safety Net:** Multiple layers of checking:
1. ✅ IDE type checking (VSCode)
2. ✅ Pre-commit type check script
3. ✅ CI/CD pipeline checks
4. ✅ Vercel build-time checks

**Result:** TypeScript errors caught early, before they reach production.
