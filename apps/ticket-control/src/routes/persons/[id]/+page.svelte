<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import BackButton from '$lib/components/buttons/BackButton.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { route } from '$lib/stores/routeStore';
	import { toast } from '$lib/components/ui/toast/toastStore.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import Svg from '$lib/components/Svg.svelte';

	export let data;
	export let form;

	let formElement: HTMLFormElement;
	let selectedPayment: 'vipps' | 'faktura' | undefined = undefined;
	let errorMsg = '';

	$: ({ person, ssn } = data);

	$: if (form?.success) {
		toast.push({
			type: 'success',
			title: 'Success',
			desc: form.success
		});
	}

	const handleSubmit = () => {
		errorMsg = '';

		if (!selectedPayment) {
			errorMsg = 'Select payment before submitting!';
			return;
		}

		formElement.submit();
	};
</script>

<NavBar>
	<BackButton to="/" />
</NavBar>

{#if person}
	<div class="grid gap-4 p-4">
		<div class="grid justify-end">
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'default' })}
					>Fille new ticket</Dialog.Trigger
				>
				<form method="POST" action="?/add" bind:this={formElement} on:submit|preventDefault>
					<input type="hidden" name="ssn" value={person.ssn} />
					<input type="hidden" name="route" value={$route} />
					<input type="hidden" name="paymentMethod" value={selectedPayment} />
					<Dialog.Content class="sm:max-w-[425px]">
						<Dialog.Header>
							<Dialog.Title>File new ticket</Dialog.Title>
							<Dialog.Description>Select one of the options two pay the ticket.</Dialog.Description>
						</Dialog.Header>
						<div class="grid gap-4 py-4">
							<button on:click={() => (selectedPayment = 'vipps')} type="button">
								<Card.Root
									class="grid place-items-center py-4 hover:scale-105 focus-visible:scale-105 transition-transform {selectedPayment ===
									'vipps'
										? 'border-vipps'
										: ''}"
								>
									<img src="/vipps_logo.png" alt="Vipps logo" class="max-w-[150px]" />
								</Card.Root>
							</button>
							<button on:click={() => (selectedPayment = 'faktura')} type="button">
								<Card.Root
									class="grid place-items-center py-8 hover:scale-105 focus-visible:scale-105 transition-transform {selectedPayment ===
									'faktura'
										? 'border-primary'
										: ''}"
								>
									<p class="font-bold uppercase text-muted-foreground">Invoice by mail</p>
								</Card.Root>
							</button>
							{#if errorMsg.length > 0}
								<p class="text-sm text-red-400 text-center">{errorMsg}</p>
							{/if}
						</div>
						<Dialog.Footer>
							<Button type="button" on:click={handleSubmit}>Submit</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</form>
			</Dialog.Root>
		</div>
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
								<Table.Head>Method</Table.Head>
								<Table.Head class="text-right">Payed</Table.Head>
								<Table.Head />
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
									<Table.Cell>{ticket.paymentMethod}</Table.Cell>
									<Table.Cell class="text-right">{ticket.payed}</Table.Cell>
									<Table.Cell>
										{#if !ticket.payed}
											<form method="post" action="?/delete">
												<input type="hidden" name="ssn" value={person.ssn} />
												<input type="hidden" name="price" value={ticket.price} />
												<button type="submit"
													><Svg>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															height="1em"
															viewBox="0 0 448 512"
															><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
																d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
															/></svg
														>
													</Svg>
												</button>
											</form>
										{:else}
											<span />
										{/if}
									</Table.Cell>
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
