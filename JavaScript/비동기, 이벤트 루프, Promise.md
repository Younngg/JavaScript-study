# 비동기

## 자바스크립트 제어 흐름

자바스크립트는 다른 멀티스레드 프로그래밍 언어와 다른 방식으로 비동기 동작을 처리함

내부의 비동기 동작을 이해하기 위해서는 이벤트 루프 등의 개념을 알아야 한다!

### 자바스크립트 엔진

- 자바스크립트 엔진은 하나의 메인 스레드로 구성된다.
- 메인 스레드는 코드를 읽어 한 줄씩 실행한다.
- 브라우저 환경에서는 유저 이벤트를 처리하고 화면을 그린다.

### 동기적 제어 흐름

![](https://velog.velcdn.com/images/younngg1012/post/743d5f58-c803-46c9-9303-28a3a489ed2b/image.png)

**현재 실행 중인 코드가 종료되기 전까지 다음 줄의 코드를 실행하지 않는 것**

- 자바스크립트에서는 분기문, 반복문, 함수 호출 등이 동기적으로 실행된다.
- 코드의 흐름과 실제 제어 흐름이 동일하다.
- 싱글 스레드 환경에서 메인 스레드를 긴 시간 점유하면, 프로그램을 멈추게 한다.

```jsx
let a = 10;
console.log('a : ', a);

function foo(num) {
  for (let i = 0; i < 10; ++i) {
    console.log(num);
  }
}

foo('num');

// a : 10
// num * 10
```

### 비동기적 제어 흐름

![](https://velog.velcdn.com/images/younngg1012/post/2c046f13-31c0-4617-94b8-6112f9cf219a/image.png)

**현재 실행 중인 코드가 종료되기 전에 다음 라인의 코드를 실행하는 것**

- 프로미스, 콜백 함수를 호출하는 함수 등
- 코드 흐름과 실제 제어 흐름이 다르다.
- 비동기 작업을 기다리는 동안 메인 스레드는 다른 작업을 처리

```jsx
let a = 10;

setTimeout(function callback() {
  console.log('a: ', a);
}, 3000);

console.log('Finished');

// Finished
// a: 10
```

## 이벤트 루프

자바스크립트 엔진은 비동기 처리를 제공하지 않는다. 대신, 비동기 코드는 정해진 함수를 제공하여 활용할 수 있다. 이 함수들을 API라 한다.

> 비동기 API의 예시) `setTimeout`, `XMLHttpRequest`, `fetch` 등

node.js의 경우 파일 처리 API, 암호화 API 등을 제공한다

```jsx
// 타이머 비동기 처리
setTimeout(() => console.log('타이머 끝'), 1000);
setInterval(() => console.log('인터벌 타이머'), 1000);

// 네트워크 처리
fetch('https://google.com')
  .then(() => console.log('네트워크 요청 성공'))
  .catch(() => console.log('네트워크 요청 실패'));
```

### 비동기 처리 모델

![](https://velog.velcdn.com/images/younngg1012/post/5b59bfd2-ca27-40d5-89f7-12ce79783601/image.png)

비동기 코드가 불러와지고, 브라우저의 경우 Web API 모듈에서 setTimeout의 delay 시간이 만료되면 **Task queue**에 콜백함수를 넣고, 코드가 실행된다. Job queue는 Promise나 애니메이션 프레임 같은 경우에 사용된다.

1. 이벤트 루프가 하는 일은 비동기 코드가 끝났을 때 메인스레드가 Call stack을 비웠다고 가정하면, Task queue에 task가 남아있는지 확인한다.
2. 남아있다면 이벤트 루프를 통해 task를 Call stack으로 넘겨 코드를 실행시킨다.
3. Call stack이 비워지면 또 다시 Task queue를 체크한다.

> 👩🏻‍💻**정리!**

- 비동기 코드를 처리하는 모듈은 자바스크립트 엔진 외부에 있다
- 이벤트 루프, 태스크 큐, 잡 큐 등으로 구성된다.
- API 모듈은 비동기 요청을 처리 후 태스크 큐에 콜백 함수를 넣는다.
- 자바스크립트 엔진은 콜 스택이 비워지면, 태스크 큐의 콜백 함수를 실행한다.

## Promise

- Promise API는 비동기 API 중 하나이다.
- 태스크 큐가 아닌 **잡 큐(Job queue 혹은 microtask queue)**를 사용한다.
- **잡 큐는 태스크 큐보다 우선순위가 높다.**

```jsx
setTimeout(() => {
  console.log('타임아웃1');
}, 0);

Promise.resolve().then(() => console.log('프로미스1'));

setTimeout(() => {
  console.log('타임아웃2');
}, 0);

Promise.resolve().then(() => console.log('프로미스2'));

// 프로미스 1 프로미스 2
// 타임아웃 1 타임아웃 2
```

### Promise

- 비동기 작업을 표현하는 자바스크립트 객체
- 비동기 작업의 진행(`pending`), 성공(`resolved`, `fulfilled`), 실패(`rejected`) 상태를 표현
  - 성공과 실패는 작업이 끝났다는 의미에서 `settled`라고 한다.
- 비동기 처리의 순서를 표현할 수 있음

### Promise 생성자

```jsx
let promise = new Promise((resolve, reject) => {
  if (Math.random() < 0.5) {
    return reject('실패');
  }
  resolve(10);
});
```

- `new Promise(callback)` 으로 생성
- 콜백 함수는 resolve, reject 두 인자를 받는다.
- Promise가 성공했을 땐 resolve 호출, 실패 시엔 reject 호출

```jsx
let promise = new Promise((resolve, reject) => {
  if (Math.random() < 0.5) {
    return reject('실패');
  }
  resolve(10);
});

promise
  .then((data) => console.log('성공 : ', data))
  .catch((e) => console.log('실패 : ', e))
  .finally(() => console.log('promise 종료'));
```

- 성공의 경우, `.then` 메서드가 호출이 되고, 실패는 `.catch` 메서드가 호출된다. 또는 `.then(성공fn, 실패fn)` 으로 작성할 수 있다.
- `finally()` 메서드는 성공/실패 여부와 상관 없이 실행할 콜백함수를 넘긴다.

### Promise 메서드 체인

```jsx
promise
  .then((data) => {
    return fetchUser(data);
  })
  .then((user) => console.log('User : ', user))
  .catch((e) => console.log('실패 : '), e);
```

- then/catch 메서드가 또 다른 promise를 리턴하여, 비동기 코드에 순서를 부여한다.
- 이렇게 동일한 객체에 메서드를 연결할 수 있는 것을 체이닝(chaining)이라 한다.
- **함수를 호출한 주체가 함수를 끝낸 뒤 자기 자신을 리턴**하도록 하여 구현

### Promise.resolve, Promise.reject

```jsx
Promise.resolve(10).then(console.log);

Promise.reject('Error').catch(console.log);
```

- `Promise.resolve`는 성공한 Promise 바로 반환
- `Promise.reject`는 실패한 Promise 바로 반환
- 인위적으로 Promise 메서드 체인을 만들 수 있음
- 비동기 코드로 진행해야 하는 상황 등에서 유용하게 사용 가능

### Promise.all

```jsx
Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log('모두 성공 : ', values);
  })
  .catch((e) => {
    console.log('하나라도 실패 : ', e);
  });
```

- promise의 배열을 받아 모두 성공시 각 Promise의 resolved값을 배열로 반환
- 하나라도 실패할 시, 가장 먼저 실패한 Promise의 실패 이유 반환

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
모든 이미지의 출처는 (주)엘리스에 있습니다.
