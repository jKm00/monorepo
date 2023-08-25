<script lang="ts">
	import dayjs, { Dayjs } from 'dayjs';
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	const MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'Septembr',
		'October',
		'November',
		'December',
	];

	const DAYS_OF_WEEK = [
		'Sunday',
		'Monday',
		'Thuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	export let placeholder = 'Not selected';
	export let closeOnSelect = false;

	const dispatch = createEventDispatcher<{ selected: Date }>();

	let showCalendar = true;
	let selectedDate: Date | null = null;
	let displayedDate = selectedDate ? dayjs(selectedDate) : dayjs();

	$: gridDates = calculateGridDates(displayedDate);

	const calculateGridDates = (displayedDate: Dayjs) => {
		let grid: {
			day: number;
			state: 'PREV' | 'CURRENT' | 'NEXT';
		}[] = [];

		const firstDayOfMonth = displayedDate.startOf('month');

		// Append dates from previous month
		const prevMonth = firstDayOfMonth.subtract(1, 'month');
		for (let i = 0; i < firstDayOfMonth.day(); i++) {
			grid = [
				{
					day: prevMonth.daysInMonth() - i,
					state: 'PREV',
				},
				...grid,
			];
		}

		// Append all dates in displayed month
		for (let i = 0; i < firstDayOfMonth.daysInMonth(); i++) {
			grid.push({
				day: i + 1,
				state: 'CURRENT',
			});
		}

		// Append dates from next month
		for (let i = 0; i < grid.length % DAYS_OF_WEEK.length; i++) {
			grid.push({
				day: i + 1,
				state: 'NEXT',
			});
		}

		return grid;
	};

	const toggleCalendar = () => {
		showCalendar = !showCalendar;
	};

	const onPrevMonth = () => {
		displayedDate = displayedDate.subtract(1, 'month');
	};

	const onPrevYear = () => {
		displayedDate = displayedDate.subtract(1, 'year');
	};

	const onNextMonth = () => {
		displayedDate = displayedDate.add(1, 'month');
	};

	const onNextYear = () => {
		displayedDate = displayedDate.add(1, 'year');
	};

	const handleKeyUp = (event: KeyboardEvent) => {
		const key = event.key;

		if (key === 'Escape') {
			showCalendar = false;
		}
	};

	const handleSelect = (day: number) => {
		selectedDate = new Date(displayedDate.year(), displayedDate.month(), day);

		dispatch('selected', selectedDate);

		if (closeOnSelect) {
			showCalendar = false;
		}
	};

	const clearSelected = () => {
		selectedDate = null;

		if (closeOnSelect) {
			showCalendar = false;
		}
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="w-max relative" on:keyup={handleKeyUp}>
	<!-- Input -->
	<button
		on:click={toggleCalendar}
		class="flex items-center justify-between gap-2 w-44 bg-slate-700 rounded-sm overflow-hidden group"
	>
		<span class="px-4 {selectedDate ? '' : 'text-slate-400'}">
			{selectedDate ? dayjs(selectedDate).format('DD.MM.YYYY') : placeholder}
		</span>
		<span
			class="p-4 bg-slate-600 group-hover:bg-slate-500 group-focus-within:bg-slate-500"
		>
			<svg
				class="fill-white"
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 448 512"
				><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"
				/></svg
			>
		</span>
	</button>
	<!-- Calendar -->
	{#if showCalendar}
		<div
			in:scale={{ duration: 250, start: 0.75 }}
			out:fade={{ duration: 100 }}
			class="bg-slate-700 absolute rounded-sm overflow-hidden w-64"
		>
			<!-- Controllers -->
			<div class="grid grid-cols-7 bg-slate-600">
				<button
					on:click={onPrevYear}
					class="flex items-center justify-center p-2 hover:bg-slate-500 focus-within:bg-slate-500 active:bg-slate-400"
					><svg
						class="fill-white"
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 512 512"
						><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"
						/></svg
					></button
				>
				<button
					on:click={onPrevMonth}
					class="flex items-center justify-center p-2 hover:bg-slate-500 focus-within:bg-slate-500 active:bg-slate-400"
					><svg
						class="fill-white"
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 320 512"
						><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
						/></svg
					></button
				>
				<p class="grid col-span-3 text-center py-2">
					<span class="text-xs">{displayedDate.year()}</span>
					<span class="text-cyan-500 font-bold">
						{MONTHS[displayedDate.month()]}
					</span>
				</p>
				<button
					on:click={onNextMonth}
					class="flex items-center justify-center p-2 hover:bg-slate-500 focus-within:bg-slate-500 active:bg-slate-400"
					><svg
						class="fill-white"
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 320 512"
						><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
						/></svg
					></button
				>
				<button
					on:click={onNextYear}
					class="flex items-center justify-center p-2 hover:bg-slate-500 focus-within:bg-slate-500 active:bg-slate-400"
					><svg
						class="fill-white"
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 512 512"
						><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
						/></svg
					></button
				>
			</div>
			<!-- Date selector -->
			<div class="grid grid-cols-7">
				{#each DAYS_OF_WEEK as day}
					<p class="text-xs text-center text-slate-400 py-2">
						{day.substring(0, 3)}
					</p>
				{/each}
				{#each gridDates as date}
					{@const selected =
						displayedDate.year() === dayjs(selectedDate).year() &&
						displayedDate.month() === dayjs(selectedDate).month() &&
						dayjs(selectedDate).date() === date.day}
					{#if date.state === 'PREV'}
						<button
							on:click={onPrevMonth}
							class="p-2 text-slate-400 hover:bg-slate-600 focus-within:bg-slate-600 active:bg-slate-500"
							>{date.day}</button
						>
					{:else if date.state === 'NEXT'}
						<button
							on:click={onNextMonth}
							class="p-2 text-slate-400 hover:bg-slate-600 focus-within:bg-slate-600 active:bg-slate-500"
							>{date.day}</button
						>
					{:else}
						<button
							on:click={() => handleSelect(date.day)}
							class={selected
								? 'bg-cyan-500 p-2 hover:bg-cyan-600 active:bg-cyan-700'
								: 'p-2 hover:bg-slate-600 focus-within:bg-slate-600 active:bg-slate-500'}
							>{date.day}</button
						>
					{/if}
				{/each}
				<button
					on:click={clearSelected}
					class="col-span-full text-sm text-slate-400 p-1 hover:bg-slate-600 focus-within:bg-slate-600 active:bg-slate-500"
					>Clear</button
				>
			</div>
		</div>
	{/if}
</div>
