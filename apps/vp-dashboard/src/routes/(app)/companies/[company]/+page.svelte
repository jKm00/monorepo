<script lang="ts">
	export let data;

	$: ({ company } = data);
</script>

<div class="p-4 flex gap-4">
	{#if company}
		{#each company.warehouses as warehouse}
			<a href="/companies/{company.name}/locations/{warehouse.name}">{warehouse.name}</a>
		{/each}
	{/if}
</div>
