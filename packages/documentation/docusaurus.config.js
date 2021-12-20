/* eslint-env node */
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Chord Charts Studio',
	tagline: 'Chord Charts made easy.',
	url: 'https://chord-charts-studio.netlify.app',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'no-chris', // Usually your GitHub org/user name.
	projectName: 'chord-charts-studio', // Usually your repo name.

	plugins: ['docusaurus-plugin-sass'],

	presets: [
		[
			'@docusaurus/preset-classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					editUrl:
						'https://github.com/no-chris/chord-charts-studio/tree/master/packages/documentation',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.scss'),
				},
				gtag: {
					trackingID: 'G-EGKBT2J600',
					anonymizeIP: true,
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'Chord Charts Studio',
				logo: {
					alt: 'Chord Charts Studio',
					src: 'img/icon_whitebg.png',
				},
				items: [
					{
						type: 'doc',
						docId: 'overview',
						position: 'left',
						label: 'User guide',
					},
					{
						position: 'left',
						label: 'Launch the app',
						to: 'https://chord-charts-studio.netlify.app/app',
					},
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Overview',
								to: '/docs/overview',
							},
							{
								label: 'Licenses',
								to: '/docs/licenses',
							},
						],
					},
					{
						title: 'Community',
						items: [
							{
								label: 'Report issues',
								href: 'https://github.com/no-chris/chord-mark/issues',
							},
							{
								label: 'User forum',
								href: 'https://github.com/no-chris/chord-mark/discussions',
							},
						],
					},
					{
						title: 'Related tools',
						items: [
							{
								label: 'ChordSymbol',
								href: 'https://chord-symbol.netlify.app',
							},
							{
								label: 'ChordMark',
								href: 'https://chordmark.netlify.app',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Christophe Noël. Built with Docusaurus.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
