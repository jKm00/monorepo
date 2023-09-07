<script lang="ts">
	import { authStore } from '$lib/stores/authStore';
</script>

<div class="text-center">
	<h1 class="text-3xl font-bold">Welcome {$authStore?.username}</h1>
</div>
