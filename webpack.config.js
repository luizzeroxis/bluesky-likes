const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const langs = require('./src/langs.js');

module.exports = {
	mode: 'development', // Yes, this is on purpose.
	entry: './src/script.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'script.js',
	},
	plugins: [
		...langs.map(lang =>
			new HtmlWebpackPlugin({
				filename: lang.filename,
				templateParameters: {
					t: (str) => {
						if (lang.name == "en") return str;
						let trans = lang.strsHTML[str] ?? lang.strsJS[str];
						if (trans == null) throw new Error(`No translation for string ${str} for language ${lang.name}`);
						return trans;
					},
					lang: lang,
				},
				template: "./src/index.ejs",
				inject: false,
			})
		),
		new CopyPlugin({
			patterns: [
				'./src/favicon.png',
				'./src/style.css',
			],
		}),
	],
	devtool: "inline-source-map",
	devServer: {
		hot: false,
		liveReload: false,
	},
};