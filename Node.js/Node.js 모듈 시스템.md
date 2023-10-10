# Node.js 모듈 시스템

## Module

- 필요한 함수들의 집합
- Core Module, Local Module, Third Party Module 이 있음

```js
const module = require('module_name');
```

- require() 함수를 이용하여 자바스크립트 파일을 읽고 그 파일을 실행시켜 객체를 반환
- 변수 또는 상수에 할당하여 사용 가능

**Core Module**(built-in module)

- Node.js에서 기본적으로 제공하는 모듈
- http, url, querystring, path, fs, util

**Local Module**

- 로컬로 생성된 모듈
- 패키지로 만들어 npm을 통해 배포 가능

```js
const log = {
  info: function (info) {
    console.log('Info ' + info);
  },
  warning: function (warning) {
    console.log('Warning ' + warning);
  },
  error: function (error) {
    console.log('Error ' + error);
  },
};

module.exports = log;
```

```js
const myLogModule = require('./log.js');

myLogModule.info('Node.js Started');
// Info Node.js Started
```

**Third Party Module**

- npm을 사용하여 온라인에서 사용할 수 있는 모듈
- 프로젝트 폴더에 설치하거나 전역적으로 설치 가능

## 모듈 사용 이유

1. 코드를 재사용할 수 있음
2. 관계가 있는 코드끼리 모아 코드를 정리할 수 있음
3. 관계 없는 디테일한 부분은 숨기고 직접 사용되는 코드만 가져와 보여줄 수 있음

## exports 방법

```js
module.exports.A = 1;

module.exports.encrypt = function encrypt(data) {
  return 'encrypted data';
};

exports.someFunction = function someFunction() {};

// 권장
// 어떤게 export 되어 있는지 정리되어 있기 때문
function send() {}

module.exports = {
  send,
};

// 이 함수를 default로 exports 한다면
module.exports = function read() {
  return decrypt('data');
};
```

## CommonJS와 ECMAScript 모듈

### CommonJS Module

- module.exports로 내보내고 require로 가져오는 것

### ECMAScript Module

```js
function addTwo(num) {
  return num + 2;
}

export { addTwo };
```

```js
import { addTwo } from './addTwo.mjs';
```

- ES 모듈은 JavaScript의 표준이고 CommonJS는 Node.js의 기본값
- 모든 주요 브라우저는 ES 모듈을 지원, React 및 Vue.js 와 같은 프레임워크에서도 import/export를 사용 가능
- node.js 13.2.0 버전부터 ES module 지원

## 모듈 캐싱

- 모듈에서 다른 모듈을 가져올 때 해당 모듈을 캐싱하게 됨
- 처음 로딩할 때 캐싱됨. 여러번 호출해도 반환되는 모듈은 항상 동일
