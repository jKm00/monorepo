<script lang="ts">
	import type { SuperValidated } from 'sveltekit-superforms';
	import { type LoginSchema, loginSchema } from './schema';
	import * as Form from '$lib/components/ui/form';

	export let form: SuperValidated<LoginSchema>;
</script>

<Form.Root class="w-full" method="POST" action="?/login" {form} schema={loginSchema} let:config>
	<Form.Field {config} name="username">
		<Form.Item>
			<Form.Input placeholder="username" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="password">
		<Form.Item>
			<Form.Input type="password" placeholder="password" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button class="w-full">Sign in</Form.Button>
</Form.Root>
