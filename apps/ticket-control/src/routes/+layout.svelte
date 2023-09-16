<script lang="ts">
	import Toast from '$lib/components/ui/toast/Toast.svelte';
	import '../app.css';
</script>

<Toast />
<div class="min-h-screen flex flex-col">
	<slot />
</div>
