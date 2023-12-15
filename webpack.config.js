const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildPath = './build/';

module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: path.join(__dirname, buildPath),
        filename: '[name].[hash].js',
        publicPath: `/${pkg.repository}/`,
    },
    target: 'web',
    devtool: 'source-map',
    stats: {
        warnings: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                test: /\.(jpe?g|png|gif|svg|tga|gltf|glb|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg|wav)$/i,
                use: 'file-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                test: /\.(vert|frag|glsl|shader|txt)$/i,
                use: 'raw-loader',
                exclude: path.resolve(__dirname, './node_modules/'),
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true, // optional: enable minification
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            lights$: path.resolve(__dirname, 'src/components/lights'),
            objects$: path.resolve(__dirname, 'src/components/objects'),
            scenes$: path.resolve(__dirname, 'src/components/scenes'),
            gameLogic$: path.resolve(__dirname, 'src/components/gameLogic'),
            defines$: path.resolve(__dirname, 'src/components/defines'),
            sprites$: path.resolve(__dirname, 'src/components/sprites'),
            fonts$: path.resolve(__dirname, 'src/components/fonts'),
            audio$: path.resolve(__dirname, 'src/components/audio'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({ title: pkg.title, favicon: 'src/favicon.ico' }),
    ],
};
