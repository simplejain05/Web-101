const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './resources/js/controllers/index.js',
    output: {
        path: Path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                filename: 'index.html',
                template: './index.html'
            }
        ),
        new CopyWebpackPlugin([
			{
				from: './resources', to: './resources'
			}
        ])
    ]
};
