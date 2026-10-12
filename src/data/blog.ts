import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Multi-Agent AI Weekly Planner with LangGraph and FastAPI",
    excerpt:
      "How I built WeeklyAI, a deployed multi-agent planner that turns plain-English goals into a conflict-free weekly schedule, covering typed agent state, live WebSocket streaming, and pgvector memory.",
    content: `
When I decided to build an AI project of my own, I knew immediately that a multi-agent planner was the more interesting problem than a single chatbot.

### The Challenge

The task was to turn a messy goal like “gym three times, finish my report, and keep Sunday free” into a realistic weekly schedule in under 10 seconds. I split the work across five specialised agents: Goal, Calendar, Energy, Balance, and Planner.

### State Contracts First

Before writing a single prompt, I defined a typed StateGraph in LangGraph. Every agent is a node that reads and writes shared state, and the agents never call each other directly. This means adding or swapping an agent needs zero changes to the others.

### Streaming Strategy

My rule: every agent step must be visible. An async FastAPI WebSocket streams each agent’s output live to a Next.js 14 and TypeScript frontend, so users watch the plan take shape instead of waiting on a spinner. The Planner agent then resolves conflicts between the agents’ outputs, and surfaces them rather than hiding them.

### Memory With pgvector

Past plans are stored as embeddings in pgvector on Supabase Postgres. Each agent retrieves the user’s past data before it responds, so later schedules adapt to what actually worked for that user instead of starting from scratch.

### What I Learned

Multi-agent systems break at the hand-offs, not in individual prompts. Typed state contracts, step-by-step streaming for observability, and surfacing conflicts instead of silently resolving them made the whole system debuggable.
    `,
    date: "2025-03-15",
    readTime: "5 min read",
    tags: ["LangGraph", "FastAPI", "AI", "Case Study"],
    slug: "building-multi-agent-ai-weekly-planner",
  },
  {
    id: "2",
    title: "Why I Switched from Create React App to Next.js",
    excerpt:
      "After building several projects with CRA, here is why Next.js App Router changed how I think about React applications — and why I will never go back.",
    content: `
Create React App was my entry point into React. It worked fine for small projects but as my applications grew I kept hitting the same walls.

## The Problems with CRA

No built-in routing, no server-side rendering, slow builds, and a bloated dependency tree that was impossible to customize without ejecting.

## Enter Next.js App Router

The App Router changed everything. File-based routing that just works. Server components that reduce JavaScript sent to the browser. Built-in image optimization. Edge functions. And \`next/font\` for zero-layout-shift font loading.

## The Learning Curve

The mental model shift from client-only to server-first takes time. Understanding when to use Server Components vs Client Components, how layouts work, and how to handle data fetching at the right level — these took practice.

## My Recommendation

If you are building anything beyond a simple prototype, start with Next.js. The App Router is opinionated in the right ways and the deployment experience on Vercel is genuinely magical.
    `,
    date: "2025-02-20",
    readTime: "4 min read",
    tags: ["Next.js", "React", "Web Development"],
    slug: "switched-cra-to-nextjs",
  },
  {
    id: "3",
    title: "Understanding TypeScript Generics — A Practical Guide",
    excerpt:
      "Generics confused me for months. Here is the mental model that finally made them click, with real examples from projects I have built.",
    content: `
TypeScript generics are one of those concepts that look intimidating but become obvious once the mental model clicks.

## The Simple Mental Model

Think of generics as variables for types. Just like a function takes a value and returns a value, a generic function takes a type and returns a type.

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

The \`T\` here is a type variable. When you call \`identity("hello")\`, TypeScript infers that \`T\` is \`string\`. When you call \`identity(42)\`, \`T\` is \`number\`.

## Real World Example

In my portfolio project I use a generic API response type:

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
\`\`\`

This means I can have \`ApiResponse<User>\`, \`ApiResponse<Project[]>\`, or any other shape — all with full type safety.

## Constraints

You can constrain generics to only accept certain types:

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
\`\`\`

This ensures \`key\` is always a valid key of the object passed in.

## Practice Makes Perfect

The best way to learn generics is to use them in real code. Start with simple cases and gradually increase complexity.
    `,
    date: "2025-01-10",
    readTime: "6 min read",
    tags: ["TypeScript", "Programming", "Tutorial"],
    slug: "typescript-generics-practical-guide",
  },
];