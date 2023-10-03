<script lang="ts">
	import { useLocalStorage } from '$lib/stores/localStorage';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { useFetch } from '$lib/stores/useFetch.js';
	import type { Item } from '$lib/server/foods';
	import { useParam } from '$lib/stores/useParam';

	let paneSize = useLocalStorage('paneSize', 70);

	let { data, isLoading, error, params } = useFetch<Item[]>('/api/v1/foods', {
		immediate: true
	});

	let input = useParam('name', params, {
		debounced: true,
		debounceDelay: 500
	});

	let category = useParam('category', params);
	$: selectedCategory = { value: $category, label: $category };
	$: category.set(selectedCategory.value);
</script>

<Splitpanes horizontal={false} dblClickSplitter={false} class="w-full" theme="shadcn">
	<Pane snapSize={10} bind:size={$paneSize} class="flex">
		<div class="p-4 flex-grow">
			<Card.Root class="flex flex-col h-full">
				<Card.Header>
					<Card.Title>Food Articles</Card.Title>
					<Card.Description>All available food articles</Card.Description>
				</Card.Header>
				<Card.Content class="flex flex-col flex-grow">
					<div class="flex gap-2 items-center">
						<Input type="text" placeholder="Name" class="w-64" bind:value={$input} />
						<Select.Root bind:selected={selectedCategory}>
							<Select.Trigger class="w-48">
								<Select.Value placeholder="Select category" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Item value="" label="Select category">select category</Select.Item>
									<Select.Item value="Fruit" label="Fruit">Fruit</Select.Item>
									<Select.Item value="Candy" label="Candy">Candy</Select.Item>
									<Select.Item value="Dairy" label="Dairy">Dairy</Select.Item>
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>
					{#if $isLoading}
						<p class="flex flex-grow items-center justify-center animate-pulse py-4">Loading...</p>
					{:else}
						<Table.Root>
							<Table.Caption
								>{!$data || $data?.length === 0
									? 'No data matching filters'
									: 'A list of food articles'}</Table.Caption
							>
							<Table.Header>
								<Table.Row>
									<Table.Head>Name</Table.Head>
									<Table.Head>Category</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#if $data && $data.length > 0}
									{#each $data as food}
										<Table.Row>
											<Table.Cell>{food.name}</Table.Cell>
											<Table.Cell>{food.category}</Table.Cell>
										</Table.Row>
									{/each}
								{/if}
							</Table.Body>
						</Table.Root>
					{/if}
				</Card.Content>
			</Card.Root>
		</div>
	</Pane>
	<Pane snapSize={10}>
		<div class="p-4">General Kenobi</div>
	</Pane>
</Splitpanes>
