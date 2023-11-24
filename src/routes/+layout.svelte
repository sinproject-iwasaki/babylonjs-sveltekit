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

<h1 class="text-3xl font-bold underline">Hello world!</h1>

{version}

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
