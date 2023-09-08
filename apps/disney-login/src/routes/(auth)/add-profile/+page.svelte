<script lang="ts">
	export let data;

	$: ({ img } = data);

	let username = data.username ?? '';

	$: editImgLink = username.length === 0 ? '/select-avatar' : `/select-avatar?username=${username}`;
</script>

<div class="flex flex-col gap-6 items-center mt-10">
	<h1 class="font-bold text-3xl">Add profile</h1>
	<div class="relative">
		<img class="w-36" src="/assets/profile-pictures/{img.src}" alt={img.alt} />
		<a class="absolute bottom-0 right-0 bg-white p-3 rounded-full" href={editImgLink}
			><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
				><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
				/></svg
			></a
		>
	</div>
	<form class="grid gap-4">
		<input
			bind:value={username}
			class="w-80 p-3 rounded-sm text-sm bg-gray-800"
			type="text"
			name="username"
			placeholder="Profile name"
		/>
		<button class="bg-sky-600 rounded-sm py-2" type="submit">Save</button>
	</form>
</div>
