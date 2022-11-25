const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
    output: {
        publicPath:
            argv.mode == "development"
                ? "http://localhost:8082/"
                : "http://cms-canva-editor.s3-website-us-east-1.amazonaws.com/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 8082,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "dts-loader",
                        options: {
                            name: "canvaEditor", // The name configured in ModuleFederationPlugin
                            exposes: {
                                // The exposes configured in ModuleFederationPlugin
                                "./CanvaEditor": "./src/CanvaEditor",
                            },
                            typesOutputDir: ".wp_federation", // Optional, default is '.wp_federation'
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "canvaEditor",
            filename: "remoteEntry.js",
            remotes: {},
            exposes: {
                "./CanvaEditor": "./src/CanvaEditor.tsx",
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
        }),
    ],
});
