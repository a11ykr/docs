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

		// ## 요약 섹션과 그 하위 항목을 찾습니다.
		const regex = /## 요약\n(<\/dl>\n)?([\s\S]*?)(?=(^##|$))/gm;
		mdxContent = mdxContent.replace(regex, (match, dlTag, content) => {
			// 목표, 할 일, 중요성 부분을 찾습니다.
			const targetRegex = /목표\n([\s\S]*?)(?=\n\n|$)/;
			const todoRegex = /할 일\n([\s\S]*?)(?=\n\n|$)/;
			const importanceRegex = /중요성\n([\s\S]*?)(?=\n\n|$)/;

			const targetMatch = content.match(targetRegex);
			const todoMatch = content.match(todoRegex);
			const importanceMatch = content.match(importanceRegex);

			let dlContent = '';
			if (targetMatch || todoMatch || importanceMatch) {
				dlContent += '<dl>\n';
				if (targetMatch) {
					dlContent += `<dt>목표</dt>\n<dd>${targetMatch[1].trim().replace(/\n/g, '<br>')}</dd>\n`;
				}
				if (todoMatch) {
					dlContent += `<dt>할 일</dt>\n<dd>${todoMatch[1].trim().replace(/\n/g, '<br>')}</dd>\n`;
				}
				if (importanceMatch) {
					dlContent += `<dt>중요성</dt>\n<dd>${importanceMatch[1].trim().replace(/\n/g, '<br>')}</dd>\n`;
				}
				dlContent += '</dl>\n';
			}

			return `## 요약\n${dlContent}`;
		});

		fs.writeFileSync(mdxFilePath, mdxContent, 'utf8');
		console.log(`Converted ${mdxFilePath}`);
	} catch (error) {
		console.error(`Error converting ${mdxFilePath}:`, error);
	}
}

function main() {
	const mdxDir = path.join(__dirname, './content/docs/guides/wcag2understanding');

	const files = fs.readdirSync(mdxDir);
	files.forEach(file => {
		if (path.extname(file) === '.mdx') {
			const mdxFilePath = path.join(mdxDir, file);
			convertMdx(mdxFilePath);
		}
	});
}

main();
