const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { resolve } = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'filters': resolve(
			process.cwd(),
			'src/filters',
			'index.js'
		),
		'styles': resolve(
			process.cwd(),
			'src/styles',
			'bracketed.js'
		),
		"variations": resolve(
			process.cwd(),
			'src/scss',
			'variations.scss'
		)
	}
};