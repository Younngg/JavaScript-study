## React 테스팅

테스팅이 필요한 경우

- 코드가 원하는 대로 동작하는지 알기 위해
- 어떤 상황에서 버그가 발생하는지 알기 위해
- 리팩토링 후, 원래대로 동작하는지 테스트

- 컴포넌트가 늘어날수록, 컴포넌트끼리 서로 영향을 미치는 경우가 많아짐
- 특정 코드가 수정되면, 어떤 컴포넌트에 에러가 발생할 수 있음
- TDD(Test Driven Development) 등의 방법론을 적용하여 생산성을 향상
- 테스트가 늘어나면서 테스트 코드가 구현 코드에 대한 문서화가 됨
- 테스트가 용이하게 코드를 작성하여, 코드 품질과 신뢰성을 높임

테스터블한 코드 작성하기

- 코드가 영향을 미치는 범위를 최대한 줄인다. 사이드 이펙트를 줄임
- 하나의 함수가 너무 많은 일을 하지 않게 함
- 기능들을 작게 분리함

주요 테스팅 용어

- Mocking - 특정 동작을 흉내내는 것
  - ex) 실제 API를 호출하는 게 아니라, 가짜 payload를 반환하는 mocking function을 만듦
- Stubbing - 더미를 채워 넣는 것
  - ex) Child 컴포넌트를 렌더링하지 않고, 대신 그 자리에 <div> 등을 채워 넣음

테스팅의 구성

- setup - 테스트 환경을 만든다. mock data, mock function 등을 준비
- expectation - 원하는 테스트 결과를 만들기 위한 코드를 작성
- assertion - 정말 원하는 결과가 나왔는지 검증

React 화이트박스 테스팅, 블랙박스 테스팅

- 화이트박스 테스팅은 컴포넌트 내부 구조를 미리 안다고 가정하고 테스트코드 작성
- 블랙박스 테스팅은 내부 구조를 모른 채 어떻게 동작하는지에 대한 코드 작성

테스팅 범위에 따른 분류

- Unit 테스팅
  - 다른 부분과 분리된 작은 코드를 만들고 그것을 테스트
  - 작은 코드는 function, module, class 등을 의미
  - 각 부분이 원하는 대로 동작함을 보장하기 위함
  - 테스트는 서로 분리되어야 함
  - ex) 특정 컴포넌트가 데이터에 따라 잘 렌더링 되는지를 테스트하는 경우
- Integration 테스팅
  - 앱의 특정 부분이 동작하는지 테스트
  - ex) 여러 컴포넌트가 한꺼번에 동작하거나, 어떤 페이지의 부분이 잘 동작하는지
  - ex) react-router, redux 등이 특정 컴포넌트와 함께 잘 동작하는지
- end-to-end(e2e) 테스팅
  - 유저가 어떤 시나리오를 가지고 그 시나리오의 end-to-end로 잘 동작하는지 테스트
  - 필요한 경우 웹서버, 데이터베이스 실행
  - 범위가 너무 넓어서 에러가 발생했을 때 특정 기능이 안 된다는 것은 알 수 있지만, 정확히 어떤 부분에 생겼는지 알기 힘듦
  - ex) 유저가 회원가입 후, 로그인하여 유저 정보 페이지를 볼 수 있는지 테스트하는 경우

## jest

- facebook에서 오픈소스화한 테스팅 프레임워크
- assertion 함수들, test runner, mock 라이브러리 등 모두 제공
- create-react-app 에서 기본적으로 사용
- 사용성이 좋고, 가장 인기 있는 프로젝트

핵심 기능들

- assertion matchers
  - 여러 상황에서 match 체크 가능
  - expect()는 expectation object를 리턴한다. 이 object의 메서드를 이용해 여러 매칭 상황을 assert함
- async assertion
  - 비동기 상황의 테스트 처리
  - callback, promise, async/await을 모두 활용할 수 있음
- mock functions
  - mock function을 만듦
  - 모듈 전체, 라이브러리 전체를 mocking 할 수 있음
