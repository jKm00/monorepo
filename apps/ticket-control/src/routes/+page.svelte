<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { Input } from '$lib/components/ui/input';
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { route } from '$lib/stores/routeStore';
	import * as Dialog from '$lib/components/ui/dialog';
	import { allRoutes } from '$lib/shared/allRoutes';
	import { Button, buttonVariants } from '$lib/components/ui/button';

	let input: string = '';
	let errorMsg: string = '';

	let routeSearch: string = '';
	let routeError: string = '';
	let routeSuccess: string = '';

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

	const handleRouteChange = () => {
		routeError = '';
		const foundRoute = allRoutes.find((r) => r.includes(routeSearch));

		if (!foundRoute) {
			routeError = `Could not find route with: ${routeSearch}`;
			return;
		}

		route.set(foundRoute);

		routeSuccess = `Route changed to: ${foundRoute}`;

		setTimeout(() => {
			routeSuccess = '';
		}, 3000);
	};
</script>

<NavBar />
<div class="grid gap-4 p-4">
	<!-- Input -->
	<div class="grid gap-2">
		<div class="flex gap-4">
			<Input bind:value={input} type="text" placeholder="Social Security Number" name="ssn" />
			<Button on:click={handleSubmit}>Check</Button>
		</div>
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
								Enter the number or the name of the route. Click save when you're done.
							</Dialog.Description>
						</Dialog.Header>
						<div class="grid gap-2 py-4">
							<Input id="name" placeholder="Route" bind:value={routeSearch} />
							{#if routeError.length > 0}
								<p class="text-center text-sm text-red-300">{routeError}</p>
							{/if}
							{#if routeSuccess.length > 0}
								<p class="text-center text-sm text-green-500">
									{routeSuccess}
								</p>
							{/if}
						</div>
						<Dialog.Footer>
							<Button on:click={handleRouteChange} type="submit">Save changes</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</Card.Content>
	</Card.Root>
</div>
