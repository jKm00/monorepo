<script lang="ts">
	import DatePicker from '$lib/components/date/DatePicker.svelte';
	import { createEventDispatcher } from 'svelte';

	export let fromPlaceholder = 'Selected from date';
	export let toPlaceholder = 'Select to date';
	export let divider = '-';
	export let closeOnSelect = false;
	export let fromDate: Date | null = null;
	export let toDate: Date | null = null;

	const dispatch = createEventDispatcher<{
		selected: { from: Date | null; to: Date | null };
	}>();

	const handleFromSelect = (event: CustomEvent) => {
		fromDate = event.detail;
		dispatchEvent();
	};

	const handleToSelect = (event: CustomEvent) => {
		toDate = event.detail;
		dispatchEvent();
	};

	const dispatchEvent = () => {
		dispatch('selected', {
			from: fromDate,
			to: toDate,
		});
	};
</script>

<div class="flex">
	<DatePicker
		{closeOnSelect}
		placeholder={fromPlaceholder}
		on:selected={handleFromSelect}
		on:cleared={handleFromSelect}
	/>
	<p class="flex items-center p-2"><span>{divider}</span></p>
	<DatePicker
		{closeOnSelect}
		placeholder={toPlaceholder}
		on:selected={handleToSelect}
		on:cleared={handleToSelect}
	/>
</div>