- testing lifecycle functions
  - 각 테스트의 시작과 끝, 전체 테스트의 시작과 끝에 원하는 작업을 할 수 있음
  - beforeEach, afterEach, beforeAll, afterAll 함수를 활용
  - describe 블록 안에 사용하면 별도의 scope를 가짐
- grouping
  - describe 함수를 이용해 여러 test() 함수를 논리적으로 나눔
  - describe 함수 안에 describe 함수가 중첩될 수 있음
- snapshot testing
  - 특정 함수, 모듈, 컴포넌트 등의 결과를 serializable한 형태의 snapshot으로 저장하고, 추후 변경이 발생했을 때 이전의 snapshot과 새로운 snapshot을 비교하여 변경이 발생했는지 추측
  - jest의 주요 기능으로, 코드의 변경이 컴포넌트의 렌더링 결과에 영향을 미치는지를 파악하기에 적합
  - TDD시에 테스트를 먼저 정의하고 구현하게 되는데, snapshot은 내부로직보다는 결과로 테스팅하기 때문에 tdd에 적합하지 않음

jest 함수의 실행 순서

- beforeAll, beforeEach, afterEach, afterAll의 순서로 Lifecycle 함수들이 실행됨
- 다만, describe 블록 안에 있는 before-_, after-_ 함수는 해당 블록의 범위 안에서 실행됨
- describe 함수는 모든 test() 함수 이전에 실행된다. 따라서 test() 함수들은 순차적으로 한꺼번에 실행됨

## jest 활용

예시 코드

```jsx
const fn = {
  add: (num1, num2) => num1 + num2,
  makeUser: (name, age) => ({ name, age, gender: undefined }),
  throwErr: () => {
    throw new Error('xx');
  },
};

module.exports = fn;
```

toBe()

```jsx
// toBe는 숫자나 문자 등 기본 타입값을 비교할 때 사용
// 객체 내용 비교할 때도 toBe() 사용?
test('1은 1이다.', () => {
  expect(1).toBe(1);
});

test('2 더하기 3은 5', () => {
  expect(fn.add(2, 3)).toBe(5);
});

test('3 더하기 3은 5가 아님', () => {
  expect(fn.add(3, 3)).not.toBe(5);
});
```

toEqual()

```jsx
// 객체나 배열은 재귀적으로 돌면서 값을 확인해야 하기 때문에 toEqual 사용
// 객체 자체를 비교할 때 사용
test('이름과 나이를 전달받아서 객체를 반환', () => {
  expect(fn.makeUser('Mike', 30)).toEqual({
    name: 'Mike',
    age: 30,
  });
});

// gender가 undefined지만 체크를 해주어야 함
// 엄격하게 테스트를 진행하기 위해서는 toStrictEqual 사용
test('이름과 나이를 전달받아서 객체를 반환', () => {
  expect(fn.makeUser('Mike', 30)).toStrictEqual({
    name: 'Mike',
    age: 30,
    gender: undefined,
  });
});
```

toContain()

```jsx
// toContain
// 배열에 특정 요소가 있는지
test('유저리스트에 Mike가 있는지', () => {
  const user = 'Mike';
  const userList = ['Tom', 'Jane', 'Mike'];
  expect(userList).toContain(user);
});
```

toMatch()

```jsx
// 정규 표현식과 toMatch
test('Hello World에 h가 있는지', () => {
  expect('Hello World').toMatch(/H/);
  expect('Hello World').toMatch(/h/i);
});
```

toThrow()

```jsx
// 에러 처리
test('이거 에러 나나요?', () => {
  expect(() => {
    fn.throwErr();
  }).toThrow('xx');
});
```

그 외

