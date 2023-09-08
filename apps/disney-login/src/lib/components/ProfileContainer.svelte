<script lang="ts">
	export let profile: Profile;
	export let destination: string | undefined = undefined;
	export let prevPage: string | undefined = undefined;

	let searchParams = new URLSearchParams();
	if (destination) {
		searchParams.append('destination', destination);
	}

	if (prevPage) {
		searchParams.append('prevPage', prevPage);
	}

	let link: string;
	if (searchParams.size > 0) {
		link = `/enter-pin/${profile.username}?${searchParams.toString()}`;
	} else {
		link = `/enter-pin/${profile.username}`;
	}
</script>

<div class="flex flex-col gap-4 items-center">
	<a href={link} class="group">
		<img
			class="w-36 group-hover:scale-105 group-hover:border-white transition-all duration-300 border-4 border-transparent rounded-full"
			src="/assets/profile-pictures/{profile.img.src}"
			alt={profile.img.alt}
		/>
	</a>
	<h2 class="text-white font-bold text-2xl">{profile.username}</h2>
	{#if profile.isPasswordProtected}
		<svg
			class="fill-white h-5"
			xmlns="http://www.w3.org/2000/svg"
			height="1em"
			viewBox="0 0 448 512"
			><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"
			/></svg
		>
	{/if}
</div>
