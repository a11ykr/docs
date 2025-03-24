// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://a11ykr.github.io/',
	base: '/docs/',
	integrations: [
		starlight({
			title: 'A11Y KR Docs',
			logo: {
				src: '/src/assets/a11ykr.png',
				replacesTitle: true,
			},
			defaultLocale: 'root', // optional
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
				// {
				// 	label: '표준 관련 문서 모음',
				// 	items: [
				// 		// Each item here is one entry in the navigation menu.
				// 		{ label: '목록', link: '/guides/' },
				// 		{ label: '웹 콘텐츠 접근성 지침(WCAG) 2.2', link: 'https://a11ykr.github.io/wcag22/' },
				// 	],
				// },
				{ label: '표준 관련 문서 모음', link: '/guides/' },
				{ label: '참고 자료', link: '/reference/' },
				{ label: '접근성 점검 도구', link: '/acts/' },
			],
			components: {
			// Override the default `SocialIcons` component.
			// SocialIcons: './src/components/EmailLink.astro',
			}
		},
	)],
});
