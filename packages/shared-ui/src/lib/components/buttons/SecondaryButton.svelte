<script lang="ts">
  export let loading = false;
</script>

<button
  on:click
  disabled={loading}
  class="bg-slate-600 px-4 py-2 rounded shadow"><slot /></button
>
