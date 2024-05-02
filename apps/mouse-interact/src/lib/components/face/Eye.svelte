<script lang="ts">
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

  const EYE_SIZE = 60;
  const EYE_RADIUS = EYE_SIZE / 2
  
  let mouseCoords = { x: 0, y: 0 }

  let eye: HTMLDivElement
  let eyeCoords = { x: 0, y: 0 }

  let pupilCoords = { x: 0, y: 0 }

  onMount(() => {
    updatePupilCoords()
  })

  function updatePupilCoords() {
    if (browser && eye) {
      const { left, top } = eye.getBoundingClientRect()
      eyeCoords = { x: left + EYE_RADIUS, y: top + EYE_RADIUS }
    }
  }

  function handleMouseMove(e: MouseEvent) {
    updateMouseCoords(e)
    calculatePupilPosition()
  }

  function updateMouseCoords(e: MouseEvent) {
    mouseCoords = { x: e.clientX - eyeCoords.x, y: eyeCoords.y - e.clientY }
  }

  function calculatePupilPosition() {
    let angle = Math.atan(mouseCoords.y / mouseCoords.x)

    let pupilY: number
    let pupilX: number
    let innerRadius = EYE_RADIUS - 10 // Dont want the pupil to touch the circle
    if (mouseCoords.x >= 0) {
      pupilX = innerRadius * Math.cos(angle)
      pupilY = - innerRadius * Math.sin(angle)
    } else {
      pupilX = - innerRadius * Math.cos(angle)
      pupilY = innerRadius * Math.sin(angle)
    }

    pupilCoords = { x: pupilX, y: pupilY }
  }

</script>

<svelte:window on:mousemove={handleMouseMove} on:resize={updatePupilCoords} />

<div bind:this={eye} class="rounded-full border relative | eye" style="--size: {EYE_SIZE}px">
  <div class="w-2 h-2 bg-foreground rounded-full absolute | pupil" style="--left: {pupilCoords.x}px; --top: {pupilCoords.y}px">

  </div>
</div>

<style scoped>
  .eye {
    width: var(--size, 2.5rem);
    height: var(--size, 2.5rem);
  }

  .pupil {
    left: calc(50% + var(--left, 0));
    top: calc(50% + var(--top, 50%));
    translate: -50% -50%
  }
</style>