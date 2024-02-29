/* eslint-env node */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	root: 'src',
	publicDir: '../public',
	define: {
		'process.env.NODE_ENV': null,
	},
	build: {
		outDir: '../build',
		emptyOutDir: true,
		lib: {
			entry: [
				resolve(__dirname, 'src/popup/popup.jsx'),
				resolve(__dirname, 'src/importers/chordChartsStudio.js'),
				resolve(__dirname, 'src/importers/ultimateGuitar.js'),
			],
			name: 'ChordChartStudio webextension',
			fileName: (_, entryName) => entryName + '.js',
		},
	},
	plugins: [react()],
});
