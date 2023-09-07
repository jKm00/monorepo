<script lang="ts">
	import ProfileContainer from '$lib/components/ProfileContainer.svelte';

	export let data;

	$: ({ profiles } = data);
</script>

<div class="flex-grow flex flex-col items-center">
	<h1 class="text-white font-bold text-3xl my-20">Who's watching?</h1>
	<div class="flex gap-4">
		{#if profiles}
			{#each profiles as profile}
				<ProfileContainer {profile} />
			{/each}
		{/if}
		<a href="/select-avatar" class="flex flex-col gap-4 items-center">
			<div
				class="grid place-items-center w-36 aspect-square bg-zinc-700 rounded-full hover:scale-105 hover:border-white hover:bg-zinc-500 transition-all duration-300 border-4 border-transparent"
			>
				<svg
					class="fill-white h-8"
					xmlns="http://www.w3.org/2000/svg"
					height="1em"
					viewBox="0 0 448 512"
					><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
					/></svg
				>
			</div>
			<h2 class="text-white font-bold text-2xl">Add profile</h2>
		</a>
	</div>
</div>
