# Node.js가 작업을 처리하는 방법

## libuv

- 파일 읽기, 데이터베이스 접근 같은 작업은 v8엔진으로 할 수 없음. 이러한 부분은 libuv를 통해 작업
- node.js가 v8엔진과 libuv를 바인딩해줌

1. v8이 코드를 해석
2. node.js api 중 하나의 함수를 호출
3. node.js 바인딩을 통해 libuv에 의해 원하는 작업을 처리하게 함

- 이벤트 루프를 기반으로 하는 비동기 I/O에 대한 지원을 제공하는 다중 플랫폼 C 라이브러리
- 파일 시스템, DNS, 네트워크, 파이프, 신호 처리, 폴링 및 스트리밍을 처리하는 메커니즘 제공

## blocking과 non-blocking

### Blocking

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

### Non-Blocking 메서드 사용

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // console.log 이전에 실행
```

### Blocking 코드와 Non-Blocking 코드를 함께 쓸 때 발생할 수 있는 문제

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

## 프로세스 및 스레드

**CPU(Central Processing Unit)**

- 컴퓨터의 뇌로써 '사고'를 담당
- 보통 프로세스와 CPU를 같은 의미로 사용(프로세서는 CPU의 부분)

**CPU Core**

- CPU의 두뇌
- 명령을 받고 계산 또는 작업을 수행

**Process**

- 컴퓨터에서 실행중인 프로그램
- 실행파일을 클릭했을 때, 메모리 할당이 이루어지고 프로세스로 동작함
- 서로 완벽히 독립적인 공간을 가짐. 각자가 자기만의 스택과 데이터 영역을 가지고 보호받음
- CPU가 작업마다 시간을 분할해 적절하게 context switching을 해서 동시에 실행되는 것처럼 보이게 하는 **동시성**과 여러 개의 프로세서가 여러 개의 프로세스를 각각 동시에 처리해주는 **병렬성**을 이용해서 처리

![프로세스](https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F477f2f76-82e9-4933-95fa-9f24444ab3e8%2FScreen_Shot_2020-07-15_at_20.05.23.png&blockId=d00e2bb7-7628-48f4-877e-cf7cf89256f3)

Stack : 프로세스 스택에는 메서드/함수 매개변수, 반환 주소 및 지역 변수와 같은 임시 데이터를 포함
Heap : 런타임 동안 프로세스에 동적으로 할당된 메모리
Data : 전역 및 정적 변수를 포함
Text : Program Counter 값과 프로세서 레지스터의 내용이 나타내는 현재 활동이 포함

Heap Overflow : Heap의 영역이 증가하여 Stack 영역을 침범하는 상황
Stack Overflow : Stack의 영역이 증가하여 Heap 영역을 침범하는 상황

프로세스 메모리의 속도는 Stack > Data > Code > Heap 순

**Thread**

- 프로그램 보다 더 작은 실행 단위. 실행 흐름의 최소 단위
- 하나의 프로세스에서 여러개의 스레드가 메모리를 공유하여 작동할 수 있음
- 스택은 따로따로이지만 코드 영역과 데이터 영역은 하나를 공유함
- 스레드 하나가 비정상으로 종료되면 같은 프로세스에 소속된 다른 스레드까지 모두 강제 종료됨

싱글 스레드

- 하나의 프로세스에서 하나의 스레드 실행
- 프로세스 내의 작업을 순차적으로 실행

멀티 스레드

- 하나의 프로세스에서 여러 개의 스레드 실행
- 각각의 스레드가 다른 작업을 할당받아서, 프로세스가 병렬적으로 여러 작업을 동시에 수행할 수 있음
- 각각 Stack만 따로 할당받고 Code, Data, Heap 영역은 공유함

## Node.js가 비동기 작업을 처리하는 방법

- 자바스크립트는 싱글 스레드 언어
- Node.js는 libuv에서 제공하는 event loop를 사용함

![Node.js event loop](https://i.stack.imgur.com/Lbs9z.png)

1. 비동기 작업이 Queue에 하나씩 쌓임
2. 쌓인 작업이 event loop를 통해 libuv에서 제공하는 thread pool이나 OS kernel 등에 할당하여 처리
   - File System은 Thread Pool로, Network는 Operating System Kernel로
3. 처리된 후에는 콜백 함수를 호출
4. 반복 ?

- libuv는 C로 쓰여 있기 때문에 Thread Pool을 가지고 있음
- Node.js 는 I/O 작업을 자신의 메인 스레드가 아닌 다른 스레드(libuv)에 위임함으로써 싱글 스레드로 Non Blocking I/O를 지원.

## Event Loop

- Node.js가 여러 비동기 작업을 관리하기 위한 구현체
- JavaScript는 단일 스레드 언어지만, 가능할 때마다 작업을 시스템 커널로 오프로드하여 node.js가 Non Blocking I/O 작업을 수행할 수 있도록 함
- 비동기 작업을 커널 혹은 쓰레드로 위임하여 처리한 후, 콜백을 Poll queue에 더해줌. 그리고 콜백을 실행

![event loop](https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQrmTM%2FbtrSOybWK5q%2FBARxrLg97k6nwnClW5dB31%2Fimg.png)

- 각 박스는 특정 작업을 수행하기 위한 Phase(단계)를 의미
- 한 페이지에서 다음 페이즈로 넘어가는 것을 틱(Tick)이라고 부름
- 각 페이즈에는 각각의 queue가 존재.
- 싱글 스레드이기 때문에 각 페이즈에 있는 일을 끝내거나 최대 콜백 수가 될 때까지 한 후에 다른 페이즈로 이동

Timer : setTimeout() 및 setInterval()에 의해 예약된 콜백을 실행

- 바로 타이머들의 콜백이 큐에 들어가는 것은 아니며 타이머들은 min heap에 들어가 있게 됨
- 힙에 만료된 타이머가 있는 경우 이벤트 루프는 연결된 콜백을 가져와서 타이머 대기열이 비어있을 때까지 지연의 오름차순으로 실행 시작

Pending Callbacks : TCP 오류 유형과 같은 일부 시스템 작업에 대한 콜백 실행
Idle, Prepare : 내부적으로만 사용. 이 단계에서 이벤트 루프는 아무 작업도 수행하지 않음. idle 상태이며 Poll 단계로 이동할 준비
Poll : 대부분의 I/O 관련 콜백을 실행(close 콜백, 타이머에 의해 예약된 콜백 및 setImmediate()를 제외하고 거의 모두)
Check : 여기에서 setImmediate() 콜백 호출
Close callbacks : socket.on('close',fn) 또는 process.exit()과 같은 종료 이벤트 관련 콜백 실행.
