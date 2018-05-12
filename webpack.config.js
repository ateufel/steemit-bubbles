const path = require('path');

module.exports = {
	mode: "production",
	entry: "./src/index",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname, 'src'),
		compress: true,
		historyApiFallback: true,
		https: false, // true for self-signed, object for cert authority
 	},
	module: {
    	rules: [{
			test: /\.js?$/,
			include: [
				path.resolve(__dirname, "src")
			]
			loader: "babel-loader",
			options: {
				presets: ["es2015"]
			}
		}]
	}
};
