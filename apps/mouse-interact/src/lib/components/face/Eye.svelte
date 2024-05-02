<script lang="ts">
	export let size: number;
	export let pupilCoords: { x: number; y: number };
</script>

<div class="eye | relative rounded-full border" style="--size: {size}px">
	<div
		class="pupil | bg-foreground absolute h-2 w-2 rounded-full"
		style="--left: {pupilCoords.x}px; --top: {pupilCoords.y}px"
	></div>
</div>

<style scoped>
	.eye {
		width: var(--size, 2.5rem);
		height: var(--size, 2.5rem);
	}

	.pupil {
		left: calc(50% + var(--left, 0));
		top: calc(50% + var(--top, 50%));
		translate: -50% -50%;
	}
</style>
