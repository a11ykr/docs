// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://a11ykr.github.io/',
	base: process.env.NODE_ENV === 'production' ? '/docs/' : '/',
	integrations: [
		starlight({
			title: 'A11Y KR Docs',
			social: {
				github: 'https://a11ykr.github.io',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
