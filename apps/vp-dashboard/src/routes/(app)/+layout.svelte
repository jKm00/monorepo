<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { nav } from '$lib/navigation';
	import * as Select from '$lib/components/ui/select';
	import * as Sheet from '$lib/components/ui/sheet';
	import { companies } from '$lib/stores/company';
	import { goto } from '$app/navigation';
	import { convertUrlToString } from '$lib/utils';
	import ThemeToggler from '$lib/components/ThemeToggler.svelte';

	$: pathname = $page.url.pathname;
	$: paths = pathname.split('/');
	$: company = paths.includes('companies') ? convertUrlToString(paths[2]) : null;
	$: location = paths.includes('locations') ? convertUrlToString(paths[4]) : null;

	const handleCompanyChange = (event: any) => {
		if (!event || !event.value) return;

		if (event.value !== company) {
			goto(`/companies/${event.value}`);
		}
	};

	const handleLocationChange = (event: any) => {
		if (event && event.value) {
			goto(`/companies/${company}/locations/${event.value}`);
		}
	};

	const handleLogout = async () => {
		try {
			await fetch('/logout', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				}
			});
			goto('/login');
		} catch (error) {
			console.log(error);
			goto('/');
		}
	};
</script>

<div class="custom-grid min-h-screen">
	<!-- Logo -->
	<h1 class="text-3xl font-bold border-r p-4 border-b">VoidePick</h1>
	<!-- Header bar -->
	<div class="flex justify-between items-center px-4 border-b">
		<!-- Workspace filters -->
		<div class="flex gap-2 items-center">
			{#if company}
				<Select.Root onSelectedChange={handleCompanyChange}>
					<Select.Trigger class="w-48">
						<Select.Value placeholder={company} />
					</Select.Trigger>
					<Select.Content>
						{#each $companies as company}
							<Select.Item value={company.name}>{company.name}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			{/if}
			{#if location}
				{@const _company = $companies.find((c) => c.name === company)}
				{#if _company}
					<iconify-icon icon="mdi:chevron-right" />
					<Select.Root onSelectedChange={handleLocationChange}>
						<Select.Trigger class="w-48">
							<Select.Value placeholder={location} />
						</Select.Trigger>
						<Select.Content>
							{#each _company.warehouses as warehouse}
								<Select.Item value={warehouse.name}>{warehouse.name}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				{/if}
			{/if}
		</div>
		<!-- Right side menu -->
		<Sheet.Root>
			<Sheet.Trigger><div class="h-8 w-8 rounded-full bg-popover-foreground" /></Sheet.Trigger>
			<Sheet.Content>
				<Sheet.Header>
					<Sheet.Title>Menu</Sheet.Title>
				</Sheet.Header>
				<!-- Menu content -->
				<div class="grid gap-4 mt-4">
					<ThemeToggler />
					<Button on:click={handleLogout} class="gap-1"
						><iconify-icon icon="mdi:logout" />Logout</Button
					>
				</div>
			</Sheet.Content>
		</Sheet.Root>
	</div>
	<!-- Nav menu -->
	<nav class="border-r p-4">
		{#each nav as navGroup}
			<ul class="mb-4">
				{#each navGroup.items as item}
					<li>
						<a class="block text-lg {pathname === item.link ? 'font-bold ' : ''}" href={item.link}
							>{item.label}</a
						>
					</li>
				{/each}
			</ul>
		{/each}
	</nav>
	<!-- page content -->
	<slot />
</div>

<style>
	.custom-grid {
		display: grid;
		grid-template-columns: 224px 1fr;
		grid-template-rows: auto 1fr;
	}
</style>