```jsx
const fn = require('./fn');

// toBeNull
// toBeUndefined
// toBeDefined
// null, undefined, defined인 경우 통과
test('null은 null입니다.', () => {
  expect(null).toBeNull();
});

// toBeTruthy
// toBeFalsy
// boolean값 판별
test('0은 false입니다.', () => {
  expect(fn.add(1, -1)).toBeFalsy();
});

test('비어있지 않은 문자열은 true입니다.', () => {
  expect(fn.add('hello ', 'world')).toBeTruthy();
});

// toBeGreaterThan 크다
// toBeGreaterThanOrEqual 크거나 같다
// toBeLessThan 작다
// toBeLessThanOrEqual 작거나 같다
// 예) 사용자 아이디 길이 제한, 또는 업로드 파일 크기가 적당한지 판별할 때
test('ID는 10자 이하여야 합니다.', () => {
  const id = 'THE_BLACK';
  expect(id.length).toBeLessThanOrEqual(10);
});

test('비밀번호 4자리', () => {
  const pw = '1234';
  expect(pw.length).toBe(4);
});

// toBe 사용시 소숫점을 정확히 계산하지 못해 테스트 실패
// toBeCloseTo를 사용하여 근사치인지 판별
test('0.1 + 0.2 = 0.3', () => {
  expect(fn.add(0.1, 0.2)).toBeCloseTo(0.3);
});
```

Async assertion

```jsx
function isPythagoreanAsync(a, b, c) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = isPythagorean(a, b, c);
      if (result) return resolve(result);
      reject(new Error('Not pythagorean'));
    }, 500);
  });
}
```

- callback 패턴의 경우, test() 함수가 제공하는 done() 함수를 활용하여 콜백이 끝나고 done()을 호출. 에러가 발생하면 done()의 인자로 에러를 넘김
- Promise 패턴은 async/await을 활용하거나, Promise 리턴

Mock functions

- jest.fn() 을 활용하여 mock function 객체를 만듦
- mockReturnValueOnce() 등으로 리턴하는 값을 임의로 조작. 여러번 호출시 순서대로 세팅된 값 반환
- mockResolvedValue() 로 promise가 resolve하는 값 조작
- jest.mock()으로 특정 모듈 mocking

assertion

- toHaveBeenCalled - 이 함수가 호출되었는지 검증
- toHaveBeenCalledWith(arg1, arg2, …) - 이 함수가 특정 인자와 함께 호출되었는지
- toHaveBeenLastCalledWith(arg1, arg2, …) - 마지막으로 특정 인자와 함께 호출되었는지

Lifecycle functions

```jsx
beforeEach(() => {
  setupMockData();
});

afterEach(() => {
  clearMockData();
});
```

- beforeEach
- afterEach
- beforeAll
- afterAll

Grouping

```jsx
describe('This is group 1', () => {
  test('1은 1이다.', () => {
    expect(1).toBe(1);
  });

  test('2 더하기 3은 5', () => {
    expect(fn.add(2, 3)).toBe(5);
  });

  test('3 더하기 3은 5가 아님', () => {
    expect(fn.add(3, 3)).not.toBe(5);
  });
});
```

- describe()
- test()

Snapshot testing

```jsx
test('Snapshot test form', () => {
  const { container } = render(<MyForm />);
  expect(container.firstChild).toMatchInlineSnapshot();
});

test('Snapshot test form', () => {
  const { container } = render(<MyForm />);
  expect(container.firstChild).toMatchInlineSnapshot();
});
```

- toMatchSnapshot()을 호출하면 기존에 스냅샷이 없었을 경우 .snap 파일을 만듦
- 기존 스냅샷이 있을 경우 새로운 스냅샷과 비교하여 변경 사항이 있으면 테스트 실패
- toMatchInlineSnapshot() 호출시 별도의 스냅샷 파일 만들지 않음
  - 이 경우, 어떻게 스냅샷이 쓰였는지 하나의 파일 안에서 알 수 있음

## react-testing-library

- 테스트가 소프트웨어가 사용되는 모습을 닮을수록, 테스트를 더욱 신뢰할 수 있게 됨
- 특정 메서드나 상태를 테스트하는 게 아니라, 실제 유저가 사용하는 방식대로 테스트하는 접근
- 유저가 페이지에서 어떤 DOM 요소에 접근하는 방법을 흉내냄
- 내부 구현이 바뀌어도 테스트가 깨지지 않음

