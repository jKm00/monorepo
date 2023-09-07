<script lang="ts">
	import { goto } from '$app/navigation';

	const handleLogout = () => {
		goto('/select-profile');
	};
</script>

<nav class="flex justify-between items-center py-4 px-10">
	<a href="/home"><img src="/assets/logos/disney-logo.svg" alt="Disney plus logo" class="h-12" /></a
	>

	<button on:click={handleLogout}>Change profile</button>
</nav>
