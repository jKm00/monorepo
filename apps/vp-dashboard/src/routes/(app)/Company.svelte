<script lang="ts">
	import { companies, type Company } from '$lib/stores/company';

	export let company: Company;

	$: pinIcon = company.pinned ? 'mdi:pin-off' : 'mdi:pin';

	const togglePinned = () => {
		companies.togglePinned(company.id);
	};
</script>

<div class="relative group">
	<a href="/companies/{company.name}">
		<div
			class="bg-gradient-to-br from-zinc-900 to-zinc-900 p-4 text-white w-96 aspect-video rounded-sm"
			style="--tw-gradient-from: {company.gradient
				.from} var(--tw-gradient-from-position); --tw-gradient-to: {company.gradient
				.to} var(--tw-gradient-from-position)"
		>
			<h3 class="font-bold">{company.name}</h3>
			<p>{company.slogan}</p>
		</div>
	</a>
	<!-- Hover -->
	<div
		class="absolute top-4 right-4 z-10 flex opacity-0 group-hover:opacity-100 justify-end gap-2 text-white transition-opacity"
	>
		<button on:click={togglePinned} class="block bg-zinc-900 w-8 h-8 rounded-sm">
			<iconify-icon icon={pinIcon} />
		</button>
		<button class="block bg-zinc-900 w-8 h-8 rounded-sm">
			<iconify-icon icon="mdi:dots-vertical" />
		</button>
	</div>
</div>
