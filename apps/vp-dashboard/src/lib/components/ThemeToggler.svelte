<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { Button } from '$lib/components/ui/button';

	const toggleTheme = () => {
		theme.update((value) => (value === 'light' ? 'dark' : 'light'));
	};
</script>

<Button variant="secondary" on:click={toggleTheme} class="flex items-center gap-2">
	{#if $theme === 'light'}
		<iconify-icon icon="mdi:white-balance-sunny" width="20" />
	{:else}
		<iconify-icon icon="mdi:weather-night" width="20" />
	{/if}
	Toggle theme
</Button>
