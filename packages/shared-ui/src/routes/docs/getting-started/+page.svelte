<script lang="ts">
  import { formatDate } from "$lib/utils";
  import { page } from "$app/stores";

  export let data;

  $: hash = $page.url.hash.replace("#", "");
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="grid grid-cols-4 gap-4">
  <article class="col-span-3">
    <hgroup class="mb-6">
      <h1 class="font-bold text-4xl">{data.meta.title}</h1>
      <div class="flex items-center u gap-4 text-zinc-500">
        <p>Last updated at {formatDate(data.meta.date)}</p>
        <p>Author: {data.meta.author}</p>
      </div>
    </hgroup>

    <svelte:component this={data.content} />

    <div class="flex justify-between mt-10">
      <a href="/docs" class="grid p-4 border-2 border-cyan-600 rounded">
        <span class="text-cyan-600 text-sm">Previous:</span>
        Documentation
      </a>
      <a
        href="/docs/components"
        class="grid p-4 border-2 border-cyan-600 rounded"
      >
        <span class="text-cyan-600 text-sm">Next:</span>
        Components
      </a>
    </div>
  </article>
  <aside>
    <div class="sticky top-4">
      <h5>Page content:</h5>
      <ul>
        {#each data.headings as heading}
          <li>
            <a
              href="#{heading.toLowerCase().replace(' ', '-')}"
              class={hash === heading.toLowerCase().replace(" ", "-")
                ? "text-cyan-500"
                : ""}>{heading}</a
            >
          </li>
        {/each}
      </ul>
    </div>
  </aside>
</div>
