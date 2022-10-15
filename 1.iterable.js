// Iterable 하다는 건 순회가 가능하다는 것
// [Symbol.iterator]() : Iterator;
// 심볼 정의를 가진 객체나, 특정한 함수가 Iterator를 리턴한다는 것은 순회 가능한 객체
// 순회가 가능하면? for..of, spread 연산자 사용 가능

const array = [1, 2, 3];
for (const item of array.values()) {
  console.log(item);
}

// const obj = { 0: 1, 1: 2 };
// for (const item of obj) {
// console.log(item);
// }
// TypeError: obj is not iterable

const obj = { 0: 1, 1: 2 };
for (const item in obj) {
  // for..in은 key를 출력
  console.log(item);
}

// entries, keys, values 이터레이터 반환

const iterator = array.values();
console.log(iterator.next()); // 결과 객체 리턴
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value); // undefined
console.log(iterator.next().done); // true 반복 끝!

while (true) {
  // for..of 대신
  const item = iterator.next();
  if (item.done) break;
  console.log(item.value);
}
