<script lang="ts">
  import MainButton from "$lib/components/buttons/MainButton.svelte";
  import SecondaryButton from "$lib/components/buttons/SecondaryButton.svelte";
  import { goto } from "$app/navigation";
</script>

<div class="grid gap-4 place-items-center place-content-center flex-grow">
  <h1 class="font-bold text-7xl">Shared UI</h1>
  <div class="flex gap-2">
    <MainButton on:click={() => goto("/docs/getting-started")}
      >Getting Started</MainButton
    >
    <SecondaryButton on:click={() => goto("/docs")}>Docs</SecondaryButton>
    <SecondaryButton on:click={() => goto("https://github.com/jKm00")}
      >Contribute</SecondaryButton
    >
  </div>
  <p class="text-sm text-slate-400">Version 0.0.1</p>
</div>
