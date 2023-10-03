<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { theme } from '$lib/stores/theme';
</script>

<div class="grid place-items-center min-h-screen">
	<Card.Root class="w-[500px]">
		<Card.Header>
			<Card.Title>404 not found</Card.Title>
			<Card.Description>These are not the pages you are looking for</Card.Description>
		</Card.Header>
		<Card.Content>
			<div>
				<p>
					Oops! It seems you've tried to access <span
						class="inline-block border px-2 pb-1 text-blue-600 rounded">{$page.url.pathname}</span
					>, but we couldn't find what you're looking for. Please check the URL and try again.
				</p>
			</div>
		</Card.Content>
		<Card.Footer>
			<Button class="w-full" href="/">Back to home page</Button>
		</Card.Footer>
	</Card.Root>
</div>
