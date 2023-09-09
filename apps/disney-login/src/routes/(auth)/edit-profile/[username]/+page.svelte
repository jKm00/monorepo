<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AuthNavBar from '$lib/components/AuthNavBar.svelte';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';

	export let data;
	export let form;

	let errorMsg: string | null = null;

	$: if (form?.error) {
		errorMsg = form.error;
	}

	$: ({ profile, numberOfProfiles, tmpImg } = data);

	const handleLogout = () => {
		goto('/logout?redirect=/edit-profiles');
	};
</script>

<AuthNavBar>
	<SecondaryButton on:click={handleLogout}>Cancel</SecondaryButton>
</AuthNavBar>
<div class="custom-grid mt-10">
	<div class="title text-center">
		<h1 class="font-bold text-3xl mb-4">Edit profile</h1>
		{#if numberOfProfiles === 1}
			<p class="text-gray-300 mb-8">This is your only profile. It cannot be deleted</p>
		{/if}
	</div>
	<div class="relative picture-wrapper mb-8">
		{#if tmpImg}
			<img class="w-36 picture" src="/assets/profile-pictures/{tmpImg.src}" alt={tmpImg.alt} />
		{:else}
			<img
				class="w-36 picture"
				src="/assets/profile-pictures/{profile.img.src}"
				alt={profile.img.alt}
			/>
		{/if}
		<a
			class="absolute bottom-0 right-0 bg-white p-3 rounded-full"
			href={`/select-avatar?destination=/edit-profile/${profile.username}`}
			><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
				><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
				/></svg
			></a
		>
	</div>
	<form class="form grid gap-4" method="post" action="?/save">
		<input type="hidden" name="id" value={profile.id} />
		<input type="hidden" name="imgId" value={tmpImg ? tmpImg.id : -1} />
		<input
			class="p-3 rounded-sm text-sm bg-gray-800 w-full"
			type="text"
			name="username"
			bind:value={profile.username}
			placeholder="Profile name"
		/>
		<input
			class="p-3 rounded-sm text-sm bg-gray-800 w-full"
			type="password"
			name="password"
			bind:value={profile.password}
			placeholder="Profile name"
		/>
		<PrimaryButton>Save</PrimaryButton>
		{#if errorMsg}
			<p class="text-sm text-red-400 text-center">{errorMsg}</p>
		{/if}
		{#if numberOfProfiles > 1}
			<button formaction="?/delete" class="text-sky-500">Delete profile</button>
		{/if}
	</form>
</div>

<style scoped>
	.custom-grid {
		display: grid;
		justify-items: center;
		width: min(615px, 90vw);
		margin-inline: auto;
	}

	.form {
		width: min(24rem, 100%);
	}

	@media (min-width: 750px) {
		.custom-grid {
			justify-items: start;
			grid-template-columns: 2fr 1fr;
			grid-template-areas:
				'title picture'
				'form picture';
		}

		.title {
			grid-area: title;
			align-self: end;
			text-align: left;
		}

		.picture-wrapper {
			grid-area: picture;
			align-self: start;
		}

		.picture {
			width: 100%;
		}

		.form {
			grid-area: form;
		}
	}
</style>
