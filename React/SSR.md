## Server Side Rendering

### Client Side Rendering

- Ajax 등의 기술, 프레임워크를 활용하여 데이터를 받아 동적 페이지를 만들 수 있게 됨
- 데이터는 XML, JSON 형태로 클라이언트에 전송

**장점**

- 자바스크립트만으로 HTML, CSS를 동적으로 생성하여 페이지를 만들 수 있음
- 컴포넌트 단위로 코드를 나누고 다양한 디자인 패턴을 적용하는 등, 클라이언트 개발 수준을 한 단계 끌어올림
- full page load 없이 라우팅

**단점**

- 자바스크립트 코드가 많으면 앱 로딩이 느려짐
- SEO(Search Engine Optimization)가 좋지 않음
  - 초기 HTML에 정보가 별로 없음

### Server Side Rendering

- 자바스크립트 프레임워크 이전 초기 웹 환경에서는 모든 페이지를 서버에서 빌드
- 서버에서 페이지를 미리 빌드
- 클라이언트는 별도 처리 없이 웹페이지 노출, 웹앱을 CSR처럼 동작하게 함 → hydration
- 컴포넌트 생성에 필요한 API 요청, routing, redux store 생성 등을 처리
- universal rendering이라고도 함

Server Rendering(MPA 라고도 함) : client에서 어떠한 빌드 처리도 없음

CSR : 서버에서 빌드가 없고 client에서 빌드

SSR : 클라이언트, 서버가 나뉘어 둘 다 빌드

## 성능 측정 키 메트릭

### 웹 퍼포먼스

- 웹 페이지가 로드되고 유저와 상호작용하는 모든 것들을 측정
- 열악한 네트워크 환경에서도 사용 가능한 앱을 만드는 등 사용성 개선 가능

### Time To First Byte

- 페이지 요청 후 처음 데이터가 도착하기까지 걸리는 시간
- 요청을 받았을 때 서버에서 처리하는 시간이 오래 걸리거나, 네트워크가 딜레이되는 등의 상황 발생 시 지표가 악화됨

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/34672959-f516-4b66-83b4-2b4b275f2d9d/Untitled.png)

- 브라우저의 요청이 서버까지 가는 시간
- 서버에서 요청을 처리하는 시간
- 서버에서 브라우저까지 응답이 가는 시간

이 세가지를 모두 포함하는 시간이 TTFB

### First Contentful Paint

- 페이지 진입 후부터 브라우저가 어떤 DOM content를 만들 때까지 걸리는 시간
- 페이지 진입 후 FCP까지 평균 3초 이상 걸리면 성능 개선 필요

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/df5a8b00-3577-4a6c-b9c7-c437146ed756/Untitled.png)

- 브라우저에서 HTML, CSS, JS 등을 파싱하는 시간
- 브라우저에서 페이지를 그리는 시간

### Time to Interactive

- 웹페이지 진입 후 유저가 클릭, 스크릭, 인풋 등의 행위를 하기까지 걸리는 시간
- 자바스크립트 로드 후, 이벤트 핸들러 등이 부착되어 입력을 처리할 수 있기까지의 시간

- JS가 처리되어 DOM에 이벤트를 부착하는 시간

## Server Side Rendering 이해

### CSR의 페이지 로드 방식

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d9ea5c76-7821-4872-aac0-a98859aa2be0/Untitled.png)

### SSR의 페이지 로드 방식

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/49f8f090-5097-40c9-8a26-249aac0655db/Untitled.png)

- 서버가 응답을 하면 브라우저가 받자마자 파싱을 할 수 있기 때문에 FCP 시간이 상대적으로 짧음, TTFB는 CSR에 비해 길다
- 보이고 나서 앱을 작동할 수 있기까지 시간이 필요함

- 유저가 빠르게 페이지의 내용을 볼 수 있도록 HTML을 미리 빌드하여 FCP 등의 키 메트릭을 개선함
- 서버 자원을 활용하여, 초기 큰 성능이 필요한 페이지 등을 빌드하는 데 활용

- 장점
  - 미리 페이지를 빌드하면 크롤러에게 많은 정보를 줄 수 있음
  - SEO에 유리
- 단점
  - CSR에 비해 TTFB에 불리함
  - 별도의 서버를 유지하는 비용
  - static rendering 보다 CDN Caching에 불리

## React를 활용한 Server Side Rendering

### React DOM Server

- React DOM Server를 활용하여 특정 react component를 HTML로 빌드
- Node.js 서버에서 JSX를 사용하여 페이지 빌드

renderToString

- react component를 HTML로 변환하는 메서드
- 클라이언트의 페이지 요청시 변환된 HTML string을 전달
- renderToNodeStream은 readable stream을 생성. 브라우저가 받아서 점진적으로 페이지를 그림

```jsx
ReactDOMServer.renderToString(<App />);
```

ReactDOM.hydrate

- renderToString으로 생성한 HTML의 root를 기준으로, 받아온 React code를 통해 markup에 이벤트 핸들러를 등록하는 등 컴포넌트화
- 주의할 점
  - 서버에서 생성한 컴포넌트와 브라우저에서 Hydration을 거친 후의 마크업이 다르면 React runtime은 경고를 보냄 ex) 현재 시간을 보여주는 컴포넌트
  - 경고 발생 시, 어느 부분에서 차이점이 생기는지 반드시 파악해야 함
  - useEffect의 경우 SSR시 서버에서 동작하지 않음. data loading등의 처리를 별도로 해줘야 함

```jsx
// src/client/App.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.hydrateRoot(document.getElementById('root'), <App />);
```

```jsx
// src/index.js
const express = require('express');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const App = require('./client/App').default;

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const html = ReactDOMServer.renderToString(<App />);

  const template = `
  <html>
  <head>
    <title>SSR React App</title>
  </head>
  <body>
    <div id="root">${html}</div>
    <script src="bundle.js"></script>
  </body>
  </html>
  `;

  res.send(template);
});

app.listen(4000, () => {
  console.log('4000번 포트에서 서버 구동...');
});
```

```jsx
// webpack.server.js
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  externals: [nodeExternals()],
};
```

```jsx
// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
};
```
