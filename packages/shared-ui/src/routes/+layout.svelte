<script lang="ts">
  import "../app.css";
</script>

<div class="flex flex-col bg-slate-900 text-white min-h-screen">
  <nav class="p-4 border-b border-b-slate-700">
    <div class="flex justify-between max-w-7xl m-auto">
      <a href="/" class="text-cyan-500 font-bold">Shared UI</a>
      <ul class="flex gap-4">
        <li><a href="/">Home</a></li>
        <li><a href="/docs/getting-started">Getting Started</a></li>
        <li><a href="/docs">Docs</a></li>
        <li>
          <a href="https://github.com/jKm00" target="_blank">Contribute</a>
        </li>
      </ul>
    </div>
  </nav>
  <slot />
</div>
