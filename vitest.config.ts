import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			exclude: ['src/**/*.spec.{ts,tsx}', 'src/**/*.stories.tsx'],
			include: ['src/**/*.{ts,tsx}'],
			provider: 'v8',
			reporter: ['text', 'lcov', 'json-summary'],
		},
		environment: 'happy-dom',
		include: ['src/**/*.spec.{ts,tsx}'],
		setupFiles: ['./tests/setup/testing-library.ts'],
	},
})
