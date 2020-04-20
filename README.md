# No CRA React
[parcel 참고자료](https://velog.io/@yesdoing/%EB%82%B4%EB%A7%98%EB%8C%80%EB%A1%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-A-to-Z-1-9pjwz1o6ai#getting-started)
[mocha](https://mochajs.org/)
[mocha, chai, enz.... 참고자료 - 1](https://rinae.dev/posts/react-testing-tutorial-kr)
[mocha, chai, enz.... 참고자료 - 2](https://www.robinwieruch.de/react-testing-tutorial/)
[baretest](https://github.com/volument/baretest)
[custom hook 테스팅 참고자료 - 1](https://github.com/flexdinesh/testing-hooks)
[custom hook 테스팅 참고자료 - 2](https://dev.to/flexdinesh/react-hooks-test-custom-hooks-with-enzyme-40ib)
[mocha react-hooks](https://rinae.dev/posts/react-testing-tutorial-kr)

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


## 4. Study
### parcel CMD [참고](https://trustyoo86.github.io/parcel/2018/02/19/parcel-command.html)
````
## 3000번 포트로 시작(default: 1234)
parcel -p 3000 ./index.html // parcel --port 3000 ./index.html   

## watch server에서 HotMoudleReplacement를 지원하며 socket의 포트번호 설정(default: random)
parcel --hmr-port 3000 ./index.html

## https 지원
parcel --https ./index.html

## Asset들의 번들링이 끝나고 난 뒤, 자동으로 OS에 설정된 default browser를 연다(open)
parcel ./index.html --open

## no-cache(default는 활성화 상태로 해당옵션을 사용하면, .cache폴더에P 캐싱하지 않도록 설정가능)
parcel ./index.html --no-cache
````
### 내용
- 여러 컴포넌트의 css를 불러온 경우
> 전체 컴포넌트가 적용이 되어 해당 컴포넌트만 부모에 포함시키는 방법을 찾아봐야 함.
> 즉, 불러온 css파일들을 하나의 css로 묶어서 호출됨.
> 우선순위는 마지막에 호출된 스타일이 1순위임(막내 컴포넌트)

- public 이미지 적용
> 이전과 같이 public image는 /로 호출하는게 아니라, 해당 컴포넌트의 상대 Path로 불러와서 import 하도록 하면 됨.

## 5. Test
- [참고](https://rinae.dev/posts/react-testing-tutorial-kr)

### Install
- mocha: 앱에서 모든 테스트를 실행시키는 역할을 맡는 실행기.
- chai: 단언을 작성하기 위해 사용되는 요소("X는 Y와 같아야한다"라고 알려주는 요소가 필요)
> yarn add -D mocha
> yarn add -D chai
> yarn add @babel/register

- jsdom: DOM을 테스트하기 위한 가상의 브라우저 환경을 만들어 주기 위함.
- React컴포넌트를 테스트 할 때, 가상의 브라우저 환경을 만들어주어야 할 필요가있음(컴포넌트들은 실제로 HTML로 그려지면서 브라우저의 DOM이 되니깐.)
- 하지만, 테스트코드는 실제 브라우저에서 실행되지 않기 때문에 컴포넌트를 직접 테스트하기 위한 최소한의 환경을 갖추어야 함.
> yarn add -D jsdom

### Mocha와 Chai테스트 설정 및 리액트 State변경을 단위 테스팅.
1. src폴더와 같은 레벨에 test폴더와 그안에 설정파일을 생성함.
- 커맨드 라인에서 테스트 스크립트를 실행할 때 환경설정하는데 사용되는 것들.
[/]
```
mkdir test 
cd test
touch helper.js dom.js
```
2. test/helper.js파일
[/test/helper.js]
```
import { expect } from 'chai';

global.expect = expect;
```
- 기껏한 것은 expect함수를 Chai에서 가져와서 할당해둔 것.
- 이 함수는 나중에 테스트할 때, "X는 Y와 같아야한다"는 단언을 작성할 때, 사용함.
- 더 나아가 expect함수는 이 파일을 사용하는 모든 테스트 파일의 전역함수로 할당됨.
- 그러면 매번 expect함수를 직접 가져오지 않아도 바로 사용할 수 있게 됨.
- 이외에도 더많은 함수를 테스트용 전역함수로 추가할 것이다.

3. test/dom.js파일
- 가짜 브라우저를 설정해서 리액트 컴포넌트가 HTML로 그려지도록 설정하기.
[/test/dom.js]
```
import { JSDOM } from 'jsdom';

const { window } = new JSDOM(`<!doctype html><html><body></body></html>`);

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === "undefined")
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop)
    }), {});
  Object.defineProperties(target, props);
};

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};

copyProps(window, global);
```
- jsdom 라이브러리가 브라우저에 사용되는 window객체를 만듬
- 또한 document객체도 추가함.
- 이제 헬퍼 파일이 모두 준비되었음.
- 하나는 테스트 파일 전체에서 사용되는 함수를 전역함수로 만드는 파일(helper.js)
- 나머지 하나는 리액트 컴포넌트를 테스트할때 DOM을 흉내내는 설정파일(dom.js)

4. 테스트를 위한 스크립트를 package.json에 작성
[package.json]
```
// 테스트 설정파일을 require문으로 가져오고 *.spec.js라는 형태로 되어있는 파일을 모두 실행.
"script": {
  "test:unit": "mocha --require @babel/register --require ./test/helper.js --require ./test/dom.js 'src/**/*.spec.js'"
}
```
- 기본적으로 테스트 파일이름은 App.spec.js처럼 되어있고 src폴더 아래라면, 어디든지 상관없음.
- 물론 파일이름이나 폴더위치 등의 규칙은 정하기 나름임.
- 테스트 스크립트는 npm run test:unit으로 실행할 수 있지만, 지금은 아무런 파일이 없기때문에 테스트 파일을 찾을 수 없다고 뜸.
[package.json 관찰 모드]
```
"script": {
  "test:unit": "mocha --require @babel/register --require ./test/helper.js --require ./test/dom.js 'src/**/*.spec.js'"
  "test:unit:watch": "npm run test:unit -- --watch"
}
```
- 관찰 모드에서는 테스트가 한 번 실행되고 난 뒤 유지되다가 소스코드나 테스트에 변경이 일어나면 바로 다시 실행됨.
- npm run test:unit:watch로 관찰모드를 실행하면서 개발서버를 작동하려면 터미널 탭을 양쪽에서 두개 띄우도록 함.
5. Mocha와 Chai로 테스트하기 전 ignore-styles 설치
- install
> yarn add -D ignore-styles
- 나중에 개발하면서 React컴포넌트에 CSS스타일을 적용하게 되지만, 테스트에서는 스타일이 필요없으므로 무시하고 싶을때 사용됨.
[package.json]
```
"scripts": {
  ...,
  "test:unit": "mocha --require bable-core/register --require ./test/helper.js --require ./test/dom.js --require ignore-styles 'src/**/*.spec.js'",
  "test:unit:watch": "npm run test:unit -- --watch"
}
```
6. 리액트 State변경을 위한 단위 테스트 진행
- 테스팅 피라미드의 벽돌 하나하나에 해당하는 '단위 테스트'를 만들어 보도록 하자.
- 단위 테스트는 앱의 작은 부분을 독립적으로 테스트 함.
- 보통 입력값을 받아 출력값으로 돌려주는 함수들이 테스트 대상이 됨.
- 이때 순수 함수가 빛을 발함.
- 함수를 실행하면서 생기는 부수효과를 걱정할 필요가 전혀 없으므로 순수 함수를 실행할 때, 입력값이 같다면 출력값은 언제나 동일함.
- 따라서 단위 테스트로 앱의 특정 동작을 확인할 수 있음.
- 이미 Add 컴포넌트의 state안에 동작하는 상태변경 함수들을 작은 함수로 나누어 뺴두었음.
- 그리고 파일에서 내보내두었으니(export), 테스트 파일에서 불러와서 (import) 실행하면 됨.
- Add 컴포넌트 테스트를 위한 Add.spec.js를 만들자. (적절한 접미사로 .sepc .test로 붙임)

7. Add.spect.js작성
8. npm run test:unit 입력
9. 확인하기.
```
// 옵션 -r == --require
yarn mocha -r @babel/register -r ts-node/register -r ./test/helpers.js -r ./test/dom.js ./src/Components/Add/Add.spec.js

// 같은표현
yarn mocha -r @babel/register -r ts-node/register -r ./test/*.js ./src/**/*.spec.*

```
10. 주의점
- babel파일 추가: -r @babel/register
- typescript 컴파일: -r ts-node/register
[package.json]
```
{
  "scripts: " {
    ...,
    "test:unit": "mocha -r @babel/register -r ts-node/register -r ./test/helpers.js -r ./test/dom.js ./src/**/*.spec.*",
    "test:unit:watch": "npm run test:unit -- --watch"
  }
}
```
- yarn test:unit:watch를 통해서, (it)테스트 케이스가 변경될 때마다 확인이 가능.

### 리액트에 Enzyme 테스트 설정
- Enzyme는 손쉽게 리액트 컴포넌트 단위 테스트와 통합테스트를 하기 위한 설정을 해보자.
1. 개발 의존성 Enzyme 설치, Enzyme에 리액트 버전을 맞춘 어댑터 설치
- yarn add -D enzyme
- yarn add enzyme-adapter-react-16

2. test/handler.js파일에 Enzyme설정
```
import { expect } from 'chai';
import { mount, render, shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

global.expect = expect;

global.mount = mount;
global.render = render;
global.shallow = shallow;
```
- global.expect나 global.mount로 작성하는 이유? 
> 함수를 전역으로 만들어서 테스트파일에서 일일이 이 함수들을 불러올 필요가 없어지게 됨. 
> 앞으로 리낵트 컴포넌트 단위 테스트나 통합 테스트할 때, 이 함수들을 사용하게 됨.

### Enzyme으로 리액트 테스트하기 - 리액트 컴포넌트를 단위, 통합 테스트하는 방법
- Enzyme 설정완료 후, 컴포넌트 테스트를 할 수 있는 몇가지 기본 패턴을 살펴보자.

1. Add컴포넌트가 랜더링할때, Add컴포넌트에서 호출한 Counter컴포넌트도 함께 랜더링이 되는지 확인해보자.
[Add.spec.js]
```
import { Add, Counter } from "./Add";
describe("컴포넌트 렌더링 확인", () => {  // 테스트 묶음
  it("Add컴포넌트 안에서 Counter 컴포넌트가 렌더링 됨.", () => {  // 테스트 케이스를 정의
    const wrapper = shallow(<Add />); 
    wrapper.find(<Counter/>).to.have.length(1); // Add컴포넌트 자손으로 Counter 컴포넌트를 갖는지?
  });
});
```
- const wrapper = shallow(<Add/>)는 Add컴포넌트가 가진 컴포넌트들의 숫자임.(최상위 컴포넌트가 <></> 인경우 +1을 해야함)
1-2) 컴포넌트의 갯수확인.
[Test.tsx]
```
<>
  <h1></h1>
  <p></p>
  <div>
    <span></span>
    <span></span>
  </div>
<>
```
[Test.spec.js]
```
import React from "react";
import Test from "./Test";

describe("Test Component", () => {
  it("Test Component에 선언된 컴포넌트의 수", () => {
    const wrapper = shallow(<Test/>);
    expect(wrapper.find("*")).to.have.length(6)
  });
});
```
- 테스트결과: <></>까지 포함하여 총 6개가 맞음.


2. List 컴포넌트 안에 li태그와 list클래스를 갖는지 확인.
```
import { List } from "./List";

describe("List Component" => {  // 테스트 묶음
  it("List Wrapper가 li엘리먼트를 갖는다", () => {  // 테스트 케이스
    const wrapper = shallow(<List />);
    expect(wrapper.find('li')).to.have.length(2); // List가 자손인 li엘리먼트 2개를 갖는지?
    expect(wrapper.find('.li)).to.have.length(1); // List가 자손인 클래스명이 .li인 엘리먼트를 갖는지?
  });
});

```

3. (함수형)컴포넌트의 Props를 확인
[About.spec.js]
```
import React
// (HookWrapper)임의의 함수형 컴포넌트를 만들어 생성. 
const HookWrapper = (props) => {
  const hook = props.hook ? props.hook() : undefined;
  return <div hook={hook}/>
}

// 테스팅 블록생성
describe("Add Component", () => {
  // 테스팅 케이스 1: Add컴포넌트 존재여부 확인.
  it("exist", () => {
    const wrapper = shallow(<HookWrapper hook={() => <Add />}/>);
    expect(wrapper).to.exist;
  });

  it("입력 1.", () => {
    const wrapper = shallow(<HookWrapper hook={() => <Add name="" title="" />}/>);
    const { hook } = wrapper.find('div').props();
    const { name, title } = hook;
    expect(name).to.equal("");  // "" 입력 확인
    expect(title).to.equal(""); // "" 입력 확인
  });

  it("입력 2.", () => {
    const wrapper = shallow(<HookWrapper hook={() => <Add name="kkh" title="project"/>}/>);
    const { hook } = wrapper.find('div').props():
    const { name, title } = hook;
    expect(name).to.equal("kkh");
    expect(title).to.eqaul("project");
  });

});
```

4. Custom Hook 테스팅
[About.spec.js]
```
// custom hook
const useInput = (initValue: string) => {
  const [value, setValue] = useInput<string>(initValue);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { target: { value }} = event;
    setValue(value);
  };
  return {
    value,
    onChange
  };
};

// HookWrapper
const HookWrapper(props){
  const hook = props.hook ? props.hook() | undefined;
  return <div hook={hook}/> 
};

// Testing
describe("Hook state useInput", () => {
  it("useInput - 1", () => {  // 입력값이 '' 인지?
    const wrapper = shallow(<HookWrapper hook={() => useInput("")}/>);
    const { hook } = wrapper.find('div').props();
    const { name } = hook;
    expect(name).to.equal("");
  });
  it("useInput - 2", () => {  // 입력값이 'kkh' 인지?
    const wrapper = shallow(<HookWrapper hook={() => useInput("kkh")}/>)  
    const { hook } = wrapper.find('div').props();
    const { name } = hook;
    expect(name).to.equal("kkh");
  });
});

```

5. 렌더링 시점 컴포넌트의 값 확인하기 (before, after)
```
describe("Testing ...", () => {
	context("Testing Case Group", () => {
		after("", () => {
			console.log("[5] after")
		});
		afterEach("", () => {
			console.log("[4] afterEach")
		});
		beforeEach("", () => {
			console.log("[2] beforeEach");
		});
		it("Testing1", () => {
			console.log("[3] Job");
		});
		it("Testing2", () => {
			console.log("[3-2] Job");
		});
		before("", () => {
			console.log("[1] Before");
		});
	});
});
```
> - 순서: before, beforeEach, it("Testing1"), afterEach, beforeEach, it("Testing2"), afterEach, after
> - before, after: describe에서 맨 시작과 끝에서 동작함. 
> - beforeEach, afterEach: context에서 여러 it가 존재한다면, it가 실행되기 전과 실행된 후에 실행.
> - it: 테스팅의 케이스 유형 작성하는 곳

6. 작업순서
- describe블록: suit단위.
- 1. before:  suite 단위로 초기에 실행됨.
- 2. beforeEach:  it 실행 전(여러개의 it가 존재하는경우, 매번 it실행전에 실행됨)
- 3. it:  테스팅 진행.
- 4. afterEach: it실행 후(여러개의 it가 존재하는경우, 매번 it실행후에 실행됨)
- 5. after: suit단위 마지막에 실행 됨.

7. 정리
- mount vs shallow
> - mount()는 참조하는 컴포넌트의 하위 컴포넌트들까지 전부 포함.
> - shallow()는 참조하는 컴포넌트만 참조하며 하위 컴포넌트는 제외 됨.
```
const MyApp = () => {
	return (
		<div>
			<MyTitle />
			<div className="group hello">
				hello
			</div>
			<div className="group bye">
				bye
			</div>
		</div>
	)
};

const MyTitle = () => <h1 className="group">Testing</h1>

describe("mount(), shallow()", () => {
	it("shallow App", () => {
		const wrapper = shallow(<MyApp />);
    expect(wrapper.find('.group')).to.have.length(2); // success
		expect(wrapper.find('h1')).to.have.length(1); // Failed -> 0
	});
	it("mount App", () => {
		const wrapper = mount(<MyApp />); 
    expect(wrapper.find('.group')).to.have.length(2); // Failed -> 3
		expect(wrapper.find('h1')).to.have.length(1); // success
	});
});
```
> - shallow: App에서 렌더링하는 엘리먼트들 이외에, 다른 컴포넌트를 함께 렌더링한다면, 그 컴포넌트안의 내용은 확인할 수 없음(즉, 순수 App안에서 있는것만 접근 가능)
> - mount: App에서 렌더링하는 엘리먼트들과 다른 컴포넌트들 전부를 확인할 수 있음(즉, App이 포함하는 하위 컴포넌트까지 항목에도 접근 가능)

- 이벤트 테스팅
[Add 컴포넌트의 버튼으로 값이 변경여부 파악]
```
describe("Add Component", () => {
	context("이벤트 - Button Click", () => {

		let addWrapper;
		let header;
		let btns, btnIncrement, btnDecrement;
		before("exist", () => {
			addWrapper = mount(<Add />);
			header = addWrapper.find('h5');
			btns = addWrapper.find('button');
			btnIncrement = btns.first();   // .at(0)
			btnDecrement = btns.last();    // /at(1) 과 같다.
		});

		it("Exist", () => {
			expect(addWrapper).to.exist;
			expect(header).to.exist;
			expect(btns).to.have.length(2);
			expect(btnIncrement).to.exist;
			expect(btnDecrement).to.exist;
		});

		it("Increament", () => {
			expect(header.text()).to.equal("현재 값: 0");  
			// 3증가, result => 3
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			expect(header.text()).to.equal("현재 값: 3");

			// 6증가, result => 9
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			btnIncrement.simulate('click');
			expect(header.text()).to.equal("현재 값: 9");
		});

		it("Decrement", () => {
			// 2 감소, result => 7
			btnDecrement.simulate('click');
			btnDecrement.simulate('click');
			expect(header.text()).to.equal("현재 값: 7");

			// 4 감소, result => 3
			btnDecrement.simulate('click');
			btnDecrement.simulate('click');
			btnDecrement.simulate('click');
			btnDecrement.simulate('click');
			expect(header.text()).to.equal("현재 값: 3");
		});
	});
});
```

8. Test Coverage
- 내 테스트 코드로 내가만든 소스들을 얼마나 커버하고있는지를 확인하는 지표.
- nyc(new york city)사용
- yarn add -D nyc
- touch .nycrc
[.nycrc]
```
{
  "require": [
    "ts-node/register"
  ],
  "include": [
    "src/**/*.spec.js"
  ],
  "extension": [
    ".js",
    ".tsx"
  ],
  "exclude": [
    "**/*.d.ts"
  ],
  "reporter": [
    "text-summary",
    "html"
  ],
  "all": true
}
```
- 명령작성
> - yarn nyc mocha -r @babel/register -r ts-node/register -r 
> - yarn nyc --reporter html mocha -r @babel/register -r ts-node/register -r ./test/*.js ./src/**/*.spec.* -w

9. 비동기 처리 테스팅
[단순한 fetch요청 response데이터 확인]
```
const url = "https://jsonplaceholder.typicode.com/todos/1";

const valid = {
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
};

describe("asynchronized", () => {
	
	it("async test case 1", () => {
		Axios.get(url).then(response => {
			const { data } = response;
			expect(data).to.eql(valid);
			// console.log("DATA: ", data);
		});
	});
});
```
> - 이 방식 외에 sinon 라이브러리를 사용해서 비동기 테스팅하는 방법도 있음.

10. 컴포넌트 스냅샷 테스트
```

```

N. expect() 옵션들
> - .to.exist // 존재하는지
> - .first()  // 첫 번째 자식
> - .last() // 마지막 자식
> - .at(N) // N번쨰 자식(0부터 시작함)
> - .to.have.length(N)  // 갯수가 N개 인경우
> - .simulate('click')  // 이벤트 '클릭' 실행
> - .to.eql(OBJECT) // 해당 object와 일치하는지(객체의 equal 조건)

M. Details
- shallow() vs render() vs mount()
> - shallow는 특정 컴포넌트만 렌더링하며 자손 컴포넌트는 제외.
> - mount함수는 모든 자손 컴포넌트까지 렌더링.
> - 이 두 가지는 비용의 차이가 중점이 될 수 있다.
> - shallow는 단위 테스트나 얕은 수준의 통합 테스트에 적합하며,
> - mount는 진정한 통합 테스트에 적합(통합 테스트는 특정 컴포넌트 계층에 속한 모든 자손과 로직을 가져오기 때문에 꺠지기가 더 쉽다)
> - `따라서 통합 테스트의 유지비용은 단위 테스트보다 높음.`
> - 그렇다면 render와 mount의 차이는?
> - render와 mount는 트정 객체의 하위 컴포넌트까지 전부 그려낸다는 공통점이 있지만, render()는 리액트의 `라이프 사이클` 메서드를 적용하지 않고 컴포넌트를 그려내므로, 자손 컴포넌트에 접근하려면 mount()대신 render()가 더 퍼포먼스측면으로 낫다.
> - 하지만 특정 컴포넌트의 이벤트로 인해 하위 컴포넌트가 변경되거나 혹은 하위 컴포넌트의 특정 이벤트(함수)로 상위 컴포넌트의 변화되는 결과를 확인해보기 위해서 mount()를 사용(.render로는 이벤트 동작 사용 X)

- 얼마나 많은 단위테스트 vs 통합테스트 작성할지 결정할 때에는 두가지 원칙이 존재함
> - 일반적인 테스팅 피라미드 원리에 따라서 1. 가능한 많은 단위테스트를 작성하고, 2. 어느정도의 통합 테스트를(그리고 아주 적은 수의 전체 테스트) 작성하는 것.
> - 즉, `많은 단위 테스트를 작성하고, 중요한 부분에 통합테스트를 적용하라.`는 일반적인 테스팅 생각이다.
> - 하지만, 리액트(혹은 비슷한 라이브러리나 프레임워크에서)의 컴포넌트를 테스트 할 때는 다른원칙이 존재함.
> - `통합 테스트`를 많이하고 `단위 테스트`를 적게 작성하라.
> - 컴포넌트 단위 테스트는 전체 애플리케이션과 비교하면 너무 고립되어있으며, 잘 깨질일도 거의 없음.
> - 그래서 보통 특정부분의 맥락(context)를 완벽히 분리해서 본떠놓고(mock)단위 테스트를 수행함.
> - 많은 사람들이 이 부분에 주제를 놓고 갑론을박함.
> - `컴포넌트가 너무 분리되어있으니깐 테스트의 실효성이 있느냐?`
> - 결과적으로 통합 테스트를 하면서 서로 다른 컴포넌트의 맥락이 잘 맞아 떨어지는지, 견고하게 구성되어 있는지 확인하는 테스트를 많이하게 될 것이다.
> - 전달한 속성이 맞는지, 엘리먼트가 제대로 그려졌는지, 클릭 이벤트를 일으켜 보기도하고 지역상태가 제대로 변화되었는지 확인하게 될 것.

- TDD(Test Driven Development)
> - 테스트 주도개발
> - 정확한 프로그래밍 목적을 디자인 단계에서 반드시 미리 정의해야만 하고 또 무엇을 미리 정의해야만 함.


 ## 6. ESLint [참고](https://flamingotiger.github.io/javascript/eslint-setup/#2-1-eslint-config-airbnb-%EB%A1%9C-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0)
1. Install
> - yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser

- Setting
[.eslintrc]
```
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "plugin:@typescript-eslint/recommended"
  ]
}
```
> - parse에 @typescript-eslint/parser추가.
> - plugins에 @typescript-eslint를 추가.
> - 이후 규칙을 설정 "extends"(권장규칙 recommended 추가)
[package.json]
```
{
  // ...
  "scripts": {
    "lint": "eslint './src/**/*.{js,jsx,ts,tsx}'",
    "lint:fix": "eslint --fix './src/**/*.{js,jsx,ts,tsx}'"
  }
}
```
> - 페키지 안에 스크립트 추가.
> - src파일 내부의 js,jsx,ts,tsx파일을 listening하기.
> - eslint --fix는 자동으로 lint에 맞게 수정됨.
- typescript eslint사용 할 수 있는 최소 구성을 완료함.

2. React eslint 및 Airbnb규칙 설정

- airbnb설정 2가지 방법이 있음(리액트 규칙이 있는지 없는지 차이임)
> - eslint-config-airbnb: React 관련 규칙이 들어있음
> - eslint-config-airbnb-base: React를 제외한 규칙이 들어있음.
- 서버와 같이 React를 사용하지 않는곳에서는 eslint-config-airbnb-base를 설치하는편이 좀더 가볍다고 함.

- React관련 규칙
> - eslint-plugin-import
> - eslint-plugin-react
> - eslint-plugin-react-hooks
> - eslint-plugin-jsx-ally

- eslint-config-airbnb로 설치
> - npm info "eslint-config-airbnb@latest" peerDependencies 입력하면 설치해야 될 시트들이 나옴(각각 설치해주도록 하기)
[npm info "eslint-config-airbnb@latest" peerDependencies]
```
{ eslint: '^5.16.0 || ^6.8.0',
  'eslint-plugin-import': '^2.20.1',
  'eslint-plugin-jsx-a11y': '^6.2.3',
  'eslint-plugin-react': '^7.19.0',
  'eslint-plugin-react-hooks': '^2.5.0 || ^1.7.0' }
```
> - yarn add -D eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
> - yarn add -D eslint-plugin-{import,jsx-a11y,react,react-hooks}

- 자동으로 플러그인 설정
[.eslintrc]
```
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react-hooks"],
  "extends": [
    "airbnb-base",
    "plugin:react/recommended"
    "plugin:jsx-ally/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

3. Prettier eslint 설정
- Prettier 설정을 진행.
- prttier와 EsLint 들여쓰기 설정이 서로 중복될 수 있음.
- 이를 해결하려면 `@typescript-eslint/indent`오류가 표시되지 않도록 지시하기.

- Install
> - yarn add -D prettier eslint-config-prettier eslint-plugin-prettier

- prettier 설정 및 플러그인 설치
> - .prettierrc파일 생성.
[.prettierrc]
```
{
  "singleQuote": true,
  "parser": "typescript",
  "semi": true,
  "useTabs": true,
  "printWidth": 120
}
```
[package.json]
```
{
  // ...,
  "scripts": {
    "prettier": "prettier --write --config ./.prettierrc './src/**.*.{ts,tsx}'"
  }
}
```
[.eslintrc]
```
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "prettier",
    "airbnb",
    "airbnb/hooks",
    "prettier/react",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ]
}
```
- eslint ignore설정
> - lint를 실행할때, 무시하고자 하는 파일 및 폴더를 설정.
[.eslintignore]
```
/node_modules
```
- 실행하기
> - `코드입력 → prettier → eslint → 코드수정` 순으로 실행하기.
> - 1. yarn prettier 실행시 자동으로 코드의 스타일을 변경.
> - 2. yarn lint 를 실행하여 규칙에 맞는지 여부를 검사.
> - 3. eslint실행 후 나오는 오류와 경고를 해결하기.

- eslint 실행 ignore설정
> - eslint를 실행시 다음과 같이 eslint로 수정될 파일을 제외시킴.
> - yarn eslint --write --config ./.prettierrc './src/**/!(*.spec).{ts,tsx}'
> - 이것말고도 eslint를 ignore하는 방법이있음
[.eslintrc]
```
{
  "ignorePatterns": [ "**/*.d.ts", "test/*.js", "src/**/*.spec.*" ]
}
```

- react + typescript + prettier의 eslint설정을 완료.

4. lint-staged사용[참고](https://www.huskyhoochu.com/how-to-use-lint-staged/)
- Install
> - yarn add -D lint-staged
- 설정
[package.json]
```
{
// ...,
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": [  // lint-staged가 찾는 파일의 범위.
      "eslint --fix",
      "git add ."
    ]
  }
}
```
- commit 메시지 작성전에 lint-staged를 작동시키라는 의미임.
- 작동안됨.
- [다른 문서 참고하기](https://jbee.io/web/formatting-code-automatically/)
- husky 설치
> - yarn add husky -D
[package.json]
```
{
  "husky": {
    "hooks": {
      "pre-push": "npm run test:unit",
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {  // 전체 파일이 아니라 git stage에 있는 업데이트된(git add .으로) 파일들만 가져와서 prettier/lint 검사를 실행하므로 시간이 절약됨.
    "src/**/*.{ts,tsx}": [  
      "npm run prettier", // "scripts"에 있는 명령어 실행시키기
      "npm run lint:fix"
    ]
  }
}
```

## Tips
- [CTRL+SHIFT+`]터미널 추가
- [CTRL+,]settings창
- Type확장시키기
```
type People = {
  name: string;
  age: string;
} 
type Student = People & {
  class: string;
  grade: string;
} 
var student: Student = {
  name: "",
  age: "",
  class: "",
  grade: ""
}
```