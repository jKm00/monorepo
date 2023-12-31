---
title: Local Storage
description: A store used to automatically fetch and store a value to local storage.
date: "2023-7-27"
author: "Joakim Edvardsen"
published: true
---

<script>
  import MainButton from '../../lib/components/buttons/MainButton.svelte'
</script>

A store used to automatically fetch and store a value to local storage.

<h2 id="usage">Usage</h2>

```ts
// The key that should reference the value in local storage
const key = "theme";
// The store is initialized with this value if there are no value currently stored in the local storage
const fallbackValue = "dark";
// Initialize store
const theme = useLocalStorage<string>(key, fallbackValue);

// Update store
theme.set("light");
```

<h2 id="implementation">Implementation</h2>

This is what's happening under the hood:

```ts
import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  // Initialize value
  const storedValue = browser ? window.localStorage.getItem(key) : null;
  const initValue = storedValue ? JSON.parse(storedValue) : defaultValue;

  // Initialize store
  const store = writable<T>(initValue);
  if (browser) {
    window.localStorage.setItem(key, initValue);
  }

  // Update local storage when store changes
  store.subscribe((value) => {
    if (browser) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  });

  return store;
};
```

Essentially, it's just a custom store that updates the local storage whenever the value of the store changes.

<h2 id="example-usage">Example Usage</h2>

```svelte
+layout.svelte

<script lang="ts">
  const theme = useLocalStorage<string>('theme', 'dark')

  const toggleTheme = () => {
    $theme === 'dark' ? theme.set('light') : theme.set('dark')
  }
</script>

<div class={$theme}>
  <button on:click={toggletheme}>Toggle theme</button>
  <!-- More content -->
</div>
```

<h2 id="local-storage-api">Local Storage API</h2>

| Name          | Description                                                            | Type   | Default value |
| ------------- | ---------------------------------------------------------------------- | ------ | ------------- |
| key           | The key stored in the local storage                                    | string |               |
| fallbackValue | A fallback value used if no other value is stored in the local storage | T      |               |
