# Monorepo

This is the first time I'm creating a monorepo. Just wanted to test it out with some svelte exploration on the side:)

Tutorial followed: [https://blog.nrwl.io/setup-a-monorepo-with-pnpm-workspaces-and-speed-it-up-with-nx-bc5d97258a7e#6ad2](https://blog.nrwl.io/setup-a-monorepo-with-pnpm-workspaces-and-speed-it-up-with-nx-bc5d97258a7e#6ad2)

## Structure

- `/apps` contains all the apps. Currently there is only one app; `svelte`
- `/packages` contains all the packages for this repository. Currently there is only a ui library which the `svelte` app uses. These packages are only used locally in this project

## Usefull commands

### Run an app from root directory:

```
pnpm dev --filter [app-name]
```

Example:

```
pnpm dev --filter shared-ui
```
