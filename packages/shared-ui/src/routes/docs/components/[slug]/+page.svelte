<script lang="ts">
  // @ts-ignore
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

<div class="grid grid-cols-5 gap-4">
  <article class="col-span-4">
    <hgroup class="mb-6">
      <h1 class="font-bold text-4xl">{data.meta.title}</h1>
      <div class="flex items-center u gap-4 text-zinc-500">
        <p>Last updated at {formatDate(data.meta.date)}</p>
        <p>Author: {data.meta.author}</p>
      </div>
    </hgroup>

    <svelte:component this={data.content} />
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
