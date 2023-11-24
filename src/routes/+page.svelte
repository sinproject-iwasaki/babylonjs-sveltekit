<script lang="ts">
	import { BoxesScene } from '$lib/babylon/scene/boxes-scene'
	import { onMount } from 'svelte'

	let canvas: HTMLCanvasElement

	onMount(() => {
		new BoxesScene(canvas).create()
	})
</script>

<svelte:head>
	<title>Babylon.js SvelteKit</title>
</svelte:head>

<canvas bind:this={canvas} />
