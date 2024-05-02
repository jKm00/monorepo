<script lang="ts">
	import { onMount } from 'svelte';
	import Eye from './Eye.svelte';
	import { browser } from '$app/environment';

	const EYE_SIZE = 60;

	let mouseCoords = { x: 0, y: 0 };

	let eyeWrapper: HTMLDivElement;
	let eyeWrapperCoords = { x: 0, y: 0 };

	let pupilCoords = { x: 0, y: 0 };

	onMount(() => {
		updateEyeWrapperCoords();
		calculatePupilPosition();
	});

	function updateEyeWrapperCoords() {
		if (browser && eyeWrapper) {
			const { left, top } = eyeWrapper.getBoundingClientRect();
			const width = eyeWrapper.offsetWidth;
			const height = eyeWrapper.offsetHeight;

			eyeWrapperCoords = { x: left + width / 2, y: top + height / 2 };
		}
	}

	function handleMouseMove(e: MouseEvent) {
		updateMouseCoords(e);
		calculatePupilPosition();
	}

	function updateMouseCoords(e: MouseEvent) {
		mouseCoords = { x: e.clientX - eyeWrapperCoords.x, y: eyeWrapperCoords.y - e.clientY };
	}

	function calculatePupilPosition() {
		const mouseAngle = Math.atan(mouseCoords.y / mouseCoords.x);

		if (!mouseAngle) return;

		const eyeRadius = EYE_SIZE / 2;
		const innerRadius = eyeRadius - 10; // Make sure pupil is not touching the edge of the eye

		let pupilX: number;
		let pupilY: number;
		if (mouseCoords.x >= 0) {
			pupilX = Math.round(innerRadius * Math.cos(mouseAngle));
			pupilY = Math.round(-innerRadius * Math.sin(mouseAngle));
		} else {
			pupilX = Math.round(-innerRadius * Math.cos(mouseAngle));
			pupilY = Math.round(innerRadius * Math.sin(mouseAngle));
		}

		pupilCoords = { x: pupilX, y: pupilY };
	}
</script>

<svelte:window on:mousemove={handleMouseMove} on:resize={updateEyeWrapperCoords} />

<div bind:this={eyeWrapper} class="flex gap-2">
	<Eye size={EYE_SIZE} {pupilCoords} />
	<Eye size={EYE_SIZE} {pupilCoords} />
</div>
