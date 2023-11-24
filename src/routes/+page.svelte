<script lang="ts">
	import { Scene } from '$lib/babylon/scene'
	import { onMount } from 'svelte'

	let canvas: HTMLCanvasElement

	onMount(() => {
		Scene.create(canvas)
	})
</script>

<svelte:head>
	<title>Babylon.js SvelteKit</title>
</svelte:head>

<canvas bind:this={canvas} />
