<script>
	import SocialButton from './SocialButton.svelte';
</script>

<form method="POST" class="grid grid-cols-3 gap-2">
	<SocialButton src="./img/logos/github.png" alt="github logo" formaction="?/login&provider=github"
		>GitHub</SocialButton
	>
	<SocialButton src="./img/logos/google.png" alt="google logo" formaction="?/login&provider=google"
		>Google</SocialButton
	>
	<SocialButton src="./img/logos/apple.png" alt="apple logo" formaction="?/login&provider=apple"
		>Apple</SocialButton
	>
</form>
