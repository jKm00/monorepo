<script lang="ts">
	import { page } from '$app/stores';

	enum ButtonType {
		EDIT,
		CANCEL
	}

	$: buttonType =
		$page.url.pathname.split('/')[1] === 'enter-pin' ? ButtonType.CANCEL : ButtonType.EDIT;
</script>

<nav class="flex justify-between items-center py-4 px-10">
	<a href="/"><img src="/assets/logos/disney-logo.svg" alt="Disney plus logo" class="h-12" /></a>
	{#if buttonType === ButtonType.EDIT}
		<a href="/" class="bg-zinc-700 uppercase py-3 px-6 rounded-sm text-white font-bold"
			>Edit profiles</a
		>
	{:else if buttonType === ButtonType.CANCEL}
		<a
			href="/select-profile"
			class="bg-zinc-700 uppercase py-3 px-6 rounded-sm text-white font-bold">Cancel</a
		>
	{/if}
</nav>
