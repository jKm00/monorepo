<script>
	import { theme } from '$lib/stores/themeStore';
</script>

<span class={$theme === 'dark' ? 'fill-primary' : ''}><slot /></span>
