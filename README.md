# No CRA React
[참고자료](https://velog.io/@yesdoing/%EB%82%B4%EB%A7%98%EB%8C%80%EB%A1%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-A-to-Z-1-9pjwz1o6ai#getting-started)


필수사항
- Package Manager
- Bundler
- Compiler

개발 편의성 선택사항
- Lint
- Live Dev Server


## 1. CRA없이 React환경 구성 (webpack 사용)

### JOB
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

## 2. CRA없이 React환경 구성 (webpack 사용 + Typescript 적용)

### JOB
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
## 3. CRA없이 React환경 구성 (webpack 사용 X, Parcel 사용)

### Install + Settings
> yarn add parcel-bundler 설치
[package.json]
```
{
  "scripts": {
    "dev": "parcel ./public/index.html",
    "build": "parcel build ./public/index.html"
  }
}
```

### JOB
1. 에셋 트리 구성
> Parcel은 하나의 진입 애셋을 입력으로 받음.
> 진입 애셋은 어느유형이라도 가능(JS, HTML, CSS, 이미지 등)
> 다양한 유형이 Parcel에 정의되어있으며, 각 유형이 어떻게 다루어 주어야 하는지 알 수 있음.
> 애셋이 분석(parse)되면, 애셋의 의존요소가 추출되고, 최종적인 컴파일 형태로 변환됨(이것이 애셋 트리를 만듬)

2. 번들 트리 구성
> 일단 애셋트리가 만들어지면, 애셋은 번들 트리 안에 놓이게 됨.
> 진입 애셋을 위한 번들이 만들어지고, 코드분할을 발생시키는 다이나믹 import()를 위한 하위 번들이 만들어 짐.
> 형제 번들은 다른 유형의 애셋이 임포트 될 때 만들어 짐(예를들어, CSS파일을 Javascript에서 임포트 하는경우, 대응하는 Javascript에 대한 형제번들 안에 위치함) -> css파일을 js파일에서 불러오면, Js파일의 형제 번들안에 CSS가 위치함.
> 만약 하나 이상의 번들에서 애셋이 필요하게 되면, 번들 트리내의 가장 가까운 공통조상 번들로 끌어 올려짐(이로써 중복 포함되는일을 해결함.) -> 예를들어, components/test1.js와 components/test2.js에서 공통적으로 test.css가 필요하다면, test1과 test2의 공통적인 부모 요소에서 어셋파일 test.css을 끌어와서 되는일이 없다.

3. 패키징
> 번들 트리가 만들어지고 나면, 각 번들은 패키저(packager)에 의해 특정 유형의 파일로 작성.
> 브라우저로 로드되는 최종파일 안에서 각 애셋이 어떻게 합쳐져야 하는지 패키저는 알고 있음.

- 정리
> Webpack이나 Gulp와 다르게 별도 설정없어도 빠르게 빌드가 가능함.
> 빌드를 위해 번들러를 학습하는 시간을 줄임.
> 애셋트리 구성(js,html,css파일을 각 유형으로 분리하고 의존요소를 추출) -> 번들 트리 구성(불러오는 asset파일들의 중복을 피하도록 함) ->  패키징(브라우저로 로드되는 최종파일안에서 각 애셋이 합쳐짐)
> 별도의 설정없이 진입파일(Entry File)만 지정하면 바로 빌드
```
parcel index.html
```
> 빠른 번들속도: 멀티코어 컴파일이 가능하며, 재시작을 하더라도 캐시를 이용하여 빠르게 리빌드(Rebuild)를 할 수 있음.
```
첫번째 빌드속도: 4.21초 -> 재시작 후 빌드속도: 0.769초   // 캐시를 이용하여 처음실행보다 훨씬 빠름
```
> Asset(애셋) 기반 번들링
```
1. HTML, CSS, Javscript같은 특정 유형의 애셋을 지원함.
2. 비슷한 유형의 애셋은 같은 번들로 출력하고 다른 유형의 애셋은 자식 번들로 만들어 부모 번들에 참조함.
3. 예를들어서 'main.js'파일에서 Scss파일을 가져오기( import './scss/main.scss' )했다면 다른 번들(.js파일과 .css 파일)로 만들어지고 참조를 남김.
```
> 자동 변환
```
가장 많이 사용하는 Babel, PostCSS(특히 Autoprefixer)같은 트랜스파일러들을 내장하여 지원함.
모듈안에 .babelrc, .postcssrc 같은 설정 파일들을 발견하면, 자동으로 변환함.
```
> HTML(Hot Module Replacement): 런타임 중 페이지를 새로고침 하지않고도 모듈을 자동 업데이트하는 HMR(Hot Module Replacement)이 내장되어 있으며, 자동업데이트가 실패하면, 새로고침함.
> 설정없이 코드 분할(Spliting)
```
// Dynamic import -> 함수 import()를 사용하면 코드를 분할(Spliting)하여 빌드함.
// 이는 require(), import와 비슷하게 사용하며, Promise를 반환함.
// 즉, 모듈을 비동기로 로드할 수 있음.

// msg.js
export const msg = {
  hello: 'Hello Parcel Dynamic import!!!'
};

// main.js
import ('./msg')
  .then(function (module) {
    console.log(module.msg.hello);
  }); // 'Hello Parcel Dynamic import!!'

// 위와같이 함수를 사용하면 파일이 분할됨.
// main.js의 번들과 msg.js의 번들
```