- 컴포넌트가 렌더링한 결과에 대한 접근만 가능
- 쿼리는 내부 상태, 내부 메서드에 접근할 수 x

쿼리

get

- getBy관련 쿼리
  - 원하는 요소를 찾지 못할 경우나 여러개의 요소를 찾을 경우 에러
- getAllBy 관련 쿼리
  - 여러 요소를 찾아 배열을 반환
  - 원하는 요소를 찾지 못할 경우 에러
- 원소가 반드시 페이지에 존재해야만 하는 경우 활용

find

- findBy
  - 원하는 원소가 없더라도 비동기적으로 기다림
  - 여러 원소를 찾거나, 정해진 timeout 동안 찾지 못하면 에러
- findAllBy
  - 여러 원소를 검색해 배열 반환
  - 정해진 timeout 동안 찾지 못하면 에러
- Promise를 리턴하며, 실패시 reject, 성공시 resolve
- 어떤 유저의 동작 후에 등장하는 원소 등을 테스트 하고자 할 때 활용

query

- queryBy
  - getBy와 비슷하게 원소를 찾아 반환하나, 못찾을 경우 에러를 던지지 않고 null 반환
  - 여러 원소를 찾으면 에러
- queryAllBy
  - getAllBy와 비슷하게 여러 원소를 찾아 배열 반환
  - 하나도 찾지 못하면 에러 대신 빈 배열 반환
- 특정 요소를 찾을 수 없음을 assertion의 기준으로 둘 때 활용

container

- 컴포넌트를 렌더한 결과를 감싸는 원소
- queryselector() 등 selector문법으로 원소 선택 가능

jest-dom

- react testing library는 jest를 확장하여 좀 더 쓰기 편한 assertion을 제공
- toBeInTheDocument(), toHaveValue(), toBeDisabled(), toBeVisible() 등, DOM 테스팅에 특히 유용한 assertion 메서드 제공

## 쿼리의 우선순위

- 유저가 페이지를 이동(사용)하는 방식에 가까울수록 우선순위가 높음
- 접근성 높은 HTML을 작성할수록 테스트가 용이

ByRole

- accessibility tree에 있는 요소들을 기준으로 원소를 찾음
- 유저가 웹페이지를 사용하는 방식을 가장 닮은 쿼리
- 동일한 role을 가진 경우, accessible name을 이용해 원소를 구별
- 임의로 role 혹은 aria-\*을 부여하는 것을 지양함
- 자주 사용되는 Role
  - button, checkbox, listitem, heading, img, form, textbox, link
- 자주 사용되는 accessible name
  - button - 텍스트
  - label - 텍스트
  - a - 텍스트
  - img - alt 텍스트

Text

- 유저가 볼 수 있는 Text 값을 기준으로 찾음
- ByLabelText - label과 연관된 원소를 찾음
- ByPlaceholderText - placeholder와 연관된 원소를 찾음
- ByText - 주어진 text와 연관된 원소를 찾음
- ByDisplayValue - input, textarea, select 등의 value를 기준으로 원소를 찾음

sementic queries

- 유저에게 보이지 않지만 접근성 스펙에 적합한 alt, title을 이용해 원소 검색
- ByAltText - img, area, input 등의 alt 속성으로 원소 검색
- ByTitle - title 속성으로 원소 검색

TestID

- data-testid 속성을 원하는 원소에 지정하고 쿼리를 이용해 찾음
- 유저가 해당 속성을 기반으로 화면 요소를 찾는게 아니므로 우선순위가 낮음
- 다른 쿼리로 테스트 작성할 수 없을 때 백도어로 활용

## 유저이벤트

- 내장 이벤트 함수인 fireEvent, createEvent를 좀더 직관적이고 범용적으로 사용할 수 있도록 만듦
- click, type, keyboard, upload, hover, tab 등 유저가 실제로 웹페이지를 사용하며 만드는 이벤트를 메서드로 제공
