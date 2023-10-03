<script lang="ts">
	import LoginForm from './LoginForm.svelte';
	import SocialForm from './SocialForm.svelte';

	export let data;
</script>

<div>
	<h1 class="text-3xl font-bold mb-4">Login</h1>
	<LoginForm form={data.form} />
	<p class="text-sm text-muted-foreground uppercase my-4 text-center">or sign in with</p>
	<SocialForm />
</div>
