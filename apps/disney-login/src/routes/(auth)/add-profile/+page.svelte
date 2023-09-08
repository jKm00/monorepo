<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let data;
	export let form;

	$: ({ img } = data);

	let username = data.username ?? '';
	let errorMsg: null | string = null;

	$: editImgLink = username.length === 0 ? '/select-avatar' : `/select-avatar?username=${username}`;

	$: if (form?.error) {
		errorMsg = form.error;
	}

	$: if (form?.success) {
		if (browser) {
			goto('/select-profile');
		}
	}
</script>

<div class="custom-grid mt-10">
	<h1 class="font-bold text-3xl title">Add profile</h1>
	<div class="relative picture-wrapper">
		<img class="w-36 picture" src="/assets/profile-pictures/{img.src}" alt={img.alt} />
		<a class="absolute bottom-0 right-0 bg-white p-3 rounded-full" href={editImgLink}
			><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
				><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
				/></svg
			></a
		>
	</div>
	<form class="grid gap-4 form w-full" method="post">
		<input type="hidden" name="img" value={img.id} />
		<input
			bind:value={username}
			class="p-3 rounded-sm text-sm bg-gray-800"
			type="text"
			name="username"
			placeholder="Profile name"
		/>
		<input
			class="p-3 rounded-sm text-sm bg-gray-800"
			type="password"
			name="password"
			placeholder="Pin code"
		/>
		<button class="bg-sky-600 rounded-sm py-2" type="submit">Save</button>
		{#if errorMsg}
			<p class="text-red-400 text-sm text-center">{errorMsg}</p>
		{/if}
	</form>
</div>

<style scoped>
	.custom-grid {
		display: grid;
		justify-items: center;
		gap: 2rem;
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
			align-self: end;
			grid-area: title;
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
