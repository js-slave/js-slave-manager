const webpack = require('webpack');

module.exports = {
	entry: './public/src/main.js',
	output: {
		path:		'./public/out',
		filename: 	'js-slave-manager-client.min.js'
	},
	module: {
		loaders: [
			{
				test: 	/\.png$/,
				loader: 'url-loader?limit=8192'
			},
			{
				test: 	/\.hbs$/,
				loader: 'handlebars-loader'
			},
			{
				test: 	/\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test   : /\.(ttf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
				loader : 'file-loader'
			},
			{
				test: 	/\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				exclude: /(node_modules)/
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
	]
};
