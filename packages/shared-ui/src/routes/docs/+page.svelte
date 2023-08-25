<script lang="ts">
  import { useLocalStorage } from "$lib/stores/localStorage.ts";

  const theme = useLocalStorage("theme", "dark");

  const toggleTheme = () => {
    $theme === "dark" ? theme.set("light") : theme.set("dark");
  };
</script>

<h1>Welcome to Shared UI documentation</h1>

<h2>Playground area</h2>

<p>Current theme: {$theme}</p>
<button on:click={toggleTheme}>Toggle theme</button>

<div class="flex justify-end">
  <a
    href="/docs/getting-started"
    class="grid p-4 border-2 border-cyan-600 rounded"
  >
    <span class="text-cyan-600 text-sm">Next:</span>
    Getting Started
  </a>
</div>
