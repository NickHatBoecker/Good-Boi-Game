const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const resolve = file => path.resolve(__dirname, file)

const pathToSrc = 'src'
const pathToPublic = 'public'
const pathToAssets = 'src/assets'
const buildPath = 'dist'

module.exports = () => {
    const nodeEnv = process.env.NODE_ENV
    const isDev = nodeEnv === 'development'

    return {
        mode: isDev ? 'development' : 'production',

        entry: {
            app: `./${pathToSrc}/main.js`,
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-syntax-dynamic-import',
                        ],
                    },
                },

                {
                    test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
                    use: {
                        // prevent hashing in dev mode
                        loader: `url-loader?limit=512&name=[name]${isDev ? '' : '-[hash]'}.[ext]`,
                    },
                },
            ],
        },

        output: {
            path: resolve(buildPath),
            filename: isDev ? '[name].js' : '[name].[chunkhash].js', // Cache busting only in prod mode
        },

        resolve: {
            extensions: ['.js', '.json'],
            alias: {
                '@': resolve(pathToSrc),
            },

            fallback: {
                fs: false,
            },
        },

        devServer: {
            hot: false,
            contentBase: resolve(pathToPublic),
            watchContentBase: true,
            disableHostCheck: isDev,
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(nodeEnv),
            }),
            new ESLintPlugin({
                lintDirtyModulesOnly: true,
            }),
            new HtmlWebpackPlugin({
                inject: 'body',
                scriptLoading: 'blocking',
                minify: false,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: resolve(pathToAssets),
                        to: resolve(`${buildPath}/assets`),
                    },
                ],
            }),
        ],
    }
}
