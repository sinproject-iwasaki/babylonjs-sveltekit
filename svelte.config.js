import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'
import fs from 'fs'
import { fileURLToPath } from 'url'

const file = fileURLToPath(new URL('package.json', import.meta.url))
const json = await fs.promises.readFile(file, 'utf8')
const pkg = JSON.parse(json)

const base_path = process.env['CI'] ? '/babylonjs-sveltekit' : ''

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			precompress: true,
		}),
		paths: {
			base: base_path,
		},
		version: {
			name: pkg.version,
		},
	},
}

export default config
