import globals from 'globals';
import pluginJs from '@eslint/js';


export default [
	{ files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	{ ignores: ['tests/*'] },
	{
		rules: {
			semi: ['error', 'always'],
			indent: ['error', 'tab'],
			quotes: ['error', 'single'],
			'object-curly-spacing': ['error', 'always'],
			'keyword-spacing': ['error', { after: true }],
			'comma-dangle': ['error', 'always-multiline'],
			'no-trailing-spaces': 'error',
			'space-before-blocks': 'error',
			'no-multi-spaces': 'error',
			'eol-last': ['error', 'always'],
			'padding-line-between-statements': [
				'error',
				{
					blankLine: 'always',
					prev: 'multiline-block-like',
					next: '*',
				},
				{
					blankLine: 'always',
					prev: '*',
					next: [
						'block',
						'block-like',
						'cjs-export',
						'class',
						'const',
						'export',
						'import',
						'let',
						'var',
					],
				},
				{
					blankLine: 'always',
					prev: [
						'block',
						'block-like',
						'cjs-export',
						'class',
						'const',
						'export',
						'import',
						'let',
						'var',
					],
					next: '*',
				},
				{
					blankLine: 'any',
					prev: ['const', 'let', 'var'],
					next: ['const', 'let', 'var'],
				},
				{
					blankLine: 'any',
					prev: ['export', 'import'],
					next: ['export', 'import'],
				},
			],
		},
	},
];
