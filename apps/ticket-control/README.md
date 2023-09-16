# Ticker Control

A ticker control app for employees at a ticker control company used to register people that has not payed for a regular ticket.

## Background

A common problem in many cities is people not paying for tickets when using public transport. Normally this is handled with random controls. However, some people are speculating that it might be benefitual to not pay the regular tickets and rather take the price of a the controls because the chance is so low. Meaning that it would pay of in the long run.

My idea to this problem is that for every time you get caught in a ticket control, you are registered into a system. The next time you get caught the price you have to pay will increase.

This is an prototype of an application that can be used by the employees of the ticker control companies to look up and register people and the price they have to pay depending on how many times they have gotten caught before.

## Getting Started

1. Clone repo
2. Install dependencies
```
pnpm install
```
3. Run application
```
pnpm dev
```
4. Create `.env` file following the `.env.example`

## Tools

- [SvelteKit](https://kit.svelte.dev/)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn Svelte](https://www.shadcn-svelte.com/docs/installation#configure-componentsjson)
- [SuperForm](https://superforms.rocks/)
- [Zod](https://zod.dev/)