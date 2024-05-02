<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import Face from '$lib/components/face/Face.svelte';
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<Card.Title>Login</Card.Title>
		<Card.Description>Login to get access to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="mb-4 grid justify-center">
			<Face />
		</div>
		<form class="grid gap-4">
			<div>
				<label for="username">Username</label>
				<Input id="username" name="username" type="text" placeholder="username" />
			</div>
			<div>
				<label for="password">Passowrd</label>
				<Input id="password" name="password" type="password" placeholder="********" />
			</div>
			<Button type="submit">Login</Button>
		</form>
	</Card.Content>
</Card.Root>
