import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
import starlightLinksValidator from 'starlight-links-validator';
import starlightFullViewMode from 'starlight-fullview-mode';
import starlightUtils from "@lorenzo_lewis/starlight-utils";


const commonKeywords = "접근성, 한국어, A11YKR, accessibility, Korean, A11Y";

export default defineConfig({
	site: 'https://a11ykr.github.io/',
	base: process.env.NODE_ENV === 'production' ? '/' : '/docs/',
	integrations: [
		astroExpressiveCode(),
		mdx(),
		starlight({
			title: 'Docs',
			logo: {
				src: '/src/assets/a11ykr.png',
				replacesTitle: false,
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: '한국어',
					lang: 'ko',
				},
			},
			plugins: [
				// starlightLinksValidator(),
				// starlightUtils({
				// 	multiSidebar: true
				// }),
				starlightFullViewMode({ leftSidebarEnabled: true, rightSidebarEnabled: true })
			],
			social: {
				github: 'https://a11ykr.github.io',
				discord: 'https://discord.gg/9ZXYJWDjWR',
			},
			components: {
				Head: './src/components/CustomHead.astro',
			},
			customCss: [
				'./src/styles/custom.css'
			],
			sidebar: [
				{ label: '문서 목록', link: '/guides/' },
				{
					label: 'WCAG 2 한국어 번역본',
					collapsed: false,
					items: [
						{ label: '웹 콘텐츠 접근성 지침(WCAG) 2.2', link: '/wcag2/' },
						{
							label: 'WCAG 2 이해',
							collapsed: true,
							items: [
								'wcag2/understanding',
								{
									label: '인식의 용이성',
									collapsed: true,
									items: [
										'wcag2/understanding/text-alternatives',
										'wcag2/understanding/non-text-content',
										'wcag2/understanding/time-based-media',
										'wcag2/understanding/audio-only-and-video-only-prerecorded',
										'wcag2/understanding/captions-prerecorded',
										'wcag2/understanding/audio-description-or-media-alternative-prerecorded',
										'wcag2/understanding/captions-live',
										'wcag2/understanding/audio-description-prerecorded',
										'wcag2/understanding/sign-language-prerecorded',
										'wcag2/understanding/extended-audio-description-prerecorded',
										'wcag2/understanding/media-alternative-prerecorded',
										'wcag2/understanding/audio-only-live',
										'wcag2/understanding/adaptable',
										'wcag2/understanding/info-and-relationships',
										'wcag2/understanding/meaningful-sequence',
										'wcag2/understanding/sensory-characteristics',
										'wcag2/understanding/orientation',
										'wcag2/understanding/identify-input-purpose',
										'wcag2/understanding/identify-purpose',
										'wcag2/understanding/distinguishable',
										'wcag2/understanding/use-of-color',
										'wcag2/understanding/audio-control',
										'wcag2/understanding/contrast-minimum',
										'wcag2/understanding/resize-text',
										'wcag2/understanding/images-of-text',
										'wcag2/understanding/contrast-enhanced',
										'wcag2/understanding/low-or-no-background-audio',
										'wcag2/understanding/visual-presentation',
										'wcag2/understanding/images-of-text-no-exception',
										'wcag2/understanding/reflow',
										'wcag2/understanding/non-text-contrast',
										'wcag2/understanding/text-spacing',
										'wcag2/understanding/content-on-hover-or-focus',
									]
								},
								{
									label: '이해의 용이성',
									collapsed: true,
									items: [
										'wcag2/understanding/keyboard-accessible',
										'wcag2/understanding/keyboard',
										'wcag2/understanding/no-keyboard-trap',
										'wcag2/understanding/keyboard-no-exception',
										'wcag2/understanding/character-key-shortcuts',
										'wcag2/understanding/enough-time',
										'wcag2/understanding/timing-adjustable',
										'wcag2/understanding/pause-stop-hide',
										'wcag2/understanding/no-timing',
										'wcag2/understanding/interruptions',
										'wcag2/understanding/re-authenticating',
										'wcag2/understanding/timeouts',
										'wcag2/understanding/seizures-and-physical-reactions',
										'wcag2/understanding/three-flashes-or-below-threshold',
										'wcag2/understanding/three-flashes',
										'wcag2/understanding/animation-from-interactions',
										'wcag2/understanding/navigable',
										'wcag2/understanding/bypass-blocks',
										'wcag2/understanding/page-titled',
										'wcag2/understanding/focus-order',
										'wcag2/understanding/link-purpose-in-context',
										'wcag2/understanding/multiple-ways',
										'wcag2/understanding/headings-and-labels',
										'wcag2/understanding/focus-visible',
										'wcag2/understanding/location',
										'wcag2/understanding/link-purpose-link-only',
										'wcag2/understanding/section-headings',
										'wcag2/understanding/focus-not-obscured-minimum',
										'wcag2/understanding/focus-not-obscured-enhanced',
										'wcag2/understanding/focus-appearance',
										'wcag2/understanding/input-modalities',
										'wcag2/understanding/pointer-gestures',
										'wcag2/understanding/pointer-cancellation',
										'wcag2/understanding/label-in-name',
										'wcag2/understanding/motion-actuation',
										'wcag2/understanding/target-size-enhanced',
										'wcag2/understanding/concurrent-input-mechanisms',
										'wcag2/understanding/dragging-movements',
										'wcag2/understanding/target-size-minimum',
									]
								},
								{
									label: '운용의 용이성',
									collapsed: true,
									items: [
										'wcag2/understanding/readable',
										'wcag2/understanding/language-of-page',
										'wcag2/understanding/language-of-parts',
										'wcag2/understanding/unusual-words',
										'wcag2/understanding/abbreviations',
										'wcag2/understanding/reading-level',
										'wcag2/understanding/pronunciation',
										'wcag2/understanding/predictable',
										'wcag2/understanding/on-focus',
										'wcag2/understanding/on-input',
										'wcag2/understanding/consistent-navigation',
										'wcag2/understanding/consistent-identification',
										'wcag2/understanding/change-on-request',
										'wcag2/understanding/consistent-help',
										'wcag2/understanding/input-assistance',
										'wcag2/understanding/error-identification',
										'wcag2/understanding/labels-or-instructions',
										'wcag2/understanding/error-suggestion',
										'wcag2/understanding/error-prevention-legal-financial-data',
										'wcag2/understanding/help',
										'wcag2/understanding/error-prevention-all',
										'wcag2/understanding/redundant-entry',
										'wcag2/understanding/accessible-authentication-minimum',
										'wcag2/understanding/accessible-authentication-enhanced',
									]
								},
								{
									label: '견고성',
									collapsed: true,
									items: [
										'wcag2/understanding/compatible',
										'wcag2/understanding/parsing',
										'wcag2/understanding/name-role-value',
										'wcag2/understanding/status-messages',
									]
								},
								{
									label: '기타 문서',
									collapsed: true,
									items: [
										'wcag2/understanding/intro',
										'wcag2/understanding/understanding-techniques',
										'wcag2/understanding/understanding-act-rules',
										'wcag2/understanding/conformance',
										'wcag2/understanding/refer-to-wcag',
										'wcag2/understanding/documenting-accessibility-support',
										'wcag2/understanding/understanding-metadata',
									]
								},
							]
						},
						{
							label: 'WCAG2ICT',
							link: '/wcag2ict/',
							badge: { text: '작업중', variant: 'danger' }
						},
						{
							label: '용어집',
							collapsed: true,
							autogenerate: {
								directory: '/glossary/',
								order: 'asc',
								pathPrefix: '/glossary'
							}
						},
						{
							label: '구버전 모음',
							collapsed: true,
							autogenerate: {
								directory: '/wcag2/old/',
								order: 'asc',
								pathPrefix: '/wcag2/old'
							},
							badge: { text: '참고용', variant: 'caution' }
						},
					]
				},
				{ label: 'KWCAG 2.2', link: 'kwcag22' },
				{ label: '접근성 점검 도구', link: '/acts/' },
				{
					label: '참고 자료',
					collapsed: false,
					autogenerate: {
						directory: '/reference/',
						order: 'asc',
						pathPrefix: '/reference'
					},
				},
			],
		}),
	],
});