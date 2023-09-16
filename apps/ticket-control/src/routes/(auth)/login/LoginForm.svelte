<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { loginSchema, type LoginSchema } from './schema';
	import { page } from '$app/stores';

	export let form: SuperValidated<LoginSchema>;

	$: redirectTo = $page.url.searchParams.get('redirectTo');
</script>

<Form.Root
	method="POST"
	action={`?redirectTo=${redirectTo}`}
	{form}
	schema={loginSchema}
	let:config
>
	<Form.Field {config} name="username">
		<!-- <Form.Item>
			<Form.Input type="hidden" name="redirectTo" value={redirectTo} />
		</Form.Item> -->
		<Form.Item>
			<Form.Label>Username</Form.Label>
			<Form.Input />
			<Form.Description>This is your account username.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="password">
		<Form.Label>Password</Form.Label>
		<Form.Input type="password" />
		<Form.Description>The password for your account.</Form.Description>
		<Form.Validation />
	</Form.Field>
	<Form.Button class="mt-4">Submit</Form.Button>
</Form.Root>
