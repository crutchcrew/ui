import { defineConfig } from 'oxfmt'

export default defineConfig({
	arrowParens: 'always',
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	experimentalOperatorPosition: 'end',
	htmlWhitespaceSensitivity: 'css',
	insertFinalNewline: true,
	jsxSingleQuote: false,
	objectWrap: 'preserve',
	printWidth: 100,
	proseWrap: 'preserve',
	quoteProps: 'as-needed',
	semi: false,
	singleAttributePerLine: false,
	singleQuote: true,
	sortImports: {
		customGroups: [
			{ elementNamePattern: ['react', 'react/**', 'react-*', 'react-*/**'], groupName: 'react' },
			{ elementNamePattern: ['**/components/**', '**/components'], groupName: 'components' },
			{ elementNamePattern: ['**/utils/**', '**/utils'], groupName: 'utils' },
		],
		groups: ['react', 'external', 'components', 'utils', ['parent', 'sibling', 'index']],
	},
	sortPackageJson: true,
	sortTailwindcss: {
		attributes: ['class', 'className'],
		functions: ['cx', 'createVariants'],
	},
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
})
