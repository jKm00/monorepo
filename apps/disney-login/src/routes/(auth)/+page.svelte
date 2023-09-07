<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Shadow } from 'svelte-loading-spinners';

	onMount(() => {
		const delay = (Math.floor(Math.random() * 3) + 1) * 1000;
		setTimeout(() => {
			goto('/select-profile');
		}, delay);
	});
</script>

<div class="flex-grow grid place-items-center">
	<Shadow size="60" color="rgb(56 189 248)" unit="px" duration="1s" />
</div>
