[참고자료](https://velog.io/@yesdoing/%EB%82%B4%EB%A7%98%EB%8C%80%EB%A1%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-A-to-Z-1-9pjwz1o6ai#getting-started)


필수사항
- Package Manager
- Bundler
- Compiler

개발 편의성 선택사항
- Lint
- Live Dev Server


# 1. CRA없이 React환경 구성 (webpack 사용)

## JOB
1. mkdir src public
2. yarn init
3. yarn add -D webpack webpack-cli
4. package.json에서 scripts작성
```
"scripts" : {
  "build" : "webpack --mode production"
}
```
5. Webpack구성 - webpack.config.js파일 생성 후 추가작업설정
[webpack.config.js]
```
const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "build")
  },
  resolve: {
    extensions: [ "*", ".js", ".jsx" ]
  }
}
```
- entry: 파일들을 묶기위해 Webpack이 바라보는 파일 시작점.
- output: bundle된 파일의 결과물을 위한 설정.
- mode: production or development.
- resolve: import될 수 있는 파일 확장자 명.

6 Webpack이 동작될때 HTML과 CSS파일들을 인식하기위해 추가적인 설정을 할 것.
- HTML설정: yarn add -D html-webpack-plugin clean-webpack-plugin
- CSS 설정: yarn add -D mini-css-extract-plugin css-loader sass-loader file-loader

7. webpack.config.js파일 설정을 추가하기.
[webpack.config.js]
```
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-react-start-kit',
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}
```
- HTML 작업내용
html-webpack-plugin: Webpack이 실행될 때, public파일에 설정한 html파일을 기준으로 결과물을 만들어 줌.
clean-webpack-plugin: Webpack이 실행될 때 이전에 나온 결과물을 제거함(최신 결과물 만을 유지하기 위해서)

- CSS
Sass-loader, css-loader: Webpack을 실행할 떄, CSS와 Sass파일을 적용해 주는 패키지.
mini-css-extract-plugin: css 결과물을 여러개의 chunk파일로 분리시켜주는 라이브러리.

8. ./public/index.html 생성

9. Compiler - Babel
React Component들은 Javascript ES6+ 문법과 JSX문법으로 작성됨.
이 코드를 그대로 쓰는 경우 지원하지 않는 브라우저에서는 코드가 동작하지 않으므로 Babel을 사용하여 Transpiling을 해주어야 함.

yarn -D @babel/core bable-loader @babel/preset-env @babel/preset-react

설치된 라이브러리들은 아래와 같음.
> @babel/core: babel을 사용하기 위한 코어 라이브러리
> babel-loader: Webpack을 사용할 때, babel을 적용하기 위한 라이브러리
> @babel/preset-env: Javscript ES6 코드를 ES5로 compiling해주는 라이브러리
> @babel/preset-react: JSX코드를 Javascript 코드로 변환시켜주는 라이브러리

10. Babel적용을 위한 설정파일 생성
[.babelrc 파일]
```
{
	"preset": [ "@babel/preset-env", "@babel/preset-react" ]
}
```

11. Babel과 Webpack연동
React 프로젝트를 위한 필수항목을 다 설치됨.
마지막으로 Babel과 Webpack을 연동해 보도록 하기.
우선 Webpack설정파일 webpack.config.js파일을 만들고 다음과 같이 설정파일을 입력하기.
[Webpack.config.js]
```
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```
이제 필요한 도구를 모두 설정함.

12. Creating React Components 
이제 React 라이브러리를 설치하고 컴포넌트를 만들어보기.
yarn add react react-dom
[src/index.js]
```
import React from 'react';
import ReactDOM from 'react-dom';

React.render(<>Hell world</>, document.getElementById('root'));
```
13. 선택사항 - live Dev Server
실시간 개발 서버를 적용해보도록 하기.
yarn add -D webpack-dev-server
[webpack.config.js]
```
module.exports = {
  ...,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    noInfo: true,
    open: true,
    port: 9000,
    after: function(app, server) {
      app.listen(3000, function() {
        console.log("Webpack dev server is listening on port 9000);
      })
    },
    plugins: [
      ...,
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}
```
- webpack-dev-server 라이브러리는 express 기반의 개발 서버로 코딩의 변경사항을 실시간으로 적용해서 보여주는 역할을 함.
- package.json에 아래 명령어를 추가하여 바로 실행해보기.
[package.json]
```
"scripts" : {
  ...,
  "start": "webpack-dev-server"
}
```
14 결과
- npm run start 명령어를 통해 브라우저가 켜지면서 실행결과를 보기.
- index.js파일 변경해보기.

15. Bug
- yarn add -D node-sass를 설치해야 스타일 적용이 완료됨.

# 2. CRA없이 React환경 구성 (webpack 사용 + Typescript 적용)

## JOB
1. Typescript 설치
- 설치
> yarn add -D @types/react @types/react-dom typescript

2. babel 추가 설치 및 설정
- 설치
> yarn add -D @babel/preset-typescript

- .babelrc파일수정
[.babelrc]
```
{
    "presets": [ "@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript" ]
}
```
3. webpack.config.js설정 변경
[webpack.config.js]
```
...
{
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  relsolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] 
  }
}
```
# 3. CRA없이 React환경 구성 (webpack 사용 X, Parcel 사용)