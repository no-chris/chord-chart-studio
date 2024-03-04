/* eslint-env node */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	console.log(env.VITE_BASE);
	return {
		root: 'src',
		publicDir: '../public',
		envDir: '../',
		base: env.VITE_BASE,
		build: {
			outDir: '../build',
			emptyOutDir: true,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes('node_modules')) {
							return 'vendor';
						}
					},
				},
			},
		},
		plugins: [
			react(),
			VitePWA({
				registerType: 'autoUpdate',
				injectRegister: 'script',
				manifest: false,
				workbox: {
					clientsClaim: true,
					skipWaiting: true,
					globPatterns: ['**/*.{js,css,html,svg}'],
					runtimeCaching: [
						// based on https://developer.chrome.com/docs/workbox/modules/workbox-recipes
						// and https://stackoverflow.com/questions/52451678/caching-google-fonts-using-workbox
						{
							urlPattern: /^https:\/\/fonts\.googleapis\.com/,
							handler: 'StaleWhileRevalidate',
							options: {
								cacheName: 'google-fonts-stylesheets',
							},
						},
						{
							urlPattern: /^https:\/\/fonts\.gstatic\.com/,
							handler: 'StaleWhileRevalidate',
							options: {
								cacheName: 'google-fonts-webfonts',
								cacheableResponse: {
									statuses: [0, 200],
								},
								expiration: {
									maxAgeSeconds: 60 * 60 * 24 * 365,
									maxEntries: 30,
								},
							},
						},
					],
				},
			}),
		],
	};
});
