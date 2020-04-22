// const path = require("path");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');

// module.exports = {
//   mode: 'development',   // production OR development
//   entry: {  // 파일을 묶기위해서 Webpack이 바라보는 파일 시점
//     main: './src/index.tsx'  
//   },
//   output: {  // bundle된 파일의 결과물을 위한 설정
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'build')
//   },
//   resolve: {  // import될 수 있는 파일 확장자 명
//     extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(sa|sc|c)ss$/,
//         use: [
//           {
//             loader: MiniCssExtractPlugin.loader,
//             options: {
//               hmr: true,
//               reloadAll: true
//             }
//           },
//           // Webpack을 실행할 때, Css와 Sass파일을 적용해주는 패키지.
//           'css-loader',
//           'sass-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpg|svg|gif)/,
//         use: [
//           'file-loader'
//         ]
//       },
//       {
//         test: /\.(js|jsx|ts|tsx)$/,
//         exclude: /node_modules/,
//         use: [
//           'babel-loader'
//         ]
//       }
//     ]
//   },
//   devtool: 'inline-source-map',
//   devServer: {
//     contentBase: './build',
//     noInfo: true,
//     open: true,
//     port: 9000,
//     after: function(app, server) {
//       app.listen(3000, function() {
//         console.log("Webpack dev server is running on port 9000");
//       })
//     }
//   },
//   plugins: [
//     new CleanWebpackPlugin(),  // Webpack이 실행될때, 이전에 나온 결과물을 제거(최신 결과물만을 유지하기 위해)
//     new HtmlWebpackPlugin({   // Webpack이 실행될때, 자동으로 public 파일에 설정한 html파일을 기준으로 결과물을 만들어 줌.
//       title: 'webpack-react-start-kit',
//       template: './public/index.html'
//     }),
//     new MiniCssExtractPlugin({   // css결과물을 여러개의 chunk파일로 분리 시켜주는 라이브러리.
//       filename: '[name].css',
//       chunkFilename: '[id].css'
//     }),
//     new webpack.HotModuleReplacementPlugin() // Webpack live-server 사용.
//   ]
// }