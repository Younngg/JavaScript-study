## Node.js가 작업을 처리하는 방법

### libuv

- 파일 읽기, 데이터베이스 접근 같은 작업은 v8엔진으로 할 수 없음. 이러한 부분은 libuv를 통해 작업
- node.js가 v8엔진과 libuv를 바인딩해줌

1. v8이 코드를 해석
2. node.js api 중 하나의 함수를 호출
3. node.js 바인딩을 통해 libuv에 의해 원하는 작업을 처리하게 함

- 이벤트 루프를 기반으로 하는 비동기 I/O에 대한 지원을 제공하는 다중 플랫폼 C 라이브러리
- 파일 시스템, DNS, 네트워크, 파이프, 신호 처리, 폴링 및 스트리밍을 처리하는 메커니즘 제공

### blocking과 non-blocking

**Blocking**

- Node.js 프로세스에서 추가 자바스크립트 실행이 자바스크립트가 아닌 작업이 완료될 때까지 기다려야 하는 경우
- Blocking 작업이 발생하는 동안 이벤트 루프가 자바스크립트를 계속 실행할 수 없기 때문
- ex) JSON.stringify, window.alert

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
console.log(data);
moreWork(); // console.log 이후 실행
```

Node.js 표준 라이브러리의 모든 I/O 메서드는 non-blocking 및 callback 함수를 허용하는 비동기 버전을 제공, 일부 메서드에는 이름이 Sync로 끝나는 차단 상대도 있음

<br/>

**Non-Blocking 메서드 사용**

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // console.log 이전에 실행
```

**Blocking 코드와 Non-Blocking 코드를 함께 쓸 때 발생할 수 있는 문제**

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

파일을 읽는 fs.readFile() 보다 파일을 삭제하는 fs.unlinkSync()가 먼저 실행될 수 있음

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
  fs.unlink('/file.md', (unlinkErr) => {
    if (unlinkErr) throw unlinkErr;
  });
});
```

올바른 작업 순서를 보장하는 fs.readFile()의 콜백 내에서 fs.unlink()에 대한 Non-blocking 호출을 배치
