<script lang="ts">
  export let loading = false;
</script>

<button
  on:click
  disabled={loading}
  class="text-slate-950 bg-cyan-400 px-4 py-2 rounded shadow"><slot /></button
>
