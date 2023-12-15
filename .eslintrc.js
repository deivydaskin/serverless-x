module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: ['plugin:@typescript-eslint/recommended'],
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	settings: {},
	ignorePatterns: ['.eslintrc.js', 'dist', '.jest.config.js'],
	rules: {
		'@typescript-eslint/no-namespace': 'warn',
		'@typescript-eslint/no-explicit-any': 'off',
		'comma-dangle': ['error', 'always-multiline'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'eol-last': ['error', 'always'],
	},
};
