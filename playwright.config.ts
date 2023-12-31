import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run dev',
		port: 5173,
		reuseExistingServer: !process.env.CI,
	},
	// webServer: {
	// 	command: 'npm run build && npm run preview',
	// 	port: 4173,
	// },
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,

	reporter: 'html',
	use: {
		video: 'retain-on-failure',
	},
}

export default config
