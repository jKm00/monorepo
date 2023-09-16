<script>
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root>
	<div class="flex justify-between p-4">
		<slot><span /></slot>
		<a href="/" class="font-semibold">Ticket Control</a>
		<form method="POST" action="/api/v1/logout">
			<button>Log out</button>
		</form>
	</div>
</Card.Root>
