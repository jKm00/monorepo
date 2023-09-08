<script lang="ts">
	import { profilePictures } from './profilePictures';

	export let data;

	$: ({ username } = data);

	$: usernameParam = username ? `&username=${username}` : '';
</script>

<div class="grid gap-4 px-10 py-5">
	<h1 class="font-bold text-3xl">Select avatar</h1>
	<div class="flex gap-4">
		{#each profilePictures as picture}
			<a href="/add-profile?img={picture.id}{usernameParam}">
				<img class="w-36" src="/assets/profile-pictures/{picture.src}" alt={picture.alt} />
			</a>
		{/each}
	</div>
</div>
