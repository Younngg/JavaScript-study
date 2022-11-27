const fn = require('./fn');

// Matcher : toBe 부분에서 사용하는 함수
// toBe는 숫자나 문자 등 기본 타입값을 비교할 때 사용

test('1은 1이다.', () => {
  expect(1).toBe(1);
});

test('2 더하기 3은 5', () => {
  expect(fn.add(2, 3)).toBe(5);
});

test('3 더하기 3은 5가 아님', () => {
  expect(fn.add(3, 3)).not.toBe(5);
});

// 객체나 배열은 재귀적으로 돌면서 값을 확인해야 하기 때문에 toEqual 사용
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

// 정규 표현식과 toMatch
test('Hello World에 h가 있는지', () => {
  expect('Hello World').toMatch(/H/);
  expect('Hello World').toMatch(/h/i);
});

// toContain
// 배열에 특정 요소가 있는지
test('유저리스트에 Mike가 있는지', () => {
  const user = 'Mike';
  const userList = ['Tom', 'Jane', 'Mike'];
  expect(userList).toContain(user);
});
