<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	let NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	export let pin: number[] = [];
	export let wrongPin = false;

	const dispatch = createEventDispatcher<{ submit: number[] }>();

	const onKeyPress = (event: KeyboardEvent) => {
		const key = event.key;

		switch (key) {
			case 'Backspace':
				pin = pin.slice(0, -1);
			default:
				if (!NUMBERS.includes(key) || pin.length === 4) {
					return;
				}

				wrongPin = false;
				pin = [...pin, Number(key)];

				if (pin.length === 4) {
					dispatch('submit', pin);
				}
		}
	};

	onMount(() => {
		if (browser) {
			document.addEventListener('keyup', onKeyPress);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keyup', onKeyPress);
		}
	});
</script>

<div class="grid gap-10">
	<h2 class="text-white font-bold text-3xl">Enter your Profile PIN</h2>
	<div class="grid gap-1 text-center">
		<div class="flex gap-4 justify-center">
			{#each Array(4) as _, i}
				<div
					class="bg-zinc-700 py-8 px-5 rounded border border-transparent"
					style={wrongPin ? 'border-color: rgb(248 113 113)' : ''}
				>
					<svg
						class="h-3 {pin[i] ? 'fill-white' : 'fill-zinc-400'}"
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 512 512"
						><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
						/></svg
					>
				</div>
			{/each}
		</div>
		<p class="text-sm {wrongPin ? 'text-red-400' : 'text-transparent'}">
			Incorrect PIN. Please try again
		</p>
	</div>
</div>
