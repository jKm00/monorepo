<script lang="ts">
  export let loading = false;
</script>

<button
  on:click
  disabled={loading}
  class="text-lg bg-teal-500 px-4 py-2 rounded-sm shadow"><slot /></button
>
