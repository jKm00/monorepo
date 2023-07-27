<script lang="ts">
  import "./style.css";

  export let data;

  $: ({ components, stores } = data);
</script>

<div class="grid grid-cols-6 m-auto w-full max-w-7xl flex-grow">
  <nav class="border-r border-slate-700 py-4">
    <ul class="grid gap-2 mb-4">
      <li><a href="/docs">Documentation</a></li>
      <li><a href="/docs/getting-started">Getting Started</a></li>
    </ul>
    <ul class="grid gap-2 mb-4">
      <h2 class="text-base text-zinc-400">Components</h2>
      {#each components as component}
        <li>
          <a href="/docs/components/{component.slug}">{component.title}</a>
        </li>
      {/each}
    </ul>
    <ul class="grid gap-2 mb-4">
      <h2 class="text-base text-zinc-400">Layouts</h2>
    </ul>
    <ul class="grid gap-2 mb-4">
      <h2 class="text-base text-zinc-400">Utils</h2>
    </ul>
    <ul class="grid gap-2 mb-4">
      <h2 class="text-base text-zinc-400">Stores</h2>
      {#each stores as store}
        <li><a href="/docs/stores/{store.slug}">{store.title}</a></li>
      {/each}
    </ul>
  </nav>
  <div class="col-span-5 p-10">
    <slot />
  </div>
</div>
