<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/authStore';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (browser) {
			try {
				if (browser) {
					await fetch('/api/v1/logout', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}
					});
					authStore.clear();
					goto($page.url.searchParams.get('redirect') ?? '/');
				}
			} catch (error) {
				console.error(error);
			}
		}
	});
</script>
