const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const mode = 'development';
//'development';
const prod = mode === 'production';

module.exports = {
	mode: mode,
	devtool: 'inline-source-map',
	entry: {
		'build/bundle': ['./src/main.js']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.(svelte)$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
					},
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader'
				]
			},
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			inject: false,
			title: 'My own chain',
			template: path.join(__dirname, 'src', 'index.html'),
			hash: true,
			scriptLoading: 'blocking'
		})
	],
	node: {
		global: true,
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'src'),
		}
	}
};


