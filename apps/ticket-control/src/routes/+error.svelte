<script>
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<NavBar />
<div class="flex-grow grid place-content-center text-center">
	<h1 class="font-bold">404 not found</h1>
	<a href="/" class="underline text-muted-foreground">Home page</a>
</div>

<style scoped>
	/* Tailwind class not working for some reasone */
	.underline {
		text-decoration: underline;
	}
</style>
