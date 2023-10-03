<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let src: string;
	export let alt: string;
	export let formaction: string;
</script>

<Button class="flex gap-2" variant="secondary" {formaction}>
	<img class="h-full" {src} {alt} />
	<slot />
</Button>
