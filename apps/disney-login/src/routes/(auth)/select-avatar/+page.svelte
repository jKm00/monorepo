<script lang="ts">
	import { page } from '$app/stores';
	import AuthNavBar from '$lib/components/AuthNavBar.svelte';
	import SecondaryLink from '$lib/components/links/SecondaryLink.svelte';
	import { profilePictures } from './profilePictures';

	export let data;

	$: ({ username } = data);

	$: usernameParam = username ? `&username=${username}` : '';
	$: destination = $page.url.searchParams.get('destination') ?? '/add-profile';
</script>

<AuthNavBar>
	<SecondaryLink link="/select-profile">Cancel</SecondaryLink>
</AuthNavBar>
<div class="grid gap-4 px-10 py-5 mt-10">
	<h1 class="font-bold text-3xl">Select avatar</h1>
	<div class="flex gap-4">
		{#each profilePictures as picture}
			<a href="{destination}?img={picture.id}{usernameParam}">
				<img class="w-36" src="/assets/profile-pictures/{picture.src}" alt={picture.alt} />
			</a>
		{/each}
	</div>
</div>
