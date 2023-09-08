<script lang="ts">
	export let link: string;
</script>

<a href={link} class="bg-sky-700 uppercase py-3 px-6 rounded-sm text-white font-bold"><slot /></a>
