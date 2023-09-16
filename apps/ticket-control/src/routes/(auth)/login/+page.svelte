<script lang="ts">
	import LoginForm from './LoginForm.svelte';
	import * as Card from '$lib/components/ui/card';

	export let data;
</script>

<div class="flex-grow grid place-items-center">
	<div class="width">
		<Card.Root>
			<Card.Header>
				<Card.Title>Login</Card.Title>
			</Card.Header>
			<Card.Content>
				<LoginForm form={data.form} />
			</Card.Content>
		</Card.Root>
	</div>
</div>

<style scoped>
	.width {
		width: min(90vw, 30rem);
	}
</style>
