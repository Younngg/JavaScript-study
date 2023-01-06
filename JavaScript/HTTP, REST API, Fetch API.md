## HTTP(Hypertext Transfer Protocol)

- Web에서 서버와 클라이언트 간의 통신하는 방법을 정한 것
- **클라이언트**는 웹 브라우저 등 서버로 요청을 보내는 대상
- **서버**는 요청을 받기 전엔 대응하지 않음
- 서버와 클라이언트 사이에는 무수히 많은 요소가 존재
- HTTP는 이런 존재들 사이의 **통신 방법을 규정**
- OSI 7계층에 속하는 통신 방법 중 하나

![](https://velog.velcdn.com/images/younngg1012/post/0f2a099d-078f-4b3e-9b8b-881e475e2e21/image.png)

- Core Network (흔히 쓰는 SK, KT 등이 제공하는 통신망을 통해 라우터들이 존재하고, 그 라우터들이 요청을 redirect하는 네트워크)

### HTTP Message

- 통신 규약에서 정한 메시지의 모양새가 있음
- 서버 주소, 요청 메서드, 상태 코드, target path, 헤더 정보, 바디 정보 등이 포함
- 요청, 응답의 모양이 다름
- HTTP/1.1 메시지는 사람이 읽을 수 있음

### HTTP Header

- HTTP 메시지의 헤더에는 콘텐츠 관련 정보, 인증 관련 정보, 쿠키 정보, 캐시 관련 정보 등 서버와 클라이언트 간 통신 시 필요한 정보를 담는다.
  - 콘텐츠 관련 정보 : Content-Type - File, JSON, form content 등등.. 중 어떤 것인지
  - 인증 관련 정보 : Authorization - 로그인 여부 등등
  - 쿠키 정보 : 인증 관련 정보 중 보안이 취약한 것들이 아닌, 가벼운 정보들을 보냄. 무엇을 검색했는지, 창을 닫았는지 등
  - 캐시 관련 정보 : 웹페이지를 매번 새로 불러오면 서버에 부담이 됨. 그래서 브라우저에서 서버가 애초에 응답을 내릴 때 이 요청을 60초 정도 갖고 있어도 돼~하고 헤더에 정보를 내림
- 클라이언트 요청 시 , 서버 응답 시 모두 헤더에 정보를 담을 수 있다.

### HTTP Status

- HTTP 요청 시, 클라이언트는 요청의 결과에 대한 상태 정보를 얻는다.
- 200, 400, 500 등 숫자 코드와 OK, NOT FOUND 등의 텍스트로 이루어짐
- 코드를 이용해 각 결과에 해당하는 행위를 할 수 있음

### 요청 메서드

- HTTP에서 클라이언트는 서버로 요청을 보낸다.
- GET, POST, PUT, PATCH, DELETE, OPTIONS, CONNECT, TRACE 등 특정 요청에 대한 동작을 정의한다.
- OPTIONS, CONNECT, TRACE는 브라우저에서 자동으로 처리해주는 부분

## REST API (Representational State Transfer API)

- API(Application Programming Interface)는 사용자가 특정 기능을 사용할 수 있도록 제공하는 함수를 의미
- REST API는 HTTP의 요청 메서드에 응하는 **서버 API와 클라이언트 간 통신의 구조가 지켜야 할 좋은 방법**을 명시한 것
- 구체적인 내용으로는 요청 메서드의 의미, URI 설계, 클라이언트의 상태에 대한 동작 등을 정의

### REST API 요청 메서드의 의미

- GET - 리소스 정보를 얻음
- POST - 리소스를 생성
- PUT - 리소스를 생성하거나 업데이트
- DELETE - 리소스를 제거

## Fetch API

```jsx
let result = fetch(serverURL);

result
  .then((response) => {
    if (response.ok) {
      //요청 성공
    }
  })
  .catch((error) => {
    //요청 실패
  });
```

- 기존 XMLHTTPRequest를 대체하는 HTTP 요청 API
  - 가장 큰 차이는 fetch가 promise를 리턴한다는 것
- ES6에 추가된 Promise를 리턴하도록 정의됨
- 네트워크 요청 성공 시, Promise는 Response 객체를 resolve한다.
- 실패시엔 에러를 reject 한다.

### Response

```jsx
fetch(serverURL).then((res) => {
  res.ok;
  res.status;
  res.statusText;
  res.url;
  res.bodyUsed;
});
```

Response객체는 결과에 대한 다양한 정보를 담는데, 그 중 `response.ok`는 HTTP status code가 200-299 사이면 true, 그 외 false이다.

- `response.status`는 HTTP status code를 담는다.
- `response.url`은 요청한 URL 정보를 담는다.

### Header

```jsx
fetch(serverURL).then((res) => {
  for (let [k, v] of res.headers) {
    console.log(k, v);
  }
});
```

`response.headers`로 Response 객체의 헤더 정보 얻을 수 있음

### Body 메서드

```jsx
fetch(serverURL)
  .then((res) => {
    return res.json();
  })
  .then((json) => console.log('body : ', json));
```

- `response.json()`은 얻어온 body 정보를 json으로 만드는 promise를 반환
- promise가 resolve 되면 얻어온 body 정보를 읽는다.
- `response.text()`, `response.blob()`, `response.formData()` 등의 메서드가 있음

### POST 요청

```jsx
fetch(serverURL, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authentication: 'mysecret',
  },
  body: JSON.stringify(formData),
})
  .then((res) => {
    return res.json();
  })
  .then((json) => console.log('POST 요청 결과'), json);
```

- `fetch(url, options)`로, fetch 메서드 옵션을 넣는다

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
모든 이미지의 출처는 (주)엘리스에 있습니다.
