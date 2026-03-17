import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Multi-Cloud Topology Map with Next.js and Framer Motion",
    excerpt:
      "How I built an animated infrastructure visualization for Atomity's frontend challenge — covering design tokens, scroll-triggered animations, and TanStack Query caching.",
    content: `
When I received Atomity's frontend engineering challenge, I knew immediately that Option B — the multi-cloud topology map — was the more interesting problem.

## The Challenge

The task was to recreate a section from Atomity's cloud optimization platform. I chose the infrastructure topology map showing AWS, Azure, GCP, and On-Premise nodes connected to a central resource chart.

## Design Tokens First

Before writing a single component, I set up a token system. Every color, spacing value, and radius lives in \`tokens/index.ts\` and maps to CSS custom properties. This means dark mode is just a variable swap — zero component changes needed.

## Animation Strategy

My rule: every animation must have a reason. The connection lines draw themselves on scroll entry using \`scaleX\` animation — mimicking the feeling of a connection being established. Provider nodes pop in with spring physics, staggered by index so your eye moves naturally across the layout.

## TanStack Query Caching

Data is fetched from DummyJSON and transformed in \`dataMapper.ts\`. With \`staleTime: 5 minutes\`, the network tab shows exactly one request on first visit and instant data on every revisit.

## What I Learned

Building with accessibility in mind from the start is far easier than retrofitting it. Every interactive element has keyboard support, aria labels, and respects \`prefers-reduced-motion\`.
    `,
    date: "2025-03-15",
    readTime: "5 min read",
    tags: ["Next.js", "Framer Motion", "TypeScript", "Case Study"],
    slug: "building-multi-cloud-topology-map",
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