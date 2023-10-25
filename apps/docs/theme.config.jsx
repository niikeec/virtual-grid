/**
 * @type {import('nextra-theme-docs').DocsThemeConfig}
 */
export default {
	logo: <span style={{ fontWeight: 600 }}>Virtual Grid</span>,
	project: {
		link: 'https://github.com/niikeec/virtual-grid'
	},
	docsRepositoryBase: 'https://github.com/niikeec/virtual-grid/apps/docs',
	useNextSeoProps() {
		return {
			titleTemplate: '%s – Virtual Grid'
		};
	},
	nextThemes: {
		defaultTheme: 'light'
	},
	editLink: {
		component: () => null
	},
	feedback: {
		content: () => null
	},
	footer: { component: () => null },
	primaryHue: 30,
	primarySaturation: 100
};
