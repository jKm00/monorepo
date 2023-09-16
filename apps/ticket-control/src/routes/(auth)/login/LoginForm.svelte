<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { loginSchema, type LoginSchema } from './schema';

	export let form: SuperValidated<LoginSchema>;
</script>

<Form.Root method="POST" {form} schema={loginSchema} let:config>
	<Form.Field {config} name="username">
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
