import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __dirname과 __filename을 대체하기 위한 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function convertMdx(mdxFilePath) {
	try {
		let mdxContent = fs.readFileSync(mdxFilePath, 'utf8');

		// YAML Frontmatter 수정
		const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
		mdxContent = mdxContent.replace(frontmatterRegex, (match, frontmatter) => {
			let newFrontmatter = frontmatter;

			// head content 수정
			newFrontmatter = newFrontmatter.replace(/head:\n\s*- tag: title\n\s*content:\s*(.+)/, (headMatch, headContent) => {
				const titleMatch = headContent.match(/(\d+(?:\.\d+)*)\s+(.+)/);
				if (titleMatch) {
					const number = titleMatch[1];
					const titleText = titleMatch[2];
					const numberParts = number.split('.').length;
					const prefix = numberParts === 2 ? '지침 이해' : '성공 기준 이해';
					return `head:\n    - tag: title\n      content: ${prefix} ${number} ${titleText}`;
				}
				return headMatch;
			});

			// description 수정
			newFrontmatter = newFrontmatter.replace(/description:\s*WCAG 2\.2 이해 (\d+(?:\.\d+)*)\s+(.+)/, (descriptionMatch, number, titleText) => {
				const numberParts = number.split('.').length;
				const prefix = numberParts === 2 ? '지침' : '성공 기준';
				return `description: WCAG 2.2 이해 ${prefix} ${number} ${titleText}`;
			});

			return `---\n${newFrontmatter}\n---`;
		});

		// MDX 내용 수정
		const contentRegex = /(WCAG 2\.2 이해 )?(성공 기준 이해|성공 기준|지침 이해|지침) (\d+(?:\.\d+)*)/g;
		mdxContent = mdxContent.replace(contentRegex, (match, wcagPrefix, prefix, number) => {
			const numberParts = number.split('.').length;
			if (numberParts === 2) {
				if (prefix === '성공 기준 이해') {
					return `${wcagPrefix ? 'WCAG 2.2 이해 지침' : '지침 이해'} ${number}`;
				}
				if (prefix === '성공 기준') {
					return `${wcagPrefix ? 'WCAG 2.2 이해 지침' : '지침'} ${number}`;
				}
			}
			return match;
		});

		fs.writeFileSync(mdxFilePath, mdxContent, 'utf8');
		console.log(`Converted ${mdxFilePath}`);
	} catch (error) {
		console.error(`Error converting ${mdxFilePath}:`, error);
	}
}

function main() {
	const mdxDir = path.join(__dirname, './content/docs/wcag2/understanding');

	const files = fs.readdirSync(mdxDir);
	files.forEach(file => {
		if (path.extname(file) === '.mdx') {
			const mdxFilePath = path.join(mdxDir, file);
			convertMdx(mdxFilePath);
		}
	});
}

main();
