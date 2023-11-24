<script>
	import { version } from '$app/environment'
	import { pwaInfo } from 'virtual:pwa-info'
	import '../app.css'

	$: web_manifest_link = pwaInfo ? pwaInfo.webManifest.linkTag : ''

	/* eslint-disable svelte/no-at-html-tags */
</script>

<svelte:head>
	{@html web_manifest_link}
</svelte:head>

<slot />

{version}

<style lang="postcss">
	:global(html) :global(body) {
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

	:global(canvas) {
		width: 100vw;
		height: 100vh;
		touch-action: none;
	}

	:global(canvas):focus {
		outline: none;
	}
</style>
