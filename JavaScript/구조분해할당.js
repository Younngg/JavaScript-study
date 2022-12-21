// Destructuring assignment
// 구조 분해 할당 구문은 배열이나 객체의 속성을 분해해서 그 값을 변수에 담을 수 있게 하는 표현식

//배열 구조 분해
let [x, y] = [1, 2];
let users = ['Mike', 'Tom', 'Jane'];
let [user1, user2, user3] = users;

let str = 'Mike-Tom-Jane';
let [user4, user5, user6] = str.split('-');

// 배열 구조 분해 : 기본값
// c에 해당하는 값이 없을 때
let [a, b, c] = [1, 2]; // c === undefined
[a, b, c = 5] = [1, 2]; // c === 5 만약 값이 undefined라면 기본값을 사용

// 배열 구조 분해 : 일부 반환값 무시
let [user7, , user8] = ['Mike', 'Tom', 'Jane', 'Tony'];
// user7 === 'Mike', user8 === 'Jane'

// 배열 구조 분해 : 바꿔치기
let d = 1;
let e = 2;
// d에 2를 저장하고 e에 1을 저장하고 싶을 때, d = e로 하면 e가 바뀌어버림.
// f에 값을 잠시 저장할 경우, 번거로워짐
let f = d;
d = e;
e = f;
// 구조 분해 할당 ver
[a, b] = [b, a];

// 객체 구조 분해
let user = { name: 'Mike', age: 30 };
let { name, age } = user;
// 순서를 바꾸어도 동일하게 동작

// 새로운 변수 이름으로 할당
let { name: userName, age: userAge } = user;

// 기본값
let { name1, age1, gender1 = 'male' } = user;
