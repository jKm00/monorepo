<script lang="ts">
	import DatePicker from '$lib/components/date/DatePicker.svelte';
	import DateRange from '$lib/components/date/DateRange.svelte';
</script>

<div class="grid gap-4 w-full max-w-7xl mx-auto py-5">
	<DatePicker
		closeOnSelect={false}
		placeholder="Select date"
		on:selected={(e) => console.log(e.detail)}
	/>
	<DateRange
		closeOnSelect={false}
		fromPlaceholder="Select from date"
		toPlaceholder="Select to date"
		on:selected={(e) => console.log(e.detail)}
	/>
</div>
