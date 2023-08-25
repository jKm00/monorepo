<script lang="ts">
	import DatePicker from '$lib/components/date/DatePicker.svelte';
</script>

<div class="grid justify-center py-5">
	<DatePicker
		closeOnSelect={true}
		placeholder="Select date"
		on:selected={(e) => console.log(e.detail)}
	/>
</div>
