<script lang="ts">
	import PinCode from '$lib/components/PinCode.svelte';
	import ProfileContainer from '$lib/components/ProfileContainer.svelte';
	import { enhance } from '$app/forms';
	import { tick } from 'svelte';
	import { page } from '$app/stores';

	export let data;

	let formElement: HTMLFormElement;
	let pin: number[];

	$: ({ profile } = data);

	$: error = String($page.status)[0] !== '2';

	const handleSubmit = async (event: CustomEvent<number[]>) => {
		await tick();
		formElement.submit();
	};
</script>

<div class="grid gap-8 justify-center pt-10">
	<ProfileContainer {profile} />
	<PinCode bind:pin on:submit={handleSubmit} wrongPin={error} />
	<form bind:this={formElement} method="post" use:enhance>
		<input type="hidden" name="username" value={profile.username} />
		<input type="hidden" name="password" value={pin?.join('')} />
	</form>
	<a href="/" class="text-sky-400 text-center mt-16">Forgot your PIN?</a>
</div>
