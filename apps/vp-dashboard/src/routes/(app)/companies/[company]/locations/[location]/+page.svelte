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
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';

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

	let expirationDate = useParam('expiration-date', params);

	let order = useParam('order-by', params, {
		fallback: 'asc'
	});
</script>

<Splitpanes horizontal={false} dblClickSplitter={false} class="w-full" theme="shadcn">
	<Pane snapSize={20} bind:size={$paneSize} class="flex">
		<div class="p-4 flex-grow">
			<Card.Root class="flex flex-col h-full">
				<Card.Header>
					<Card.Title>Food Articles</Card.Title>
					<Card.Description>All available food articles</Card.Description>
				</Card.Header>
				<Card.Content class="flex flex-col flex-grow">
					<div class="flex gap-2 items-center mb-4">
						<div>
							<Label>Name</Label>
							<Input type="text" placeholder="Name" class="w-64" bind:value={$input} />
						</div>
						<div class="flex h-full items-end">
							<Button
								on:click={() => order.set($order === 'asc' ? 'desc' : 'asc')}
								variant="outline"
								class="px-2"
							>
								{#if $order === 'asc'}
									<iconify-icon icon="mdi:order-alphabetical-ascending" width="20" />
								{:else}
									<iconify-icon icon="mdi:order-alphabetical-descending" width="20" />
								{/if}
							</Button>
						</div>
						<div>
							<Label>Category</Label>
							<Select.Root bind:selected={selectedCategory}>
								<Select.Trigger class="w-48">
									<Select.Value placeholder="Select category" />
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										<Select.Label>Categories</Select.Label>
										<Select.Item value="" label="Select category">Clear</Select.Item>
										<Select.Item value="Fruit" label="Fruit">Fruit</Select.Item>
										<Select.Item value="Candy" label="Candy">Candy</Select.Item>
										<Select.Item value="Dairy" label="Dairy">Dairy</Select.Item>
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</div>
						<div>
							<Label>Expiration date</Label>
							<Input
								bind:value={$expirationDate}
								type="date"
								placeholder="Expiration date"
								class="w-40"
							/>
						</div>
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
									<Table.Head>Expiration Date</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#if $data && $data.length > 0}
									{#each $data as food}
										{@const date = new Date(food.expirationDate)}
										<Table.Row>
											<Table.Cell>{food.name}</Table.Cell>
											<Table.Cell>{food.category}</Table.Cell>
											<Table.Cell>{date.toLocaleDateString()}</Table.Cell>
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
	<Pane snapSize={10} class="flex">
		<div class="flex-grow p-4">
			<Card.Root class="flex flex-col h-full">
				<Card.Header>
					<Card.Title>Some graph</Card.Title>
					<Card.Description>A graph visualising the data in the table</Card.Description>
				</Card.Header>
				<Card.Content class="flex-grow">
					<p class="text-center text-muted-foreground text-sm">Soon coming...</p>
				</Card.Content>
			</Card.Root>
		</div>
	</Pane>
</Splitpanes>
