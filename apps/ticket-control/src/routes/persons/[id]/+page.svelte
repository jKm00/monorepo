<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import BackButton from '$lib/components/buttons/BackButton.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { route } from '$lib/stores/routeStore';
	import { toast } from '$lib/components/ui/toast/toastStore.js';

	export let data;
	export let form;

	$: ({ person, ssn } = data);

	$: if (form?.success) {
		toast.push({
			type: 'success',
			title: 'Success',
			desc: 'Invoice sent'
		});
	}
</script>

<NavBar>
	<BackButton to="/" />
</NavBar>

{#if person}
	<div class="grid gap-4 p-4">
		<form method="POST" class="justify-self-end">
			<input type="hidden" name="ssn" value={person.ssn} />
			<input type="hidden" name="route" value={$route} />
			<Button>File new ticket</Button>
		</form>
		<Card.Root>
			<Card.Header>
				<Card.Title>General info</Card.Title>
			</Card.Header>
			<Card.Content class="flex flex-wrap justify-between">
				<div>
					<label for="name" class="font-semibold text-sm text-muted-foreground">Id</label>
					<p id="name" class="">{person.id}</p>
				</div>
				<div>
					<label for="name" class="font-semibold text-sm text-muted-foreground">Name</label>
					<p id="name" class="">{person.name}</p>
				</div>
				<div>
					<label for="name" class="font-semibold text-sm text-muted-foreground">Age</label>
					<p id="name" class="">{person.age}</p>
				</div>
				<div>
					<label for="name" class="font-semibold text-sm text-muted-foreground">SSN</label>
					<p id="name" class="">{person.ssn}</p>
				</div>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Previous tickets</Card.Title>
			</Card.Header>
			<Card.Content>
				{#if person.previousTickets.length === 0}
					<p class=" text-muted-foreground text-sm">
						{person.name} does not have any previous tickets
					</p>
				{:else}
					<Table.Root>
						<Table.Caption>A list of {person.name}'s last control tickets.</Table.Caption>
						<Table.Header>
							<Table.Row>
								<Table.Head>Date</Table.Head>
								<Table.Head>Time</Table.Head>
								<Table.Head>Route</Table.Head>
								<Table.Head class="text-right">Price</Table.Head>
								<Table.Head class="text-right">Payed</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each person.previousTickets as ticket, i (i)}
								<Table.Row>
									<Table.Cell>{ticket.date}</Table.Cell>
									<Table.Cell>{ticket.time}</Table.Cell>
									<Table.Cell>{ticket.route}</Table.Cell>
									<Table.Cell class="text-right">{Math.round(ticket.price)}{ticket.unit}</Table.Cell
									>
									<Table.Cell class="text-right">{ticket.payed}</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
{:else}
	<div class="flex-grow grid place-content-center text-center">
		<p class="text-slate-600 text-sm">Could not find person with ssn: {ssn}</p>
	</div>
{/if}
