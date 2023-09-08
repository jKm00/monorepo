<div class="wrapper">
	<img class="phone" src="/assets/iphone.png" alt="iPhone" />
	<div class="grid">
		{#each Array(20) as _, i}
			<a href="/">
				<img src="/assets/img1.webp" alt="frog" />
				<span>Bilde {i}</span>
			</a>
		{/each}
	</div>
</div>

<style scoped>
	.wrapper {
		position: relative;
		width: 400px;
	}

	img {
		width: full;
	}

	.phone {
		position: absolute;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		row-gap: 14.8px;
		column-gap: 25px;
		position: absolute;
		z-index: 1;
		top: 5.5rem;
		left: 3.2rem;
	}

	.grid img {
		width: 56px;
		border-radius: 10px;
	}
</style>
