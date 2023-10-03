<script>
	import { companies } from '$lib/stores/company';
	import { fade } from 'svelte/transition';
	import Company from './Company.svelte';

	$: pinnedCompanies = $companies.filter((c) => c.pinned);
</script>

{#if pinnedCompanies.length > 0}
	<section class="mb-8" transition:fade={{ duration: 100 }}>
		<h2 class="font-bold text-lg flex items-center gap-2 mb-2">
			<iconify-icon icon="mdi:pin" />Pinned Companies
		</h2>
		<div class="flex flex-wrap gap-4">
			{#each pinnedCompanies as company}
				<Company {company} />
			{/each}
		</div>
	</section>
{/if}
