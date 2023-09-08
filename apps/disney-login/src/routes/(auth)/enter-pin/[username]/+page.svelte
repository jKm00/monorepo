<script lang="ts">
	import PinCode from '$lib/components/PinCode.svelte';
	import ProfileContainer from '$lib/components/ProfileContainer.svelte';
	import { enhance } from '$app/forms';
	import { tick } from 'svelte';
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/authStore.js';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import AuthNavBar from '$lib/components/AuthNavBar.svelte';
	import SecondaryLink from '$lib/components/links/SecondaryLink.svelte';

	export let data;
	export let form;

	let formElement: HTMLFormElement;
	let pin: number[];

	$: ({ profile } = data);

	$: error = String($page.status)[0] !== '2';

	const handleSubmit = async () => {
		await tick();
		formElement.submit();
	};

	$: prevPage = $page.url.searchParams.get('prevPage') ?? '/select-profile';

	$: if (form?.success && browser) {
		authStore.set(form.auth.username, form.auth.token);
		const destionation = $page.url.searchParams.get('destination');
		if (destionation) {
			goto(destionation);
		} else {
			goto('/home');
		}
	}
</script>

<AuthNavBar>
	<SecondaryLink link={prevPage}>Cancel</SecondaryLink>
</AuthNavBar>
<div class="grid gap-8 justify-center pt-10">
	<ProfileContainer {profile} />
	<PinCode bind:pin on:submit={handleSubmit} wrongPin={error} />
	<form bind:this={formElement} method="post" use:enhance>
		<input type="hidden" name="username" value={profile.username} />
		<input type="hidden" name="password" value={pin?.join('')} />
	</form>
	<a href="/" class="text-sky-400 text-center mt-16">Forgot your PIN?</a>
</div>
