<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/authStore';
	import { deleteCookie } from '$lib/utils';

	const handleLogout = async () => {
		try {
			await fetch('/api/v1/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			goto('/');
		} catch (error) {
			console.error(error);
		}
	};
</script>

<nav class="flex justify-between items-center py-4 px-10">
	<a href="/home"><img src="/assets/logos/disney-logo.svg" alt="Disney plus logo" class="h-12" /></a
	>

	<button on:click={handleLogout}>Change profile</button>
</nav>
