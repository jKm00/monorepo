# Ticket Control

A ticket control app for employees at a ticket control company used to register people that has not payed for a regular ticket.

## Background

A common problem in many cities are people not paying for tickets when using public transport. Normally this is handled with random controls. However, some people are speculating that it might be benefitual to not pay the regular tickets and rather take the price of the controls because the chance is so low, meaning it would pay of in the long run.

My idea to this problem is that for every time you get caught in a ticket control, you are registered into a system. When you are caught, the price you have to pay increases based on the number of time you have been caught previously.

This is an prototype of an application that can be used by the employees of the ticker control companies to look up and register people and the price they have to pay depending on how many times they have gotten caught before.

## Live Demo

1. Go to [https://magenta-squirrel-9c8948.netlify.app](https://magenta-squirrel-9c8948.netlify.app)
2. Login with username: admin, password: admin123
3. Select a route (look below for a list of available routes)
4. Search for a person by social security number (only two dummy persons are available: 31108494583 and 29059845793)

### Available routes

R21 - Moss, R21 - Oslo, R22 - Mysen, R22 - Oslo, RE20 - Goteborg, R23 - Ski, RE20 - Halden, RE20 - Oslo, R23 - Oslo

_Type some or all of the letters when selecting a route_

## Getting Started

1. Clone repo
2. Install dependencies
```
pnpm install
```
3. Create `.env` file following the `.env.example`
4. Run application
```
pnpm dev
```

## Tools

- [SvelteKit](https://kit.svelte.dev/)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn Svelte](https://www.shadcn-svelte.com/docs/installation#configure-componentsjson)
- [SuperForm](https://superforms.rocks/)
- [Zod](https://zod.dev/)