<script lang="ts">
	import { MainScene } from '$lib/babylon/scene/main-scene'
	import { onMount } from 'svelte'

	let canvas: HTMLCanvasElement

	onMount(() => {
		new MainScene(canvas).create()
	})
</script>

<svelte:head>
	<title>Babylon.js SvelteKit</title>
</svelte:head>

<canvas bind:this={canvas} />
