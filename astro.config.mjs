import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';

export default defineConfig({
	site: 'https://a11ykr.github.io/',
	base: '/docs/',
	integrations: [
		astroExpressiveCode(),
		mdx(),
		starlight({
			title: 'A11Y KR Docs',
			logo: {
				src: '/src/assets/a11ykr.png',
				replacesTitle: true,
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: '한국어',
					lang: 'ko',
				},
			},
			social: {
				github: 'https://a11ykr.github.io',
			},
			sidebar: [
				{ label: '표준 관련 문서 모음', link: '/guides/' },
				{ label: '참고 자료', link: '/reference/' },
				{ label: '접근성 점검 도구', link: '/acts/' },
				{
					label: '용어집',
					autogenerate: { directory: 'glossary' }
				},
			],
		}),
	],
});