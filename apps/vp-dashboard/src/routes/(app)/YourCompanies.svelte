<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { companies } from '$lib/stores/company';
	import Company from './Company.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
</script>

<section>
	<h2 class="font-bold text-lg mb-2">Your Companies</h2>
	<div class="flex flex-wrap gap-4">
		{#each $companies as company}
			<Company {company} />
		{/each}

		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					class="flex flex-col gap-2 w-96 h-auto aspect-video"
				>
					<p class="text-lg">Add new company</p>
					<iconify-icon icon="mdi:plus-circle" width="35" />
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="right">
				<Sheet.Header>
					<Sheet.Title>Add new company</Sheet.Title>
					<Sheet.Description>Makes a new workspace for a new company</Sheet.Description>
				</Sheet.Header>
				<div class="py-4">
					<p class="text-muted-foreground">Form goes here</p>
				</div>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</section>
