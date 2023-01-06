## async/await

- Promise를 활용한 비동기 코드를 동기 코드처럼 간결하게 작성하는 문법
- await 키워드는 반드시 async 함수 안에서만 사용해야 한다.
- async로 선언된 함수는 반드시 Promise를 리턴한다

```jsx
async function asyncFunc() {
  let data = await fetchData();
  let user = await fetchUser(data);

  return user;
} // Promise를 리턴
```

- await 키워드는 then 메서드 체인을 연결한 것처럼 순서대로 동작한다.
- 비동기 코드에 쉽게 순서를 부여한다.

### 에러 처리

```jsx
function fetchData() {
  return request()
    .getHeaderNames((response) => response.requestData)
    .catch((error) => {
      // error 발생
    });
}
```

- Promise를 리턴하는 함수의 경우, 에러 발생 시 catch 메서드로 처리한다
- catch 메서드를 사용하지 않는다면 async 함수에서 try-catch 구문으로 처리

```jsx
async function fetchData() {
  try {
    let data1 = await fetchData();
    return fetchData2(data1);
  } catch (e) {
    console.log('실패 : ', e);
  }
}
```

- catch 절의 e는 Promise의 catch 메서드가 받는 반환값과 동일
