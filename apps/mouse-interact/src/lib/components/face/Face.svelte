<script lang="ts">
	import EyeWrapper from './EyeWrapper.svelte';
</script>

<div>
	<EyeWrapper />
	<!-- Mouth -->
	<div class="mouth | border-foreground aspect-square w-full rounded-full border-2"></div>
</div>

<style scoped>
	.mouth {
		margin-top: -5rem;
		clip-path: polygon(0 80%, 100% 80%, 100% 100%, 0 100%);
	}
</style>
