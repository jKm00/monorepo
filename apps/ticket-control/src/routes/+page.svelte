<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { Input } from '$lib/components/ui/input';
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { route } from '$lib/stores/routeStore';
	import * as Dialog from '$lib/components/ui/dialog';
	import { allRoutes } from '$lib/shared/allRoutes';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { get } from 'svelte/store';

	let input: string = '';
	let errorMsg: string = '';

	let routeSearch: string = '';
	let selectedRoute: string = get(route) ?? '';

	$: filteredRoutes = allRoutes.filter((r) => r.includes(routeSearch));

	const handleSubmit = () => {
		if (input.length === 0) {
			errorMsg = 'Field cannot be empty';
			return;
		}
		let isnum = /^\d+$/.test(input);
		if (!isnum) {
			errorMsg = 'Only numbers accepted';
			return;
		}

		goto(`/persons/${input}`);
	};
</script>

<NavBar />
<div class="grid gap-4 p-4">
	<!-- Input -->
	<div class="grid gap-2">
		<div class="flex gap-4">
			<Input bind:value={input} type="text" placeholder="Social Security Number" name="ssn" />
			<Button on:click={handleSubmit} disabled={$route.length === 0}>Check</Button>
		</div>
		{#if $route.length === 0}
			<p class="text-center text-sm text-muted-foreground">Select route before checking people!</p>
		{/if}
		{#if errorMsg.length > 0}
			<p class="text-center text-sm text-red-300">{errorMsg}</p>
		{/if}
	</div>
	<Card.Root>
		<Card.Header>
			<Card.Title>Configuration</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex gap-4">
				<div class="flex-grow">
					<label for="route" class="font-semibold text-sm text-muted-foreground">Active route</label
					>
					<p id="route" class="">{$route.length === 0 ? 'N/A' : $route}</p>
				</div>
				<Dialog.Root>
					<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Route</Dialog.Trigger>
					<Dialog.Content class="sm:max-w-[425px]">
						<Dialog.Header>
							<Dialog.Title>Edit route</Dialog.Title>
							<Dialog.Description>
								Click on one of the routes to select it. Use the input to search for routes.
							</Dialog.Description>
						</Dialog.Header>
						<div class="grid gap-2 py-4">
							<Input id="name" placeholder="Search for route" bind:value={routeSearch} />
							<div class="grid gap-2 mt-4">
								<h2 class="font-semibold text-sm">Filtered routes</h2>
								<div class="flex flex-wrap gap-2">
									{#each filteredRoutes as _route}
										<Button
											on:click={() => (selectedRoute = _route)}
											variant={selectedRoute === _route ? 'default' : 'outline'}>{_route}</Button
										>
									{/each}
								</div>
							</div>
						</div>
						<Dialog.Footer>
							<Button on:click={() => (selectedRoute = '')} variant="outline">Clear</Button>
							<Button on:click={() => route.set(selectedRoute)}>Save changes</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</Card.Content>
	</Card.Root>
</div>
