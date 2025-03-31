import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function htmlToMdx(htmlFilePath, mdxFilePath) {
	/** HTML 파일을 읽어 MDX 파일로 변환하여 저장합니다. */
	console.log(`[htmlToMdx] Processing: ${htmlFilePath}`);

	try {
		console.log(`[htmlToMdx] Reading HTML content from: ${htmlFilePath}`);
		const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
		console.log(`[htmlToMdx] HTML content read successfully.`);

		console.log(`[htmlToMdx] Creating JSDOM instance.`);
		const dom = new JSDOM(htmlContent);
		const { window } = dom;
		const { document } = window;
		console.log(`[htmlToMdx] JSDOM instance created.`);

		// Frontmatter 생성
		console.log(`[htmlToMdx] Generating frontmatter.`);
		const title = document.title.trim().replace(/:/g, ''); // 콜론 제거
		const frontmatter = `---\ntitle: ${title}\ndescription: ${title}\n---\n\n`;
		console.log(`[htmlToMdx] Frontmatter generated: ${frontmatter.trim()}`);

		// TurndownService 인스턴스 생성
		console.log(`[htmlToMdx] Creating TurndownService instance.`);
		const turndownService = new TurndownService({
			headingStyle: 'atx',
			hr: '---',
			bulletListMarker: '*',
			codeBlockStyle: 'fenced',
			emDelimiter: '*',
		});
		turndownService.use(gfm);
		// 헤딩 수준 조정
		turndownService.addRule('heading', {
			filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
			replacement: function (content, node) {
				const level = Math.min(parseInt(node.tagName.charAt(1)) + 1, 6); // 최대 h6까지만
				const prefix = '#'.repeat(level);
				return `\n${prefix} ${content}\n\n`;
			},
		});
		console.log(`[htmlToMdx] TurndownService instance created.`);

		// 본문 추출 (main 태그 내부)
		console.log(`[htmlToMdx] Extracting main content.`);
		const mainContent = document.querySelector('main#main');
		let bodyContent;
		if (mainContent) {
			bodyContent = mainContent.innerHTML;
			console.log(`[htmlToMdx] Main content found.`);
		} else {
			bodyContent = document.body.innerHTML;
			console.log(`[htmlToMdx] Main content not found, using body content.`);
		}
		console.log(`[htmlToMdx] Main content extracted.`);

		// HTML을 Markdown으로 변환
		console.log(`[htmlToMdx] Converting HTML to Markdown.`);
		let markdown = turndownService.turndown(bodyContent);
		console.log(`[htmlToMdx] HTML converted to Markdown.`);

		// Aside 컴포넌트 처리
		console.log(`[htmlToMdx] Processing Aside components.`);
		markdown = markdown.replace(/<aside title="([^"]+)">([\s\S]*?)<\/aside>/g, (match, title, content) => {
			return `<Aside title="${title}">${content}</Aside>`;
		});
		// 성공 기준 Aside 컴포넌트 처리 (완벽 수정)
		markdown = markdown.replace(/성공 기준 \(SC\)([\s\S]*?)(?=(^|$))/gm, (match, content) => {
			return `<Aside title="성공 기준 (SC)">${content}</Aside>`;
		});
		// 요약 섹션 처리 (완벽 수정)
		markdown = markdown.replace(/### 요약([\s\S]*?)(?=(^|$))/gm, (match, content) => {
			// dl, dt, dd 태그 처리
			content = content.replace(/<dl>([\s\S]*?)<\/dl>/g, (match, dlContent) => {
				return dlContent.replace(/<dt>([\s\S]*?)<\/dt>/g, (match, dtContent) => {
					return `\n**${dtContent}**\n`;
				}).replace(/<dd>([\s\S]*?)<\/dd>/g, (match, ddContent) => {
					return `${ddContent}\n`;
				});
			});
			return `## 요약\n${content}`;
		});
		console.log(`[htmlToMdx] Aside components processed.`);

		// Starlight 컴포넌트 import
		console.log(`[htmlToMdx] Adding Starlight component import.`);
		let mdxContent = "import { Aside, Badge, Card } from '@astrojs/starlight/components';\n\n";
		console.log(`[htmlToMdx] Starlight component import added.`);

		// MDX 파일 저장
		console.log(`[htmlToMdx] Writing MDX content to: ${mdxFilePath}`);
		fs.writeFileSync(mdxFilePath, frontmatter + mdxContent + markdown, 'utf-8');
		console.log(`[htmlToMdx] MDX content written successfully.`);
	} catch (error) {
		console.error(`[htmlToMdx] Error processing ${htmlFilePath}:`, error);
	}
	console.log(`[htmlToMdx] Finished processing: ${htmlFilePath}`);
}

function main() {
	console.log('[main] Starting main function.');
	const htmlDir = path.join(__dirname, './understanding'); // 수정
	const mdxDir = path.join(__dirname, './content/docs/guides/wcag2understanding'); // 수정

	console.log(`[main] HTML directory: ${htmlDir}`);
	console.log(`[main] MDX directory: ${mdxDir}`);

	if (!fs.existsSync(mdxDir)) {
		console.log(`[main] MDX directory does not exist. Creating: ${mdxDir}`);
		fs.mkdirSync(mdxDir, { recursive: true });
		console.log(`[main] MDX directory created.`);
	} else {
		console.log(`[main] MDX directory exists.`);
	}

	console.log(`[main] Reading files from HTML directory: ${htmlDir}`);
	const files = fs.readdirSync(htmlDir);
	console.log(`[main] Files found in HTML directory:`, files);

	files.forEach((filename) => {
		console.log(`[main] Processing file: ${filename}`);
		if (filename.endsWith('.html')) {
			console.log(`[main] Found HTML file: ${filename}`);
			const htmlFilePath = path.join(htmlDir, filename);
			const mdxFilename = filename.slice(0, -5) + '.mdx';
			const mdxFilePath = path.join(mdxDir, mdxFilename);
			console.log(`[main] HTML file path: ${htmlFilePath}`);
			console.log(`[main] MDX file path: ${mdxFilePath}`);
			htmlToMdx(htmlFilePath, mdxFilePath);
		} else {
			console.log(`[main] Skipping non-HTML file: ${filename}`);
		}
	});
	console.log('[main] Finished main function.');
}

main();
