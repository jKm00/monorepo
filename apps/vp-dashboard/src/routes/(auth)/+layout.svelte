<script lang="ts">
	import '../../app.css';
</script>

<div class="grid grid-cols-2 min-h-screen">
	<div>
		<img class="h-full object-cover" src="./img/login-bg.jpeg" alt="warehouse" />
	</div>
	<div class="grid place-items-center">
		<slot />
	</div>
</div>
