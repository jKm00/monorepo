<script lang="ts">
	import { page } from '$app/stores';

	enum ButtonType {
		PRIMARY,
		SECONDARY
	}

	$: url = $page.url.pathname.split('/')[1];

	$: buttonType = url === 'edit-profiles' ? ButtonType.PRIMARY : ButtonType.SECONDARY;
	$: buttonLabel =
		url === 'select-profile'
			? 'Edit profiles'
			: url === 'enter-pin'
			? 'Cancel'
			: url === 'edit-profiles'
			? 'Done'
			: url === 'edit-profile'
			? 'Cancel'
			: '';
	$: link =
		url === 'select-profile'
			? '/edit-profiles'
			: url === 'enter-pin'
			? '/select-profile'
			: url === 'edit-profiles'
			? '/select-profile'
			: url === 'edit-profile'
			? '/edit-profiles'
			: '';
</script>

<nav class="flex justify-between items-center py-4 px-10">
	<a href="/"><img src="/assets/logos/disney-logo.svg" alt="Disney plus logo" class="h-12" /></a>
	<slot />
</nav>
