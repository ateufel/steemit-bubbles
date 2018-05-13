const path = require('path'),
	webpack = require('webpack'),
	UglifyJS = require('uglifyjs-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || 'localhost',
	PORT = process.env.PORT || 8080;

module.exports = env => {
	return {
		entry: './src/main.js',
		output: {
			path: path.join(__dirname, 'build'),
			filename: 'main.js'
		},
		//devtool: '#cheap-module-source-map',
		devServer: {
			historyApiFallback: true,
			hot: false,
			stats: 'errors-only',
			host: HOST,
			port: PORT,
			https: true,
			inline: true,
			contentBase: path.join(__dirname, 'build')
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules|build*)/,
					loader: 'babel-loader',
					options: {
						//presets and plugins in .babelrc
					}
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: 'style-loader',
							options: {
								//importLoaders: 1,
								//minimize: true
							}
						},
						{
							loader: 'css-loader',
							options: {
								modules: false
								//importLoaders: 1,
								//minimize: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: function () {
									return [
										require('postcss-cssnext')
									];
								}
							}
						}
					]
				},
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new HtmlWebpackPlugin({
				inject: false,
				template: 'htmlWebpackTemplate.ejs',
				minify: false
			}),
			new UglifyJS({
				uglifyOptions: {
					compress: {
						drop_console: true
					}
				}
			})
		]
	};
};
